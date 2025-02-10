



// import React, { useState, useEffect } from "react";
// import Layout from "./Layout";
// import "../../Styles/Sold.css";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../../context/Auth.js";
// import {toast} from "react-hot-toast"

// const Available = () => {
//   const navigate = useNavigate();
//   const [products, setProducts] = useState([]);
//   const [auth] = useAuth();
//   const [imgurl , setImageurl] = useState("");

//   const getProducts = async () => {
//     try {
//       const { data } = await axios.get(
//         ` https://marketplace-new-84mw.vercel.app /api/v1/product/available`
//       );
//       if (data?.success) {
//         setProducts(data.availableProducts); // Update state with products
//       }
//     } catch (error) {
//       console.error("Error fetching products:", error);
//     }
//   };

//   const markAsSold = async (productId) => {
//     try {
//       const { data } = await axios.patch(
//         ` https://marketplace-new-84mw.vercel.app /api/v1/product/Marksold/${productId}`,
//         { status: "sold" }
//       );
//       if (data?.success) {
//         // Update the local state to reflect the status change
//         setProducts((prevProducts) =>
//           prevProducts.filter((product) => product._id !== productId)
//         );
//         toast.success(data.message)
//       } else {
//         alert("Failed to update product status.");
//       }
//     } catch (error) {
//       console.error("Error updating product status:", error);
//       alert("Error occurred while marking the product as sold.");
//     }
//   };
//   const GettingSinglePhoto = async(productId) =>{
//     try {
//       const {data} = await axios.get(` https://marketplace-new-84mw.vercel.app /api/v1/product/photo/${productId}`);
//       if(data.success){

//         return data;

//       }
//     } catch (error) {

//     }
//   }

//   useEffect(() => {
//     getProducts();
//   }, []);

//   return (
//     <Layout>
//       <div className="card-container">
//   {products?.map((product) => (

//     <div className="card" key={product._id}>
//      {/* {GettingSinglePhoto} */}
//      {console.log("photo is ",product.photos[0].data)}
//       <div className="status-banner" >
//         {product.status === "available" ? "Available" : "Sold"}
//       </div>
//       <img

//         // src={`data:image/jpeg;base64,${product.photos)}`}
//       //  src="httpss://res.cloudinary.com/df60ylf3g/image/upload/v1736083494/products/oyymq9grzjf6iglycst3.png"
//         //  https://marketplace-new-84mw.vercel.app /api/v1/product/photo/
//         src={`data:image/jpeg;base64,${product.photos[0]}`}
//         alt={product.name}
//         className="card-img"
//       />
//       <div className="card-content">
//         <h3 className="card-title">{product.name}</h3>
//         <p className="card-price">${product.price}</p>
//         <p className="card-description">{product.description.substring(0, 40)}...</p>
//         <button
//           className="card-btn"
//           onClick={() => navigate(`/available/${product._id}`)}
//         >
//           More Details
//         </button>
//         {auth.admin && (
//           <button
//             className="card-btn second-btn"
//             style={{
//               marginLeft: "7px",
//               backgroundColor: "black",
//               color: "white",

//             }}
//             onClick={() => markAsSold(product._id)}
//           >
//             Mark as Sold
//           </button>
//         )}
//       </div>
//     </div>
//   ))}
// </div>

//     </Layout>
//   );
// };

// export default Available;



// data:image/jpeg;base64,




















import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import "../../Styles/Sold.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/Auth.js";
import { toast } from "react-hot-toast"
import Loading from "./Loading.jsx";
import LoadingScreen from 'react-loading-screen';

