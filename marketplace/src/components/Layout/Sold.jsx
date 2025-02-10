import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import "../../Styles/Sold.css";
import axios from "axios";
import { useAuth } from "../../context/Auth.js";
import {toast} from "react-hot-toast"
import { useNavigate } from "react-router-dom";
import Loading from "./Loading.jsx";
const Sold = () => {
  const [page, setPage] = useState(1);
    const [loadingBtn,setLoadingBtn] = useState(false);
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [total ,setTotal] = useState(null);
const [auth ,setAuth] = useAuth();
const [loadingCheck, setLoadingCheck] = useState(false);
  const getProducts = async () => {
    try {
      setLoadingCheck(true);
      const { data } = await axios.get(

        `https://marketplace-new-84mw.vercel.app/api/v1/product/sold-list/${page}`
      );
      if (data?.success) {
        console.log("Fetched products:", data.products); // Log the API response
        setLoadingCheck(false);
        setProducts(data.products); // Update the state
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };


  const loadMore = async () => {
    try {
      setLoadingBtn(true);
      const { data } = await axios.get(
        `https://marketplace-new-84mw.vercel.app/api/v1/product/sold-list/${page}`
      );
      if (data?.success) {
        setProducts(data.products); // Update state with products
        setProducts([...products, ...data?.products]);
       setLoadingBtn(false);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  const getTotal = async () => {
    try {
      const { data } = await axios.get(`https://marketplace-new-84mw.vercel.app/api/v1/product/sold-product-count`);
      if (data.success) {
        
        setTotal(data?.totalProducts);
        // console.log("total available products are",total);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const markAsAvailable = async (productId) => {
    try {
      const { data } = await axios.patch(
        `https://marketplace-new-84mw.vercel.app/api/v1/product/Markavailable/${productId}`,
        { status: "available" }
      );
      if (data?.success) {
        // Update the local state to reflect the status change
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product._id !== productId)
        );
        toast.success(data.message)
      } else {
        alert("Failed to update product status.");
      }
    } catch (error) {
      console.error("Error updating product status:", error);
      alert("Error occurred while marking the product as sold.");
    }
  };

  
 useEffect(() => {
   getTotal();
     getProducts();
   
   }, []);


    useEffect(() => {
       if (page === 1) return;
       console.log("page is ",page);
   
       loadMore();
     }, [page]);
  // Log the updated products whenever the state changes
  useEffect(() => {
    console.log("Updated sold products state:", products);
  }, [products]);

  return (
    <Layout>

{loadingCheck && 
              <Loading />
        }

<div style={{marginTop:"4.5rem"}}>
      <div className="card-container">
  { !loadingCheck &&  products?.map((product) => (
    <div className="card" key={product._id}>
      <div  className="status-banner" style={{backgroundColor:"#b02033"}}>
        {product.status === "available" ? "Available" : "Sold"}
      </div>
      <img
        src={
         
            `https://marketplace-new-84mw.vercel.app/api/v1/product/getPhoto/${product._id}` // Fetch image from backend
           
        }
        alt={product.name}
        className="card-img"
      />
      <div className="card-content">
        <h3 className="card-title">{product.name}</h3>
        <p className="card-price">£{product.price}</p>
        <p className="card-description">{product.description.substring(0, 40)}...</p>
        <button className="card-btn" onClick={() => navigate(`/sold/${product._id}`)}
        >More Details</button>

        {auth.admin && (
          <button
            className="card-btn second-btn"
            style={{
              marginLeft: "7px",
              backgroundColor: "black",
              color: "white",
            }}
            onClick={() => markAsAvailable(product._id)}
          >
            Mark Available
          </button>
        )}
      </div>
    </div>
  ))}
</div>
<div className="m-2 p-3" style={{display:"flex" , flexDirection:"row", justifyContent:"center"}}>
            {!loadingCheck &&  products && products.length < total && total>=10 &&  (
              <button
              style={{backgroundColor:"black",color:"white" }}
                className="btn loadmore"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loadingBtn ? (
                  "Loading ..."
                ) : (
                  <>
                    {" "}
                    Loadmore 
                  </>
                )}
              </button>
            )}
          </div>
          </div>
    </Layout>
  );
};

export default Sold;
