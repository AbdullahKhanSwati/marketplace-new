// import React, { useState } from "react";
// import axios from "axios";
// import "../../Styles/AddProduct.css";
// import {toast} from "react-hot-toast"
// import Layout from "./Layout";
// import { useParams } from "react-router-dom";
// const AddProduct = () => {
  
//   const [product, setProduct] = useState({
//     name: "",
//     description: "",
//     price: "",
//     photos: [],
//     status: "available",
//   });

//   const [selectedFiles, setSelectedFiles] = useState([]);
//   const [loading, setLoading] = useState(false);
  

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setProduct({ ...product, [name]: value });
//   };

//   const handleFileChange = (e) => {
//     setSelectedFiles(e.target.files);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       const formData = new FormData();
//       formData.append("name", product.name);
//       formData.append("description", product.description);
//       formData.append("price", product.price);
//       formData.append("status", product.status);

//       for (let i = 0; i < selectedFiles.length; i++) {
//         formData.append("photos", selectedFiles[i]);
//       }

//       const { data } = await axios.post(
//         " /api/v1/product/add-product",
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );

//       if (data.success) {
       
//         toast.success(data.message);
//         setProduct({
//           name: "",
//           description: "",
//           price: "",
//           photos: [],
//           status: "available",
//         });
//         setSelectedFiles([]);
//       }
//     } catch (error) {
//       console.error("Error adding product:", error);
//       alert("Error adding product");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Layout>
//     <div className="add-product-container">
//       <h2 className="add-product-title">Add New Product</h2>
//       <form className="add-product-form" onSubmit={handleSubmit}>
//         <div className="form-group">
//           <label htmlFor="name">Product Name</label>
//           <input
//             type="text"
//             id="name"
//             name="name"
//             value={product.name}
//             onChange={handleInputChange}
//             required
//             className="form-input"
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="description">Description</label>
//           <textarea
//             id="description"
//             name="description"
//             value={product.description}
//             onChange={handleInputChange}
//             className="form-input"
//           ></textarea>
//         </div>
//         <div className="form-group">
//           <label htmlFor="price">Price</label>
//           <input
//             type="number"
//             id="price"
//             name="price"
//             value={product.price}
//             onChange={handleInputChange}
//             required
//             className="form-input"
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="photos">Upload Photos</label>
//           <input
//             type="file"
//             id="photos"
//             name="photos"
//             multiple
//             // onChange={handleFileChange}
//             onChange={(e) => setPhotos(e.target.files[0])}
//             className="form-input"
//           />
//         </div>
//         {/* <div className="form-group">
//           <label htmlFor="status">Status</label>
//           <select
//             id="status"
//             name="status"
//             value={product.status}
//             onChange={handleInputChange}
//             className="form-input"
//           >
//             <option value="available">Available</option>
//             <option value="sold">Sold</option>
//           </select>
//         </div> */}
//         <button  type="submit" className="submit-btn" disabled={loading}>
//           {loading ? "Submitting..." : "Add Product"}
//         </button>
//       </form>
//     </div>
//     </Layout>
//   );
// };

// export default AddProduct;




import React, { useState } from "react";
import axios from "axios";
import "../../Styles/AddProduct.css";
import { toast } from "react-hot-toast";
import Layout from "./Layout";

const AddProduct = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [name , setName] = useState("");
  const [description , setDescription] = useState("");
  const [price , setPrice] = useState("");
  const [photos , setPhotos] = useState("");

  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    status: "available",
    photo:""
  });
  const [loading, setLoading] = useState(false);

  // Handle text input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  // Handle file input changes
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files); // Convert FileList to an array
    setPhotos(files);// Update state with selected files
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("description", description);
        formData.append("price", price);
        
        // formData.append("photo", photos); // Ensure the key matches the backend


        photos.forEach((photo, index) => {
          formData.append(`photo`, photo);
        });
        console.log("FormData name: ", formData.name);
        console.log("FormData photo: ", formData.photo);

      if(!description){
        formData.append("description", "please write description from below chatbot");
      }
        const { data } = await axios.post(
            `https://marketplace-new-84mw.vercel.app/api/v1/product/add-product`,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );

        if (data.success) {
            toast.success(data.message);
            setProduct({
                name: "",
                description: "",
                price: "",
                status: "available",
                photo: ""
            });
            setName("");
            setDescription("");
            setPrice("");
            setPhotos(null);
        }
    } catch (error) {
        console.error("Error adding product:", error);
        toast.error("Error adding product");
    } finally {
        setLoading(false);
    }
};


  return (
    <Layout>
      <div className="add-product-container">
        <h2 className="add-product-title">Add New Product</h2>
        <form className="add-product-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Product Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
             
              className="form-input"
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="price">Price</label>
            <input
              type="number"
              id="price"
              name="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}

              required
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="photos">Upload Photos</label>
            <input
              type="file"
              id="photos"
              name="photo"
               accept="image/*"
              // onChange={handleFileChange}
              multiple // Allow multiple file selection
              onChange={handleFileChange}
              // onChange={(e) => setPhotos(e.target.files[0])}
              className="form-input"
            />
          </div>
          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Submitting..." : "Add Product"}
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default AddProduct;

