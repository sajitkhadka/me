export class ImageApi {
    private static BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '';

    public static getUrl = (imageId: string) => {
        return `${ImageApi.BASE_URL}/api/image/${imageId}`;
    }
    public static getCreateUrl = () => {
        return `${ImageApi.BASE_URL}/api/image/create`;
    }

    public static upload = async (file: File) => {
        try {
            const formData = new FormData();
            formData.append('file', file);

            const response = await fetch(`${ImageApi.getCreateUrl()}`, {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Failed to upload image');
            }

            const data = await response.json();

            return {
                url: `${ImageApi.getUrl(data.imageId)}`,
                imageId: data.imageId,
            };
        } catch (error) {
            console.error('Error uploading image:', error);
            throw error;
        }
    }
}