const express = require("express")
const app = express()
const dotenv= require("dotenv")
const cors= require("cors")
dotenv.config()

// json config
app.use(express.json())

//config cors
app.use(cors())
//database config

const connectDB = require("./config/connectDB")
connectDB()

// router config
app.use("/api/user", require("./routes/userRoutes"))
app.use("/api/admin", require("./routes/AdminRoutes"))

// port config
const port = process.env.PORT || 8081
app.listen(port,(err)=> err ? console.log(err) : console.log("my server is running on port:", port))