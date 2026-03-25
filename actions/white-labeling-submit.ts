"use server"

import { submitLeadData } from "./submit-lead";

type WhiteLabelingFormData = {
    agencyName: string;
    website: string;
    email: string;
    services: string[];
    volume: string;
    details: string;
}

export async function whiteLabelingSubmit(formData: WhiteLabelingFormData) {
    try {
        const res = await submitLeadData({
            name: formData.agencyName,
            contact: formData.email,
            company: formData.agencyName, // Using agency name as company
            website: formData.website,
            projectDetails: `Monthly Volume: ${formData.volume}\n\nDetails: ${formData.details}`,
            budget: "Partnership Inquiry",
            services: formData.services
        }, "White-Labeling Partnership")

        return res;
    } catch (error) {
        console.error("Error submitting white-labeling form:", error);
    }
}
