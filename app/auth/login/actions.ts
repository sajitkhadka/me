"use server"

import { signIn } from "@/auth"

export const handleGoogleSignIn = async () => {
    await signIn("google", { callbackUrl: "/blog/create" })
}
export const handleGithubSignIn = async () => {
    await signIn("github", { callbackUrl: "/blog/create" })
}