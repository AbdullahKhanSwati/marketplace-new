// import React from "react";
// import { NavLink, Link } from "react-router-dom";
// import { GiShoppingBag } from "react-icons/gi";

// const Header = () => {
//   return (
//     <>
//       <nav className="navbar navbar-expand-lg bg-body-tertiary">
//         <div className="container-fluid">
//           <button
//             className="navbar-toggler "
//             type="button"
//             data-bs-toggle="collapse"
//             data-bs-target="#navbarTogglerDemo01"
//             aria-controls="navbarTogglerDemo01"
//             aria-expanded="false"
//             aria-label="Toggle navigation"
//           >
//             <span className="navbar-toggler-icon" />
//           </button>
//           <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
//             <Link to="/" className="navbar-brand">
//               🛒 Ecommerce App
//             </Link>
//             <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
//               <li className="nav-item active">
//                 <NavLink to="/" className="nav-link active ">
//                   Home
//                 </NavLink>
//               </li>
//               {/* <li className="nav-item active">
//                 <NavLink to="/fklldnf" className="nav-link ">
//                   Category
//                 </NavLink>
//               </li> */}
//               <li className="nav-item active">
//                 <NavLink to="/register" className="nav-link">
//                   Register
//                 </NavLink>
//               </li>
//               <li className="nav-item">
//                 <NavLink to="/" className="nav-link">
//                   Login
//                 </NavLink>
//               </li>
//               <li className="nav-item">
//                 <NavLink to="/cart" className="nav-link">
//                   Cart (0)
//                 </NavLink>
//               </li>
//             </ul>
//           </div>
//         </div>
//       </nav>
//     </>
//   );
// };

// export default Header;

















// import React from 'react';
// import { NavLink ,Link} from 'react-router-dom';
// import { GiShoppingBag } from "react-icons/gi";

// // import { toast} from 'react-toastify';
// // import useCategory from "../../hooks/useCategory"
 
// // import toast, { Toaster } from 'react-hot-toast';
// // import {useCart} from "../../context/Cart.js"
// // import {Badge} from "antd";
// const Header = () => {
  


//   return (
//     <nav className="navbar navbar-expand-lg bg-dark  bg-body-tertiary">
//       <div className="container-fluid">
//         <Link  className="navbar-brand nav__logo" style={{display:"inline" , width :"203px" , textAlign:"center"}}>  <GiShoppingBag style={{marginBottom:"-22px"}} />  Ecomerce App</Link>
//         <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
//           <span className="navbar-toggler-icon"></span>
//         </button>
       

       



//         <div className="navbar-collapse" id="navbarNav">

//           <ul className="navbar-nav ms-auto">
//           <form className="d-flex" style={{marginRight:"60px"}} role="search">
//         <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
//         <button className="btn btn-outline-success" type="submit">Search</button>
//       </form>

//             {/* <li className="nav-item">
//               <NavLink className="nav-link" activeClassName="active" exact to="/available">Available</NavLink>
//             </li>

//             <li className="nav-item">
//               <NavLink className="nav-link" activeClassName="active" exact to="/sold">Sold</NavLink>
//             </li> */}

// <li className="nav-item" id='listNo1'>
//   <NavLink 
  
//     className="nav-link " 
//     activeClassName="active-nav-link" 
//     exact 
//     to="/available"
//   >
//     Available
//   </NavLink>
// </li>

// <li className="nav-item" id='listNo2'>
//   <NavLink 

//     className="nav-link" 
//     activeClassName="active-nav-link" 
//     exact 
//     to="/sold"
//   >
//     Sold
//   </NavLink>
// </li>



           



            

              
             
         




              
            
            
           
           
            
           
//           </ul>
//         </div>
//       </div>
//     </nav>
  
     
    
//   )

// };

// export default Header;




import React, { useState , useEffect } from 'react';
import { NavLink, Link ,useNavigate } from 'react-router-dom';
import { GiShoppingBag } from "react-icons/gi";
import { useAuth } from '../../context/Auth.js';
import { useSearch } from '../../context/search.js';
import axios from 'axios';

const Header = () => {
const navigate = useNavigate();
  const [values , setValues] = useSearch();
  const [auth ,setAuth ] = useAuth();

const HandleSearchSubmit = async (e) =>{
  e.preventDefault();
  try {
    const {data} = await axios.get(` /api/v1/product/search/${values.keyword}`)
    setValues({...values,results: data});
   navigate('/search-result');

    // console.log("search result is ",values);

  } catch (error) {
    console.log(error);
  }
}

useEffect(() => {
  console.log("Updated search result is:", values);
}, [values]);
  return (
    <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
      <div className="container-fluid">
        <Link 
          className="navbar-brand nav__logo" 
          style={{ display: "inline", width: "264px", textAlign: "center" }}
        >  
          <GiShoppingBag style={{ marginBottom: "-22px" }} /> <span style={{color:"#f60838"}}> MXO </span>Used-Products
        </Link>
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav" 
          aria-controls="navbarNav" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="navbar-collapse collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <form className="d-flex" style={{ marginRight: "60px" }} role="search">
              <input 
                className="form-control me-2" 
                type="search" 
                placeholder="Search" 
                aria-label="Search" 
                style={{height:"40px",textAlign:"center"}}
                value={values.keyword}
                onChange={(e)=> setValues({...values, keyword:e.target.value})}
              />
              <button onClick={HandleSearchSubmit} className="btn btn-outline-success" type="submit"  style={{height:"40px",textAlign:"center"}}>Search</button>
            </form>

            <li className="nav-item" id="listNo1">
              <NavLink 
                className="nav-link" 
                activeClassName="active-nav-link" 
                exact 
                to="/available"
              >
                Available
              </NavLink>
            </li>
           

            <li className="nav-item" id="listNo2">
              <NavLink 
                className="nav-link" 
                activeClassName="active-nav-link" 
                exact 
                to="/sold"
              >
                Sold
              </NavLink>
            </li>


             {auth.admin ? (
              <>

<li className="nav-item" id="listNo1">
              <NavLink 
                className="nav-link" 
                activeClassName="active-nav-link" 
                exact 
                to="/add-product"
              >
                add-product
              </NavLink>
            </li>
            </>
             ):""

            }

            

          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
