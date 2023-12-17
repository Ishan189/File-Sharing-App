import express from "express";
import router from "./routes/routes.js";
import { urlencoded } from "express"
import connectDB from "./database/db.js";
import cookieParser from 'cookie-parser'

const app = express();
app.use(express.urlencoded({extended:true}))
app.use(express.json()) 
app.use(urlencoded({extended: false}))
app.use(cookieParser())

connectDB();

app.use("/api", router);

app.use((err,req,res,next)=>{
    const { statusCode = 500 } = err;
    if (!err.message) err.message = 'Oh No, Something Went Wrong!'
    res.status(statusCode).json({"msg":err.message})
})
const PORT = 8000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
