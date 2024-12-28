import { IPostData, IUpdateData } from "@/app/blog/create/actions";
import prisma from "@/lib/prisma";
import { BlogPost, BlogPostTag, Comment, Image, Prisma, Tag, User } from "@prisma/client";
import { BlogPostType, Pagination } from "./types";
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

export type BlogPostWithTagComments = (BlogPost & {
  author: User
  tags: (BlogPostTag & {
    tag: Tag;
  })[];
  comments: Comment[];
  images: Image[];
})
class BlogPostService {

  async getPublicBlogPosts(): Promise<BlogPost[]> {
    return await prisma.blogPost.findMany({
      where: {
        published: true,
      }
    })
  }
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

  async getBlogPostById(id: number): Promise<BlogPostWithTagComments | null> {
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
        images: true,
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
              name: {
                contains: tag,
                mode: 'insensitive',
              },
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

  async addReaction(blogPostId: number) {
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
    const image = data.coverImage?.imageId ? await prisma.pendingImage.findFirst({
      where: {
        id: data.coverImage?.imageId,
      },
    }) : null;
    return await prisma.blogPost.create({
      data: {
        ...data,
        coverImage: image?.image,
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
              name: {
                contains: tag,
                mode: 'insensitive',
              },

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

  async getPostByType(typeId: number) {
    return prisma.blogPost.findFirst({
      where: {
        typeId,
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

  async update(id: number, data: IUpdateData) {
    const session = await auth();
    const updates: Prisma.BlogPostUpdateInput = {
      version: {
        increment: 1,
      },
      updatedAt: new Date(),
    }
    if (data.title) {
      updates.title = data.title;
    }
    if (data.content) {
      updates.content = data.content;
    }
    if (data.coverImage) {
      updates.coverImage = data.coverImage.imageId;
    }
    if (data.tags) {
      updates.tags = {
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
    }
    if (data.published) {
      updates.published = data.published;
    }

    if (data.typeId) {
      updates.type = {
        connect: {
          id: data.typeId,
        },
      }
    }
    return prisma.blogPost.update({
      where: {
        id,
        author: {
          id: session?.user?.id,
        },
        version: data.version
      },
      data: updates,
    })
  }

}

const blogPostService = new BlogPostService();
export default blogPostService;

