const Stripe = require("stripe");
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY); // Place your Stripe secret key in an env variable

module.exports = stripe;
