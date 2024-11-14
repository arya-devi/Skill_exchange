const express = require("express");
const router = express.Router();
const { createCheckoutSession, savePaymentRecord } = require("../controllers/paymentController");
const authMiddleware = require('../middleware/authMiddleware');

// POST route for creating a Stripe checkout session
router.post("/create-checkout-session", authMiddleware,createCheckoutSession);
router.post("/success", savePaymentRecord);

module.exports = router;
