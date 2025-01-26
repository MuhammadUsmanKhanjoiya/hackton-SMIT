const express = require("express")
const router = express.Router()
const Item = require("../models/Item")

// Get all items
router.get("/", async (req, res) => {
  try {
    const items = await Item.find()
    res.json(items)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Create a new item
router.post("/", async (req, res) => {
  const item = new Item({
    name: req.body.name,
    description: req.body.description,
  })

  try {
    const newItem = await item.save()
    res.status(201).json(newItem)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Update an item
router.patch("/:id", async (req, res) => {
  try {
    const item = await Item.findById(req.params.id)
    if (item == null) {
      return res.status(404).json({ message: "Item not found" })
    }

    if (req.body.name != null) {
      item.name = req.body.name
    }
    if (req.body.description != null) {
      item.description = req.body.description
    }

    const updatedItem = await item.save()
    res.json(updatedItem)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Delete an item
router.delete("/:id", async (req, res) => {
  try {
    const item = await Item.findById(req.params.id)
    if (item == null) {
      return res.status(404).json({ message: "Item not found" })
    }

    await item.remove()
    res.json({ message: "Item deleted" })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

module.exports = router

