import React from "react";
import Layout from "./Layout";

import { BiMailSend, BiPhoneCall, BiSupport } from "react-icons/bi";
const Contact = () => {
  return (
    <Layout title={"Contact us"}>
      <div className="row contactus ">
        <div className="col-md-6 ">
          <img
            src="/contactus.jpeg"
            alt="contactus"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4" style={{display:"flex",flexDirection:"column" }}>
          <h1 className="bg-dark p-2 text-white text-center">CONTACT US</h1>
          <p className="text-justify mt-2" style={{alignContent:"center"}}>
            any query and info about prodduct feel free to call anytime we 24X7
            vaialible
          </p>
          <p className="mt-3" tyle={{alignContent:"center"}}>
            <BiMailSend /> :Saadullahkhan30@gmail.com
          </p>
          <p className="mt-3">
            <BiPhoneCall /> : +447983484110
          </p>
          <p className="mt-3">
            <BiSupport /> : +447983484110
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;