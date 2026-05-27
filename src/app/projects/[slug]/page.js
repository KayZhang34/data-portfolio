// app/projects/[slug]/page.js
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getItemBySlug, getBlocks } from "@/lib/notion-queries";
import Navbar from "@/app/components/navbar";

export const revalidate = 300;

/** Renders a Notion rich_text array with inline formatting preserved. */
function RichText({ richText = [] }) {
  return (
    <>
      {richText.map((t, i) => {
        const { bold, italic, underline, strikethrough, code } = t.annotations ?? {};
        let node = t.plain_text;

        if (code)          node = <code key={i} className="px-1 py-0.5 bg-gray-100 rounded text-sm font-mono">{node}</code>;
        if (bold)          node = <strong key={i} className="font-semibold">{node}</strong>;
        if (italic)        node = <em key={i}>{node}</em>;
        if (underline)     node = <u key={i}>{node}</u>;
        if (strikethrough) node = <s key={i}>{node}</s>;

        if (t.href) {
          return (
            <a key={i} href={t.href} target="_blank" rel="noreferrer"
               className="underline underline-offset-2 hover:text-gray-600 transition-colors">
              {node}
            </a>
          );
        }

        return <span key={i}>{node}</span>;
      })}
    </>
  );
}

export default async function ProjectPage({ params }) {
  const page = await getItemBySlug(params.slug);
  if (!page) return notFound();
  const p = page.properties;
  const name = p.title?.title?.[0]?.plain_text ?? "Untitled";
  const projectLink = p.projectLink?.url ?? null;
  const descRt = p.descriptions?.rich_text ?? [];

  const year = p.year?.rich_text?.[0]?.plain_text ?? "";
  const tech = (p.technologies?.multi_select ?? []).map((t) => t.name);
  const roles = (p.roles?.multi_select ?? []).map((r) => r.name);

  const images = (p.image?.files ?? [])
    .map((f) => (f.type === "file" ? f.file.url : f.external?.url))
    .filter(Boolean);

  const blocks = await getBlocks(page.id);

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      <Navbar />

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-8 pt-32 pb-20">
        {/* Hero Section with Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
          {/* Left Column - Project Info */}
          <div className="lg:col-span-1">
            <h1 className="text-5xl font-normal text-gray-900 mb-8">{name}</h1>

            {roles.length > 0 && (
              <div className="mb-8">
                <h3 className="text-xs uppercase tracking-wider text-gray-400 mb-3">
                  MY ROLE
                </h3>
                <div className="space-y-1 text-sm">
                  {roles.map((t) => (
                    <p key={t} className="text-gray-900">{t}</p>
                  ))}
                </div>
              </div>
            )}

            {projectLink && (
              <a
                href={projectLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-900 hover:bg-gray-50 transition-colors"
              >
                View Live Project
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            )}
          </div>

          {/* Right Column - Description, Tools, Timeline */}
          <div className="lg:col-span-2">
            {descRt.length > 0 && (
              <div className="mb-8">
                <h3 className="text-xs uppercase tracking-wider text-gray-400 mb-3">
                  DESCRIPTION
                </h3>
                <p className="text-gray-900 leading-relaxed"><RichText richText={descRt} /></p>
              </div>
            )}

            {tech.length > 0 && (
              <div className="mb-8">
                <h3 className="text-xs uppercase tracking-wider text-gray-400 mb-3">
                  TOOLS
                </h3>
                <div className="flex flex-wrap gap-2">
                  {tech.map((t) => (
                    <span key={t} className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full border border-gray-200">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {year && (
              <div className="mb-8">
                <h3 className="text-xs uppercase tracking-wider text-gray-400 mb-3">
                  TIMELINE
                </h3>
                <p className="text-sm text-gray-900">{year}</p>
              </div>
            )}
          </div>
        </div>

        {/* Body Content from Notion */}
        {blocks.length > 0 && (
          <div className="max-w-3xl mb-16 space-y-4">
            <NotionBlocks blocks={blocks} />
          </div>
        )}

        {/* Bento Grid - Images */}
        {images.length > 0 && (
          <section className="relative">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-auto">
              {images.map((src, idx) => {
                const isLarge = idx === 0 || idx === 4;
                const isTall = idx === 1 || idx === 5;

                return (
                  <div
                    key={src}
                    className={`
                      bg-white rounded-xl overflow-hidden shadow-sm border border-gray-200
                      ${isLarge ? "md:col-span-2 md:row-span-2" : ""}
                      ${isTall ? "md:row-span-2" : ""}
                      relative group cursor-pointer
                    `}
                  >
                    <div
                      className={`relative w-full ${isLarge ? "h-[500px]" : isTall ? "h-[400px]" : "h-[300px]"}`}
                    >
                      <Image
                        src={src}
                        alt={`${name} - Image ${idx + 1}`}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

function NotionBlocks({ blocks }) {
  return (
    <>
      {blocks.map((b) => {
        if (b.type === "paragraph") {
          const rt = b.paragraph?.rich_text ?? [];
          if (!rt.length) return <div key={b.id} className="h-2" />;
          return (
            <p key={b.id} className="text-gray-900 leading-relaxed">
              <RichText richText={rt} />
            </p>
          );
        }

        if (b.type === "heading_2") {
          return (
            <h2 key={b.id} className="text-xl font-medium text-gray-900 mt-6 mb-2">
              <RichText richText={b.heading_2?.rich_text ?? []} />
            </h2>
          );
        }

        if (b.type === "heading_3") {
          return (
            <h3 key={b.id} className="text-lg font-medium text-gray-900 mt-4 mb-1">
              <RichText richText={b.heading_3?.rich_text ?? []} />
            </h3>
          );
        }

        if (b.type === "bulleted_list_item") {
          return (
            <li key={b.id} className="text-gray-900 ml-6 mb-1 list-disc">
              <RichText richText={b.bulleted_list_item?.rich_text ?? []} />
            </li>
          );
        }

        if (b.type === "numbered_list_item") {
          return (
            <li key={b.id} className="text-gray-900 ml-6 mb-1 list-decimal">
              <RichText richText={b.numbered_list_item?.rich_text ?? []} />
            </li>
          );
        }

        return <div key={b.id} />;
      })}
    </>
  );
}
