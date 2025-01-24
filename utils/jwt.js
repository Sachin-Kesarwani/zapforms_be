const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
// Define your secret key (use environment variables in production)
const JWT_SECRET = process.env.JWT_SECRET || "my_secret";
const JWT_EXPIRATION = process.env.JWT_EXPIRATION || "5d";
const saltRounds = process.env.encryptionSaltRound;

const jwtService = {
  /**
   * Signs a payload and generates a JWT
   * @param {Object} payload - The data to encode in the JWT
   * @param {String} expiresIn - Optional expiration time (defaults to 1h)
   * @returns {String} - The generated JWT
   */
  signToken: async (payload, expiresIn = JWT_EXPIRATION) => {
    try {
      return jwt.sign(payload, JWT_SECRET, { expiresIn });
    } catch (error) {
      console.error('Error signing token:', error);
      throw error;
    }
  },


  /**
   * Verifies and decodes a JWT
   * @param {String} token - The JWT to verify
   * @returns {Object} - The decoded payload if valid
   * @throws {Error} - If the token is invalid or expired
   */
  verifyToken: async (token) => {
    try {
        // Verify the token and decode the payload
        const decoded = jwt.verify(token, JWT_SECRET);
        return decoded
      } catch (error) {
        console.error('Error verifying token:', error);
        throw error;
      }
  
  },
};

module.exports = jwtService;
