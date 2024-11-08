const express = require('express');
require("dotenv").config();

const { connectToMongoDB } = require("./connections/connectMongoDB")
const userRoute = require("./routes/user.route")

const app = express();

const PORT = 8002;

connectToMongoDB("mongodb://localhost:27017/test-project-edovu").then(() => console.log("MongoDB Connected!"));

app.use(express.json());

app.use("/user", userRoute);


app.listen(PORT, console.log(`Server started at port:${PORT}`))