import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      
      type: String,
      
    },
    photo:[
    
      
        {
        data: Buffer,
        contentType: String,
      },
    ],
    
    price: {
      type: Number,
      required: true,
      min: 0, // Ensure price cannot be negative
    },
    status: {
      type: String,
      enum: ["available", "sold"],
      default: "available",
    },
  },
  { timestamps: true } // Add createdAt and updatedAt timestamps
);

productSchema.index({ status: 1, createdAt: -1 });
productSchema.index({ photo: 1 });
productSchema.index({ _id: 1 });


const Product = mongoose.model("Product", productSchema);

export default Product;
