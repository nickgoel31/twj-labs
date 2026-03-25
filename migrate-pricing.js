/* 
   To run this script:
   1. Set your Sanity Write Token in your terminal: $env:SANITY_AUTH_TOKEN="your_token"
   2. Run: npx tsx migrate-pricing.js
*/

import { createClient } from '@sanity/client'

const client = createClient({
    projectId: 'j7mz25r5',
    dataset: 'production',
    useCdn: false,
    apiVersion: '2024-03-25',
    token: "skaV1U6anrmQwKLKIllGQw8qTdAHuL2KMquQdbLy7uyQL2eQKpXDhHy7YAuHepBEiLWJ4LUvYoJzhbRLqjvUv4UfU3GilNQPbZOiTKRbi6xH6512FRUw4ukRUqwLJ4khckGxE6ayaHlxh9DKzkhTP6qdT4SSkEHJIBlIjvsqrAhuqsE26G34",
})

const goOnlinePlans = [
    {
        planName: 'Single Page',
        price: '₹6,999',
        includedFeatures: [
            '1 Page (Scrollable Sections)',
            'Mobile Responsive',
            'Contact Form / WhatsApp Button',
            'Basic On-Page SEO',
            'Google Maps Embed',
            '2 Weeks Support'
        ]
    },
    {
        planName: 'Basic',
        price: '₹8,999',
        includedFeatures: [
            '3 Pages',
            'Mobile Responsive',
            'Contact Form / WhatsApp Button',
            'Basic On-Page SEO',
            'Google Maps Embed',
            '2 Weeks Support'
        ]
    },
    {
        planName: 'Starter',
        price: '₹13,999',
        includedFeatures: [
            'Upto 5 Pages',
            'Mobile Responsive',
            'Contact Form',
            'Basic On-Page SEO',
            '1 Month Support',
            'Domain & Hosting Guide',
            'Gallery Integration'
        ]
    },
    {
        planName: 'Growth',
        price: '₹23,999',
        includedFeatures: [
            'Upto 10 Pages',
            'WordPress CMS + Blog',
            'Advanced On-Page SEO',
            'Google Analytics Setup',
            '3 Month Support',
            'Speed & Core Web Vitals Optimisation'
        ]
    },
    {
        planName: 'Premium',
        price: '₹49,999',
        includedFeatures: [
            '20+ Pages',
            'Custom CMS Build',
            'E-commerce Ready (Razorpay / PayU)',
            'Custom UI Animations',
            '6 Month Support',
            'Full Performance Audit'
        ]
    },
    {
        planName: 'Custom',
        price: '₹1,75,000',
        includedFeatures: [
            'Web + Mobile App (PWA/Native)',
            'Backend API Development',
            'Admin Dashboard',
            'Cloud Deployment (AWS / GCP)',
            '1 Year Support',
            'Third-Party API Integrations'
        ]
    }
]

async function migrate() {
    if (!process.env.SANITY_AUTH_TOKEN) {
        console.error('Error: SANITY_AUTH_TOKEN environment variable is not set.')
        console.log('To set it in PowerShell, use: $env:SANITY_AUTH_TOKEN="your_token_here"')
        console.log('Then run: npx tsx migrate-pricing.js')
        return
    }

    try {
        const doc = {
            _type: 'pricing',
            category: 'go-online',
            plans: goOnlinePlans.map((plan) => ({
                _type: 'plan',
                _key: Math.random().toString(36).substring(2, 9), // Sanity requires unique keys for array items
                planName: plan.planName,
                price: plan.price,
                includedFeatures: plan.includedFeatures,
                featuredPlan: false,
                everythingInPrevious: false,
            }))
        }

        console.log('Uploading "Go Online" plans...')
        const result = await client.create(doc)
        console.log(`Success! Document created with ID: ${result._id}`)
    } catch (err) {
        console.error('Migration failed: ', err.message)
    }
}

migrate()