import React from "react";
import "../../Styles/AboutUs.css";
import Layout from "./Layout";
const AboutUs = () => {
    return (
      <Layout>
    <div className="about-us-container">
      <h1 className="about-us-title">About Us</h1>
      <p className="about-us-description">
        Welcome to <strong>MXO Use-Products</strong>, your trusted partner for high-quality second-hand products across the UK. Our mission is to provide affordable and reliable solutions that combine quality with sustainability.
      </p>
      <div className="about-us-content">
        <h2>Our Story</h2>
        <p>
          At MXO Use-Products, we believe in the power of reusing and repurposing. Founded with a vision to promote eco-friendly practices and reduce waste, we strive to make quality products accessible to everyone.
        </p>
        <h2>Our Mission</h2>
        <p>
          To deliver exceptional value to our customers by offering thoroughly inspected second-hand products. We aim to contribute to a sustainable future while meeting your everyday needs.
        </p>
        <h2>Why Choose Us?</h2>
        <ul>
          <li>
            <strong>Nationwide Delivery:</strong> We deliver to all corners of the UK, ensuring prompt and secure shipping.
          </li>
          <li>
            <strong>Quality Assurance:</strong> Every product is carefully tested to meet our high standards of durability and functionality.
          </li>
          <li>
            <strong>Eco-Friendly Practices:</strong> By choosing second-hand products, you're supporting a greener planet.
          </li>
          <li>
            <strong>Affordable Pricing:</strong> Enjoy quality at unbeatable prices, making your purchase worth every penny.
          </li>
        </ul>
      </div>
    </div>
    </Layout>
  );
};

export default AboutUs;
