import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

/**
 * Returns a configured Nodemailer SMTP transporter.
 * Reads SMTP credentials from environment variables.
 */
export function getTransporter() {
  const host = process.env.SMTP_HOST || 'smtp.gmail.com';
  const port = Number(process.env.SMTP_PORT) || 587;
  const secure = process.env.SMTP_SECURE === 'true' || port === 465;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: user && pass ? { user, pass } : undefined,
  });
}

/**
 * Handles project build inquiry submissions and transmits them via SMTP.
 */
export async function sendProjectInquiry(data) {
  const {
    clientName,
    clientEmail,
    company = 'N/A',
    projectTitle,
    projectType = 'Custom Web Project',
    budgetRange = 'Flexible',
    timeline = 'Flexible',
    features = [],
    projectDescription,
  } = data;

  if (!clientName || !clientEmail || !projectTitle || !projectDescription) {
    throw new Error('Missing required fields: clientName, clientEmail, projectTitle, and projectDescription are required.');
  }

  const toEmail = process.env.SMTP_TO || process.env.SMTP_USER || 'guruvishnuk.work@gmail.com';
  const fromEmail = process.env.SMTP_FROM || process.env.SMTP_USER || 'guruvishnuk.work@gmail.com';
  const inquiryId = `INQ-${Math.floor(1000 + Math.random() * 9000)}`;

  // If SMTP is not yet configured with real user/password, log nicely for development
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.log('\n======================================================');
    console.log(`[SMTP DEV MODE - NO CREDENTIALS SET]`);
    console.log(`Inquiry ID: ${inquiryId}`);
    console.log(`To: ${toEmail}`);
    console.log(`From: ${clientName} <${clientEmail}>`);
    console.log(`Company: ${company}`);
    console.log(`Project: ${projectTitle} [${projectType}]`);
    console.log(`Budget: ${budgetRange} | Timeline: ${timeline}`);
    console.log(`Features: ${features.join(', ') || 'None selected'}`);
    console.log(`Description:\n${projectDescription}`);
    console.log('======================================================\n');

    return {
      success: true,
      inquiryId,
      mode: 'dev-simulation',
      message: 'Inquiry received! To deliver real emails, provide SMTP_USER and SMTP_PASS in your .env file.',
    };
  }

  const transporter = getTransporter();

  // 1. HTML Email for Guruvishnu (Project Request Notification)
  const ownerSubject = `🚀 [Project Request] "${projectTitle}" from ${clientName} (${inquiryId})`;
  const ownerHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0b0c10; color: #f5f5f7; margin: 0; padding: 24px; }
    .card { max-width: 620px; margin: 0 auto; background: #16181d; border: 1px solid #2a2e39; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 35px rgba(0,0,0,0.6); }
    .header { background: linear-gradient(135deg, #1d4ed8 0%, #3b82f6 100%); padding: 32px 28px; text-align: left; }
    .header h1 { margin: 0; font-size: 22px; color: #ffffff; font-weight: 700; letter-spacing: -0.3px; }
    .header p { margin: 8px 0 0; color: #dbeafe; font-size: 13px; font-family: monospace; }
    .content { padding: 28px; }
    .badge-grid { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 24px; }
    .badge { display: inline-block; padding: 6px 12px; border-radius: 6px; font-size: 12px; font-weight: 600; text-transform: uppercase; font-family: monospace; }
    .badge-type { background: rgba(59, 130, 246, 0.2); color: #93c5fd; border: 1px solid rgba(59, 130, 246, 0.4); }
    .badge-budget { background: rgba(16, 185, 129, 0.2); color: #6ee7b7; border: 1px solid rgba(16, 185, 129, 0.4); }
    .badge-timeline { background: rgba(245, 158, 11, 0.2); color: #fde68a; border: 1px solid rgba(245, 158, 11, 0.4); }
    .section-title { font-size: 11px; text-transform: uppercase; color: #9ca3af; font-weight: 700; letter-spacing: 1px; margin-top: 20px; margin-bottom: 8px; }
    .info-box { background: #1f232b; border: 1px solid #2d333f; border-radius: 10px; padding: 14px 18px; margin-bottom: 14px; font-size: 14px; line-height: 1.6; }
    .feature-tag { display: inline-block; background: #282f3d; color: #e2e8f0; border-radius: 6px; padding: 4px 10px; font-size: 12px; margin: 3px; }
    .contact-row { display: flex; justify-content: space-between; padding: 6px 0; border-bottom: 1px solid #2a2e39; font-size: 13px; }
    .contact-row:last-child { border-bottom: none; }
    .footer { padding: 18px 28px; background: #111317; text-align: center; font-size: 12px; color: #6b7280; border-top: 1px solid #232730; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <h1>🚀 New Project Build Request</h1>
      <p>ID: ${inquiryId} · Received via SMTP Gateway</p>
    </div>
    <div class="content">
      <div class="badge-grid">
        <span class="badge badge-type">${projectType}</span>
        <span class="badge badge-budget">Budget: ${budgetRange}</span>
        <span class="badge badge-timeline">Timeline: ${timeline}</span>
      </div>

      <div class="section-title">Project Title / Goal</div>
      <div class="info-box" style="font-size: 16px; font-weight: 600; color: #ffffff;">
        ${projectTitle}
      </div>

      <div class="section-title">Client Information</div>
      <div class="info-box">
        <div class="contact-row"><strong>Name:</strong> <span>${clientName}</span></div>
        <div class="contact-row"><strong>Email:</strong> <a href="mailto:${clientEmail}" style="color: #60a5fa; text-decoration: none;">${clientEmail}</a></div>
        <div class="contact-row"><strong>Company / Organization:</strong> <span>${company}</span></div>
      </div>

      ${features.length > 0 ? `
        <div class="section-title">Requested Deliverables & Modules</div>
        <div class="info-box">
          ${features.map(f => `<span class="feature-tag">✓ ${f}</span>`).join(' ')}
        </div>
      ` : ''}

      <div class="section-title">Project Scope & Specifications</div>
      <div class="info-box" style="white-space: pre-wrap; color: #d1d5db;">
${projectDescription}
      </div>
    </div>
    <div class="footer">
      Delivered via SMTP Gateway to ${toEmail}
    </div>
  </div>
</body>
</html>
  `;

  // Dispatch email to owner
  const info = await transporter.sendMail({
    from: `"${clientName} (via Portfolio)" <${fromEmail}>`,
    to: toEmail,
    replyTo: clientEmail,
    subject: ownerSubject,
    html: ownerHtml,
  });

  // 2. Dispatch auto-confirmation to client
  try {
    await transporter.sendMail({
      from: `"Guruvishnu Kajagar" <${fromEmail}>`,
      to: clientEmail,
      subject: `Project Inquiry Received: "${projectTitle}" (${inquiryId})`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #0f172a; color: #f8fafc; padding: 28px; border-radius: 12px; max-width: 540px; margin: auto; border: 1px solid #1e293b;">
          <h2 style="color: #38bdf8; margin-top: 0; font-size: 20px;">Hi ${clientName}! 👋</h2>
          <p style="color: #cbd5e1; line-height: 1.6; font-size: 14px;">
            Thank you for reaching out! I have received your project inquiry for <strong>${projectTitle}</strong> (<em>${projectType}</em>).
          </p>
          <div style="background: #1e293b; padding: 16px; border-radius: 8px; border: 1px solid #334155; margin: 18px 0; font-size: 13px;">
            <p style="margin: 0 0 6px; color: #94a3b8;"><strong>Inquiry Reference:</strong> ${inquiryId}</p>
            <p style="margin: 0 0 6px; color: #94a3b8;"><strong>Target Timeline:</strong> ${timeline}</p>
            <p style="margin: 0; color: #94a3b8;"><strong>Selected Budget:</strong> ${budgetRange}</p>
          </div>
          <p style="color: #cbd5e1; line-height: 1.6; font-size: 14px;">
            I am reviewing your technical requirements and will get back to you within <strong>24 hours</strong> with an architectural overview, milestones, and initial quote.
          </p>
          <p style="color: #94a3b8; font-size: 13px; margin-top: 24px; border-top: 1px solid #1e293b; padding-top: 16px;">
            Best regards,<br>
            <strong style="color: #ffffff;">Guruvishnu Kajagar</strong><br>
            Frontend & Full-Stack Engineer · CandorWorks<br>
            <a href="https://github.com/guruvishnuk" style="color: #38bdf8; text-decoration: none;">github.com/guruvishnuk</a>
          </p>
        </div>
      `,
    });
  } catch (clientErr) {
    console.warn('Auto-reply to client failed:', clientErr);
  }

  return {
    success: true,
    inquiryId,
    messageId: info.messageId,
  };
}
