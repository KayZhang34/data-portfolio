import Image from "next/image";
import Link from "next/link";
import { getAllItems } from "@/lib/notion-queries";

export const revalidate = 300;

export default async function ProjectsPage() {
  const items = await getAllItems();

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      <main className="max-w-4xl mx-auto px-8 pt-32 pb-20">
        <div className="mb-10">
          <h1 className="text-4xl font-light text-gray-900 mb-3">Projects</h1>
          <p className="text-gray-600">I am a life-long student. My overarching goal is to keep growing as a professional and a human into infinity.</p>
        </div>

        <div className="space-y-4">
          {items.map((item, index) => (
            <Link
              key={index}
              href={`/projects/${item.slug}`}
              className="group flex gap-6 bg-white rounded-2xl p-4 shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300"
            >
              {/* Thumbnail */}
              <div className="relative flex-shrink-0 w-48 aspect-video rounded-xl overflow-hidden bg-gray-100">
                {item.thumb ? (
                  <Image
                    src={item.thumb}
                    alt={item.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="192px"
                  />
                ) : (
                  <div className="w-full h-full grid place-items-center text-sm text-gray-400">
                    No image
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="flex flex-col justify-center min-w-0">
                <h2 className="text-lg font-medium text-gray-900 mb-1 group-hover:text-gray-700 transition-colors">
                  {item.name}
                </h2>
                {item.year && (
                  <p className="text-xs text-gray-400 mb-2">{item.year}</p>
                )}
                {item.description && (
                  <p className="text-sm text-gray-600 leading-relaxed line-clamp-2">
                    {item.description}
                  </p>
                )}
                {item.technologies?.length > 0 && (
                  <div className="flex gap-2 flex-wrap mt-3">
                    {item.technologies.map((t) => (
                      <span
                        key={t}
                        className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full border border-gray-200"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
