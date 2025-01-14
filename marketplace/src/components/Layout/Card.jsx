import React from 'react';
import "../../Styles/Sold.css";

function Card() {
  return (
    <div className="card-container">
      {/* Card 1 */}
      <div className="card">
        <img src="/pc.jpg" alt="Product Image" className="card-img" />
        <div className="card-content">
          <h3 className="card-title">Product 1</h3>
          <p className="card-price">$50</p>
          <p className="card-description">Product description goes here...</p>
          <button className="card-btn">Buy Now</button>
        </div>
      </div>
    </div>
    
  );
}

export default Card;
