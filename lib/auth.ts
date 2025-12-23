import { betterAuth } from "better-auth"
import { prismaAdapter } from "better-auth/adapters/prisma"
import { magicLink } from "better-auth/plugins"
import { prisma } from "@/lib/prisma"
import nodemailer from "nodemailer"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

// Gmail SMTP transporter (Primary)
const gmailTransporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
})

// Email sending function with fallback
async function sendVerificationEmail(email: string, url: string) {
  const emailHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
          }
          .container {
            background: #ffffff;
            border-radius: 8px;
            padding: 40px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          }
          .header {
            text-align: center;
            margin-bottom: 30px;
          }
          .logo {
            font-size: 24px;
            font-weight: bold;
            color: #52c2cb;
          }
          h1 {
            color: #1a1a1a;
            font-size: 24px;
            margin-bottom: 20px;
          }
          p {
            color: #666;
            margin-bottom: 20px;
          }
          .button {
            display: inline-block;
            padding: 14px 32px;
            background: #52c2cb;
            color: #ffffff !important;
            text-decoration: none;
            border-radius: 6px;
            font-weight: 600;
            margin: 20px 0;
          }
          .button:hover {
            background: #3fa9b3;
          }
          .footer {
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #eee;
            font-size: 12px;
            color: #999;
            text-align: center;
          }
          .link {
            color: #52c2cb;
            word-break: break-all;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo">AIRC Portal</div>
          </div>

          <h1>Sign in to your account</h1>

          <p>Click the button below to sign in to your AIRC Portal account. This link will expire in 24 hours.</p>

          <div style="text-align: center;">
            <a href="${url}" class="button">Sign In</a>
          </div>

          <p style="margin-top: 30px;">Or copy and paste this link into your browser:</p>
          <p class="link">${url}</p>

          <div class="footer">
            <p>If you didn't request this email, you can safely ignore it.</p>
            <p>&copy; ${new Date().getFullYear()} AI Research Center. All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>
  `

  try {
    // Try Gmail SMTP first
    console.log("Attempting to send email via Gmail SMTP...")
    await gmailTransporter.sendMail({
      from: process.env.GMAIL_USER,
      to: email,
      subject: "Sign in to AIRC Portal",
      html: emailHtml,
    })
    console.log("✅ Email sent successfully via Gmail SMTP")
  } catch (gmailError) {
    console.error("❌ Gmail SMTP failed:", gmailError)
    console.log("🔄 Falling back to Resend...")

    try {
      // Fallback to Resend
      await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev",
        to: email,
        subject: "Sign in to AIRC Portal",
        html: emailHtml,
      })
      console.log("✅ Email sent successfully via Resend (fallback)")
    } catch (resendError) {
      console.error("❌ Resend also failed:", resendError)
      throw new Error("Failed to send verification email via both Gmail and Resend")
    }
  }
}

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: false, // Disabled password login
    autoSignIn: false,
  },
  session: {
    expiresIn: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // Update every 24 hours
  },
  baseURL: process.env.NEXTAUTH_URL || "http://localhost:3000",
  trustedOrigins: [
    process.env.NEXTAUTH_URL || "http://localhost:3000",
  ],
  user: {
    additionalFields: {
      departmentId: {
        type: "string",
        required: false,
        input: false,
      },
    },
  },
  rateLimit: {
    enabled: true,
    window: 60, // 1 minute
    max: 100, // global max
    customRules: {
      "/magic-link/send": {
        window: 60,
        max: 10,
      },
      "/sign-in/magic-link": {
        window: 60,
        max: 10,
      },
      "/verify-email": {
        window: 60,
        max: 10,
      }
    }
  },
  plugins: [
    magicLink({
      expiresIn: 300, // 5 minutes
      sendMagicLink: async ({ email, url }: { email: string; url: string }) => {
        await sendVerificationEmail(email, url)
      },
    }),
  ],
})

export type Session = typeof auth.$Infer.Session
