import Product from "../Models/ProductModel.js";
import express from "express";
import formidable from "formidable";
import path from "path";
import fs from "fs";
import axios from "axios";
import { upload } from "../Middlewares/Multer.js";
// Controller to handle adding a product






import { v2 as cloudinary } from "cloudinary";


// const addProductController = async (req, res) => {
//   try {
//     // Cloudinary configuration
//     cloudinary.config({
//       cloud_name: "df60ylf3g", 
//       api_key: "428985695822526", 
//       api_secret: "jAFOYts8nuZyckgq2Bq5yULldfU",
//     });

//     // Access form fields from req.body and files from req.files
//     const { name, description, price, status } = req.body;
//     const files = req.files;
   
//     console.log("All files are", files);
//     console.log("All fields are", name,description,price);


//     // Validation
//     if (!name || !description || !price ) {
//       return res.status(400).json({ message: "Name, description, price, status, and images are required" });
//     }

   
    
//     // Upload images to Cloudinary
//     const photoUploads = await Promise.all(
//       files.map(async (file) => {
//         const result = await cloudinary.uploader.upload(file.path, {
//           folder: "products",
//           resource_type: "image",
//         });
        
//         return { data: result.secure_url, contentType: result.format };
//       })
//     );
// console.log("photo uploads are",photoUploads);
//     // Create a new product
//     const newProduct = new Product({
//       name,
//       description,
//       price,
    
//       photos: photoUploads, // Add all uploaded images URLs
//     });

//     await newProduct.save();

//     // Respond with success message
//     return res.status(201).send({ 
//       success:true,
//       message: "Product added successfully",
//        product: newProduct });
//   } catch (error) {
//     console.error("Error:", error);
//     return res.status(500).json({ message: "Error adding product", error: error.message });
//   }
// };














 




const addProductController = async (req, res) => {
    try {
        const { name, description, price } = req.body;
        const photo = req.files;
        console.log( name,description,price);
        console.log("Uploaded File: ", req.files);

        if (!name || !description || !price) {
            return res.status(400).send({
                success: false,
                message: "Please provide all required fields",
            });
        }

        if (!photo) {
            return res.status(400).send({
                success: false,
                message: "No photo was uploaded",
            });
        }
        const photos = req.files.map((file) => ({
          data: fs.readFileSync(file.path),
          contentType: file.mimetype,
        }));

        // const photoData = fs.readFileSync(photo.path);
        const product = new Product({
            name,
            description,
            price,
            photo: photos
        });

        await product.save();

        res.status(201).send({
            success: true,
            message: "Product added successfully",
            product,
        });
    } catch (error) {
        console.error("Error while adding product:", error);
        res.status(500).send({
            success: false,
            message: "Error adding product",
            error: error.message,
        });
    }
};




// const addProductController = async (req, res) => {
//   try {
//     // const { name, description, price } = req.fields;
//     const { photos } = req.files || {}; // Ensure `photos` exists
// // console.log(name,description,price);
// // console.log("photos are",photos);

// const { name, description, price, status } = req.body;
//         const files = req.files;
// console.log("photos are",files);
// console.log(name,description,price);
//     // Validation
//     // if (!name) return res.status(400).send({ error: "Name is required" });
//     // if (!description) return res.status(400).send({ error: "Description is required" });
//     // if (!price) return res.status(400).send({ error: "Price is required" });
//     // if (photos && photos.size > 20000000)
//     //   return res.status(400).send({ error: "Photo size should be less than 20MB" });

//     const product = new Product({ name:"Abdullah",description:"ksfh fhfjosfj",price:"87" });

//     if (photos) {
//       product.photos.data = fs.readFileSync(photos.path);
//       product.photos.contentType = photos.type;
//     }

//     await product.save();
//     res.status(201).send({
//       success: true,
//       message: "Product created successfully",
//       product,
//     });
//   } catch (error) {
//     console.error("Error while creating product:", error);
//     res.status(500).send({
//       success: false,
//       error: error.message || "Server error",
//     });
//   }
// };







const allProductsCOntroller  = async(req,res)=>{
try {
    const products = await Product.find().select("-photo").sort({ createdAt: -1 });
    return res.status(200).send({
        success:true,
        message:"Getting all Products",
        products
    })
    
} catch (error) {
    res.status(500).send({
        success:false,
        error,
        message:"error in Getting product!"
    })
}

}

// const singleProduct = async(req,res)=>{

// try {
//     const product = await Product.findById(req.params.id);

//     if (!product) {
//       return res.status(404).send({ 
//         success:false,
//         message:"product not found"
//        });
//     }

