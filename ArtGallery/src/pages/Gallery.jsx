// React Component
import React, { useState, useEffect } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css'; // Importing Bootstrap CSS
import "../assets/css/Gallery.css"; // Importing custom CSS

const Gallery = () => {
  // State to hold category data
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch categories from API on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('/api/categories'); // Replace with your actual API endpoint
        setCategories(response.data);
      } catch (err) {
        setError('Failed to fetch gallery categories. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return <div className="text-center my-5">Loading...</div>;
  }

  if (error) {
    return <div className="text-center my-5 text-danger">{error}</div>;
  }

  return (
    <div className="gallery">
      <div className="container my-4">
        <div className="gal-header text-center">
          <h1 className="display-4 font-weight-bold">Art Gallery</h1>
        </div>
      </div>

      <div className="gal-img-header mb-5">
        {/* Example static header image */}
        <img src="../assets/img/background-sketch.jpg" alt="Gallery Header" className="img-fluid" />
      </div>

      <div className="container">
        <div className="row">
          {categories.map((category) => (
            <div key={category.id} className="col-lg-4 col-md-6 mb-4">
              <div className="card shadow-sm">
                <img
                  src={category.image}
                  className="card-img-top img-fluid"
                  alt={category.category}
                />
                <div className="card-body text-center">
                  <h5 className="card-title">{category.category}</h5>
                  <p className="card-text">{category.description}</p>
                  <a href={category.route} className="btn btn-primary">Explore</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gallery;
