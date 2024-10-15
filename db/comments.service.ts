import prisma from "@/lib/prisma";
import { Comment, User } from "@prisma/client";
import { Pagination } from "./types";

export type IComment = Comment & {
  user: User | null, _count: {
    replies: number;
  }
}

class CommentService {
  async createComment(
    content: string,
    blogPostId: string,
    parentCommentId?: string,
    userId?: string
  ): Promise<IComment> {
    return prisma.comment.create({
      data: {
        content,
        blogPostId,
        userId,
        parentCommentId
      },
      include: {
        user: true,
        _count: {
          select: {
            replies: true,
          }
        },
      }
    });
  }

  async getCommentsByBlogPostId(blogPostId: string, pagination: Pagination): Promise<(IComment)[]> {
    return prisma.comment.findMany({
      where: {
        blogPostId,
        parentCommentId: null
      },
      include: {
        user: true,
        _count: {
          select: {
            replies: true,
          }
        },
      },
      orderBy: {
        createdAt: "desc"
      },
      take: pagination.limit,
      skip: pagination.offset
    });
  }

  async getRepliesByCommentId(commentId: string, pagination: Pagination): Promise<(IComment)[]> {
    return prisma.comment.findMany({
      where: {
        parentCommentId: commentId
      },
      include: {
        user: true,
        _count: {
          select: {
            replies: true,
          }
        },
      },
      orderBy: {
        createdAt: "desc"
      },
      take: pagination.limit,
      skip: pagination.offset
    });
  }

  async getCommentCountByBlogPostId(blogPostId: string): Promise<number> {
    return prisma.comment.count({
      where: {
        blogPostId,
        parentCommentId: null
      }
    })
  }

  async addUpvote(commentId: string) {
    return prisma.comment.update({
      where: {
        id: commentId
      },
      data: {
        upvotes: {
          increment: 1
        }
      }
    })
  }

  async addDownvote(commentId: string) {
    return prisma.comment.update({
      where: {
        id: commentId
      },
      data: {
        downvotes: {
          increment: 1
        }
      }
    })
  }

}

const commentService = new CommentService();
export default commentService;

