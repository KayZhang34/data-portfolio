import Image from "next/image";

export default function AboutPage() {
  const workExperience = [
    {
      company: "Curinos",
      dates: "Jan 2022 - Oct 2024",
      role: "Senior Data Analyst",
      description: "Built and maintained SQL pipelines processing 200M+ time-series records for banking clients. Owned Tableau dashboards their teams used day-to-day to track KPIs. Ran cohort and regression analyses to model how pricing affected customer behavior. Automated a bunch of recurring validation workflows. Ultimately, I helped clients make the most out of their data",
    },
    {
      company: "Accenture",
      dates: "July 2019 - Dec 2021",
      role: "Technology Consulting Senior Analyst",
      description: "Consulting mostly in healthcare as a Salesforce CRM specialist. I did a lot of data integration work, consolidating 2M+ customer and campaign records from multiple platforms into a single Salesforce CRM instance using Snowflake SQL. Those experiences grew my interest in more data work and brought me to my next role at Curinos.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      <main className="max-w-6xl mx-auto px-8 pt-32 pb-20">
        {/* Hero Section */}
        <section className="mb-20">
          <h1 className="text-5xl font-light mb-8 leading-tight">
            <span className="text-gray-900 font-normal">Kay</span>{" "}
            <span className="text-gray-400">works with</span>{" "}
            <span className="text-gray-900 font-normal">data</span>
            <span className="text-gray-400">.</span>{" "}
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left Column - Bio & Contact */}
            <div>
              <div className="space-y-6 text-gray-700 leading-relaxed">
                <p>
                  I graduated from NYU with a B.A. in Math. It was highkey challening and lowkey didn't prepare me for specific work stuff,
                  but it did build strong foundations in problem-solving and taught me how to persist through difficult problems,
                  skills that have been useful in my career and in life in general.
                </p>
                <p>
                  I've been blessed with the opportunity to work at Curinos and Accenture,
                  and I learned a lot about work and myself in that time.
                  I quit my job in late 2024 due to some personal reasons that are now resolved,
                  and now I am looking for new opportunities in the data space! :)
                </p>
              </div>
            </div>

            {/* Right Column - Image */}
            <div className="rounded-3xl overflow-hidden h-[300px] md:h-[500px] relative">
              <Image
                src="/kay2.jpg"
                alt="Kay Zhang"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
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
                <div>
                  <div className="mb-2">
                    <span className="text-gray-900 font-normal">{job.company}</span>
                    <span className="text-gray-500"> | {job.dates}</span>
                  </div>
                  <h3 className="text-gray-900 font-medium">{job.role}</h3>
                </div>
                <div>
                  <p className="text-gray-700 leading-relaxed">{job.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-10 pt-8 border-t border-gray-300">
          <p className="text-right text-sm text-gray-500">© 2026 Kay Zhang</p>
        </footer>
      </main>
    </div>
  );
}
