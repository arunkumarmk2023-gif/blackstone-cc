import nodemailer from 'nodemailer';

/**
 * Email service for sending confirmation emails
 * Uses Nodemailer with Gmail SMTP by default
 */

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

let transporter: nodemailer.Transporter | null = null;

/**
 * Initialize email transporter
 * Supports Gmail SMTP and other email services
 */
function initializeTransporter() {
  if (transporter) return transporter;

  const emailService = process.env.EMAIL_SERVICE || 'gmail';
  const emailUser = process.env.EMAIL_USER;
  const emailPassword = process.env.EMAIL_PASSWORD;

  if (!emailUser || !emailPassword) {
    console.warn(
      'Email credentials not configured. Contact form emails will not be sent. ' +
      'Set EMAIL_USER and EMAIL_PASSWORD environment variables to enable email sending.'
    );
    return null;
  }

  if (emailService === 'gmail') {
    transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: emailUser,
        pass: emailPassword,
      },
    });
  } else {
    // Support for other SMTP services
    const emailHost = process.env.EMAIL_HOST || 'smtp.gmail.com';
    const emailPort = parseInt(process.env.EMAIL_PORT || '587', 10);
    const emailSecure = process.env.EMAIL_SECURE === 'true';

    transporter = nodemailer.createTransport({
      host: emailHost,
      port: emailPort,
      secure: emailSecure,
      auth: {
        user: emailUser,
        pass: emailPassword,
      },
    });
  }

  return transporter;
}

/**
 * Send an email
 */
export async function sendEmail(options: EmailOptions): Promise<boolean> {
  try {
    const emailTransporter = initializeTransporter();

    if (!emailTransporter) {
      console.warn('Email transporter not initialized. Email not sent.');
      return false;
    }

    const emailFrom = process.env.EMAIL_FROM || process.env.EMAIL_USER || 'noreply@blackstonecricketclub.com';

    await emailTransporter.sendMail({
      from: emailFrom,
      to: options.to,
      subject: options.subject,
      html: options.html,
      text: options.text,
    });

    console.log(`Email sent successfully to ${options.to}`);
    return true;
  } catch (error) {
    console.error('Failed to send email:', error);
    return false;
  }
}

/**
 * Generate HTML template for contact form confirmation email
 */
