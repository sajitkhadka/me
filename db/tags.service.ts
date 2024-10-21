import { auth } from "@/auth";
import { PrismaClient, Tag } from "@prisma/client";

const prisma = new PrismaClient();

export type Tags = (Tag & { _count: { blogPostTags: number; }; })[]

export class TagService {
    async getAllTags(options: { published?: boolean } = { published: true }): Promise<Tags> {
        const session = await auth();
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
                                    OR: session?.user?.id ? [{ author: { id: session.user.id } }, { published: true }] : [{ published: true }]
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
