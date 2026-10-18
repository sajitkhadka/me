import { Tag } from "@/components/custom-ui/tag";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import tagService, { Tags } from "@/db/tags.service";
import { createSlug, sortTagsByCount } from "@/lib/utils";

export default async function TagsSidebar({ tagparam }: { tagparam?: string }) {
    const tags = await tagService.getAllTags();
    const sortedTags = sortTagsByCount(tags);
    return (
        <div className="order-first h-fit lg:sticky lg:top-24 lg:order-none lg:max-h-[calc(100vh-7rem)] lg:overflow-auto">
            <Card>
                <CardHeader className="px-4 py-3">
                    <CardTitle>Tags</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-2 px-4 pt-0 pb-4">
                    {sortedTags?.map((tag) => (
                        <Tag tag={tag.name} key={tag.id} count={tag._count.blogPostTags} current={createSlug(tag.name) === tagparam} />
                    ))}
                </CardContent>
            </Card>
        </div>
    );
}