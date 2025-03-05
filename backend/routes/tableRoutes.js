import express from "express";
import FormData from "../models/FormData.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
   const formData = await FormData.find();

   res.json(formData);
  } catch (error) {
    console.error("Error fetching table/form data:", error);
    res.status(500).json({ message: "Error fetching table/form data" });
  }
});


export default router;
