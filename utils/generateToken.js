const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  const token = jwt.sign(
    { userId: user._id, email: user.email },
    process.env.JWT_KEY
  );
  return token;
};

module.exports.generateToken = generateToken;
