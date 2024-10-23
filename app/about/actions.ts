'use server'
import userService from "@/db/user.service"

export const getAboutMe = async () => {
    const admin = await userService.fetchAdmin();
    const formattedText = admin?.description?.replace(/\\n/g, '<br />');
    return formattedText;
    // console.log(formattedText?.includes("\\n"))
    // console.log(formattedText)
    // return admin?.description?.replace(/\n/g, '<br />');
}