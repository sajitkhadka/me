import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Pencil } from "lucide-react"
import { User } from "@prisma/client"

export default function AuthorCard({ author }: { author: User }) {
    return (
        <Card className="mt-8">
            <CardHeader className="my-0 py-0">
                <CardTitle className="flex items-center gap-2 py-0">
                    <Pencil className="w-5 h-5" />
                    About the Author
                </CardTitle>
            </CardHeader>
            <CardContent className="py-0 m-0">
                <div className="flex items-start gap-4">
                    {author.name && author.image && <Image
                        src={author.image}
                        alt={author.name}
                        width={80}
                        height={80}
                        className="rounded-full"
                    />}
                    <div>
                        <h3 className="text-xl font-semibold">{author.name}</h3>
                        {/* <p className="text-sm text-muted-foreground mb-3">{author.description}</p> */}
                        <p className="text-sm text-muted-foreground mb-3">{author.description}</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}