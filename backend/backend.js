const express = require("express");
const cors = require("cors");
require("dotenv").config();
const stripe = require("stripe")("sk_test_51QxR6LBuShXfah1VAY0Ov64Cus4boO8ul1xTSrilh1iE8wSEoGxVZ9PsHUP85fwnlKkSimDV2ttzzzoqg9jt0Z7l00F07G2hiZ");

const app = express();
const PORT = 8000;

// Middleware
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173" }));

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Checkout route
app.post("/checkout", async (req, res) => {
    try {
        if (!req.body.items || !Array.isArray(req.body.items)) {
            return res.status(400).json({ error: "Invalid request format" });
        }

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "payment",
            line_items: req.body.items.map(item => ({
                price_data: {
                    currency: "inr",
                    product_data: { name: item.name },
                    unit_amount: item.price * 100
                },
                quantity: item.quantity
            })),
            success_url: "http://localhost:5173/booking-success",
            cancel_url: "http://localhost:5173/hotel"
        });

        res.json({ url: session.url });
    } catch (error) {
        console.error("Error in /checkout:", error);
        res.status(500).json({ error: error.message });
    }
});

module.exports = app;
