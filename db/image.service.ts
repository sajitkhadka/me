import prisma from "@/lib/prisma"
import { Image, PendingImage } from "@prisma/client"

export class ImageService {
    public createPendingImage = async (imageId: string): Promise<PendingImage> => {
        return prisma.pendingImage.create({
            data: {
                image: imageId
            }
        })
    }

    // public getPendingImages = async (imageIds: string[]): Promise<PendingImage[]> => {
    //     return prisma.pendingImage.findMany({ where: { id: { in: imageIds } } })
    // }

    public savePendingImages(blogPostId: number, imageIds: string[]) {
        return prisma.image.createMany({
            data: [
                ...imageIds.map((imageId) => ({
                    blogPostId,
                    image: imageId,
                }))]
        })
    }

    async getPendingImages(imageIds: string[]): Promise<PendingImage[]> {
        return prisma.pendingImage.findMany({
            where: {
                id: {
                    in: imageIds
                }
            }
        })
    }

    public clearPendingImage = async (imageIds: string[]) => {
        return prisma.pendingImage.deleteMany({
            where: {
                id: {
                    in: imageIds
                }
            }
        })
    }

}

const imageService = new ImageService()
export default imageService;