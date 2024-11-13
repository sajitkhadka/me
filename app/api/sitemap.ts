// pages/api/sitemap.ts

import blogPostService from "@/db/blogpost.service";
import { absoluteUrl } from "@/lib/utils";
import GithubSlugger from 'github-slugger'
import { NextApiRequest, NextApiResponse } from 'next';


const slugger = new GithubSlugger()

const generateSitemap = async () => {
    const posts = await blogPostService.getPublicBlogPosts();

    const dynamicUrls = [
        ...posts.map(post => ({
            loc: (absoluteUrl("/blog/" + post.id) + "/" + slugger.slug(post.title)),
            lastmod: post.updatedAt,
        }))
    ];

    let sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    sitemap += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

    dynamicUrls.forEach(page => {
        sitemap += `
      <url>
        <loc>${page.loc}</loc>
        <lastmod>${page.lastmod}</lastmod>
      </url>\n`;
    });

    sitemap += `</urlset>`;

    return sitemap;
};


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const sitemap = await generateSitemap();
    // Set Cache-Control headers for CDN caching
    res.setHeader('Cache-Control', 's-maxage=259200, stale-while-revalidate=604800'); // Cache for 3 days, revalidate every week
    res.setHeader('Content-Type', 'application/xml');
    res.status(200).send(sitemap);
}
