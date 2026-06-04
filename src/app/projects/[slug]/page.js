// app/projects/[slug]/page.js
import Image from "next/image";
import { notFound } from "next/navigation";
import { getItemBySlug } from "@/lib/data-queries";
import Navbar from "@/app/components/navbar";

export default function ProjectPage({ params }) {
  const project = getItemBySlug(params.slug);
  if (!project) return notFound();

  const { name, projectLink, description, year, technologies, roles, thumb, body = [] } = project;
  const images = project.images ?? [];

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      <Navbar />

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-8 pt-28 sm:pt-32 pb-20">
        {/* Hero Section with Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-16">
          {/* Left Column - Project Info */}
          <div>
            <h1 className="text-5xl font-normal text-gray-900 mb-8">{name}</h1>

            {thumb && (
              <a
                href={projectLink ?? undefined}
                target="_blank"
                rel="noreferrer"
                className={`relative w-full aspect-video rounded-2xl overflow-hidden bg-gray-100 shadow-sm border border-gray-200 mb-6 group block ${projectLink ? "cursor-pointer" : "cursor-default"}`}
              >
                <Image
                  src={thumb}
                  alt={name}
                  fill
                  className="object-contain group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </a>
            )}

            {roles.length > 0 && (
              <div className="mb-6">
                <h3 className="text-xs uppercase tracking-wider text-gray-400 mb-3">
                  MY ROLE
                </h3>
                <div className="space-y-1 text-sm">
                  {roles.map((r) => (
                    <p key={r} className="text-gray-900">{r}</p>
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
          <div>
            {description && (
              <div className="mb-8">
                <h3 className="text-xs uppercase tracking-wider text-gray-400 mb-3">
                  DESCRIPTION
                </h3>
                <p className="text-gray-900 leading-relaxed">{description}</p>
              </div>
            )}

            {technologies.length > 0 && (
              <div className="mb-8">
                <h3 className="text-xs uppercase tracking-wider text-gray-400 mb-3">
                  TOOLS
                </h3>
                <div className="flex flex-wrap gap-2 min-w-0 w-full">
                  {technologies.map((t) => (
                    <span key={t} className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full border border-gray-200 break-words">
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

        {/* Body Content */}
        {body.length > 0 && (
          <div className="max-w-3xl mb-16 space-y-4">
            <JsonBlocks body={body} />
          </div>
        )}

        {/* Images Grid */}
        {images.length > 0 && (
          <section>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {images.map((src, idx) => (
                <a
                  key={src}
                  href={projectLink ?? undefined}
                  target="_blank"
                  rel="noreferrer"
                  className={`relative w-full aspect-video rounded-xl overflow-hidden bg-gray-100 shadow-sm border border-gray-200 group block ${projectLink ? "cursor-pointer" : "cursor-default"}`}
                >
                  <Image
                    src={src}
                    alt={`${name} - Image ${idx + 1}`}
                    fill
                    className="object-contain group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </a>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

function JsonBlocks({ body }) {
  return (
    <>
      {body.map((block, i) => {
        if (block.type === "heading_2") {
          return <h2 key={i} className="text-xl font-medium text-gray-900 mt-6 mb-2">{block.text}</h2>;
        }
        if (block.type === "heading_3") {
          return <h3 key={i} className="text-lg font-medium text-gray-900 mt-4 mb-1">{block.text}</h3>;
        }
        if (block.type === "bulleted_list_item") {
          return <li key={i} className="text-gray-900 ml-6 mb-1 list-disc">{block.text}</li>;
        }
        if (block.type === "numbered_list_item") {
          return <li key={i} className="text-gray-900 ml-6 mb-1 list-decimal">{block.text}</li>;
        }
        // default: paragraph
        return <p key={i} className="text-gray-700 leading-relaxed">{block.text}</p>;
      })}
    </>
  );
}
