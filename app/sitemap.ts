import { servicesForAI } from "@/data/services"
import { getPosts } from "@/lib/blog"
import { useCases } from "@/data/use-cases"

export default async function sitemap() {

    const service = servicesForAI.map((service) => ({
        url: `https://twjlabs.com${service.url}`,
        lastModified: new Date("2025-11-26"),
    }))

    const blogPosts = (await getPosts()).map((post: any) => ({
        url: `https://twjlabs.com/blog/${post.slug}`,
        lastModified: new Date(post.publishedAt),
    }))

    const useCasesMapped = useCases[0].cases.map((useCase: any) => ({
        url: `https://twjlabs.com/use-cases/for-${useCase.link}`,
        lastModified: new Date("2025-11-26"),
    }))

    return [{
        url: 'https://twjlabs.com/en',
        lastModified: new Date(),
    },
    {
        url: 'https://twjlabs.com/en/pricing',
        lastModified: new Date("2025-11-26"),
    },
    {
        url: 'https://twjlabs.com/en/blog',
        lastModified: new Date(),
    },
    {
        url: 'https://twjlabs.com/en/contact-sales',
        lastModified: new Date(),
    },
    {
        url: 'https://twjlabs.com/en/about',
        lastModified: new Date(),
    },
    {
        url: 'https://twjlabs.com/en/careers',
        lastModified: new Date(),
    },
    {
        url: 'https://twjlabs.com/en/legal/privacy-policy',
        lastModified: new Date(),
    },
    {
        url: 'https://twjlabs.com/en/legal/sitemap',
        lastModified: new Date(),
    },
    {
        url: 'https://twjlabs.com/en/work',
        lastModified: new Date(),
    },
    {
        url: 'https://twjlabs.com/en/free-website-audit',
        lastModified: new Date(),
    },
    {
        url: 'https://twjlabs.com/en/go-online',
        lastModified: new Date(),
    },
    ...service, ...blogPosts, ...useCasesMapped]
}