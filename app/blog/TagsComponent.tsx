import { Tag } from "@/components/tag";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tags } from "@/db/tags.service";
import { slug } from "github-slugger";

export default function TagComponent({ sortedTags, tagparam }: { sortedTags: Tags, tagparam?: string }) {
    return (
        <div className="col-span-12 h-fit sm:col-span-4 sm:col-start-10">
            <Card>
                <CardHeader className="px-4 py-3">
                    <CardTitle>Tags</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-2 px-4 pt-0 pb-4">
                    {sortedTags?.map((tag) => (
                        <Tag tag={tag.name} key={tag.id} count={tag._count.blogPostTags} current={slug(tag.name) === tagparam} />
                    ))}
                </CardContent>
            </Card>
        </div>
    );
}