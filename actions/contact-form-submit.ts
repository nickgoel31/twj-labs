"use server"

import { submitLeadData } from "./submit-lead";

type FormData = {
    name: string;
    email: string;
    company?: string;
    website?: string;
    projectDetails?: string;
    budget?: string;
    currency?: string;
}

export async function contactFormSubmit(formData: FormData, selectedServices: string[]) {
    try {
        // Here you would typically handle the form submission,
        const res = await submitLeadData({
            name: formData.name,
            contact: formData.email,
            company: formData.company,
            website: formData.website,
            projectDetails: formData.projectDetails,
            budget: formData.budget || "Not specified",
            currency: formData.currency,
            services: selectedServices
        }, "Contact Form")

        return res;
    } catch (error) {
        console.error("Error submitting contact form:", error);
    }
}