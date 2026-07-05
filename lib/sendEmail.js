import transporter from "./mail";

export default async function sendEmail({
  to,
  subject,
  html,
}) {
  await transporter.sendMail({
    from: `"GTR Classes" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html,
  });
}