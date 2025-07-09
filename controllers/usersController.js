const userModel = require("../models/user-model");
const { generateToken } = require("../utils/generateToken");
const { hashPassword, comparePassword } = require("../utils/hashPassword");
const uploadProfile = require("../config/multer-profile");

module.exports.registerUser = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;

    if (!fullname || !email || !password) {
      req.flash("error", "All fields are required");
      return res.redirect("/");
    }

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      req.flash("error", "You are already registered with this email, please login");
      return res.redirect("/");
    }

    const hashedPassword = await hashPassword(password);

    const user = await userModel.create({
      fullname,
      email,
      password: hashedPassword,
    });

    const token = generateToken(user);
    res.cookie("token", token);
    res.redirect("/shop");
  } catch (err) {
    req.flash("error", err.message);
      return res.redirect("/");
  }
};


module.exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      req.flash("error", "All fields are required");
      return res.redirect("/");
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      req.flash("error", "User not found, please register");
      return res.redirect("/");
    }

    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      req.flash("error", "Invalid credentials");
      return res.redirect("/");
    }

    const token = generateToken(user);
    res.cookie("token", token);
    res.redirect("/shop");
  } catch (err) {
    req.flash("error", err.message);
    return res.redirect("/");
  }
};


module.exports.logoutUser = (req, res) => {
  try {
    res.clearCookie("token");
    res.redirect("/");
  } catch (err) {
    req.flash("error", err.message);
    return res.redirect("/");
  }
};


module.exports.updateProfile =  (req, res) => {
  uploadProfile.single('picture')(req, res, (err) => {
    if (err) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        req.flash('error', 'File size too large! Maximum size allowed is 10MB.');
      } else if (err.message.includes('Only image files')) {
        req.flash('error', 'Only image files (JPEG, JPG, PNG, WEBP, GIF) are allowed!');
      } else {
        req.flash('error', 'Error uploading file: ' + err.message);
      }
      return res.redirect('/users/edit');
    }
    updateProfile(req, res);
  });
}
async function updateProfile(req, res) {
  try {
    let { fullname, contact } = req.body;
    let picture = req.file ? `/images/uploads/profiles/${req.file.filename}` : req.user.picture;
    
    let user = await userModel.findOneAndUpdate(
      {email: req.user.email},
      {
        fullname,
        contact,
        picture,
      },
      {
        new: true,
      }
    );
    req.flash("success", "Profile updated successfully!");
    res.redirect("/account");
  } catch (error) {
    req.flash("error", "An error occurred while updating the profile: " + error.message);
    res.redirect("/users/edit");
  }
}