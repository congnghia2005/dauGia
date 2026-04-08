import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"

import userRouter from "./Router/User.js"

dotenv.config()

const app = express()
app.use(express.json())

const PORT = process.env.PORT || 7000
const MONGOURL = process.env.MONGO_URL

app.use("/api/user",userRouter)

mongoose.connect(MONGOURL)
.then(() => {
    console.log("Connected successfully")

    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`)
    })

})
.catch((error) => console.error(error))