// @/actions/get-portfolio.ts
import { client } from '@/sanity/client' // <-- Adjust this to wherever your Sanity client is exported

export async function getSanityCaseStudies() {
  // This query fetches all "work" documents and expands the image references into actual URLs
  const query = `*[_type == "work"] | order(_createdAt desc) {
  _id,
  companyName,
  "companyLogo": logo.asset->url,
  industry,
  description,
  "heroImage": heroImage.asset->url,
  "gallery": coalesce(gallery[].asset->url, []),
  "fullPageImage":fullPageImage.asset->url,
  conversionRate,
  userGrowth,
  technologies,
  projectType
}`

  const data = await client.fetch(query)
  return data
}

// Add this new function to fetch a single document
export async function getSanityCaseStudyById(id: string) {
  // We use $id as a parameter to prevent injection and safely find the matching document
  const query = `*[_type == "work" && _id == $id][0] {
    _id,
    companyName,
    "companyLogo": logo.asset->url,
    industry,
    description,
    "heroImage": heroImage.asset->url,
    "gallery": gallery[].asset->url, // Fetches the array of other images
    "fullPageImage":fullPageImage.asset->url,
    projectType,
    completionDate,
    technologies,
    siteUrl,
    problem, // Note: your schema named this 'problem', not 'problemStatement'
    solution,
    results,
    testimonialQuote,
    testimonialName,
    testimonialDesignation,
    conversionRate,
    userGrowth
  }`

  const data = await client.fetch(query, { id })
  return data
}