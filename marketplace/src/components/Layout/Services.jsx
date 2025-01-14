import React from "react";
import "../../Styles/Services.css";
import Layout from "./Layout";
const Services = () => {
  return (

    <Layout>
    <div className="services-container">
      <h2 className="services-title">Our Services</h2>
      <p className="services-intro">
        At <strong>MXO Use-Products</strong>, we specialize in delivering top-quality second-hand products to customers across the UK. 
        Our mission is to provide affordable, reliable, and sustainable solutions to meet your needs without compromising on quality.
      </p>
      <p className="services-description">
        We carefully curate a wide range of pre-owned products, ensuring each item meets our rigorous standards for functionality and durability. 
        Whether you're looking for home appliances, electronics, furniture, or other essentials, MXO Use-Products is your trusted partner for value-packed purchases.
      </p>
      <h3 className="services-subtitle">Why Choose Us?</h3>
      <ul className="services-list">
        <li><strong>Nationwide Delivery:</strong> We serve customers throughout the UK, ensuring your purchase reaches you promptly and securely.</li>
        <li><strong>Commitment to Quality:</strong> Each product undergoes a thorough inspection process to guarantee the highest standards.</li>
        <li><strong>Sustainability:</strong> By promoting second-hand products, we help reduce waste and support eco-friendly practices.</li>
        <li><strong>Affordable Pricing:</strong> Our products are not only high-quality but also budget-friendly, offering incredible value.</li>
      </ul>
    </div>
    </Layout>
  );
};

export default Services;
