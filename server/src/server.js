const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")

const ImageRouter = require("./routers/ImageRouter")
const connectDatabase = require("./database/db")


dotenv.config()
connectDatabase()
const app = express()
const PORT = process.env.PORT || 8080


app.use(cors())
app.use(express.json())
app.use(ImageRouter)



app.listen(PORT)