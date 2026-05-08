const { Resend } = require('resend');
const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async (options) => {
    try {
        // console.log("--- DEBUG: SENDING EMAIL NOW ---");
        // console.log("To:", options.to);
        // console.log("Subject:", options.subject);
        // // This log will tell us if the HTML is actually reaching the service
        // console.log("Has HTML content:", !!options.html); 

        const response = await resend.emails.send({
            from: `MailGen AI <${process.env.EMAIL_FROM}>`,
            to: options.to,
            subject: options.subject,
            text: options.text || "Your OTP is " + options.otp,
            html: options.html // <--- THIS MUST BE HERE
        });

        return response;
    } catch (error) {
        console.error("Resend execution error:", error);
        throw error;
    }
};

module.exports = sendEmail;