export function generateContactConfirmationEmail(data: {
  name: string;
  email: string;
  subject: string;
  message: string;
}): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body {
            font-family: 'Outfit', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #f5f5f5;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 40px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }
          .header {
            border-bottom: 3px solid #d4af37;
            padding-bottom: 20px;
            margin-bottom: 30px;
          }
          .header h1 {
            color: #1a1410;
            margin: 0;
            font-size: 28px;
          }
          .content {
            margin-bottom: 30px;
          }
          .content p {
            margin: 10px 0;
          }
          .section {
            background-color: #f9f9f9;
            padding: 15px;
            border-left: 4px solid #d4af37;
            margin: 20px 0;
          }
          .section-title {
            color: #d4af37;
            font-weight: bold;
            margin-bottom: 10px;
          }
          .footer {
            border-top: 1px solid #e0e0e0;
            padding-top: 20px;
            margin-top: 30px;
            font-size: 12px;
            color: #666;
            text-align: center;
          }
          .cta-button {
            display: inline-block;
            background-color: #d4af37;
            color: #1a1410;
            padding: 12px 24px;
            text-decoration: none;
            border-radius: 4px;
            font-weight: bold;
            margin-top: 15px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Blackstone Cricket Club</h1>
            <p style="color: #666; margin: 5px 0;">Message Received</p>
          </div>

          <div class="content">
            <p>Hello <strong>${data.name}</strong>,</p>
            
            <p>Thank you for reaching out to Blackstone Cricket Club! We have received your message and appreciate your interest.</p>
            
            <p>We will review your inquiry and get back to you as soon as possible. Our team typically responds within 24-48 hours.</p>

            <div class="section">
              <div class="section-title">Your Message Summary</div>
              <p><strong>Subject:</strong> ${data.subject}</p>
              <p><strong>Email:</strong> ${data.email}</p>
              <p><strong>Message:</strong></p>
              <p>${data.message.replace(/\n/g, '<br>')}</p>
            </div>

            <p>If you have any additional questions or information to add, feel free to reply to this email or visit our website.</p>
          </div>

          <div class="footer">
            <p>© 2026 Blackstone Cricket Club. All rights reserved.</p>
            <p>Connecticut Cricket League | Hard Tennis Ball Division</p>
            <p>
              <a href="https://www.facebook.com/profile.php?id=61571168053666" style="color: #d4af37; text-decoration: none; margin: 0 10px;">Facebook</a>
              <a href="https://www.instagram.com/blackstone_cricket_club/" style="color: #d4af37; text-decoration: none; margin: 0 10px;">Instagram</a>
              <a href="https://www.threads.com/@blackstone_cricket_club" style="color: #d4af37; text-decoration: none; margin: 0 10px;">Threads</a>
            </p>
          </div>
        </div>
      </body>
    </html>
  `;
}

/**
 * Generate plain text version of confirmation email
 */
export function generateContactConfirmationEmailText(data: {
  name: string;
  email: string;
  subject: string;
  message: string;
}): string {
  return `
Hello ${data.name},

Thank you for reaching out to Blackstone Cricket Club! We have received your message and appreciate your interest.

We will review your inquiry and get back to you as soon as possible. Our team typically responds within 24-48 hours.

--- YOUR MESSAGE SUMMARY ---
Subject: ${data.subject}
Email: ${data.email}
Message:
${data.message}

If you have any additional questions or information to add, feel free to reply to this email or visit our website.

© 2026 Blackstone Cricket Club. All rights reserved.
Connecticut Cricket League | Hard Tennis Ball Division
  `.trim();
}

/**
 * Generate HTML template for join club confirmation email
 */
export function generateJoinConfirmationEmail(data: {
  name: string;
  email: string;
  role: string;
  experience: string;
  message: string;
}): string {
  const roleLabels: Record<string, string> = {
    batsman: 'Batsman',
    bowler: 'Bowler',
    allrounder: 'All-Rounder',
    wicketkeeper: 'Wicketkeeper',
    supporter: 'Supporter',
  };
  const experienceLabels: Record<string, string> = {
    beginner: 'Beginner',
    intermediate: 'Intermediate',
    advanced: 'Advanced',
  };

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body {
            font-family: 'Outfit', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #f5f5f5;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 40px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }
          .header {
            border-bottom: 3px solid #d4af37;
            padding-bottom: 20px;
            margin-bottom: 30px;
          }
          .header h1 {
            color: #1a1410;
            margin: 0;
            font-size: 28px;
          }
          .content {
            margin-bottom: 30px;
          }
          .content p {
            margin: 10px 0;
          }
          .section {
            background-color: #f9f9f9;
            padding: 15px;
            border-left: 4px solid #d4af37;
            margin: 20px 0;
          }
          .section-title {
            color: #d4af37;
            font-weight: bold;
            margin-bottom: 10px;
          }
          .footer {
            border-top: 1px solid #e0e0e0;
            padding-top: 20px;
            margin-top: 30px;
            font-size: 12px;
            color: #666;
            text-align: center;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Blackstone Cricket Club</h1>
            <p style="color: #666; margin: 5px 0;">Application Received</p>
          </div>

          <div class="content">
            <p>Hello <strong>${data.name}</strong>,</p>
            
            <p>Thank you for your interest in joining Blackstone Cricket Club! We have received your application and are excited to hear from you.</p>
            
            <p>Our team will review your application and reach out to you about upcoming trials and training sessions. We typically respond within a few days.</p>

            <div class="section">
              <div class="section-title">Your Application Summary</div>
              <p><strong>Playing Role:</strong> ${roleLabels[data.role] || data.role}</p>
              <p><strong>Experience Level:</strong> ${experienceLabels[data.experience] || data.experience}</p>
              <p><strong>About You:</strong></p>
              <p>${data.message.replace(/\n/g, '<br>')}</p>
            </div>

            <p>In the meantime, follow us on social media to stay updated on club activities and upcoming events!</p>
          </div>

          <div class="footer">
            <p>© 2026 Blackstone Cricket Club. All rights reserved.</p>
            <p>Connecticut Cricket League | Hard Tennis Ball Division</p>
            <p>
              <a href="https://www.facebook.com/profile.php?id=61571168053666" style="color: #d4af37; text-decoration: none; margin: 0 10px;">Facebook</a>
              <a href="https://www.instagram.com/blackstone_cricket_club/" style="color: #d4af37; text-decoration: none; margin: 0 10px;">Instagram</a>
              <a href="https://www.threads.com/@blackstone_cricket_club" style="color: #d4af37; text-decoration: none; margin: 0 10px;">Threads</a>
            </p>
          </div>
        </div>
      </body>
    </html>
  `;
}

/**
 * Generate plain text version of join confirmation email
 */
export function generateJoinConfirmationEmailText(data: {
  name: string;
  email: string;
  role: string;
  experience: string;
  message: string;
}): string {
  return `
Hello ${data.name},

Thank you for your interest in joining Blackstone Cricket Club! We have received your application and are excited to hear from you.

Our team will review your application and reach out to you about upcoming trials and training sessions.

--- YOUR APPLICATION SUMMARY ---
Playing Role: ${data.role}
Experience Level: ${data.experience}
About You:
${data.message}

In the meantime, follow us on social media to stay updated on club activities and upcoming events!

© 2026 Blackstone Cricket Club. All rights reserved.
Connecticut Cricket League | Hard Tennis Ball Division
  `.trim();
}

/**
 * Generate HTML template for fixture reminder email
 */
export function generateFixtureReminderEmail(
  playerName: string,
  opponent: string,
  date: Date,
  venue: string,
  format: string
): string {
  const estTime = date.toLocaleString("en-US", {
    timeZone: "America/New_York",
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <style>
          body { font-family: 'Outfit', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.6; color: #333; background-color: #f5f5f5; }
          .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 40px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); }
          .header { background-color: #1a1410; color: #fff; padding: 20px; border-radius: 5px; text-align: center; margin-bottom: 30px; }
          .header h1 { margin: 0; font-size: 24px; }
          .content { margin-bottom: 30px; }
          .content p { margin: 10px 0; }
          .fixture-details { background-color: #f9f9f9; padding: 15px; border-left: 4px solid #d4af37; margin: 20px 0; }
          .detail-row { margin: 10px 0; }
          .label { font-weight: bold; color: #1a1410; }
          .footer { border-top: 1px solid #e0e0e0; padding-top: 20px; margin-top: 30px; font-size: 12px; color: #666; text-align: center; }
          .social-links { margin-top: 15px; }
          .social-links a { color: #d4af37; text-decoration: none; margin: 0 10px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Blackstone Cricket Club</h1>
            <p style="margin: 5px 0; font-size: 16px;">Match Reminder</p>
          </div>
          
          <div class="content">
            <p>Hi ${playerName},</p>
            
            <p>This is a friendly reminder that Blackstone CC has an upcoming match <strong>tomorrow</strong>!</p>
            
            <div class="fixture-details">
              <div class="detail-row">
                <span class="label">Opponent:</span> ${opponent}
              </div>
              <div class="detail-row">
                <span class="label">Date & Time (EST):</span> ${estTime}
              </div>
              <div class="detail-row">
                <span class="label">Venue:</span> ${venue}
              </div>
              <div class="detail-row">
                <span class="label">Format:</span> ${format}
              </div>
            </div>
            
            <p>Please make sure you're ready and arrive on time. If you have any questions or concerns, feel free to reach out to the team captain.</p>
            
            <p>Let's play well and represent Blackstone CC with pride!</p>
            
            <p>Best regards,<br><strong>Blackstone Cricket Club</strong></p>
          </div>
          
          <div class="footer">
            <p>Copyright 2026 Blackstone Cricket Club. All rights reserved.</p>
            <p>Connecticut Cricket League | Hard Tennis Ball Division</p>
            <div class="social-links">
              <a href="https://www.facebook.com/profile.php?id=61571168053666">Facebook</a>
              <a href="https://www.instagram.com/blackstone_cricket_club/">Instagram</a>
              <a href="https://www.threads.com/@blackstone_cricket_club">Threads</a>
            </div>
          </div>
        </div>
      </body>
    </html>
  `;
}
