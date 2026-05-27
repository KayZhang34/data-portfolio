import Image from "next/image";
import Link from "next/link";
import CopyEmailButton from "./components/copy-email-button";
import ImageCarousel from "./components/image-carousel";

export default function Home() {
  const carouselImages = [
    "/kay.jpg",
    "/kay2.jpg",
    "/kay4.jpg",
  ];

  const workExperience = [
    {
      company: "Curinos",
      dates: "Jan 2022 - Oct 2024",
      role: "Senior Data Analyst",
      description:
        "I helped build analytics platforms for banks.",
    },
    {
      company: "Accenture",
      dates: "July 2019 - Dec 2021",
      role: "Technology Consulting Senior Analyst",
      description:
        "Lots of differnet projects with Salesforce CRM and data integrations.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      <main className="max-w-6xl mx-auto px-8 pt-32 pb-20">
        {/* Hero Section */}
        <section className="mb-20">
          <h1 className="text-5xl font-light text-gray-900 mb-12">
            Hi, I'm Kay.
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left Column - Bio & Contact */}
            <div>
              <div className="flex gap-3 mb-8">
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
                <CopyEmailButton email="kz763@nyu.edu" />
              </div>

              <div className="space-y-6 text-gray-700 leading-relaxed">
                <p>I am based out of NYC, and I have over 5 years of experience working in consulting and financial services
                  with a focus on data analytics.</p>
                <p>
                  I graduated from NYU with a B.A. in Math. I've worked at Curinos and Accenture and learned a lot about
                  work and myself in that time.
                </p>
                <p>
                  I quit my job in late 2024 due to some personal reasons,
                  and now I am looking for new opportunities in the data space! :)
                </p>
              </div>
            </div>

            {/* Right Column - Carousel */}
            <div className="rounded-3xl overflow-hidden h-[220px] md:h-[360px]">
              <ImageCarousel images={carouselImages} />
            </div>
          </div>
        </section>

        {/* Work Experience Section */}
        <section>
          <h2 className="text-3xl font-light text-gray-900 mb-12">
            Work Experience
          </h2>

          <div className="space-y-0">
            {workExperience.map((job, index) => (
              <div
                key={index}
                className="grid grid-cols-1 lg:grid-cols-2 gap-8 py-8 border-b border-gray-300 last:border-b-0"
              >
                {/* Left Column - Company & Role */}
                <div>
                  <div className="mb-2">
                    <span className="text-gray-900 font-normal">
                      {job.company}
                    </span>
                    <span className="text-gray-500"> | {job.dates}</span>
                  </div>
                  <h3 className="text-gray-900 font-medium">{job.role}</h3>
                </div>

                {/* Right Column - Description */}
                <div>
                  <p className="text-gray-700 leading-relaxed">
                    {job.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-20 pt-8 border-t border-gray-300">
          <p className="text-right text-sm text-gray-500">© 2026 Kay Zhang</p>
        </footer>
      </main>
    </div>
  );
}
