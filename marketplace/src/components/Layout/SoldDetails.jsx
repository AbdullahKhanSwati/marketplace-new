import React, { useEffect, useState } from "react";
import { useParams ,useNavigate } from "react-router-dom";
import axios from "axios";
import "../../Styles/AvailableDetails.css";
import Layout from "./Layout";
import ChatGpt from "./ChatGpt.jsx";
import { useAuth } from "../../context/Auth.js";
import {toast} from "react-hot-toast"
import Loading from "./Loading.jsx";
const SoldDetails = () => {
  const [auth , setAuth] = useAuth();
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const[chatVisible , setChatVisible] = useState(false);
  const [allPhotos,setAllPhotos] = useState([]);
  const [loadingCheck, setLoadingCheck] = useState(false);
const navigate = useNavigate();
  useEffect(() => {
   
    const fetchProductDetails = async () => {
      try {
        setLoadingCheck(true);
        const { data } = await axios.get(` /api/v1/product/single-product/${id}`);
        setProduct(data.product);
        console.log("data in sold is", data)
        setMainImage(data.product.photos[0]?.base64 || "");
        setLoadingCheck(false);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    const gettingAllPhotos = async ()=>{
      try {
        const photo = await axios.get(` /api/v1/product/all-photos/${id}`);
        if (photo?.data?.photo) {
          setAllPhotos(photo.data.photo);
          console.log("All images:", photo.data.photo);
        } else {
          console.error("Unexpected API response:", photo.data);
        }
      } catch (error) {
        console.error("Error fetching photos:", error);
      }
    }

    fetchProductDetails();
    gettingAllPhotos();
  }, [id]);

  if (!product) {
    return <Layout>
      <Loading />
    </Layout>;
  }

  const handleThumbnailClick = (image) => {
    setMainImage(image);
  };


  const HandleDelete = async ()=>{
    try {
      const userConfirmed = window.confirm("Are you sure you want to delete this product?");
      if (!userConfirmed) return;
      const { data } = await axios.delete(
        ` /api/v1/product/delete-product/${id}`
      );
     if(data?.success){
      toast.success("Product Deleted Succesfully");
      navigate("/sold");
     }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  
  }

  return (
    <Layout>
      <div className="details-container">
        
     
<div className="photos-section">


<img
      src={` /api/v1/product/getPhoto/${product._id}`}
      alt="Main Product"
      className="main-image"
    />



<div className="thumbnail-row">
  {allPhotos.length > 0 ? (
    allPhotos.map((img, index) => (
      img?.contentType && img?.data && (
        <img
          key={index}
          src={`data:${img.contentType};base64,${img.data}`}
          className="thumbnail"
        />
      )
    ))
  ) : (
    <Loading />
  )}
</div>


</div>






        {/* Details Section */}
        <div className="details-section">
          <h1 className="product-name">{product?.name}</h1>
          <p className="product-description"  style={{ 
    height: product?.description?.length > 400 ? "240px" : "140px", 
    overflowY: "auto" 
  }}  >{product.description}</p>
          <p className="product-price">Price: £{product?.price}</p>
          <p className="product-status">Status: {product?.status}</p>
         

          
          {
  auth?.admin ? (
    <>

<div className="button-row">

<button
  className="delete-btn"
  onClick={HandleDelete}
>
  Delete Product
</button>
</div>

</>
             ):""
}
        </div>
      </div>
     
    </Layout>
  );
};

export default SoldDetails;
