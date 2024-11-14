const jwt = require("jsonwebtoken");

// for verifying token for protected route

const verifyToken = (req, res, next) => {
  console.log(req.headers);

  const token = req.headers?.authorization?.split(" ")[1];
console.log(token);

  if (!token) {
    return res.status(401).json({ message: "Unauthorized - Missing token" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.log(err);
      
      return res.status(401).json({ message: "Unauthorized - Invalid token" });
    }

    req.userId = decoded.userId;
    next();
  });
};
module.exports = verifyToken;
