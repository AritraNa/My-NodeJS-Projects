const express = require("express")
const connectDB = require('./db.js')
const userRoute = require('./routes/users.route.js')
const authenticatorRoute = require("./routes/authenticate.route.js")
require('dotenv').config();

connectDB();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/user", userRoute)
app.use("/",authenticatorRoute)

app.listen(PORT,() =>{
    console.log('server started at port:', PORT)
})
