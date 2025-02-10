import React, { useEffect, useState } from "react";
import { useParams ,useNavigate } from "react-router-dom";
import axios from "axios";
import "../../Styles/AvailableDetails.css";
import Layout from "./Layout";
import ChatGpt from "./ChatGpt.jsx";
import {toast} from "react-hot-toast"
import { useAuth } from "../../context/Auth.js";
import Loading from "./Loading.jsx";
// import UpdateForm from "../form/UpdateForm.jsx";
// import {Modal} from "antd"
// import {Modal} from "antd"

const AvailableDetails = () => {
  const [auth , setAuth] = useAuth();
  const [visible ,setVisible] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const[chatVisible , setChatVisible] = useState(false);
  const [allPhotos ,setAllPhotos] = useState([]);
  const [loadingCheck ,setLoadingCheck] = useState(false);


  useEffect(() => {
   
    const fetchProductDetails = async () => {
      try {
        setLoadingCheck(true);
        const { data } = await axios.get(`https://marketplace-new-84mw.vercel.app/api/v1/product/single-product/${id}`);
        console.log(data);
        setProduct(data.product);
        setLoadingCheck(false);
        
        // setMainImage(data.product.photos[0]?.base64 || "");
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    const gettingAllPhotos = async ()=>{
      try {
        const photo = await axios.get(`https://marketplace-new-84mw.vercel.app/api/v1/product/all-photos/${id}`);
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
    console.log("all photos are ", allPhotos);
  }, [id]);

  if (!product) {
    return <Layout>
      <Loading />
    </Layout>
  }

  const handleThumbnailClick = (image) => {
    setMainImage(image);
  };



  const HandleDelete = async ()=>{
    try {
      const userConfirmed = window.confirm("Are you sure you want to delete this product?");
      if (!userConfirmed) return;
      const { data } = await axios.delete(
        `https://marketplace-new-84mw.vercel.app/api/v1/product/delete-product/${id}`
      );
     if(data?.success){
      toast.success("Product Deleted Succesfully");
      navigate("/available");
     }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  
  }


  const handleDownloadImages = () => {
    if (allPhotos.length === 0) {
      toast.error("No images available to download.");
      return;
    }
  
    allPhotos.forEach((img, index) => {
      if (img?.contentType && img?.data) {
        // Create a blob URL for the image
        const link = document.createElement("a");
        link.href = `data:${img.contentType};base64,${img.data}`;
        link.download = `image_${index + 1}.jpg`; // Set a filename for each image
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        console.error(`Image at index ${index} is invalid.`);
      }
    });
  
    toast.success("Images downloaded successfully!");
  };
  


  return (
    <Layout>
      <div className="details-container">
      
        
        {/* Photos Section */}
        <div className="photos-section">
 { allPhotos &&
    <img
      //  src={`https://marketplace-new-84mw.vercel.app/api/v1/product/getPhoto/${product._id}`}
      src={`data:${allPhotos[0]?.contentType};base64,${allPhotos[0]?.data}`}
      alt="Main Product"
      className="main-image"
    />
 }

    
  
  
  
  

  
  


<div className="thumbnail-row">
  {allPhotos?.length > 0 ? (
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
          <p className=  "product-description" style={{ 
    height: product?.description?.length > 400 ? "240px" : "100px", 
    overflowY: "auto" 
  }}>{product?.description}</p>
          <p className="product-price">Price: £{product?.price}</p>
          <p className="product-status">Status: {product?.status}</p>

         
          <button className="purchase-btn" onClick={handleDownloadImages}>Download Images</button>

          <button className="chat-btn" onClick={() => setChatVisible(!chatVisible)}>
  Write description from chatGpt
</button>

{
  auth.admin ? (
    <>


<div className="button-row">
<button
  className="delete-btn"
  onClick={HandleDelete}
>
  Delete Product
</button>
<button
  className="update-btn"
  onClick={() => navigate(`/available/update/${id}`)}
>
  Update Product
</button>
</div>
 </>
             ):""
}
  {/* <Modal 
visible={visible}
onCancel = {()=>setVisible(false)}
footer={null}
>
  
</Modal> */}
          
        </div>
      </div>
      {chatVisible && <ChatGpt setChatVisible={setChatVisible} />}
    </Layout>
  );   
};

export default AvailableDetails;
