import { servicesForAI } from "@/data/services"
import { getPosts } from "./(marketing)/blog/page"
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
        url: 'https://twjlabs.com',
        lastModified: new Date(),
    },
    {
        url: 'https://twjlabs.com/pricing',
        lastModified: new Date("2025-11-26"),
    },
    {
        url: 'https://twjlabs.com/blog',
        lastModified: new Date(),
    },
    {
        url: 'https://twjlabs.com/contact-sales',
        lastModified: new Date(),
    },
    {
        url: 'https://twjlabs.com/about',
        lastModified: new Date(),
    },
    {
        url: 'https://twjlabs.com/careers',
        lastModified: new Date(),
    },
    {
        url: 'https://twjlabs.com/legal/privacy-policy',
        lastModified: new Date(),
    },
    {
        url: 'https://twjlabs.com/legal/sitemap',
        lastModified: new Date(),
    },
    {
        url: 'https://twjlabs.com/work',
        lastModified: new Date(),
    },
    ...service, ...blogPosts, ...useCasesMapped]
}