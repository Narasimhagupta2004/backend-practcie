const express = require('express');
require("dotenv").config();
const app  = express();
const authRoutes = require("./routes/auth");
const connectDB = require('./db');
app.use(express.json())
app.get("/", (req,res)=>{
    res.send("backend is running");
})

app.use("/auth", authRoutes);

connectDB();
const PORT = process.env.SERVER_PORT;
app.listen(PORT, ()=>{
    console.log(`server is running at port no ${PORT}`)
})