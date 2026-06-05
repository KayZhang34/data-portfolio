import ProjectCard from "./components/project-card";
import { getFeaturedItems } from "@/lib/data-queries";
import ImageCarousel from "./components/image-carousel";
import CopyEmailButton from "./components/copy-email-button";

export default function Home() {
  const items = getFeaturedItems();
  const carouselImages = [
    { src: "/images/kay3.jpg", caption: "🍡 Queens, New York" },
    { src: "/images/beach.jpg", caption: "🏔️ Montreal, Canada" },
    { src: "/images/kay5.jpg", caption: "🍵 Osaka, Japan" },
  ];

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      <main className="max-w-7xl mx-auto px-4 sm:px-8 pt-28 sm:pt-32 pb-20">
        {/* Hero Section - Split Layout */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {/* Bio Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-12 shadow-sm border border-gray-200">
            <h1 className="text-4xl sm:text-5xl font-light text-gray-900 mb-6">
              Hi, I'm Kay :).
            </h1>

            <div className="flex flex-wrap gap-2 sm:gap-3 mb-8">
              <a
                href="https://www.linkedin.com/in/kayzhang34/"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 hover:bg-gray-50 transition-colors"
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                LinkedIn
              </a>
              <a
                href="https://github.com/KayZhang34/"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 hover:bg-gray-50 transition-colors"
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                </svg>
                GitHub
              </a>
              <CopyEmailButton email="kay.zhang34@gmail.com" />
            </div>

            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                I am a data analyst based in NYC, and I have 5+ years of
                experience in consulting and financial services.
              </p>
              <p>
                I like basketball, lifting, and running. A few of my projects
                (linked below) reflect these interests in some way. If you want
                to chat about any of these things, feel free to reach out!
              </p>
            </div>
          </div>

          {/* Carousel */}
          <div className="rounded-3xl overflow-hidden h-[300px] md:h-[500px]">
            <ImageCarousel images={carouselImages} />
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
