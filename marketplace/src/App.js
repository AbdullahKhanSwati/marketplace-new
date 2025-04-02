import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Layout/Header";

import Homepage from "./components/Layout/Homepage";
import Available from "./components/Layout/Available.jsx";
import Sold from "./components/Layout/Sold.jsx";
import AvailableDetails from "./components/Layout/AvailableDetails.jsx";
import AddProduct from "./components/Layout/AddProduct.jsx";
import Login from "./components/Layout/Login.jsx";
import SoldDetails from "./components/Layout/SoldDetails.jsx";
import UpdateProduct from "./components/Layout/UpdateProduct.jsx";
import SearchResult from "./components/Layout/SearchResult.jsx";
import PageNotFound from "./components/Layout/PageNotFound.jsx";
import Contact from "./components/Layout/Contact.jsx";
import Services from "./components/Layout/Services.jsx";
import AboutUs from "./components/Layout/AboutUs.jsx";
import Khan321 from "./components/Layout/Khan321.jsx";
// import Navbar from "./Navbar/Navbar";
// import Home from "./pages/Home";
// import News from "./pages/News";


const App = () => {
 return (
  <>
 
    
     
       <Routes>
         <Route path="/" element={<Available />} />
         <Route path="/khan321" element={<Khan321 />} />


         <Route path="/search-result" element={<SearchResult />} />
         <Route path='*'  element={<PageNotFound />} />

         <Route path="/login" element={<Login />} />
         <Route path="/contact" element={<Contact />} />
         <Route path="/services" element={<Services />} />
         <Route path="/about" element={<AboutUs />} />




         <Route path="/available" element={<Available />} />
         <Route path="/add-product" element={<AddProduct />} />

         <Route path="/available/:id" element={<AvailableDetails />} />
         <Route path="/available/update/:id" element={<UpdateProduct />} />

         <Route path="/sold/:id" element={<SoldDetails />} />

         

         <Route path="/sold" element={<Sold />} />


         

         {/* <Route path="/news" element={<News />} /> */}
         {/* Define other routes that you need*/}
       </Routes>
     
  
  </>
 );
};

export default App;