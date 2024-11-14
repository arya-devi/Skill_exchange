const stripe = require("../config/stripeConfig");
const Skill = require('../models/Skill');
const Payment = require('../models/Payment');

// Handle payment session creation
exports.createCheckoutSession = async (req, res) => {
  const { skillId, userId } = req.body;

  try {
    // Fetch skill details for price
    const skill = await Skill.findById(skillId);
    if (!skill) return res.status(404).json({ message: "Skill not found" });

    // Create a Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: skill.name,
            },
            unit_amount: skill.price * 100, // Stripe uses cents
          },
          quantity: 1,
        },
      ],
      success_url: `${process.env.CLIENT_URL}/success?skillId=${skillId}`, // Redirects after payment
      cancel_url: `${process.env.CLIENT_URL}/cancel`,
    });
    res.status(200).json({ url: session.url });
  } catch (error) {
    console.error("Error creating Stripe session:", error);
    res.status(500).json({ error: "Payment session creation failed" });
  }
};

// Record successful payment
exports.savePaymentRecord = async (req, res) => {
  const { skillId, userId } = req.body;
  try {
    const payment = new Payment({ skillId, userId, status: "paid" });
    await payment.save();

    await Skill.findByIdAndUpdate(skillId, {
      $addToSet: { paidUsers: userId }
    });

    res.status(200).json({ message: "Payment recorded successfully" });
  } catch (error) {
    console.error("Error saving payment record:", error);
    res.status(500).json({ error: "Could not save payment record" });
  }
};