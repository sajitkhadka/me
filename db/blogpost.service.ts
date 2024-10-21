import { IPostData } from "@/app/blog/create/actions";
import prisma from "@/lib/prisma";
import { BlogPost, BlogPostTag, Comment, Tag, User } from "@prisma/client";
import { Pagination } from "./types";

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
  async getAllBlogPosts(options: { published?: boolean } = { published: true }, pagination: Pagination): Promise<BlogPosts> {
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
      where: options
    });
  }

  async getBlogPostById(id: string) {
    return prisma.blogPost.findUnique({
      where: { id },
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


  async getBlogPostByTag(options: { published?: boolean, tag: string }, pagination: Pagination): Promise<BlogPosts> {
    return prisma.blogPost.findMany({
      where: {
        tags: {
          some: {
            tag: {
              name: options.tag,
            },
          },
        },
        published: options.published,
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

  getBlogPostCount(options: { published?: boolean }): Promise<number> {
    return prisma.blogPost.count({
      where: options,
    });
  }

  getBlogPostCountByTag(options: { published?: boolean, tag: string }): Promise<number> {
    return prisma.blogPost.count({
      where: {
        tags: {
          some: {
            tag: {
              name: options.tag,
            },
          },
        },
        published: options.published,
      }
    });
  }


}

const blogPostService = new BlogPostService();
export default blogPostService;

