export default function verificationOtpTemplate(name, otp) {
  return `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8" />
<title>Email Verification</title>
</head>

<body style="margin:0;padding:0;background:#f3f4f6;font-family:Arial,sans-serif;">

<table width="100%" cellpadding="0" cellspacing="0">
<tr>
<td align="center" style="padding:40px 20px;">

<table
width="600"
cellpadding="0"
cellspacing="0"
style="background:#ffffff;border-radius:12px;overflow:hidden;"
>

<tr>
<td
style="
background:#2563eb;
padding:24px;
text-align:center;
color:#fff;
font-size:28px;
font-weight:bold;
"
>
GTR Classes
</td>
</tr>

<tr>
<td style="padding:40px;">

<h2 style="margin-top:0;">
Verify Your Email
</h2>

<p>
Hi <strong>${name}</strong>,
</p>

<p>
Welcome to GTR Classes.
Please verify your email using the OTP below.
</p>

<div
style="
margin:35px 0;
text-align:center;
"
>

<div
style="
display:inline-block;
padding:16px 32px;
border-radius:12px;
background:#eff6ff;
font-size:34px;
font-weight:bold;
letter-spacing:10px;
color:#2563eb;
"
>
${otp}
</div>

</div>

<p>
This OTP is valid for
<strong>10 minutes</strong>.
</p>

<p>
If you didn't create an account,
please ignore this email.
</p>

<br>

<p>
Regards,<br>
<b>Team GTR Classes</b>
</p>

</td>
</tr>

</table>

</td>
</tr>
</table>

</body>
</html>
`;
}