import express from "express";
import cors from "cors"
import mongoose from "mongoose";
import dotenv from "dotenv"
import { productRouter } from "./Routers/productRouter.js";
dotenv.config()
const app = express()
app.use(express.json())
app.use(cors())
const port = 3100
app.use("/products", productRouter)


const PASSWORD = process.env.PASSWORD
const URL = process.env.URL.replace("<password>", PASSWORD)
const PORT = 3100



mongoose.connect(URL)
  .then(() => console.log('Salam boceyim!'));

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })