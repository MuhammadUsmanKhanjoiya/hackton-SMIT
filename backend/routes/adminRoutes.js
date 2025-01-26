const express = require("express")
const router = express.Router()
const Loan = require("../models/Loan")

// View all applications
router.get("/applications", async (req, res) => {
  try {
    const loans = await Loan.find().populate("user", "name email")
    res.json(loans)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// Update application status
router.put("/applications/:id", async (req, res) => {
  try {
    const { status } = req.body
    const loan = await Loan.findByIdAndUpdate(req.params.id, { status }, { new: true })
    res.json(loan)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// Add token number to application
router.post("/applications/:id/token", async (req, res) => {
  try {
    const { tokenNumber } = req.body
    const loan = await Loan.findByIdAndUpdate(req.params.id, { tokenNumber }, { new: true })
    res.json(loan)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// Filter applications by city/country
router.get("/applications/filter", async (req, res) => {
  try {
    const { city, country } = req.query
    const filter = {}
    if (city) filter["guarantor1.location"] = city
    if (country) filter["guarantor2.location"] = country
    const loans = await Loan.find(filter).populate("user", "name email")
    res.json(loans)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

module.exports = router

