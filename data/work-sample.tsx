export type OurWorkType = {
    id: string | number;
    heroLine?: string;
    companyLogo: string;
    companyName: string;
    description: string;
    services: string[];
    heroImage: string;
    industry: string;
    location: string;
    siteUrl: string;
    projectDuration: string;
    problemStatement: string;
    solution: string;
    results: string;
    testimonial?: {
        quote: string;
        author: string;
        designation: string;
    };
    media?: string[];
    stats?: {
        conversionRateIncrease?: string;
        trafficGrowth?: string;
        userGrowth?: string;
    };
}
