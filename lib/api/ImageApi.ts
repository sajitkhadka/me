export class ImageApi {
    private static BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '';

    public static upload = async (file: File) => {
        try {
            // const formData = new FormData();
            // formData.append('file', file);

            // const response = await fetch(`${ImageApi.BASE_URL}/api/image/create`, {
            //     method: 'POST',
            //     body: formData,
            // });

            // if (!response.ok) {
            //     throw new Error('Failed to upload image');
            // }

            // const data = await response.json();

            return {
                url: `/api/image/1v9QraJGAy8GGj2TYqP9erFSNTkT4rtU4`,
                imageId: "1v9QraJGAy8GGj2TYqP9erFSNTkT4rtU4",
            };
        } catch (error) {
            console.error('Error uploading image:', error);
            throw error;
        }
    }
}