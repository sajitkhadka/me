'use client';
import { handleSignout } from "@/app/auth/login/actions";
import { LogOut } from "lucide-react"; // Assuming you're using Lucide icons with ShadCN
import { Button, ButtonProps } from "../ui/button";
import { cn } from "@/lib/utils";
import { signOut } from "next-auth/react";

export default function SignOutButton({ className, variant }: { className?: string, variant?: ButtonProps['variant'] }) {
    return (
        <Button
            variant={variant || "ghost"}
            onClick={async () => {
                signOut({ redirect: true, callbackUrl: "/auth/login" });
            }}
            className={cn("flex gap-2", className)}
        >

            Sign Out
            <LogOut className="w-5 h-5" />
        </Button>
    );
}
