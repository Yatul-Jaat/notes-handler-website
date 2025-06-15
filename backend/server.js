import express from "express";
import dotenv from "dotenv"
import cors from "cors"
import path from "path";
import { fileURLToPath } from "url";

import connectDB from "./connectionWithDB.js";
import { router_receive,router_send_notes,router_send_papers } from "./router/router.js";

const app=express();
dotenv.config();
app.use(express.json());
app.use(cors())

// Setup __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Correct static file path
const filesPath = path.join(__dirname, "files");
app.use("/files", express.static(filesPath));

app.use("/api",router_receive);
app.use("/api",router_send_notes);
app.use("/api",router_send_papers);

const __foldername=path.resolve();

app.use(express.static(path.join(__foldername,"/frontend/dist")))

app.get("*",(req,res)=>{
    res.sendFile(path.join(__foldername,"frontend","dist","index.html"))
})



app.listen(process.env.PORT,()=>{
    console.log("connected to the server...");
    connectDB(process.env.MONGO_DB_URL)
})
