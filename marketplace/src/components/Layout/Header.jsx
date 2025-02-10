
// import React, { useState, useEffect } from 'react';
// import { NavLink, Link, useNavigate } from 'react-router-dom';
// import { GiShoppingBag } from "react-icons/gi";
// import { useAuth } from '../../context/Auth.js';
// import { useSearch } from '../../context/search.js';
// import axios from 'axios';
// import { toast } from "react-hot-toast"
// const Header = () => {
//   const navigate = useNavigate();
//   const [values, setValues] = useSearch();
//   const [auth, setAuth] = useAuth();

//   const HandleSearchSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const { data } = await axios.get(`https://marketplace-new-84mw.vercel.app/api/v1/product/search/${values.keyword}`)
//       setValues({ ...values, results: data });
//       navigate('/search-result');

//       // console.log("search result is ",values);

//     } catch (error) {
//       console.log(error);
//     }
//   }
//   const handleLogout = async () => {
//     setTimeout(() => {

//       toast.success("Logout successfully");
//     }, 2000);

//     setAuth({
//       ...auth,
//       admin: null,
//       token: ""
//     })
//     localStorage.removeItem("auth");
//   }
//   useEffect(() => {
//     console.log("Updated search result is:", values);
//   }, [values]);
//   return (
//     <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
//       <div className="container-fluid">
//         <Link
//           className="navbar-brand nav__logo"
//           style={{ display: "inline", width: "264px", textAlign: "center" }}
//         >
//           <GiShoppingBag style={{ marginBottom: "-22px" }} /> <span style={{ color: "#f60838" }}> MXO </span>Used-Products
//         </Link>
//         <button
//           className="navbar-toggler"
//           type="button"
//           data-bs-toggle="collapse"
//           data-bs-target="#navbarNav"
//           aria-controls="navbarNav"
//           aria-expanded="false"
//           aria-label="Toggle navigation"
//         >
//           <span className="navbar-toggler-icon"></span>
//         </button>

//         <div className="navbar-collapse collapse" id="navbarNav">
//           <ul className="navbar-nav ms-auto">
//             <form className="d-flex" style={{ marginRight: "60px" }} role="search">
//               <input
//                 className="form-control me-2"
//                 type="search"
//                 placeholder="Search"
//                 aria-label="Search"
//                 style={{ height: "40px", textAlign: "center" }}
//                 value={values.keyword}
//                 onChange={(e) => setValues({ ...values, keyword: e.target.value })}
//               />
//               <button onClick={HandleSearchSubmit} className="btn btn-outline-success" type="submit" style={{ height: "40px", textAlign: "center" }}>Search</button>
//             </form>

//             <li className="nav-item" id="listNo1">
//               <NavLink
//                 className="nav-link"
//                 activeClassName="active-nav-link"
//                 exact
//                 to="/available"
//               >
//                 Available
//               </NavLink>
//             </li>


//             <li className="nav-item" id="listNo2">
//               <NavLink
//                 className="nav-link"
//                 activeClassName="active-nav-link"
//                 exact
//                 to="/sold"
//               >
//                 Sold
//               </NavLink>
//             </li>









//             {auth.admin ? (
//               <>

//                 <li className="nav-item" id="listNo1">
//                   <NavLink
//                     className="nav-link"
//                     activeClassName="active-nav-link"
//                     exact
//                     to="/add-product"
//                   >
//                     add-product
//                   </NavLink>
//                 </li>
//               </>
//             ) : ""

//             }



//             {!auth.admin ? (
//               <>
//                 <li className="nav-item" id="listNo1">
//                   <NavLink
//                     className="nav-link"
//                     activeClassName="active-nav-link"
//                     exact
//                     to="/login"
//                   >
//                     Login
//                   </NavLink>
//                 </li>

//               </>
//             ) : <li className="nav-item" id="listNo1">

//               <button  
//               className="nav-link"
//               activeClassName="active-nav-link"
//               onClick={handleLogout}
//               >
//                 Logout
//               </button>
            
//           </li>

//             }
//           </ul>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Header;



import React, { useState, useEffect } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { GiShoppingBag } from "react-icons/gi";
import { useAuth } from '../../context/Auth.js';
import { useSearch } from '../../context/search.js';
import axios from 'axios';
import { toast } from "react-hot-toast"

const Header = () => {
  const navigate = useNavigate();
  const [values, setValues] = useSearch();
  const [auth, setAuth] = useAuth();

  const HandleSearchSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(`https://marketplace-new-84mw.vercel.app/api/v1/product/search/${values.keyword}`)
      setValues({ ...values, results: data });
      navigate('/search-result');
    } catch (error) {
      console.log(error);
    }
  }

  const handleLogout = async () => {
    setTimeout(() => {
      toast.success("Logout successfully");
    }, 2000);

    setAuth({
      ...auth,
      admin: null,
      token: ""
    })
    localStorage.removeItem("auth");
  }

  useEffect(() => {
    console.log("Updated search result is:", values);
  }, [values]);

  return (
    <nav className="navbar navbar-expand-lg bg-dark navbar-dark fixed-top mb-24">
      <div className="container-fluid">
        <Link
          className="navbar-brand nav__logo"
          style={{ display: "inline", width: "264px", textAlign: "center" }}
        >
          <GiShoppingBag style={{ marginBottom: "-22px" }} /> <span style={{ color: "#f60838" }}> MXO </span>Used-Products
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
                style={{ height: "40px", textAlign: "center" }}
                value={values.keyword}
                onChange={(e) => setValues({ ...values, keyword: e.target.value })}
              />
              <button onClick={HandleSearchSubmit} className="btn btn-outline-success" type="submit" style={{ height: "40px", textAlign: "center" }}>Search</button>
            </form>

            <li className="nav-item" id="listNo1">
              <NavLink className="nav-link" exact to="/available">Available</NavLink>
            </li>

            <li className="nav-item" id="listNo2">
              <NavLink className="nav-link" exact to="/sold">Sold</NavLink>
            </li>

            {auth.admin ? (
              <li className="nav-item" id="listNo1">
                <NavLink className="nav-link" exact to="/add-product">Add Product</NavLink>
              </li>
            ) : ""}

            {!auth.admin ? (
              <li className="nav-item" id="listNo1">
                <NavLink className="nav-link" exact to="/login">Login</NavLink>
              </li>
            ) : (
              <li className="nav-item" id="listNo1">
                <button className="nav-link" onClick={handleLogout}>Logout</button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
