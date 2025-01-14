// import React from "react";
// import { Link ,NavLink} from "react-router-dom";
// const Footer = () => {
//   return (
//     <div className="footer">
//       <h1 className="text-center" style={{fontSize:"21px"}}>All Right Reserved &copy; Techinfoyt</h1>
//       <p className="text-center mt-3 footerPara">
//         <NavLink to="/about" className="paraItem">About</NavLink>
//         <NavLink to="/contact" className="paraItem">Contact</NavLink>
//         <NavLink to="/policy" className="paraItem">Privacy Policy</NavLink>
        

//           </p>
//     </div>
//   );
// };

// export default Footer;





import React from 'react'
import "../../Styles/Footer.css"
import { NavLink } from 'react-router-dom';

const Footer = () => {
    return (
        <>
            <div className="Footer">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 col-lg-5 col-12 ft-1">
                            <h3><span>MXO</span>Used-products</h3>
                            <p>We specialize in delivering high-quality second-hand products across the UK, ensuring affordability and sustainability. Our service connects you to a wide range of pre-loved items.</p>
                           
                        </div>
                        <div className="col-md-6 col-lg-3 col-12 ft-2">
                            <h5>Quick Links</h5>
                            <ul>
                                <li className="nav-item">
                                <NavLink style={{textDecoration:"none" ,color:"white"}} to={"/services"}>Services</NavLink>
                                </li>
                               
                                <li className="nav-item">
                                    <NavLink style={{textDecoration:"none" ,color:"white"}} to={"/contact"}>Contact</NavLink>
                                    {/* <a className="" href="/">Contact Us</a> */}
                                </li>
                                <li className="nav-item">
                                <NavLink style={{textDecoration:"none" ,color:"white"}} to={"/available"}>Available</NavLink>
                                </li>
                                <li className="nav-item">
                                <NavLink style={{textDecoration:"none" ,color:"white"}} to={"/sold"}>Sold</NavLink>
                                </li>
                               
                            </ul>
                        </div>
                        <div className="col-md-6 col-lg-4 col-12 ft-3">
                            <h5>Contact</h5>
                            <p><i class="fa-solid fa-phone-volume"></i> +447983484110</p>
                            <p><i class="fa-solid fa-envelope"></i> Saadullahkhan30@gmail.com</p>
                            <p><i class="fa-solid fa-paper-plane"></i> Northampton, U.K</p>
                        </div>
                    </div>
                </div>
            </div>
            
        </>
    )
}

export default Footer;