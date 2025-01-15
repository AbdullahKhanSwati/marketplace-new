import express from "express"
import mongoose from "mongoose"
import cors from "cors";
import dotenv from "dotenv";
import connectDb from "./Config/db.js";
import morgan from "morgan"
import path from "path";
import AdminRoutes from "./Routes/AdminRoutes.js"
import ProductRoutes from "./Routes/ProductRoutes.js"
import formidableMiddleware from "express-formidable"
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
import multer from "multer";
import { v2 as cloudinary } from 'cloudinary';


cloudinary.config({
  cloud_name: process.env.CLOUD_NAME, // Replace with your cloud name
  api_key: process.env.API_KEY,       // Replace with your API key
  api_secret: process.env.API_SECRET, // Replace with your API secret
});

const app = express();
dotenv.config();
const PORT = process.env.PORT || 8080;
connectDb();


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors({
  origin: "http://localhost:3000", // Replace with your Netlify domain
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
// app.use(formidableMiddleware());
// app.use(bodyParser.json());
// app.use(bodyParser.json({ limit: '50mb' }));
// app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(express.json({ limit: "10mb" }));

  

app.use('/api/v1/auth',AdminRoutes);
app.use('/api/v1/product',ProductRoutes);


app.get('/',(req,res)=>{
    res.send({
       message:"welcome to ecomefskf"
    })
   })
app.listen(PORT,()=>{
    console.log(`port running on ${process.env.DEV_MOD} at ${PORT}`)
})