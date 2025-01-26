const express = require("express")
const router = express.Router()
const User = require("../models/User")
const jwt = require("jsonwebtoken")

// Register user
router.post("/register", async (req, res) => {
  try {
    const { cnic, email, fullName, password } = req.body
    const user = new User({ cnic, email, fullName, password })
    await user.save()
    res.status(201).json({ message: "User registered successfully" })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// Login user
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: "Invalid email or password" })
    }

    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1d" })
    res.json({ token, user: { id: user._id, fullName: user.fullName, role: user.role } })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// Get all users (for admin)
router.get("/all", async (req, res) => {
  try {
    const users = await User.find({}, "-password")
    res.json(users)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

module.exports = router

