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

// app.use(cors({
//   origin: "https://moonlit-truffle-c14f8d.netlify.app", // Replace with your Netlify domain
//   methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
//   credentials: true
// }));



const allowedOrigins = [
  "http://localhost:3000", // For local development
  "https://helpful-platypus-99c6d7.netlify.app", // Netlify deployment
];

// app.use(
//   cors({
//     origin: function (origin, callback) {
//       if (allowedOrigins.includes(origin)) {
//         callback(null, true);
//       } else {
//         callback(new Error("Not allowed by CORS"));
//       }
//     },
//     methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
//     credentials: true,
//   })
// );

app.use(cors({
  origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or Postman)
      if (!origin || allowedOrigins.includes(origin)) {
          callback(null, true);
      } else {
          callback(new Error('Not allowed by CORS'));
      }
  },
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  credentials: true, // Allow cookies
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