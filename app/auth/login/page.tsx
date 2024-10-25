"use client"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Icons } from "@/components/custom-ui/icons"
import { handleGithubSignIn, handleGoogleSignIn } from "./actions"

export default function SignIn() {
    return (
        <div className="flex items-center justify-center w-full bg-gray-100 dark:bg-gray-900">
            <Card className="w-full max-w-md">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold text-center">Sign in</CardTitle>
                    <CardDescription className="text-center">
                        Choose your preferred sign in method
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <Button variant="outline" onClick={() => handleGoogleSignIn()}>
                        <Icons.google className="mr-2 h-4 w-4" />
                        Sign in with Google
                    </Button>
                    <Button variant="outline" onClick={() => handleGithubSignIn()}>
                        <Icons.gitHub className="mr-2 h-4 w-4" />
                        Sign in with GitHub
                    </Button>

                </CardContent>
            </Card>
        </div>
    )
}