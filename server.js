const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

const connectDB = require("./config/db");
const skillRoutes = require("./routes/skillRoutes");
const swapRoutes = require("./routes/swapRoutes");

connectDB();

//Middlewares

app.use(express.json());
app.use(cors());
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/skills", skillRoutes);
app.use("/api/swaps", swapRoutes);
// app.get("/", (req, res) => {
//   res.send("Home page");
// });

app.listen(5000, () => {
  console.log("Server is running at 5000");
});
