import { NextRequest } from 'next/server'
import { getPayload } from 'payload'
import config from '@/payload.config'

export async function POST(request: NextRequest) {
  try {
    const payload = await getPayload({ config })
    const body = await request.json()
    const { form: formID, submissionData } = body

    console.log('Form submission received:', { formID, submissionData })

    // Create the form submission
    const submission = await payload.create({
      collection: 'form-submissions',
      data: {
        form: formID,
        submissionData,
      },
    })

    console.log('Form submission created:', submission.id)

    // Send emails
    try {
      const form = await payload.findByID({
        collection: 'forms',
        id: formID,
      })

      if (form) {
        console.log('Found form:', form.title)

        // Prepare submission data for email
        const fieldLabels: Record<string, string> = {
          fullname: 'Full Name',
          email: 'Email',
          phone: 'Phone',
          subject: 'Subject',
        }

        const formattedData = submissionData
          .map((item: any) => {
            const label = fieldLabels[item.field.toLowerCase()] || item.field
            return `${label}: ${item.value.toString()}`
          })
          .join('\n')

        // Find email field in submission data
        // const emailField = submissionData.find(
        //   (item: any) =>
        //     item.field.toLowerCase().includes('email') ||
        //     item.field.toLowerCase().includes('e-mail'),
        // )

        // Send confirmation email to submitter if email field exists and form has confirmation message
        // if (emailField && emailField.value && form.confirmationMessage) {
        //   console.log('Sending confirmation email to:', emailField.value)
        //   await payload.sendEmail({
        //     to: emailField.value,
        //     subject: `Thank you for your submission - ${form.title}`,
        //     html: form.confirmationMessage,
        //   })
        // }

        // Send email to admin
        const adminEmail = process.env.ADMIN_EMAIL || 'admin@buffalocatholiccemeteries.com'
        console.log('Sending admin email to:', adminEmail)

        await payload.sendEmail({
          to: adminEmail,
          subject: `New Form Submission: ${form.title}`,
          html: `
            <h2>New Form Submission</h2>
            <p><strong>Form:</strong> ${form.title}</p>
            <h3>Submission Details:</h3>
            <pre>${formattedData}</pre>
            <p><strong>Submitted at:</strong> ${new Date().toLocaleString()}</p>
          `,
        })

        console.log('Emails sent successfully')
      }
    } catch (emailError) {
      console.error('Error sending emails:', emailError)
      // Don't fail the submission if email fails
    }

    return Response.json({ success: true, submission })
  } catch (error) {
    console.error('Error processing form submission:', error)
    return Response.json({ error: 'Failed to process form submission' }, { status: 500 })
  }
}
