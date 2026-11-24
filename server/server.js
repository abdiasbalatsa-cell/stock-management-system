require("dotenv").config();

const connectDb = require("./config/db");
const cors = require('cors');
const express = require("express");
const app = express();
const PORT = process.env.PORT || 5001;

// connecting the database
connectDb();


// importing the routes
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");


app.use(cors());
app.use(express.json())


app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);

app.get("/", (req, res) => res.send("API is running"));

app.listen(PORT, () => {
    console.log(`server running on port: ${PORT}`);
});