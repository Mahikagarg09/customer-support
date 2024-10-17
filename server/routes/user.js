const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");

router.post("/signup", async (req, res) => {
    try {
      const { username, email, password, isAdmin } = req.body;
      const isUsernameExist = await User.findOne({ username });
      if (isUsernameExist) {
        return res.status(400).json({ message: "Username already exist" });
      }
      const isEmailExist = await User.findOne({ email });
      if (isEmailExist) {
        return res.status(400).json({ message: "Email already exist" });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({
        username,
        email,
        password: hashedPassword,
        admin: isAdmin,
      });
      await user.save();
      res.status(201).json({ message: "User registered successfully", user });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

router.post("/login",async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({
        username,
      });
      if (!user) {
        return res.status(400).json({
          message: "Username does not exist",
        });
      }
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return res.status(400).json({
          message: "Invalid password",
        });
      }
      res.status(200).json({
        message: "Login successful",
        user,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  });
module.exports = router;