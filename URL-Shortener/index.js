const express = require("express");
const urlRoute = require("./routes/url");
const {connectToMongoDB} = require("./connect");

const app = express();
const PORT = 8001;


connectToMongoDB("mongodb://localhost:27017/url-short-DB").then(()=>console.log("MongoDB Connected!"))
app.use(express.json())

app.use("/", urlRoute)

app.listen(PORT, ()=> console.log(`Server started at port: ${PORT}`));
