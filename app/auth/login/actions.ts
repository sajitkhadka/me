"use server"

import { auth, signIn } from "@/auth"

export const handleGoogleSignIn = async () => {
    await signIn("google", { callbackUrl: "/blog/create" })
}
export const handleGithubSignIn = async () => {
    await signIn("github", { callbackUrl: "/blog/create" })
}

export const getUserSession = async () => {
    return await auth()
}