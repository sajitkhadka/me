import prisma from "@/lib/prisma";
import { BlogPostType } from "./types";
import { BlogPost, BlogType } from "@prisma/client";

export class PostTypeService {
    async getAllPostTypes(): Promise<BlogType[]> {
        return prisma.blogType.findMany();
    }
}

const postTypeService = new PostTypeService();

export default postTypeService;