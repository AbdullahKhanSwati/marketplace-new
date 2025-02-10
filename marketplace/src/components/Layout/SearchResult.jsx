

import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import "../../Styles/Sold.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/Auth.js";
import { useSearch } from "../../context/search.js";
import {toast} from "react-hot-toast"

const SearchResult = () => {
  const navigate = useNavigate();
  const [values , setValues] = useSearch();
  const [products, setProducts] = useState([]);
  
  const [auth] = useAuth();
  const { results } = values;
  

  const markAsAvailable = async (productId) => {
        try {
          const { data } = await axios.patch(
            `https://marketplace-new-84mw.vercel.app/api/v1/product/Markavailable/${productId}`,
            { status: "available" }
          );
          if (data?.success) {
            toast.success(data.message);
        
          } else {
            alert("Failed to update product status.");
          }
        } catch (error) {
          console.error("Error updating product status:", error);
          alert("Error occurred while marking the product as available.");
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
 

  
  return (
    <Layout>
      <div style={{marginTop:"4.5rem"}}></div>
    <div className="card-container">
      {results?.resutls?.length > 0 ? ( // Use results.resutls to access the array
        results.resutls.map((product) => (
           
            <div className="card" key={product._id}>
              
            <div className="status-banner" style={{
    backgroundColor: product.status === "available" ? "green" : "red",
    color: "white", // Optional: For better text visibility
  }}>
              {product.status === "available" ? "Available" : "Sold"}
              
              
            </div>
            <img
              src={`https://marketplace-new-84mw.vercel.app/api/v1/product/getPhoto/${product._id}`}
              alt={product.name}
              className="card-img"
            />
            <div className="card-content">
              <h3 className="card-title">{product.name}</h3>
              <p className="card-price">£{product.price}</p>
              <p className="card-description">
                {product.description.substring(0, 40)}...
              </p>
              <button
                className="card-btn"
                onClick={() => navigate(`/${product.status}/${product._id}`)}
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
                                    onClick={() =>
                                      product.status === "available"
                                        ? markAsSold(product._id)
                                        : markAsAvailable(product._id)
                                    }
                                  >
                                    Mark {product.status === "available" ? "as Sold" : "Available"}
                                  </button>
              )}
            </div>
          </div>
        ))
      ) : (
        <p>No products found.</p>
      )}
    </div>
  </Layout>
  );
};

export default SearchResult;






// import React, { useState, useEffect } from "react";
// import Layout from "./Layout";
// import "../../Styles/Sold.css";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../../context/Auth.js";
// import { useSearch } from "../../context/search.js";
// import { toast } from "react-hot-toast";

// const SearchResult = () => {
//   const navigate = useNavigate();
//   const [values, setValues] = useSearch(); // Custom hook
//   const [auth] = useAuth();
//   const { results } = values;

  

//   const markAsAvailable = async (productId) => {
//     try {
//       const { data } = await axios.patch(
//         ` https://marketplace-new-84mw.vercel.app /api/v1/product/Markavailable/${productId}`,
//         { status: "available" }
//       );
//       if (data?.success) {
//         toast.success(data.message);
    
//       } else {
//         alert("Failed to update product status.");
//       }
//     } catch (error) {
//       console.error("Error updating product status:", error);
//       alert("Error occurred while marking the product as available.");
//     }
//   };

//   const markAsSold = async (productId) => {
//     try {
//       const { data } = await axios.patch(
//         ` https://marketplace-new-84mw.vercel.app /api/v1/product/Marksold/${productId}`,
//         { status: "sold" }
//       );
//       if (data?.success) {
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
//   console.log("inside search result",results);
//   },[]); // Only re-run when keyword changes

//   return (
//     <Layout>
//       <div className="card-container">
//         {results?.length > 0 ? (
//           results.map((product) => (
//             <div className="card" key={product._id}>
//               <div
//                 className="status-banner"
//                 style={{
//                   backgroundColor: product.status === "available" ? "green" : "#b02033",
//                   color: "white",
//                 }}
//               >
//                 {product.status === "available" ? "Available" : "Sold"}
//               </div>
//               <img
//                 src={` https://marketplace-new-84mw.vercel.app /api/v1/product/photo/${product._id}`}
//                 alt={product.name}
//                 className="card-img"
//               />
//               <div className="card-content">
//                 <h3 className="card-title">{product.name}</h3>
//                 <p className="card-price">${product.price}</p>
//                 <p className="card-description">
//                   {product.description.substring(0, 40)}...
//                 </p>
//                 <button
//                   className="card-btn"
//                   onClick={() => navigate(`/${product.status}/${product._id}`)}
//                 >
//                   More Details
//                 </button>
//                 {auth.admin && (
//                   <button
//                     className="card-btn second-btn"
//                     style={{
//                       marginLeft: "7px",
//                       backgroundColor: "black",
//                       color: "white",
//                     }}
//                     onClick={() =>
//                       product.status === "available"
//                         ? markAsSold(product._id)
//                         : markAsAvailable(product._id)
//                     }
//                   >
//                     Mark as {product.status === "available" ? "Sold" : "Available"}
//                   </button>
//                 )}
//               </div>
//             </div>
//           ))
//         ) : (
//           <p>No products found.</p>
//         )}
//       </div>
//     </Layout>
//   );
// };

// export default SearchResult;
