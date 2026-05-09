import { Resend } from 'resend';

const sendEmail = async (options) => {
    // Initializing inside the function ensures the API Key is available in process.env
    const resend = new Resend(process.env.RESEND_API_KEY);

    try {
        const { data, error } = await resend.emails.send({
            from: `MailGen AI <${process.env.EMAIL_FROM}>`,
            to: options.to,
            subject: options.subject,
            html: options.html,
        });

        if (error) throw error;
        return data;
    } catch (error) {
        console.error("Resend Error:", error);
        throw error;
    }
};

export default sendEmail;