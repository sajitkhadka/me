import { IPostData } from "@/app/blog/create/actions";
import prisma from "@/lib/prisma";
import { BlogPost, BlogPostTag, Comment, Tag, User } from "@prisma/client";
import { Pagination } from "./types";
import { auth } from "@/auth";

export type BlogPosts = (BlogPost & {
  author: User
  tags: (BlogPostTag & {
    tag: Tag;
  })[];
  _count: {
    comments: number;
  };
})[];
class BlogPostService {
  async getAllBlogPosts(pagination: Pagination): Promise<BlogPosts> {
    const session = await auth();
    return await prisma.blogPost.findMany({
      include: {
        author: true,
        tags: {
          include: {
            tag: true,
          },
        },
        _count: {
          select: {
            comments: true,
          },
        }
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: pagination.limit,
      skip: pagination.offset,
      where: {
        OR: [
          { published: true },
          { author: { id: session?.user.id } },
        ]
      }
    });
  }

  async getBlogPostById(id: string) {
    const session = await auth();
    return prisma.blogPost.findUnique({
      where: {
        id, OR: [
          { published: true },
          { author: { id: session?.user.id } },
        ]
      },
      include: {
        author: true,
        tags: {
          include: {
            tag: true,
          },
        },
        comments: {
          include: {
            user: true,
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    });
  }


  async getBlogPostByTag(tag: string, pagination: Pagination): Promise<BlogPosts> {
    const session = await auth();
    return prisma.blogPost.findMany({
      where: {
        tags: {
          some: {
            tag: {
              name: tag,
            },
          },
        },
        OR: [
          { published: true },
          { author: { id: session?.user.id } },
        ]
      },
      include: {
        author: true,
        tags: {
          include: {
            tag: true,
          },
        },
        _count: {
          select: {
            comments: true,
          },
        }
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: pagination.limit,
      skip: pagination.offset,
    });
  }

  async addReaction(blogPostId: string) {
    return prisma.blogPost.update({
      where: { id: blogPostId },
      data: {
        reaction: {
          increment: 1,
        },
      },
    });
  }

  async add(data: IPostData) {
    const session = await auth();
    if (!session?.user?.id) {
      throw new Error('Please login to create a blog post');
    }
    return await prisma.blogPost.create({
      data: {
        ...data,
        published: false,
        reaction: 0,
        tags: {
          create: data.tags.map((tag) => ({
            tag: {
              connectOrCreate: {
                where: {
                  name: tag,
                },
                create: {
                  name: tag,
                },
              },
            },
          })),
        }
      },
    })
  }

  async getBlogPostCount(): Promise<number> {
    const session = await auth();
    return prisma.blogPost.count({
      where: {
        OR: [
          { published: true },
          { author: { id: session?.user?.id } },
        ]
      }
    });
  }

  async getBlogPostCountByTag(tag: string): Promise<number> {
    const session = await auth();
    return prisma.blogPost.count({
      where: {
        tags: {
          some: {
            tag: {
              name: tag,
            },
          },
        },
        OR: [
          { published: true },
          { author: { id: session?.user?.id } },
        ]
      }
    });
  }


}

const blogPostService = new BlogPostService();
export default blogPostService;