//     return res.status(200).send({
//     success:true,
//     message:"getting product successfully",
//     product

//     })
    
// } catch (error) {
//     res.status(500).send({
//         success:false,
//         error,
//         message:"error in Getting product!"
//     })
// }


// }
// const singleProduct = async (req, res) => {
//     try {
//       const product = await Product.findById(req.params.id);
  
//       if (!product) {
//         return res.status(404).send({
//           success: false,
//           message: "Product not found",
//         });
//       }
  
//       // Convert photos to Base64
//       const photosWithBase64 = product.photo.map((photo) => {
//         const base64String = Buffer.from(photo.data).toString("base64");
//         return {
//           contentType: photo.contentType,
//           base64: `data:${photo.contentType};base64,${base64String}`,
//         };
//       });
  
//       // Return the product with Base64 photos
//       return res.status(200).send({
//         success: true,
//         message: "Getting product successfully",
//         product: {
//           ...product._doc,
//           photos: photosWithBase64, // Replace photos with Base64-encoded versions
//         },
//       });
//     } catch (error) {
//       console.error(error);
//       res.status(500).send({
//         success: false,
//         error,
//         message: "Error in getting product!",
//       });
//     }
//   };

const singleProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).select("name description price status");

    if (!product) {
      return res.status(404).send({
        success: false,
        message: "Product not found",
      });
    }

    // Convert photos to Base64
    

    // Return the product with Base64 photos
    return res.status(200).send({
      success: true,
      message: "Getting product successfully",
      product
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in getting product!",
    });
  }
};


const singleProductForUpdate = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).select(
      "name description price status photo"
    );

    if (!product) {
      return res.status(404).send({
        success: false,
        message: "Product not found",
      });
    }

    // Convert photos to Base64 if they are stored as buffers
    const photos = req.files.map((file) => ({
      data: fs.readFileSync(file.path),
      contentType: file.mimetype,
    }));

    return res.status(200).send({
      success: true,
      message: "Getting product successfully",
      product: { ...product.photo, photo: photos },
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in getting product!",
    });
  }
};

  

// const updateProduct = async(req,res)=>{

// try {
    
//     const { name, description, price, photos, status } = req.body;
//     const updatedProduct = await Product.findByIdAndUpdate(req.params.pid,{
//         name,
//         description,
//         price,
//         photos,
//         status
//     },
//     { new: true, runValidators: true }
// )

// if (!updatedProduct) {
//     return res.status(404).send({ 
//     success:false,
//     message:"product not found",
    
//      });
//   }

//   return res.status(200).send({
//     success:true,
//     message:"product updated successfully",
//     updatedProduct
//   })


// } catch (error) {
//     res.status(500).send({
//         success:false,
//         error,
//         message:"error in updating product!"
//     })
// }
// }


const updateProduct = async (req, res) => {

  cloudinary.config({
    cloud_name: "df60ylf3g", 
    api_key: "428985695822526", 
    api_secret: "jAFOYts8nuZyckgq2Bq5yULldfU",
  });
  try {
    const { name, description, price, status } = req.body;
    const files = req.files;

    // Find the product by ID
    const product = await Product.findById(req.params.pid);
    if (!product) {
      return res.status(404).send({ 
        success: false, 
        message: "Product not found" 
      });
    }

    // Update fields if they are provided
    if (name) product.name = name;
    if (description) product.description = description;
    if (price) product.price = price;
    if (status) product.status = status;

    // Handle new image uploads (if any)
    const photos = req.files.map((file) => ({
      data: fs.readFileSync(file.path),
      contentType: file.mimetype,
    }));
    product.photo = [...product.photo, ...photos]; // Append new photos

    // Save the updated product
    // const updatedProduct = await product.save();
    await product.save();
    // Respond with success message
    return res.status(200).send({
      success: true,
      message: "Product updated successfully",
      // updatedProduct,
    });
  } catch (error) {
    console.error("Error updating product:", error);
    return res.status(500).json({ 
      success: false, 
      message: "Error updating product", 
      error: error.message 
    });
  }
};



const deleteProduct = async(req,res)=>{

try {

    const product = await Product.findByIdAndDelete(req.params.pid);
     const name= product.name;
    if (!product) {
      return res.status(404).send({
        success:false,
        message:"product not found",

      });
    }
 
    return res.status(200).send({
        success:true,
        message:"product deleted successsfully",
        name
    })

    
} catch (error) {
    res.status(500).send({
        success:false,
        error,
        message:"error in Deleting product!"
    })
}
}
// const getProductPhotosController = async (req, res) => {
//     try {
//       const product = await productModel.findById(req.params.pid).select("photos");
  
