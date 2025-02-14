const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const signUp = async (req, res) => {
  try {
    const { email, password, firstName, username, lastName } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user with hashed password
    const newUser = new User({
      firstName,
      lastName,
      email,
      username,
      password: hashedPassword, // Store hashed password
    });

    await newUser.save();

    return res.status(201).json({
      message: "User created successfully",
      newUser,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error creating user",
      error: error.message,
    });
  }
};

const signIn = async (req, res) => {
  try {
    const { email, password, username } = req.body;

    // Find user by email
    const user = await User.findOne({ $or: [{ email }, { username }] });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Generate JWT Token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    return res.status(200).json({
      message: "Sign in successful",
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        username: user.username,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "Sign in error",
      error: error.message,
    });
  }
};

const getMatches = async (req, res) => {
  try {
    console.log(req.user);
    return res.status(200).json({
      message: "This is where you see all your matches",
    });
  } catch (error) {
    return res
      .json({
        message: "Error try again later",
      })
      .status(500);
  }
};

module.exports = { signUp, signIn, getMatches };
