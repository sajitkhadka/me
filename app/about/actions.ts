'use server'
import userService from "@/db/user.service";

export const getAboutMe = async () => {
    const admin = await userService.fetchAdmin();
    return {
        description: admin?.description?.replace(/\\n/g, '<br />'),
        image: admin?.image, author: admin?.name,
        title: admin?.title
    };
}