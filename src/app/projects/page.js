import Image from "next/image";
import ProjectCard from "../components/project-card";
import { getAllItems } from "@/lib/notion-queries";

export const revalidate = 300;

export default async function AboutPage() {
  const items = await getAllItems();

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
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
              <p>I am a life-long student, growing as a professional and a human into infinity.</p>
              <p>
                I like basketball and lifting and running (despite being kinda mid at all those things). My projects likely reflect these interests in some way.
                If you want to chat about any of these things, or just want to say hi, feel free to reach out!
              </p>
              <p>
                I also post YouTube videos sometimes, but it might be too cringe to post on this semi-professional website lol.
              </p>
              
            </div>
          </div>

          <div className="rounded-3xl overflow-hidden h-[300px] md:h-[500px] relative">
            <Image
              src="/kay3.jpg"
              alt="Kay Zhang"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </section>

        {/* Projects Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((item, index) => (
            <ProjectCard info={item} key={index} />
          ))}
        </section>
      </main>
    </div>
  );
}