const Available = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [auth] = useAuth();
  const [imgurl, setImageurl] = useState("");
  const [total, setTotal] = useState(null);
  const [page, setPage] = useState(1);
  const [loadingBtn, setLoadingBtn] = useState(false);
  const [loadingCheck, setLoadingCheck] = useState(false);

  const getProducts = async () => {
    try {
      setLoadingCheck(true);
      const { data } = await axios.get(
        `https://marketplace-new-84mw.vercel.app/api/v1/product/available-list/${page}`
      );
      if (data?.success) {
        setLoadingCheck(false)
        console.log("this is storing locally");
        setProducts(data.products); // Update state with products
        // console.log(products);



      }


    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };


  const loadMore = async () => {
    try {
      setLoadingBtn(true);
      const { data } = await axios.get(
        `https://marketplace-new-84mw.vercel.app/api/v1/product/available-list/${page}`
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


  const markAsSold = async (productId) => {
    try {
      const { data } = await axios.patch(
        `https://marketplace-new-84mw.vercel.app/api/v1/product/Marksold/${productId}`,
        { status: "sold" }
      );
      if (data?.success) {
        toast.success(data.message);
   
      } else {
        alert("Failed to update product status.");
      }
    } catch (error) {
      console.error("Error updating product status:", error);
      alert("Error occurred while marking the product as sold.");
    }
  };
  const GettingSinglePhoto = async (productId) => {
    try {
      const data = await axios.get(`https://marketplace-new-84mw.vercel.app/api/v1/product/getPhoto/${productId}`);
      if (data.success) {
        console.log("image is ", data);
        return data;

      }
    } catch (error) {

    }
  }
  const gettingPhoto = async () => {
    try {

    } catch (error) {

    }
  }

  const getTotal = async () => {
    try {
      const { data } = await axios.get(`https://marketplace-new-84mw.vercel.app/api/v1/product/product-count`);
      if (data.success) {

        setTotal(data?.totalProducts);
        // console.log("total available products are",total);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getTotal();
    getProducts();

  }, []);


  useEffect(() => {
    if (page === 1) return;
    console.log("page is ", page);

    loadMore();
  }, [page]);
  useEffect(() => {
    console.log("available per page products are", products);
  }, [products]);

  return (
    <Layout>
      <>

        {loadingCheck && 
              <Loading />
        }

         
     <div className="mt-32" style={{marginTop:"4.5rem"}}>
          
        

        <div className="card-container">
          
          {!loadingCheck &&  products?.map((product) => (

            <div className="card" key={product._id}>
              
              <div className="status-banner" >
                {product.status === "available" ? "Available" : "Sold"}
              </div>
              <img

               
            src={`https://marketplace-new-84mw.vercel.app/api/v1/product/getPhoto/${product._id}`}
                // src=""
                alt={product.name}
                className="card-img"
              />
              <div className="card-content">
                <h3 className="card-title">{product?.name}</h3>
                <p className="card-price">£{product?.price}</p>
                <p className="card-description">{product?.description.substring(0, 40)}...</p>
                <button
                  className="card-btn"
                  onClick={() => navigate(`/available/${product._id}`)}
                >
                  More Details
                </button>
                {auth.admin && (
                  <button
                    className="card-btn second-btn"
                    style={{
                      marginLeft: "7px",
                      backgroundColor: "black",
                      color: "white",

                    }}
                    onClick={() => markAsSold(product._id)}
                  >
                    Mark as Sold
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="m-2 p-3" style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
          {!loadingCheck &&  products && products.length < total && total>=10 && (
            <button
              style={{ backgroundColor: "black", color: "white" }}
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
      </>
    </Layout>
  );
};

export default Available;








// import React, { useState, useEffect } from "react";
// import Layout from "./Layout";
// import "../../Styles/Sold.css";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../../context/Auth.js";
// import { toast } from "react-hot-toast";

// const Available = () => {
//   const navigate = useNavigate();
//   const [products, setProducts] = useState([]);
//   const [auth] = useAuth();

//   const getProducts = async () => {
//     try {
//       const { data } = await axios.get(
//         ` https://marketplace-new-84mw.vercel.app /api/v1/product/available`
//       );
//       if (data?.success) {
//         // Convert buffer data to Base64 string for all products
//         const productsWithImages = data.availableProducts.map((product) => {
//           const bufferData = product.photos[0]?.data; // Access the buffer data
//           const base64Image = bufferData
//             ? `data:image/jpeg;base64,${btoa(
//                 String.fromCharCode(...new Uint8Array(bufferData))
//               )}`
//             : ""; // Convert buffer to Base64
//           return { ...product, imageUrl: base64Image };
//         });
//         setProducts(productsWithImages); // Update state with products
//       }
//     } catch (error) {
//       console.error("Error fetching products:", error);
//     }
//   };

//   const markAsSold = async (productId) => {
//     try {
//       const { data } = await axios.patch(
//         ` https://marketplace-new-84mw.vercel.app /api/v1/product/Marksold/${productId}`,
//         { status: "sold" }
//       );
//       if (data?.success) {
//         // Update the local state to reflect the status change
//         setProducts((prevProducts) =>
//           prevProducts.filter((product) => product._id !== productId)
//         );
//         toast.success(data.message);
//       } else {
//         alert("Failed to update product status.");
//       }
//     } catch (error) {
//       console.error("Error updating product status:", error);
//       alert("Error occurred while marking the product as sold.");
//     }
//   };

//   useEffect(() => {
//     getProducts();
//   }, []);

//   return (
//     <Layout>
//       <div className="card-container">
//         {products?.map((product) => (
//           <div className="card" key={product._id}>
//             <div className="status-banner">
//               {product.status === "available" ? "Available" : "Sold"}
//             </div>
//             <img
//               src={product.imageUrl} // Use the Base64 encoded image
//               alt={product.name}
//               className="card-img"
//             />
//             <div className="card-content">
//               <h3 className="card-title">{product.name}</h3>
//               <p className="card-price">${product.price}</p>
//               <p className="card-description">
//                 {product.description.substring(0, 40)}...
//               </p>
//               <button
//                 className="card-btn"
//                 onClick={() => navigate(`/available/${product._id}`)}
//               >
//                 More Details
//               </button>
//               {auth.admin && (
//                 <button
//                   className="card-btn second-btn"
//                   style={{
//                     marginLeft: "7px",
//                     backgroundColor: "black",
//                     color: "white",
//                   }}
//                   onClick={() => markAsSold(product._id)}
//                 >
//                   Mark as Sold
//                 </button>
//               )}
//             </div>
//           </div>
//         ))}
//       </div>
//     </Layout>
//   );
// };

// export default Available;

