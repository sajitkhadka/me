import { PrismaClient, Tag } from "@prisma/client";

const prisma = new PrismaClient();

export type Tags = (Tag & { _count: { blogPostTags: number; }; })[]

export class TagService {
    async getAllTags(options: { published?: boolean } = { published: true }): Promise<Tags> {
        return prisma.tag.findMany({
            select: {
                id: true,
                name: true,
                createdAt: true,
                updatedAt: true,
                _count: {
                    select: {
                        blogPostTags: {
                            where: {
                                blogPost: {
                                    published: options.published
                                }
                            }
                        },
                    },
                },
            },
        });
    }
}
const tagService = new TagService();
export default tagService;
