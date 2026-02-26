import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import aboutData from '@/data/about.json'
import type { AboutData } from '@/types/about'

export const metadata: Metadata = {
  title: aboutData.meta.title,
  description: aboutData.meta.description,
}

const { hero, intro, whomWeServe, ourStory, visionMission } = aboutData

export default function AboutPage() {
  return (
    <main className="bg-white">
      {/* Hero */}
      <section
        className="py-14 relative"
        style={{
          backgroundImage:
            'linear-gradient(135deg, var(--heading-grad-from) 0%, var(--heading-grad-to) 100%)',
        }}
      >
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-center text-white mb-2">
            {hero.heading}
          </h1>
          <p className="text-xl text-center text-white opacity-90">
            {hero.subheading}
          </p>
        </div>
      </section>

      {/* Logo + Intro */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">

            <h2 className="text-3xl font-bold mb-4">{intro.heading}</h2>

            {intro.paragraphs.map((para, i) => (
              <p key={i} className="mb-4 text-gray-700 leading-relaxed">
                {para.companyLink ? (
                  <>
                    SeaNeB App is an initiative by{' '}
                    <a
                      href={para.companyLink.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-bold text-marketing-primary hover:underline"
                    >
                      {para.companyLink.label}
                    </a>
                    , a government-recognised Indian tech startup focused on
                    creating commission-free digital solutions for India&apos;s
                    MSMEs, small vendors, and home-based service providers.
                  </>
                ) : (
                  para.text
                )}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* Whom We Serve heading */}
      <section className="pt-14 pb-0">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold">
            <span className="heading-gradient">{whomWeServe.heading}</span>
          </h2>
        </div>
      </section>

      {/* Audience cards */}
      {whomWeServe.audiences.map((audience) => (
        <section key={audience.id} className="py-12 pb-20">
          <div className="container mx-auto px-4">
            <div
              className={`flex ${
                audience.reverse ? 'flex-col-reverse' : 'flex-col'
              } lg:flex-row items-center gap-12`}
            >
              {!audience.reverse && (
                <div className="w-full lg:w-1/2">
                  <Image
                    src={audience.image}
                    alt={audience.imageAlt}
                    width={700}
                    height={500}
                    className="rounded-lg shadow-lg w-full h-auto"
                  />
                </div>
              )}

              <div className="w-full lg:w-1/2">
                <h3 className="text-3xl font-bold mb-4">
                  <span className="heading-gradient">
                    {audience.heading}
                  </span>
                </h3>

                <p className="text-xl font-light mb-4 text-gray-800">
                  <strong>{audience.subheading}</strong>
                </p>

                <div className="text-gray-600 space-y-4 text-justify">
                  {audience.paragraphs.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </div>

              {audience.reverse && (
                <div className="w-full lg:w-1/2">
                  <Image
                    src={audience.image}
                    alt={audience.imageAlt}
                    width={700}
                    height={500}
                    className="rounded-lg shadow-lg w-full h-auto"
                  />
                </div>
              )}
            </div>
          </div>
        </section>
      ))}

      {/* Our Story */}
      <section className="py-14 relative bg-gray-50 overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="w-full lg:w-4/12">
              <Image
                src={ourStory.image}
                alt={ourStory.imageAlt}
                width={500}
                height={400}
                className="w-full h-auto rounded mx-auto"
              />
            </div>

            <div className="w-full lg:w-8/12">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="heading-gradient">{ourStory.heading}</span>
              </h2>

              <p className="text-xl mb-4">
                <strong>{ourStory.subheading}</strong>
              </p>

              <div className="space-y-4 text-gray-600 text-justify">
                {ourStory.paragraphs.map((p, i) => (
                  <p key={i}>
                    {i === 0 ? (
                      <>
                        At <strong>SeaNeB (Search Near By) App</strong>, our
                        journey began with a simple yet powerful idea inspired
                        by the “Vocal For Local” vision of Prime Minister{' '}
                        <a
                          href={ourStory.modiLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-bold heading-gradient"
                        >
                          Narendra Modi
                        </a>
                        .
                      </>
                    ) : (
                      p
                    )}
                  </p>
                ))}

                <blockquote className="border-l-4 border-gray-300 pl-4 py-2 italic text-lg font-medium text-gray-900 bg-gray-100 rounded">
                  {ourStory.quote}
                </blockquote>

                <p>{ourStory.closingParagraph}</p>
              </div>

              <div className="mt-8">
                <Link
                  href={ourStory.cta.href}
                  className="inline-block px-8 py-3 bg-marketing-primary text-white font-medium rounded shadow hover:bg-blue-600 transition-colors"
                >
                  {ourStory.cta.label}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision / Mission / Core Values */}
      <section
        className="py-20 relative"
        style={{
          backgroundImage:
            'linear-gradient(135deg, var(--heading-grad-from) 0%, var(--heading-grad-to) 100%)',
        }}
      >
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center text-white mb-12">
            <h2 className="text-4xl md:text-5xl font-normal">
              <u>Search Near By App</u>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Core Values */}
            <div className="lg:col-span-7 lg:col-start-6 lg:row-span-2">
              <div className="bg-white rounded-lg p-8 shadow-2xl h-full">
                <h2 className="text-3xl font-bold mb-6">
                  <span className="heading-gradient">
                    {visionMission.coreValues.heading}
                  </span>
                </h2>

                <ol className="list-decimal pl-5 space-y-4 text-gray-700 leading-relaxed font-light text-lg">
                  {visionMission.coreValues.items.map((item) => (
                    <li key={item.title}>
                      <strong>{item.title}</strong> {item.text}
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            {/* Mission */}
            <div className="lg:col-span-5 lg:row-start-1">
              <div className="bg-white rounded-lg p-8 shadow-2xl h-full">
                <h2 className="text-3xl font-bold mb-4">
                  <span className="heading-gradient">
                    {visionMission.mission.heading}
                  </span>
                </h2>
                <p className="text-gray-700 leading-relaxed text-lg font-light">
                  {visionMission.mission.text}
                </p>
              </div>
            </div>

            {/* Vision */}
            <div className="lg:col-span-5 lg:row-start-2">
              <div className="bg-white rounded-lg p-8 shadow-2xl h-full">
                <h2 className="text-3xl font-bold mb-4">
                  <span className="heading-gradient">
                    {visionMission.vision.heading}
                  </span>
                </h2>
                <p className="text-gray-700 leading-relaxed text-lg font-light">
                  {visionMission.vision.text}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}