import express from "express";
import FormData from "../models/FormData.js";

const router = express.Router();

// Add Data
router.post("/", async (req, res) => {
  try {
    const newData = new FormData(req.body);
    await newData.save();
    res.status(201).json({ message: "Data saved successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Error saving data" });
  }
});

// Fetch Data
router.get("/", async (req, res) => {
  try {
    const data = await FormData.find();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Error fetching data" });
  }
});

export default router;
