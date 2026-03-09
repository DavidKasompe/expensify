import { Resend } from 'resend';

const resendApiKey = process.env.RESEND_API_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : null;

export async function sendEmail({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) {
  if (!resend) {
    console.warn('RESEND_API_KEY not set. Skipping email:', subject);
    return;
  }

  try {
    await resend.emails.send({
      from: 'Tora Finance <finance@tora.demo>', // Must be a verified domain in Resend
      to,
      subject,
      html,
    });
    console.log('Email sent successfully:', subject);
  } catch (error) {
    console.error('Failed to send email:', subject, error);
  }
}
