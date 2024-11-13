import { Card, CardContent } from "@/components/ui/card"
import { User } from "@prisma/client"
import { Pencil } from "lucide-react"
import Image from "next/image"

export default function AuthorCard({ author }: { author: User }) {
    return (
        <Card className="mt-8">
            <CardContent className="py-0 m-0">
                <div className="flex items-start gap-4 rounded-full">
                    <Image
                        src={`/api/image/${author.image}`}
                        alt={author.name || "Author"}
                        width={80}
                        height={80}
                    />
                    <div>
                        <h3 className="text-xl font-semibold">{author.name}<Pencil className="w-3 h-3 inline ml-3" /></h3>
                        {author.authorInfo ? <p className="text-sm text-muted-foreground mb-3">{author.authorInfo}</p> : null}
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}