import prisma from "@/lib/prisma"
import { PendingImage } from "@prisma/client"

export class ImageService {
    public uploadImage = async (imageId: string): Promise<PendingImage> => {
        return prisma.pendingImage.create({
            data: {
                image: imageId
            }
        })
    }
}

const imageService = new ImageService()
export default imageService;