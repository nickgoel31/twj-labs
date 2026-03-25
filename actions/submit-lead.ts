// src/actions/submit-lead.ts
"use server";

import nodemailer from "nodemailer";

export type LeadData = {
  name: string;
  company?: string;
  contact: string;
  services: string[];
  budget: string;
  currency?: string;
  website?: string;
  projectDetails?: string;
};

/**
 * Executes the database save as a background task.
 * @param data The lead data to save.
 */
export async function saveLeadToDatabase(data: LeadData) {

  // Simulate successful database fetch
  // In a real app, this would perform the fetch call:
  
  try {
    const response = await fetch(`${process.env.SERVER_URL}/api/leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error(`Failed to save lead to database. Status: ${response.status}`);
    }

    console.log("Lead successfully saved to database in background.");
  } catch (error) {
    console.error("Error during background database save:", error);
  }

}

/**
 * Submits lead data. Returns success immediately after email is sent,
 * running the database save in a fire-and-forget manner.
 * @param data The lead data to submit.
 * @returns {Promise<{success: boolean, id: number}>}
 */
export async function submitLeadData(data: LeadData, source?:string) {
  try {
    console.log("🚀 Submitting Lead:", data.contact);

    // 1. Send Email (CRITICAL STEP - Await this for reliable immediate confirmation)
    await sendEmail({
      to: "sales@twjlabs.com, thewalkingjumbo@gmail.com",
      subject: `🔥 New Lead: ${data.name} - ${data.company || "No Company"} ${source || "JumboBot"}`,
      data: data,
      source: source
    })
    
    console.log("✅ Email confirmation successful. Returning success to client.");

    // 2. Start Database Save (FIRE-AND-FORGET)
    // We do NOT use 'await' here. The function returns immediately.
    // .catch() ensures that if the background task fails, we only log it 
    // and do not propagate the error to the calling function or the user interface.
    saveLeadToDatabase(data)
      .then(() => console.log("✅ Background task complete: Lead saved to database."))
      .catch((error) => console.error("⚠️ Background task failed: Database save failed.", error));

    // 3. Immediate Success Return
    // The control flow reaches here right after the email is sent (step 1).
    return { success: true, id: Date.now() }; 

  } catch (error) {
    // This catch block only handles errors from the AWAITED steps (sendEmail)
    console.error("Submission failed (Email failed or initial processing error)", error);
    // Throw an error ONLY if the critical steps failed.
    throw new Error("Failed to send lead email. Please try again.");
  }
}


// --- EMAIL SENDER LOGIC ---

async function sendEmail({
  to,
  subject,
  data,
  source="JumboBot"
}: {
  to: string;
  subject: string;
  data: LeadData;
  source?: string;
}) {
  const { SMTP_EMAIL, SMTP_PASSWORD, } = process.env;

  // 1. Create Transporter
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: SMTP_EMAIL,
      pass: SMTP_PASSWORD,
    },
  });

  // 2. Verify connection configuration (Optional but good for debugging)
  try {
    await transporter.verify();
    console.log("✅ SMTP Connected Successfully");
  } catch (error) {
    console.error("❌ SMTP Connection Failed:", error);
    throw new Error("Could not connect to email server");
  }

  // 3. Format HTML Body
  const htmlBody = `
    <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
      <h2 style="color: #4F46E5;">New Project Inquiry</h2>
      <p>You have received a new lead from <strong>${source}</strong>.</p>
      
      <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
        <tr style="background-color: #f9f9f9;">
          <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Name</td>
          <td style="padding: 10px; border: 1px solid #ddd;">${data.name}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Company</td>
          <td style="padding: 10px; border: 1px solid #ddd;">${data.company || "-"}</td>
        </tr>
        <tr style="background-color: #f9f9f9;">
          <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Contact</td>
          <td style="padding: 10px; border: 1px solid #ddd;">
            <a href="mailto:${data.contact}" style="color: #4F46E5;">${data.contact}</a>
          </td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Budget</td>
          <td style="padding: 10px; border: 1px solid #ddd;">${data.budget} ${data.currency ? `(${data.currency})` : ''}</td>
        </tr>
        <tr style="background-color: #f9f9f9;">
          <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Services</td>
          <td style="padding: 10px; border: 1px solid #ddd;">
            ${data.services.map(s => `<span style="background: #e0e7ff; color: #3730a3; padding: 2px 6px; border-radius: 4px; font-size: 12px; margin-right: 4px;">${s}</span>`).join('')}
          </td>
        </tr>
      </table>

      <p style="margin-top: 20px; font-size: 12px; color: #666;">
        Sent via The Walking Jumbo Website
      </p>
    </div>
  `;

  // 4. Send Mail
  const info = await transporter.sendMail({
    from: `"JumboBot" <${SMTP_EMAIL}>`,
    to: to,
    subject: subject,
    html: htmlBody,
  });

  console.log("Message sent: %s", info.messageId);
}