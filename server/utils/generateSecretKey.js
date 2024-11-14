const crypto = require('crypto');

// Function to generate a random secret key
const generateSecretKey = () => {
  return crypto.randomBytes(32).toString('hex');
};

// Export the function using CommonJS syntax
module.exports = {generateSecretKey};
