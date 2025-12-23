"use server";

import nodemailer from "nodemailer";

export type AuditLeadData = {
    email: string;
    url: string,
    challenges: string;
}

export async function submitAuditEmail(data: AuditLeadData) {
 try {

    // 1. Send Email (CRITICAL STEP - Await this for reliable immediate confirmation)
    await sendEmail({
      to: "thewalkingjumbo@gmail.com, harshgoel2004.work@gmail.com",
      subject: `🔥 NEW WEBSITE AUDIT REQUEST | TWJ LABS`,
      data: data,
      source: 'Audit Form'
    })


    // 2. Start Database Save (FIRE-AND-FORGET)
    // We do NOT use 'await' here. The function returns immediately.
    // .catch() ensures that if the background task fails, we only log it 
    // and do not propagate the error to the calling function or the user interface.
    // saveLeadToDatabase(data)
    //   .then(() => console.log("✅ Background task complete: Lead saved to database."))
    //   .catch((error) => console.error("⚠️ Background task failed: Database save failed.", error));

    // 3. Immediate Success Return
    // The control flow reaches here right after the email is sent (step 1).
    return { success: true, id: Date.now(), pending: false }; 

  } catch (error) {
    // This catch block only handles errors from the AWAITED steps (sendEmail)
    console.error("Submission failed (Email failed or initial processing error)", error);
    // Throw an error ONLY if the critical steps failed.
    throw new Error("Failed to send lead email. Please try again.");
  }
}


async function sendEmail({
  to,
  subject,
  data,
  source="JumboBot"
}: {
  to: string;
  subject: string;
  data: AuditLeadData;
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
          <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Website URL</td>
          <td style="padding: 10px; border: 1px solid #ddd;">
            <a href="mailto:${data.url}" style="color: #4F46E5;">${data.url}</a>
          </td>
        </tr>
        <tr style="background-color: #f9f9f9;">
          <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Contact</td>
          <td style="padding: 10px; border: 1px solid #ddd;">
            <a href="mailto:${data.email}" style="color: #4F46E5;">${data.email}</a>
          </td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Challenges</td>
          <td style="padding: 10px; border: 1px solid #ddd;">${data.challenges}</td>
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