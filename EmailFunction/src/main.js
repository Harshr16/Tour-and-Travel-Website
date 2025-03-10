const nodemailer = require("nodemailer");

module.exports = async function (context) {
    try {
        // Log the received request body
        context.log("Received request body:", context.req.body);

        // Ensure payload exists and is not empty
        if (!context.req.body) {
            context.error("Error: Missing request payload");
            return { success: false, error: "Missing request payload" };
        }

        let parsedPayload;
        try {
            parsedPayload = typeof context.req.body === "string" ? JSON.parse(context.req.body) : context.req.body;
        } catch (jsonError) {
            context.error("Error parsing JSON:", jsonError);
            return { success: false, error: "Invalid JSON format in request body" };
        }

        // Extract data with correct field names
        const { email, name, reason, hotel, check_in, check_out } = parsedPayload;

        // Validate required fields
        if (!email || !name || !reason || !hotel || !check_in || !check_out) {
            context.error("Error: Missing required fields in request body");
            return { success: false, error: "Missing required fields: email, name, reason, hotel, check_in, check_out" };
        }

        // SMTP Configuration
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: 587,
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD
            }
        });

        // Email Content
        const mailOptions = {
            from: process.env.SMTP_USER,
            to: email,
            subject: "Booking Cancellation Notice",
            text: `Dear ${name},\n\nWe regret to inform you that your booking at ${hotel} from ${check_in} to ${check_out} has been canceled.\nReason: ${reason}.\n\nIf you have any questions, please contact our support team.\n\nBest regards,\nYour Hotel Team`
        };

        // Send Email
        const info = await transporter.sendMail(mailOptions);
        context.log("Email sent successfully! Message ID:", info.messageId);

        return { success: true, message: "Email sent successfully!", messageId: info.messageId };
    } catch (error) {
        context.error("Error sending email:", error);
        return { success: false, error: error.message };
    }
};
