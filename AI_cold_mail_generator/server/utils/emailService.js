import { Resend } from 'resend';
const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async (options) => {
    try {
        const response = await resend.emails.send({
            from: `MailGen AI <${process.env.EMAIL_FROM}>`,
            to: options.to,
            subject: options.subject,
            text: options.text || "Your OTP is " + options.otp,
            html: options.html
        });

        return response;
    } catch (error) {
        console.error("Resend execution error:", error);
        throw error;
    }
};

export default sendEmail;