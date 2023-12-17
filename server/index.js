import express from "express";
import router from "./routes/routes.js";
import cors from 'cors'; 
import { urlencoded } from "express"
import connectDB from "./database/db.js";
import cookieParser from 'cookie-parser'

const app = express();
app.use(express.urlencoded({extended:true}))
app.use(express.json()) 
app.use(urlencoded({extended: false}))
app.use(cookieParser())

connectDB();

app.use(cors({ credentials: true, origin: 'https://file-sharing-app-henna.vercel.app/' }));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'https://file-sharing-app-henna.vercel.app');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });

app.use("/", router);

app.use((err,req,res,next)=>{
    const { statusCode = 500 } = err;
    if (!err.message) err.message = 'Oh No, Something Went Wrong!'
    res.status(statusCode).json({"msg":err.message})
})
const PORT = 8000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
