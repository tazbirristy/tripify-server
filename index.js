const express = require("express");
const cors = require("cors");

require("dotenv").config();
const port = process.env.PORT || 5000;
const app = express();

// middle wares
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Tripify server is running");
});

app.listen(port, () => {
  console.log(`Tripify server is running on ${port}`);
});
