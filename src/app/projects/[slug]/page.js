// app/projects/[slug]/page.tsx
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getItemBySlug, getBlocks } from "@/lib/notion-queries";

export const revalidate = 300;

export default async function ProjectPage({ params }) {
  const page = await getItemBySlug(params.slug);
  if (!page) return notFound();
  console.log(page);
  const p = page.properties;
  const name = p.title?.title?.[0]?.plain_text ?? "Untitled";
  const subheader = p.subheader?.rich_text?.[0]?.plain_text ?? "";
  const projectLink = p.projectLink?.url ?? null;

  const desc = p.descriptions?.rich_text?.[0]?.plain_text ?? "";
  const context = p.context?.rich_text?.[0]?.plain_text ?? "";

  const year = p.year?.rich_text?.[0]?.plain_text ?? "";
  const tech = (p.technologies?.multi_select ?? []).map((t) => t.name);
  const roles = (p.roles?.multi_select ?? []).map((t) => t.name);

  const images = (p.image?.files ?? [])
    .map((f) => (f.type === "file" ? f.file.url : f.external?.url))
    .filter(Boolean);

  const blocks = await getBlocks(page.id);

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      {/* Navigation */}
      <nav className="fixed top-8 left-1/2 -translate-x-1/2 z-50">
        <div className="bg-white/80 backdrop-blur-md rounded-full px-6 py-3 shadow-sm border border-gray-200">
          <ul className="flex items-center gap-8 text-sm">
            <li>
              <Link
                href="/"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                About
              </Link>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span>
              <Link href="/" className="font-medium text-gray-900">
                Work
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-8 pt-32 pb-20">
        {/* Hero Section with Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
          {/* Left Column - Project Info */}
          <div className="lg:col-span-1">
            <h1 className="text-5xl font-normal text-gray-900 mb-2">{name}</h1>
            <p className="text-gray-500 mb-12">{subheader}</p>

            {roles.length > 0 && (
              <div className="mb-8">
                <h3 className="text-xs uppercase tracking-wider text-gray-400 mb-3">
                  MY ROLE{" "}
                </h3>
                <div className="space-y-1 text-sm">
                  {roles.map((t) => (
                    <p key={t} className="text-gray-900">
                      {t}
                    </p>
                  ))}
                </div>
              </div>
            )}
            {/* Tools */}
            {tech.length > 0 && (
              <div className="mb-8">
                <h3 className="text-xs uppercase tracking-wider text-gray-400 mb-3">
                  TOOLS
                </h3>
                <div className="space-y-1 text-sm">
                  {tech.map((t) => (
                    <p key={t} className="text-gray-900">
                      {t}
                    </p>
                  ))}
                </div>
              </div>
            )}

            {/* Timeline */}
            {year && (
              <div className="mb-8">
                <h3 className="text-xs uppercase tracking-wider text-gray-400 mb-3">
                  TIMELINE
                </h3>
                <p className="text-sm text-gray-900">{year}</p>
              </div>
            )}
          </div>

          {/* Right Column - Description */}
          <div className="lg:col-span-2">
            {/* Description */}
            <div className="mb-8">
              <h3 className="text-xs uppercase tracking-wider text-gray-400 mb-3">
                DESCRIPTION
              </h3>
              <p className="text-gray-900 leading-relaxed mb-8">{desc}</p>
            </div>

            {/* Context */}
            <div className="mb-8">
              <h3 className="text-xs uppercase tracking-wider text-gray-400 mb-3">
                CONTEXT
              </h3>
              <p className="text-gray-900 leading-relaxed mb-8">{context}</p>
            </div>

            {/* Case Study Link */}
            {projectLink && (
              <a
                href={projectLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-900 hover:bg-gray-50 transition-colors"
              >
                View Live Project
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </a>
            )}
          </div>
        </div>

        {/* Bento Grid - Images */}
        {images.length > 0 && (
          <section className="relative">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-auto">
              {images.map((src, idx) => {
                // Create varied layout like Marco's bento grid
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
        if (b.type === "descriptions") {
          const text = b.descriptions?.rich_text
            .map((t) => t.plain_text)
            .join("");
          if (!text.trim()) return <div key={b.id} className="h-2" />;
          return (
            <p key={b.id} className="text-gray-900 leading-relaxed">
              {text}
            </p>
          );
        }

        if (b.type === "heading_2") {
          const text = b.heading_2.rich_text.map((t) => t.plain_text).join("");
          return (
            <h2
              key={b.id}
              className="text-xl font-medium text-gray-900 mt-6 mb-2"
            >
              {text}
            </h2>
          );
        }

        if (b.type === "bulleted_list_item") {
          const text = b.bulleted_list_item.rich_text
            .map((t) => t.plain_text)
            .join("");
          return (
            <li key={b.id} className="text-gray-900 ml-6 mb-1 list-disc">
              {text}
            </li>
          );
        }

        return <div key={b.id} />;
      })}
    </>
  );
}
