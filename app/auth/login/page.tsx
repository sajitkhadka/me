
import { auth, signIn } from "@/auth"
import { redirect } from 'next/navigation'

export default async function SignIn() {
    const session = await auth()
    if (session?.user) {
        redirect('/blog/create')
    }
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="p-6 max-w-sm w-full bg-white shadow-md rounded-md">
                <h1 className="text-2xl font-bold text-center mb-4">Login</h1>
                <form
                    action={async () => {
                        "use server"
                        await signIn("google")
                    }}
                >
                    <button type="submit">Signin with Google</button>
                </form>
            </div></div>
    )
}
