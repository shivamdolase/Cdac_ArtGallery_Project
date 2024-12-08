// React Component
import React, { useState, useEffect } from 'react';
import axios from 'axios'; // For making API requests
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/css/port1.css'; // Custom CSS for styling

const Potraits = () => {
  // State to hold artwork data
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  const fetchArtworks = async () => {
    try {
      const response = await axios.get(''); // Replace with your actual API endpoint
      setArtworks(response.data);
    } catch (err) {
      setError('Failed to fetch artwork data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };
  // Fetch data from API on component mount
  useEffect(() => {

    fetchArtworks();
  }, []);

  if (loading) {
    return <div className="text-center my-5">Loading...</div>;
  }

  if (error) {
    return <div className="text-center my-5 text-danger">{error}</div>;
  }

  return (
    <div className="container my-5">
      <h1 className="text-center mb-4">Abstract Art</h1>
      <div className="row">
        {artworks.map((art) => (
          <div key={art.id} className="col-12 mb-4">
            <div className="card shadow-sm">
              <div className="row g-0 align-items-center">
                <div className="col-md-4">
                  <img
                    src={art.image}
                    className="img-fluid rounded-start"
                    alt={`Artwork by ${art.artist}`}
                  />
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h5 className="card-title">Artist: {art.artist}</h5>
                    <p className="card-text">Price: ${art.price}</p>
                    <textarea
                      className="form-control mb-3"
                      rows="3"
                      placeholder="Enter your review"
                    ></textarea>
                    <div>
                      <button className="btn btn-success me-2">Add Review</button>
                      <button className="btn btn-dark">Buy</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Potraits;
