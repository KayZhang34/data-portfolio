import Link from "next/link";
import Image from "next/image";

export default function ProjectCard({ info }) {
  return (
    <Link
      href={`/projects/${info.slug}`}
      className="group flex flex-col gap-4 items-start bg-white rounded-3xl p-8 shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300"
    >
      <div className="relative w-full aspect-square flex-shrink-0 rounded-2xl overflow-hidden bg-gray-50">
        {info.thumb ? (
          <Image
            src={info.thumb}
            alt={info.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full grid place-items-center text-sm text-gray-400">
            No image
          </div>
        )}
      </div>

      <div className="w-full">
        <h2 className="text-xl font-medium text-gray-900 mb-1 group-hover:text-gray-700 transition-colors">
          {info.name}
        </h2>

        {info.year && <p className="text-sm text-gray-500 mb-2">{info.year}</p>}

        {info.description && (
          <p className="text-sm text-gray-600 leading-relaxed line-clamp-2 mb-3">
            {info.description}
          </p>
        )}

        {info.technologies?.length > 0 && (
          <div className="flex gap-2 flex-wrap">
            {info.technologies.map((t) => (
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
  );
}
