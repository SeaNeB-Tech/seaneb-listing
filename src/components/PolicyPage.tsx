import React from 'react'
import type { PolicyData, PolicySectionType } from '@/types/policy'

interface PolicyPageProps {
  data: PolicyData
  introNode?: React.ReactNode
  tocItems?: string[]
}

/* ======================================================
   SECTION
====================================================== */

function PolicySection({ section }: { section: PolicySectionType }) {
  const HeadingTag = section.level === 3 ? 'h3' : 'h2'

  const headingClass =
    section.level === 3
      ? 'text-xl font-bold mt-6 mb-3'
      : 'text-2xl font-bold mt-12 mb-4'

  return (
    <>
      {section.heading && (
        <HeadingTag className={headingClass}>{section.heading}</HeadingTag>
      )}

      {section.paragraphs?.map((para, i) => (
        <p key={i} className="mb-4">
          {para}
        </p>
      ))}

      {section.list && (
        <ul className="list-disc pl-6 mb-6 space-y-2">
          {section.list.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      )}

      {section.listSuffix && <p className="mb-4">{section.listSuffix}</p>}

      {section.address && (
        <address className="not-italic mb-4 space-y-1">
          <p className="font-semibold">{section.address.company}</p>
          <p>{section.address.street}</p>
          <p>{section.address.city}</p>
          <p>{section.address.state}</p>

          {section.address.email && (
            <p>
              Email:{' '}
              <a
                href={`mailto:${section.address.email}`}
                className="text-primary hover:underline"
              >
                {section.address.email}
              </a>
            </p>
          )}
        </address>
      )}

      {section.subsections?.map((sub, i) => (
        <PolicySection key={sub.id || i} section={sub} />
      ))}
    </>
  )
}

/* ======================================================
   PAGE
====================================================== */

export default function PolicyPage({
  data,
  introNode,
  tocItems
}: PolicyPageProps) {
  return (
    <main className="bg-white py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold mb-4">{data.title}</h1>
        <p className="text-gray-500 mb-8">{data.lastUpdated}</p>

        <div className="max-w-none text-gray-700 leading-relaxed">
          {introNode}

          {tocItems && tocItems.length > 0 && (
            <div className="mb-8">
              <p className="font-semibold mb-2">Table of Contents</p>
              <ol className="list-decimal pl-6 space-y-1">
                {tocItems.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ol>
            </div>
          )}

          {data.sections?.map((section, i) => (
            <PolicySection key={section.id || i} section={section} />
          ))}
        </div>
      </div>
    </main>
  )
}