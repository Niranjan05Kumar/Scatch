const bcrypt = require("bcrypt");

const hashPassword = (password) => {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        return reject(new Error("Error generating salt"));
      }
      bcrypt.hash(password, salt, (err, hash) => {
        if (err) {
          return reject(new Error("Error hashing password"));
        }
        resolve(hash);
      });
    });
  });
};

const comparePassword = (password, hash) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, hash, (err, result) => {
      if (err) {
        return reject(new Error("Error comparing password"));
      }
      resolve(result);
    });
  });
};

module.exports = {
  hashPassword,
  comparePassword,
};
