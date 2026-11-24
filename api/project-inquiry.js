import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  // CORS configuration
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
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
    } = body || {};

    if (!clientName || !clientEmail || !projectTitle || !projectDescription) {
      return res.status(400).json({
        error: 'Missing required fields: clientName, clientEmail, projectTitle, and projectDescription are required.',
      });
    }

    const host = process.env.SMTP_HOST || 'smtp.gmail.com';
    const port = Number(process.env.SMTP_PORT) || 587;
    const secure = process.env.SMTP_SECURE === 'true' || port === 465;
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    const toEmail = process.env.SMTP_TO || user || 'guruvishnuk.work@gmail.com';

    if (!user || !pass) {
      return res.status(500).json({
        error: 'SMTP credentials are not configured on the server.',
      });
    }

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: { user, pass },
    });

    const inquiryId = `INQ-${Math.floor(1000 + Math.random() * 9000)}`;

    const ownerSubject = `🚀 [Project Request] "${projectTitle}" from ${clientName} (${inquiryId})`;
    const ownerHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #0b0c10; color: #f5f5f7; margin: 0; padding: 20px; }
    .card { max-width: 600px; margin: 0 auto; background: #16181d; border: 1px solid #2a2e39; border-radius: 14px; overflow: hidden; }
    .header { background: linear-gradient(135deg, #1d4ed8 0%, #3b82f6 100%); padding: 26px; }
    .header h1 { margin: 0; font-size: 20px; color: #ffffff; }
    .header p { margin: 6px 0 0; color: #dbeafe; font-size: 13px; font-family: monospace; }
    .content { padding: 24px; }
    .badge { display: inline-block; padding: 5px 10px; border-radius: 6px; font-size: 11px; font-weight: 600; text-transform: uppercase; font-family: monospace; margin-right: 6px; margin-bottom: 6px; }
    .badge-type { background: rgba(59, 130, 246, 0.2); color: #93c5fd; }
    .badge-budget { background: rgba(16, 185, 129, 0.2); color: #6ee7b7; }
    .badge-timeline { background: rgba(245, 158, 11, 0.2); color: #fde68a; }
    .info-box { background: #1f232b; border: 1px solid #2d333f; border-radius: 8px; padding: 12px 16px; margin-bottom: 14px; font-size: 13px; line-height: 1.5; }
    .tag { display: inline-block; background: #282f3d; color: #e2e8f0; border-radius: 4px; padding: 3px 8px; font-size: 11px; margin: 2px; }
    .footer { padding: 14px 24px; background: #111317; text-align: center; font-size: 11px; color: #6b7280; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <h1>🚀 New Project Build Request</h1>
      <p>ID: ${inquiryId} · Received via SMTP Serverless Function</p>
    </div>
    <div class="content">
      <div>
        <span class="badge badge-type">${projectType}</span>
        <span class="badge badge-budget">Budget: ${budgetRange}</span>
        <span class="badge badge-timeline">Timeline: ${timeline}</span>
      </div>

      <div style="font-size: 11px; text-transform: uppercase; color: #9ca3af; font-weight: 700; margin: 16px 0 6px;">Project Goal / Title</div>
      <div class="info-box" style="font-size: 15px; font-weight: 600; color: #ffffff;">${projectTitle}</div>

      <div style="font-size: 11px; text-transform: uppercase; color: #9ca3af; font-weight: 700; margin: 16px 0 6px;">Client Information</div>
      <div class="info-box">
        <div><strong>Client Name:</strong> ${clientName}</div>
        <div><strong>Client Email:</strong> <a href="mailto:${clientEmail}" style="color: #60a5fa;">${clientEmail}</a></div>
        <div><strong>Company:</strong> ${company}</div>
      </div>

      ${features.length > 0 ? `
        <div style="font-size: 11px; text-transform: uppercase; color: #9ca3af; font-weight: 700; margin: 16px 0 6px;">Requested Features</div>
        <div class="info-box">${features.map(f => `<span class="tag">✓ ${f}</span>`).join(' ')}</div>
      ` : ''}

      <div style="font-size: 11px; text-transform: uppercase; color: #9ca3af; font-weight: 700; margin: 16px 0 6px;">Project Description</div>
      <div class="info-box" style="white-space: pre-wrap; color: #d1d5db;">${projectDescription}</div>
    </div>
    <div class="footer">
      Delivered via SMTP Gateway to ${toEmail}
    </div>
  </div>
</body>
</html>
    `;

    const info = await transporter.sendMail({
      from: `"${clientName} (via Portfolio)" <${user}>`,
      to: toEmail,
      replyTo: clientEmail,
      subject: ownerSubject,
      html: ownerHtml,
    });

    try {
      await transporter.sendMail({
        from: `"Guruvishnu Kajagar" <${user}>`,
        to: clientEmail,
        subject: `Project Inquiry Received: "${projectTitle}" (${inquiryId})`,
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, sans-serif; background: #0f172a; color: #f8fafc; padding: 24px; border-radius: 10px; max-width: 500px; margin: auto;">
            <h2 style="color: #38bdf8; margin-top: 0;">Hi ${clientName}! 👋</h2>
            <p style="color: #cbd5e1; line-height: 1.6;">
              Thank you for reaching out! I have received your project inquiry for <strong>${projectTitle}</strong> (<em>${projectType}</em>).
            </p>
            <p style="color: #cbd5e1; line-height: 1.6;">
              I will review your project details and respond within <strong>24 hours</strong> with next steps.
            </p>
            <p style="color: #94a3b8; font-size: 12px; margin-top: 20px;">
              Best regards,<br>
              <strong>Guruvishnu Kajagar</strong><br>
              Frontend & Full-Stack Engineer
            </p>
          </div>
        `,
      });
    } catch (e) {
      console.warn('Auto confirmation warning:', e);
    }

    return res.status(200).json({
      success: true,
      inquiryId,
      messageId: info.messageId,
    });
  } catch (error) {
    console.error('Serverless SMTP error:', error);
    return res.status(500).json({
      error: error.message || 'SMTP transmission failure',
    });
  }
}
