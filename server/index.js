import express from "express";
import router from "./routes/routes.js";
import cors from 'cors';
import DBConnection from "./database/db.js";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { log } from "console";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

const app = express();
DBConnection();

app.use(cors());

// app.use('/uploads', express.static(__dirname + '/uploads'));
app.use("/", router);

const PORT = 8000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
