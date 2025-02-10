import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../Styles/AddProduct.css";
import { toast } from "react-hot-toast";
import Layout from "./Layout";
import { useParams, useNavigate } from "react-router-dom";

const UpdateProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    photo: [],
    status: "available",
  });

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleFileChange = (e) => {
    setSelectedFiles(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", product.name);
      formData.append("description", product.description);
      formData.append("price", product.price);
      formData.append("status", product.status);

      for (let i = 0; i < selectedFiles.length; i++) {
        formData.append("photo", selectedFiles[i]);
      }

      const { data } = await axios.put(
        `https://marketplace-new-84mw.vercel.app/api/v1/product/update-product/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (data.success) {
        console.log(data.updatedProduct);
        toast.success(data.message);
        navigate(`/available/${id}`)
      }
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("Error updating product.");
    } finally {
      setLoading(false);
    }
  };

  


  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `https://marketplace-new-84mw.vercel.app/api/v1/product/single-product/${id}`
      );
      if (data.success) {
        // const photos = data.photo.map((photo) =>
        //   `data:${photo.contentType};base64,${photo.data}`
        // );
        setProduct({
          name: data.product.name,
          description: data.product.description,
          price: data.product.price,
         
          status: data.product.status,
        });
      }
    } catch (error) {
      console.error("Error fetching product details:", error);
      toast.error("Failed to load product details.");
    }
  };
  
  useEffect(() => {
    getSingleProduct();
  }, [id]);

  return (
    <Layout>
      <div className="add-product-container">
        <h2 className="add-product-title">Update Product</h2>
        <form className="add-product-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Product Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={product.name}
              onChange={handleInputChange}
              required
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={product.description}
              onChange={handleInputChange}
              className="form-input"
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="price">Price</label>
            <input
              type="number"
              id="price"
              name="price"
              value={product.price}
              onChange={handleInputChange}
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
              multiple
              onChange={handleFileChange}
              className="form-input"
            />
            {product?.photo?.length > 0 && (
              <div className="existing-photos">
                {/* <h4>Existing Photos:</h4> */}
                {product.photo.map((photo, index) => (
                  <img
                    key={index}
                    src={photo.data || photo.base64}
                    alt={`Photo ${index + 1}`}
                    className="thumbnail"
                  />
                ))}
              </div>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="status">Status</label>
            <select
              id="status"
              name="status"
              value={product.status}
              onChange={handleInputChange}
              className="form-input"
            >
              <option value="available">Available</option>
              <option value="sold">Sold</option>
            </select>
          </div>
          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Updating..." : "Update Product"}
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default UpdateProduct;