//       if (product && product.photos.length > 0) {
//         // Send all photos as an array
//         const photos = product.photos.map((photo) => ({
//           data: photo.data, // Binary data
//           contentType: photo.contentType,
//         }));
  
//         return res.status(200).send({
//           success: true,
//           photos, // Array of photo data and content types
//         });
//       } else {
//         return res.status(404).send({
//           success: false,
//           message: "No photos found for this product",
//         });
//       }
//     } catch (error) {
//       console.error(error);
//       res.status(500).send({
//         success: false,
//         message: "Error while getting photos",
//         error,
//       });
//     }
//   };


const  getProductPhotosController = async (req, res) => {
  
    // Fetch product and select only the 'photos' field
    // const product = await Product.findById(req.params.pid).select("photos");

  //   // Check if the product exists and has photos
  //   if (!product || !product.photos || product.photos.length === 0) {
  //     return res.status(404).send({
  //       success: false,
  //       message: "No photos found for the given product",
  //     });
  //   }

  //   // Get the first photo
  //   const photo = product.photos[0];
  //   if (photo && photo.data) {
  //     const base64Image = photo.data.toString("base64"); // Convert buffer to Base64
  //     const dataUri = `data:${photo.contentType};base64,${base64Image}`; // Create a Data URI
  //     console.log(dataUri);
  //     res.set("Content-Type", "application/json"); // Ensure response type is JSON
  //     return res.status(200).send({ base64Image: dataUri });
  //   } else {
  //     return res.status(400).send({
  //       success: false,
  //       message: "Photo data is missing",
  //     });
  //   }
  // } catch (error) {
  //   console.error("Error while getting photo:", error);
  //   res.status(500).send({
  //     success: false,
  //     message: "Error while getting photo",
  //     error: error.message,
  //   });
  // }


  // try {
  //   const product = await Product.findById(req.params.pid).select("photo");
  //   if (product.photo[0].data) {
  //     res.set("Content-type", product.photo[0].contentType);
  //     return res.status(200).send(product.photo[0].data);
  //   }
  // } catch (error) {
  //   console.log(error);
  //   res.status(500).send({
  //     success: false,
  //     message: "Erorr while getting photo",
  //     error,
  //   });
  // }


  try {
    const product = await Product.findById(req.params.pid).select({
      photo: { $slice: 1 } // Select only the first photo
    });
  
    if (product?.photo?.[0]?.data) {
      res.set("Content-Type", product.photo[0].contentType);
      return res.status(200).send(product.photo[0].data);
    } else {
      return res.status(404).send({
        success: false,
        message: "Photo not found",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error while getting photo",
      error,
    });
  }
}


const getAllProductPhotos = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).select("photo");

    if (!product || !product.photo || product.photo.length === 0) {
      return res.status(404).send({
        success: false,
        message: "No photos found for this product",
      });
    }

    // Map through all photos and send their data and content type
    const photosData = product.photo.map(photo => ({
      contentType: photo.contentType,
       data: photo.data.toString('base64'), // Convert the image data to Base64 string for easier handling on the frontend
    }));

    return res.status(200).send({
      success: true,
      photo: photosData,
    });
  } catch (error) {
    console.error("Error while getting photos:", error);
    res.status(500).send({
      success: false,
      message: "Error while getting photos",
      error: error.message,
    });
  }
};



 


  const getSinglePhoto = async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
  
      if (product?.photos?.length > 0) {
        const photo = product.photos[0];
  
        // Convert binary data to Base64
        const base64Data = photo.data.toString("base64");
  
        // Respond with Base64 data and content type
        res.status(200).send({
          success: true,
          data: `data:${photo.contentType};base64,${base64Data}`,
        });
      } else {
        res.status(404).send({ success: false, error: "No photo found for this product" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).send({ success: false, error: "Error retrieving product photo" });
    }
  };
  

  const availableProductsController = async (req,res) =>{
    try {
        const availableProducts = await Product.find({ status: "available" }).select("name description price").sort({ createdAt: -1 });; // Filter products by status
       return res.status(200).send({
            success:true,
            message:"getting available products",
            availableProducts
        });
      } catch (error) {
        console.error(error);
       return res.status(500).send({ 
            success:false,
            message:"error while getting available products",
            error
        });
      }

  }
  


  const soldProductsController = async (req,res)=>{
    try {
        const soldProducts = await Product.find({ status: "sold" }).sort({ createdAt: -1 });; // Filter products by status
       return res.status(200).send({
            success:true,
            message:"getting available products",
            soldProducts
        });
      } catch (error) {
        console.error(error);
       return res.status(500).send({ 
            success:false,
            message:"error while getting available products",
            error
        });
      }
  }


  const handleChatgpt = async(req,res)=>{
    const { messages } = req.body;

    try {
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-3.5-turbo", // Use a valid model
          messages: messages,
          max_tokens: 200,
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_CHATGPT_API_KEY}`,
          },
        }
      );
  
      res.json(response.data);
    } catch (error) {
      console.error("Error communicating with OpenAI:", error.message);
    return  res.status(500).json({ error: "Failed to communicate with ChatGPT" });
    }
  }

// const markAsSold = async (req,res)=>{
//   try {
//     const productId = req.params.id;
//     const updatedProduct = await Product.findByIdAndUpdate(
//       productId,
//       { status: 'sold' },
//       { new: true } // Return the updated document
//     );
//     if (!updatedProduct) {
//       return res.status(404).json({ success: false, message: 'Product not found' });
//     }
//     return res.send({ success: true, product: updatedProduct , message:"Status updated successsfully" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, message: 'Error updating product status' });
//   }
// }
const markAsSold = async (req, res) => {
  try {
    const productId = req.params.id;

    // Use findOneAndUpdate for better flexibility and control
    const updatedProduct = await Product.findOneAndUpdate(
      { _id: productId }, // Query condition
      { status: "sold" }, // Update operation
      {
        new: true, // Return the updated document
        fields: "name status", // Select only required fields to return
      }
    );

    if (!updatedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.json({
      success: true,
      product: updatedProduct,
      message: "Status updated successfully",
    });
  } catch (error) {
    console.error("Error updating product status:", error);
    return res.status(500).json({
      success: false,
      message: "Error updating product status",
    });
  }
};

const markAsAvailable = async (req,res)=>{
  try {
    const productId = req.params.id;

    // Use findOneAndUpdate for better flexibility and control
    const updatedProduct = await Product.findOneAndUpdate(
      { _id: productId }, // Query condition
      { status: "available" }, // Update operation
      {
        new: true, // Return the updated document
        fields: "name status", // Select only required fields to return
      }
    );

    if (!updatedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.json({
      success: true,
      product: updatedProduct,
      message: "Status updated successfully",
    });
  } catch (error) {
    console.error("Error updating product status:", error);
    return res.status(500).json({
      success: false,
      message: "Error updating product status",
    });
  }
}



const searchProductController = async (req, res) => {
  try {
    const { keyword } = req.params;
    const resutls = await Product
      .find({
        $or: [
          { name: { $regex: keyword, $options: "i" } },
          { description: { $regex: keyword, $options: "i" } },
        ],
      })
      .select("name description price status");
      
    res.status(200).send({
      success:true,
      resutls
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error In Search Product API",
      error,
    });
  }
};



const productCountController = async (req,res)=>{
  try {
    const totalProducts = await Product.countDocuments({ status: "available" });
   return res.status(200).send({
      success: true,
      totalProducts,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      message: "Error in product count",
      error,
      success: false,
    });
  }
}

const soldproductCountController = async (req,res)=>{
  try {
    const totalProducts = await Product.countDocuments({ status: "sold" });
   return res.status(200).send({
      success: true,
      totalProducts,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      message: "Error in product count",
      error,
      success: false,
    });
  }
}




const productListController = async (req, res) => {
  try {
    const perPage = 12;
    const page = req.params.page ? req.params.page : 1;
    
    const products = await Product
      .find({status : "available"})
      .skip((page - 1) * perPage)
      .limit(perPage)
      .select("name description price status")
      .sort({ createdAt: -1 });
      console.log("Page:", page, "Skip:", (page - 1) * perPage, "Limit:", perPage);

    return res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "error in per page ctrl",
      error,
    });
  }
};



const soldListController = async (req, res) => {
  try {
    const perPage = 10;
    const page = req.params.page ? req.params.page : 1;
    
    const products = await Product
      .find({status : "sold"})
      .skip((page - 1) * perPage)
      .limit(perPage)
      .select("name description price status")
      .sort({ createdAt: -1 });
      console.log("Page:", page, "Skip:", (page - 1) * perPage, "Limit:", perPage);

    return res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "error in per page ctrl",
      error,
    });
  }
};

export {addProductController,allProductsCOntroller,singleProduct,updateProduct,deleteProduct,getProductPhotosController,getSinglePhoto,availableProductsController,soldProductsController,handleChatgpt,markAsSold,markAsAvailable,searchProductController,productCountController,productListController,soldListController,soldproductCountController,getAllProductPhotos,singleProductForUpdate}