const nodeMailer = require('nodemailer');

const sendEmail = async (options) => {

    try{
         if(!process.env.EMAIL_USERNAME || !process.env.EMAIL_PASSWORD) {
        throw new Error('Email credentials are not set in environment variables');
    }

    const transporter = nodeMailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD
        }
    });
    const mailOptions = {
        from: process.env.EMAIL_USERNAME,
        to: options.to,
        subject: options.subject,
        text: options.text,
        html: options.html
    };
    await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${options.to}`);
    }

   
    catch(error) {
        console.error(`Failed to send email: ${error.message}`);
        throw error;
    }
};

module.exports = sendEmail;