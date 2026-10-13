import { NextRequest } from "next/server";
import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";

export const runtime = "edge";

const interBold = fetch(
  new URL("../../../assets/fonts/Inter-Bold.ttf", import.meta.url)
).then((res) => res.arrayBuffer());

const labels: Record<string, string> = {
  home: "Software engineer",
  blog: "Blog post",
  project: "Project",
  resume: "Resume",
  about: "About",
};

const GREEN = "#f5b73b";

export async function GET(req: NextRequest) {
  try {
    const fontBold = await interBold;

    const { searchParams } = req.nextUrl;
    const title = searchParams.get("title");
    const label = labels[searchParams.get("type") ?? "blog"] ?? labels.blog;

    if (!title) {
      return new Response("No title provided", { status: 400 });
    }

    const heading = title.length > 110 ? `${title.substring(0, 110)}...` : title;
    const size = heading.length > 70 ? 54 : heading.length > 40 ? 66 : 80;

    return new ImageResponse(
      (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            height: "100%",
            padding: 64,
            color: "#e8edf5",
            backgroundColor: "#0b0e14",
            backgroundImage:
              "radial-gradient(circle at 85% 0%, rgba(245,183,59,0.22), rgba(11,14,20,0) 55%), radial-gradient(circle at 0% 100%, rgba(245,120,59,0.10), rgba(11,14,20,0) 50%)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <svg width="52" height="52" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M23 8.6C21.6 7 19.2 6 16 6c-4.2 0-7 2-7 5 0 3.2 3.2 4.2 7 5 3.8.8 7 1.8 7 5 0 3-2.8 5-7 5-3.2 0-5.7-1-7.2-2.7"
                stroke="#ffffff"
                strokeWidth="2.6"
                strokeLinecap="round"
              />
              <circle cx="23.6" cy="9.2" r="2.7" fill={GREEN} />
              <circle cx="8.4" cy="22.8" r="2.7" fill={GREEN} />
            </svg>
            <div style={{ display: "flex", marginLeft: 16, fontSize: 30, fontWeight: 700 }}>
              sajit<span style={{ color: GREEN }}>.</span>dev
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", flex: 1, justifyContent: "center" }}>
            <div
              style={{
                display: "flex",
                marginBottom: 24,
                fontSize: 24,
                fontWeight: 700,
                letterSpacing: 4,
                textTransform: "uppercase",
                color: GREEN,
              }}
            >
              {`> ${label}`}
            </div>
            <div style={{ display: "flex", fontSize: size, fontWeight: 700, lineHeight: 1.08 }}>{heading}</div>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 26, color: "#8b95a7" }}>
            <div style={{ display: "flex" }}>{siteConfig.url.replace("https://", "")}</div>
            <div style={{ display: "flex" }}>{siteConfig.author.name}</div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: "Inter",
            data: fontBold,
            style: "normal",
            weight: 700,
          },
        ],
      }
    );
  } catch (error) {
    return new Response("Failed to generate image", { status: 500 });
  }
}
