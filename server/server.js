require("dotenv").config();

const connectDb = require("./config/db");
const cors = require('cors');
const express = require("express");
const app = express();
const PORT = process.env.PORT || 5001;

connectDb();

app.use(cors());
app.use(express.json())

app.get("/", (req, res) => res.send("API is running"));

app.listen(PORT, () => {
    console.log(`server running on port: ${PORT}`);
});