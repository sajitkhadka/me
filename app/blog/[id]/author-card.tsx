import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Pencil } from "lucide-react"
import { User } from "@prisma/client"
import { siteConfig } from "@/config/site"

export default function AuthorCard({ author }: { author: User }) {
    return (
        <Card className="mt-8">
            <CardContent className="py-0 m-0">
                <div className="flex items-start gap-4">
                    {<Image
                        src={author.image ? `/api/image/${author.image}` : siteConfig.author.avatarUrl}
                        alt={author.name || siteConfig.author.name}
                        width={80}
                        height={80}
                        className="rounded-full"
                    />}
                    <div>

                        <h3 className="text-xl font-semibold">{author.name}<Pencil className="w-3 h-3 inline ml-3" /></h3>
                        {author.authorInfo ? <p className="text-sm text-muted-foreground mb-3">{author.authorInfo}</p> : null}
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}