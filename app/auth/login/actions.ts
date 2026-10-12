"use server"

import { auth, signIn, signOut } from "@/auth"

export const handleGoogleSignIn = async (callbackUrl = "/blog/create") => {
    await signIn("google", { redirectTo: callbackUrl })
}
export const handleGithubSignIn = async (callbackUrl = "/blog/create") => {
    await signIn("github", { redirectTo: callbackUrl })
}

export const handleSignout = async () => {
    await signOut({ redirectTo: "/" })
}
export const getUserSession = async () => {
    return await auth()
}