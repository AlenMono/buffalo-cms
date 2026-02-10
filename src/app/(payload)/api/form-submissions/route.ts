import { NextRequest } from 'next/server'
import { Resend } from 'resend'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { submissionData } = body

    let submitterEmail = ''

    console.log('Final parsed Reply-To address:', submitterEmail || 'MISSING')

    const resendClient = new Resend(process.env.RESEND_API_KEY || '')
    // const adminEmail = process.env.ADMIN_EMAIL || 'tchristy@buffalocatholiccemeteries.org'
    const adminEmail = process.env.ADMIN_EMAIL || 'alen.rajher@gmail.com'
    const fromEmail = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev'

    const fieldLabels: Record<string, string> = {
      fullname: 'Full Name',
      email: 'Email Address',
    }

    const formattedDataHtml = Array.isArray(submissionData)
      ? submissionData
          .map((item: any) => {
            const rawLabel = item.field || 'Field'
            const label =
              fieldLabels[rawLabel.toLowerCase()] ||
              rawLabel.charAt(0).toUpperCase() + rawLabel.slice(1)

            const value = item.value || 'N/A'

            if (rawLabel.toLowerCase().includes('email')) {
              submitterEmail = value
            }

            return `
            <div style="margin-bottom: 12px; border-bottom: 1px solid #f0f0f0; padding-bottom: 8px;">
                <strong style="color: #000;">${label}:</strong> ${value}
            </div>`
          })
          .join('')
      : ''

    const replySubject = 'Re: BCC Website - New Submission'
    const mailtoHref = `mailto:${submitterEmail || adminEmail}?subject=${encodeURIComponent(replySubject)}`

    const html = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
  </head>
  <body style="background-color: #ffffff; padding: 40px 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
    <div style="max-width: 600px; margin: 0 auto; border: 1px solid #eaeaea; border-radius: 8px; padding: 40px; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
      
      <div style="margin-bottom: 32px;">
        <svg height="32" viewBox="0 0 75 65" fill="#000"><path d="M37.59.25l36.95 64H.64l36.95-64z"></path></svg>
      </div>

      <h1 style="color: #000; font-size: 24px; font-weight: 600; letter-spacing: -0.02em; margin-bottom: 16px;">
        BCC Website - New Submission
      </h1>
      
      <p style="color: #666; font-size: 14px; margin-bottom: 32px;">
        A new message has been received from your website contact form.
      </p>

      <div style="background: #fafafa; border: 1px solid #eaeaea; border-radius: 5px; padding: 24px; margin-bottom: 32px;">
        <div style="color: #444; font-size: 14px; line-height: 24px;">
          ${formattedDataHtml}
        </div>
      </div>

      <a href="${mailtoHref}" 
        style="background-color: #000; border-radius: 5px; color: #fff; font-size: 14px; font-weight: 500; text-decoration: none; padding: 12px 30px; display: inline-block;">
        Reply Directly
      </a>

      <hr style="border: none; border-top: 1px solid #eaeaea; margin: 40px 0 20px;" />
      
      <p style="color: #888; font-size: 12px; line-height: 18px;">
        This email was sent from your Buffalo Catholic Cemeteries website. <br />
        <strong>Submitter Email:</strong> ${submitterEmail || 'Not provided'}
      </p>
    </div>
  </body>
</html>
`

    const { error } = await resendClient.emails.send({
      from: fromEmail,
      to: adminEmail,
      replyTo: submitterEmail || adminEmail,
      subject: `BCC Website - New Submission`,
      html,
    })

    if (error) {
      console.error('Resend Error:', error)
    }

    return Response.json({ success: true })
  } catch (error) {
    console.error('Error:', error)
    return Response.json({ error: 'Failed' }, { status: 500 })
  }
}
