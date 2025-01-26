const { Resend } = require("resend")

const resend = new Resend(process.env.RESEND_API_KEY)

const sendPasswordResetEmail = async (email, resetToken) => {
  const resetUrl = `http://localhost:3000/reset-password/${resetToken}`

  const { data, error } = await resend.emails.send({
    from: "Saylani Microfinance <noreply@yourdomain.com>",
    to: email,
    subject: "Reset Your Password",
    html: `
      <h1>Reset Your Password</h1>
      <p>You are receiving this email because you (or someone else) has requested the reset of the password for your account.</p>
      <p>Please click on the following link, or paste this into your browser to complete the process:</p>
      <a href="${resetUrl}">${resetUrl}</a>
      <p>If you did not request this, please ignore this email and your password will remain unchanged.</p>
    `,
  })

  if (error) {
    console.error("Error sending email:", error)
    throw new Error("Failed to send password reset email")
  }

  return data
}

module.exports = { sendPasswordResetEmail }

