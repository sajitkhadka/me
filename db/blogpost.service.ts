import prisma from "@/lib/prisma";
import { BlogPost, BlogPostTag, Comment, Tag, User } from "@prisma/client";

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
  async getAllBlogPosts(): Promise<BlogPosts> {
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


  async getBlogPostByTag(tag: string): Promise<BlogPosts> {
    return prisma.blogPost.findMany({
      where: {
        tags: {
          some: {
            tag: {
              name: tag,
            },
          },
        },
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
}

const blogPostService = new BlogPostService();
export default blogPostService;

