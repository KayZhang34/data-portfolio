import Image from "next/image";
import Link from "next/link";
import ProjectCard from "./components/project-card";
import { getAllItems } from "@/lib/notion-queries";
import ImageCarousel from "./components/image-carousel";

export default async function Home() {
  const items = await getAllItems();
  const carouselImages = [
    "/kay.jpg",
    "/images/photo2.jpg",
    "/images/photo3.jpg",
    "/images/photo4.jpg",
  ];

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-8 pt-32 pb-20">
        {/* Hero Section - Split Layout */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {/* Bio Card */}
          <div className="bg-white rounded-3xl p-12 shadow-sm border border-gray-200">
            <h1 className="text-5xl font-light mb-8 leading-tight">
              <span className="text-gray-900 font-normal">Kay</span>{" "}
              <span className="text-gray-400">works with</span>{" "}
              <span className="text-gray-900 font-normal">data</span>
              <span className="text-gray-400">.</span>{" "}
            </h1>

            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>im a life-long student.</p>

              <p>always looking to improve at any/everything.</p>
              <p>i build pipelines, optimize SQL, and make sense of chaos.</p>
              <p>
                6 years at Curinos and Accenture processing millions of records
                and re-engineering legacy systems.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-200 min-h-[300px] md:min-h-[500px]">
            <ImageCarousel images={carouselImages} />
          </div>
        </section>

        {/* Projects Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((item, index) => (
            <ProjectCard info={item} key={index} />
          ))}
        </section>

        {/* Footer hint */}
        <div className="mt-12 text-center">
          <button className="text-sm text-gray-400 hover:text-gray-600 transition-colors">
            ▸ Look around...
          </button>
        </div>
      </main>
    </div>
  );
}
