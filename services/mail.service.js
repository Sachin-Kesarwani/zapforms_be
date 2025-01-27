require("dotenv").config();
let nodemailer = require("nodemailer");

// Function to generate a 6-digit OTP
function generateOtp() {
    return Math.floor(100000 + Math.random() * 900000).toString(); // Ensures a 6-digit OTP
}

// Function to send OTP email with a "Copy OTP" button
function sendOtpEmail(name = "User", email , existingotp="") {
    const otp =existingotp || generateOtp(); // Generate a 6-digit OTP

    const config = {
        service: "gmail",
        auth: {
            user: process.env.email,
            pass: process.env.pass,
        },
    };

    const transporter = nodemailer.createTransport(config);

    // HTML email with OTP and "Copy OTP" button
    const mailContent = `
    <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px; border: 1px solid #ddd; border-radius: 8px; max-width: 500px; margin: 0 auto; background-color: #f9f9f9;">
            <img src="${process.env.logo_url}" alt="Logo" style="width: 150px; margin-bottom: 20px;" />
        <h2 style="color: #333;">Hello, ${name}</h2>
        <p style="font-size: 16px; color: #555;">Your OTP for seamless form creation is:</p>
        <div style="font-size: 24px; font-weight: bold; margin: 10px 0; color:#5555e6;">${otp}</div>
        <p style="font-size: 14px; color:#5555e6; margin: 15px 0;">
            Use this OTP to access our platform and start creating forms effortlessly. Experience a faster and smarter way to build forms tailored to your needs.
        </p>
        <a href="${process.env.frontend_url}?email=${email}&otp=${otp}" 
           style="display: inline-block; background-color:#5555e6; color: white; padding: 10px 20px; font-size: 16px; text-decoration: none; border-radius: 5px; margin-top: 20px;">
           Verify & Start Creating Forms
        </a>
        <p style="margin-top: 20px; font-size: 14px; color: #999;">If you did not request this OTP, please ignore this email.</p>
    </div>
`;
    const message = {
        from: process.env.EMAIL,
        to: email,
        subject: "Your OTP for Verification",
        html: mailContent,
    };

    transporter.sendMail(message)
        .then(() => {
            console.log("OTP sent successfully!");
        })
        .catch((error) => {
            console.error("Error sending email:", error);
        });

    return otp; // Return OTP in case you need to log or verify it
}

module.exports = { sendOtpEmail };
