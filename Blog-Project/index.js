const express = require('express');
require("dotenv").config();
const userRoute = require("./routes/user.routes");
const articleRoutes = require("./routes/article.routes");

const { connectToMongoDB } = require("./connections/connectMongoDB");

const app = express();

const PORT = 8003;

connectToMongoDB("mongodb://localhost:27017/blog-project").then(() => console.log("MongoDB Connected!"));

app.use(express.json());

app.use("/user",userRoute);
app.use("/creatives",articleRoutes);



app.listen(PORT, console.log(`Server started at port:${PORT}`))