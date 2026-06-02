const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("");

const Contact = mongoose.model(
  "Contact",
  new mongoose.Schema({
    name: String,
    email: String,
    message: String,
    createdAt: {
      type: Date,
      default: Date.now,
    },
  })
);

app.post("/api/contact", async (req, res) => {
  try {
    await Contact.create(req.body);

    res.json({
      success: true,
      message: "Message stored successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
    });
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
