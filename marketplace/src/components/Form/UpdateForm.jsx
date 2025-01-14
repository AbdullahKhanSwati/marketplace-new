import React from 'react'

const UpdateForm = ()=> {
  return (
    <div className="add-product-container">
      <h2 className="add-product-title">Add New Product</h2>
      <form className="add-product-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Product Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={product.name}
            onChange={handleInputChange}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={product.description}
            onChange={handleInputChange}
            className="form-input"
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input
            type="number"
            id="price"
            name="price"
            value={product.price}
            onChange={handleInputChange}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="photos">Upload Photos</label>
          <input
            type="file"
            id="photos"
            name="photos"
            multiple
            onChange={handleFileChange}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="status">Status</label>
          <select
            id="status"
            name="status"
            value={product.status}
            onChange={handleInputChange}
            className="form-input"
          >
            <option value="available">Available</option>
            <option value="sold">Sold</option>
          </select>
        </div>
        <button  type="submit" className="submit-btn" disabled={loading}>
          {loading ? "Submitting..." : "Add Product"}
        </button>
      </form>
    </div>
  )
}

export default UpdateForm