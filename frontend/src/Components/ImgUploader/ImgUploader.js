import React, { useState, useEffect } from "react";
import axios from "axios";
import Nav from "../Nav/Nav";
import "./ImgUploader.css";

function ImgUploader() {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/getImage");
      if (response.data.status === "ok") {
        setImages(response.data.images);
      }
    } catch (err) {
      setError("Failed to fetch images");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("image", file);

    try {
      const response = await axios.post(
        "http://localhost:5000/uploadImage",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (response.data.status === "ok") {
        setTitle("");
        setFile(null);
        e.target.reset();
        fetchImages();
      } else {
        setError("Failed to upload image");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Error uploading image");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Nav />
      <div className="gallery-container">
        <div className="gallery-content">
          <div className="gallery-header">
            <h1>Image Gallery</h1>
            <p>Upload and showcase your images</p>
          </div>

          {error && <div className="error-message">{error}</div>}

          <form onSubmit={handleSubmit} className="upload-form">
            <label>Image Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              placeholder="Enter image title"
            />

            <label>Select Image</label>
            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              accept="image/*"
              required
            />

            <button type="submit" disabled={loading}>
              {loading ? "Uploading..." : "Upload Image"}
            </button>
          </form>

          {loading && <div className="loading">Loading images...</div>}

          <div className="gallery-grid">
            {images.map((image) => (
              <div key={image._id} className="image-card">
                <img
                  src={`http://localhost:5000/files/${image.image}`}
                  alt={image.title}
                />
                <div className="image-info">
                  <h3>{image.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ImgUploader;
