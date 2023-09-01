import * as React from "react";

interface EmailTemplateProps {
  title: string;
  description: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  title, description
}) => (
    <html>
    <head>
      <title>New Support Ticket Created</title>
    </head>
    <body>
        <img src="https://sentinel-tms.vercel.app/logo-large.png" style={{height: '60px'}} alt="" />
      <h1>New Support Ticket Created</h1>
      <p>
        We have received your support ticket with the following details:
      </p>
      <ul>
        <li>Issue Subject: {title}</li>
        <li>Issue Description: {description}</li>
     </ul>
      <p>
        Our support team will review your ticket and get back to you as soon
        as possible. Thank you for reaching out to us.
      </p>
      <p>Best regards,</p>
      <p>IT Team Team</p>
    </body>
  </html>
);

export default EmailTemplate;