const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://admin:1234@ac-ap7djnp-shard-00-00.v25dnmq.mongodb.net:27017,ac-ap7djnp-shard-00-01.v25dnmq.mongodb.net:27017,ac-ap7djnp-shard-00-02.v25dnmq.mongodb.net:27017/?ssl=true&replicaSet=atlas-owpen5-shard-0&authSource=admin&appName=Cluster0");

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