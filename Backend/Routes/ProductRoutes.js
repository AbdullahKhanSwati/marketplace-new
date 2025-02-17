import express from "express";
import Product from "../Models/ProductModel.js";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import {addProductController,allProductsCOntroller,singleProduct,updateProduct,deleteProduct,getProductPhotosController,getSinglePhoto,availableProductsController,soldProductsController,handleChatgpt,markAsSold,markAsAvailable,searchProductController,productCountController,productListController,soldListController,soldproductCountController, getAllProductPhotos, singleProductForUpdate, deleteOldSoldProducts} from "../Controllers/ProductController.js"
import { upload } from "../Middlewares/Multer.js";

import formidableMiddleware from "express-formidable"
const router = express.Router();


cloudinary.config({
  cloud_name: "df60ylf3g", // Replace with your cloud name
  api_key: "428985695822526", // Replace with your API key
  api_secret: "jAFOYts8nuZyckgq2Bq5yULldfU" // Replace with your API secret
});

// router.post("/add-product",upload.array("photos"), addProductController);
router.post("/add-product",upload.array("photo"), addProductController);



// router.post("/", formidableMiddleware(), async (req, next,res) => {
//   try {
//     const files = req.files;

//     // Validate files existence
//     if (!files || files.length === 0) {
//       return res.status(400).json({ error: "No files were uploaded" });
//     }

//     // Validate file types
//     const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
//     for (const file of files) {
//       if (!allowedTypes.includes(file.mimetype)) {
//         return res
//           .status(400)
//           .json({ error: `Invalid file type: ${file.mimetype}` });
//       }
//     }

//     // Array to store uploaded image URLs
//     const uploadedImages = [];

//     // Upload images to Cloudinary
//     await Promise.all(
//       files.map((file) => {
//         return new Promise((resolve, reject) => {
//           const stream = cloudinary.uploader.upload_stream(
//             {
//               folder: "photos",
//               // public_id: `image_${uuidv4()}`, // Unique name for the image
//             },
//             (uploadError, result) => {
//               if (uploadError) {
//                 reject(uploadError);
//               } else {
//                 uploadedImages.push(result.secure_url);
//                 resolve();
               
//               }
//             }
//           );

//           stream.end(file.buffer);
      
//         });
//       })
//     );

//     // Respond with uploaded images' URLs
//     return res.status(200).json({
//       message: "Images uploaded successfully",
//       uploadedImages,
//     });
//   } catch (error) {
//     console.error("Error uploading images:", error);
//     return res.status(500).json({ error: "Failed to upload images" });
//   }
// },addProductController);




// router.post(
//     "/add-product",
//     upload.array("photos", 10),
//     (err, req, res, next) => {
//       if (err instanceof multer.MulterError) {
//         console.error("Multer error:", err);
//         return res.status(400).json({ success: false, message: err.message });
//       } else if (err) {
//         console.error("Unknown error:", err);
//         return res.status(500).json({ success: false, message: "Server error." });
//       }
//       next();
//     },
//     addProductController
//   );
  router.post("/chat",handleChatgpt);
router.get("/all-products",allProductsCOntroller)
router.patch("/Marksold/:id",markAsSold)
router.patch("/Markavailable/:id",markAsAvailable)


router.get("/single-product/:id",singleProduct)
router.get("/single-product-update/:id",singleProductForUpdate)

router.get("/all-photos/:id",getAllProductPhotos)
router.get("/photo/:id",getSinglePhoto);
// router.get("/getPhoto/:pid",getProductPhotosController);
router.get("/getPhoto/:pid",getProductPhotosController);


router.get("/available",availableProductsController)
router.get("/search/:keyword", searchProductController);
router.get("/sold",soldProductsController)

router.put("/update-product/:pid",upload.array("photo"),updateProduct)
router.delete("/delete-product/:pid",deleteProduct);
router.delete('/delete-many',deleteOldSoldProducts);
router.get("/product-count",productCountController);
router.get("/sold-product-count",soldproductCountController);

router.get("/available-list/:page", productListController);
router.get("/sold-list/:page", soldListController);


export default router;