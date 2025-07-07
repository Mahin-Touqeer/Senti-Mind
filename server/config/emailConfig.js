//ljpz lytu gnri ssir
// services/emailService.js
const nodemailer = require("nodemailer");

const createTransporter = () => {
  return nodemailer.createTransport({
    // service: "gmail",
    host: "smtp.zoho.in",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_APP_PASSWORD,
    },
  });
};

const sendVerificationEmail = (email, emailToken) => {
  const transporter = createTransporter();

  const mailOptions = {
    from: '"Senti Mind" <support@sentimind.in>',
    to: email,
    subject: "Please verify your email address",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Email Verification</h2>
        <p>Hello! Please verify your email address by clicking the link below:</p>
        <a href="https://senti-mind.onrender.com/auth/verify-email?token=${emailToken}"
           style="background-color: #CB6CE6; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
          Verify Email Address
        </a>
        <p>If you didn't create an account, please ignore this email.</p>
        <p>This link will expire in 24 hours.</p>
      </div>
    `,
  };

  return transporter.sendMail(mailOptions);
};

const sendSubscriptionStartEmail = (email, username, plan) => {
  const transporter = createTransporter();

  const mailOptions = {
    from: `Senti Mind`,
    to: email,
    subject: "Your Subscription Has Started!",
    html: `
    <div style="background: linear-gradient(135deg, #141A4B 0%, #2D1A4D 100%); padding: 0; min-height: 100vh; font-family: 'Segoe UI', Arial, sans-serif;">
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 480px; margin: 40px auto; background: #181A3B;  box-shadow: 0 8px 32px 0 rgba(80, 0, 120, 0.20); overflow: hidden;">
        <tr>
          <td style="padding: 32px 32px 16px 32px; text-align: center;">
            <img src="https://res.cloudinary.com/dqx3jfx7m/image/upload/c_crop,w_700,h_700,ar_1:1/v1750747703/Sentimind_Logo_inverted_fcmr4f.png" alt="Senti Mind Logo" style="height: 48px; margin-bottom: 16px;border-radius:50%;" />
            <h1 style="margin: 0; font-size: 2rem; font-weight: bold; background: linear-gradient(90deg, #8F37FF, #EC4899); color: transparent; -webkit-background-clip: text; background-clip: text;">
              Welcome to Senti Mind!
            </h1>
          </td>
        </tr>
        <tr>
          <td style="padding: 0 32px 24px 32px;">
            <p style="color: #C4B5FD; font-size: 1.1rem; margin-top: 0;">
              Hello <span style="color: #EC4899; font-weight: 500;">${
                username || "User"
              }</span>,
            </p>
            <p style="color: #E0E7FF; font-size: 1rem;">
              <strong>Your <span style="color: #8F37FF;">${plan}</span> subscription</strong> has started successfully.<br>
              Thank you for joining the Senti Mind community!
            </p>
            <div style="margin: 28px 0; text-align: center;">
              <span style="display: inline-block; background: linear-gradient(90deg, #8F37FF, #EC4899); color: #fff; padding: 12px 32px; border-radius: 999px; font-weight: 600; font-size: 1rem; letter-spacing: 1px; box-shadow: 0 2px 8px 0 #8F37FF44;">
                ${plan} Plan Activated
              </span>
            </div>
            <p style="color: #BDBDBD; font-size: 0.97rem;">
              If you have any questions or need help, simply reply to this email or contact our support team anytime.
            </p>
          </td>
        </tr>
        <tr>
          <td style="padding: 0 32px 32px 32px;">
            <div style="border-top: 1px solid #312E81; margin: 24px 0 16px 0;"></div>
            <p style="color: #7C3AED; font-size: 0.95rem; text-align: center; margin: 0;">
              Best regards,<br>
              <span style="color: #EC4899; font-weight: 500;">The Senti Mind Team</span>
            </p>
            <div style="text-align: center; margin-top: 16px;">
              <a href="https://sentimind.in" style="color: #8F37FF; text-decoration: none; font-size: 0.95rem;">Visit Now</a>
            </div>
          </td>
        </tr>
      </table>
      <div style="text-align: center; color: #7C3AED; font-size: 0.85rem; margin-top: 18px;">
        &copy; ${new Date().getFullYear()} Senti Mind. All rights reserved.
      </div>
    </div>
    `,
    text: `Hello ${
      username || "User"
    },\n\nYour subscription (${plan}) has started successfully. Thank you for subscribing!\n\nIf you have any questions, reply to this email.\n\nBest regards,\nThe Senti Mind Team`,
  };

  return transporter.sendMail(mailOptions);
};

module.exports = { sendVerificationEmail, sendSubscriptionStartEmail };
