"use server"

import { auth, signIn, signOut } from "@/auth"

export const handleGoogleSignIn = async () => {
    await signIn("google", { callbackUrl: "/blog/create" })
}
export const handleGithubSignIn = async () => {
    await signIn("github", { callbackUrl: "/blog/create" })
}

export const handleSignout = async () => {
    await signOut({ redirectTo: "/" })
}
export const getUserSession = async () => {
    return await auth()
}