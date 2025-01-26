const express = require("express")
const router = express.Router()
const Loan = require("../models/Loan")

// Submit loan request
router.post("/submit", async (req, res) => {
  try {
    const loan = new Loan(req.body)
    await loan.save()
    res.status(201).json({ message: "Loan request submitted successfully", loanId: loan._id })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// Get all loan applications (for admin)
router.get("/all", async (req, res) => {
  try {
    const loans = await Loan.find().populate("user", "fullName email cnic")
    res.json(loans)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// Get user's loan applications
router.get("/user/:userId", async (req, res) => {
  try {
    const loans = await Loan.find({ user: req.params.userId })
    res.json(loans)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

module.exports = router

