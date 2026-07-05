export default function resetPasswordTemplate(resetLink) {
  return `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto">
      <h2>Reset Your Password</h2>

      <p>
        We received a request to reset your GTR Classes password.
      </p>

      <p>
        Click the button below to reset your password.
      </p>

      <a
        href="${resetLink}"
        style="
          display:inline-block;
          background:#2563eb;
          color:#fff;
          padding:12px 24px;
          text-decoration:none;
          border-radius:8px;
          margin-top:20px;
        "
      >
        Reset Password
      </a>

      <p style="margin-top:30px;">
        This link will expire in <strong>1 minutes</strong>.
      </p>

      <p>
        If you didn't request this, you can safely ignore this email.
      </p>

      <hr>

      <p style="font-size:13px;color:#666">
        GTR Classes
      </p>
    </div>
  `;
}