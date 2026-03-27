import Image from "next/image";
import Link from "next/link";
import CopyEmailButton from "../components/copy-email-button";

export default function AboutPage() {
  const workExperience = [
    {
      company: "Studio Elsewhere",
      dates: "Jan 2021 - Present",
      role: "UX Developer",
      description:
        "I led cross-functional teams to design and launch innovative digital products, significantly improving user engagement and satisfaction.",
    },
    {
      company: "The New School",
      dates: "May - August 2022",
      role: "UX Developer",
      description:
        "I developed responsive websites and interactive experiences, which enhanced client visibility and user interaction.",
    },
    {
      company: "The New School XR",
      dates: "May - August 2021",
      role: "Creative Technology Intern",
      description:
        "I designed user-centered interfaces and conducted usability testing to ensure optimal user experiences.",
    },
    {
      company: "FXB International",
      dates: "February - September 2020",
      role: "Frontend Developer Intern",
      description:
        "I assisted in designing and maintaining client websites, focusing on usability and aesthetic appeal.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      {/* Navigation - you can import your Navbar component here instead */}

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
                  className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition-colors"
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
                <p>
                  I'm a data analyst and mathematician passionate about finding
                  patterns in chaos. With a degree from NYU and 6 years at
                  Curinos and Accenture, I've built systems processing millions
                  of records and optimized workflows that help teams work
                  smarter.
                </p>
                <p>
                  Whether I'm re-engineering SQL procedures, building Salesforce
                  dashboards, or automating data validation reports, I love
                  being involved in each stage of the process—from understanding
                  the problem to delivering the solution.
                </p>
                <p>
                  I'm constantly learning new methods and tools to expand what I
                  can do. My work focuses on building reliable systems, making
                  data accessible, and solving problems that matter.
                </p>
              </div>
            </div>

            {/* Right Column - Image */}
            <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-200 p-8">
              <div className="relative w-full aspect-[4/3] bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900 rounded-2xl overflow-hidden">
                {/* Replace with actual image */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-full h-full bg-gradient-to-br from-gray-600 to-gray-800 flex items-center justify-center">
                    <svg
                      className="w-16 h-16 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                </div>
                <Image
                  src="/kay.jpg"
                  alt="Jiyoon Moon"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
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
