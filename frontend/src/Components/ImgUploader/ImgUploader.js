import React, { useState, useEffect } from "react";
import Nav from "../Nav/Nav";
import axios from "axios";
import "./ImgUploader.css";
import { FaCloudUploadAlt } from "react-icons/fa";

function ImgUploader() {
  //State management for form inputs and data
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [allImages, setAllImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch images when component mounts
  useEffect(() => {
    fetchImages();
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Validate image selection
    if (!image) {
      setError("Please select an image");
      setLoading(false);
      return;
    }

    // Create form data for file upload
    const formData = new FormData();
    formData.append("title", title);
    formData.append("image", image);

    try {
      // Send POST request to upload image
      const response = await axios.post(
        "http://localhost:5000/uploadImage",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Handle successful upload
      if (response.data.status === "ok") {
        alert("Image uploaded successfully!");
        setTitle("");
        setImage(null);
        e.target.reset();
        fetchImages(); // Refresh image list
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      setError(
        error.response?.data?.message ||
          "Failed to upload image. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // Fetch all images from server
  const fetchImages = async () => {
    try {
      const response = await axios.get("http://localhost:5000/getImage");
      if (response.data.status === "ok") {
        setAllImages(response.data.images);
      }
    } catch (error) {
      console.error("Error fetching images:", error);
      setError("Failed to fetch images");
    }
  };

  // Render component
  return (
    <div>
      <Nav />
      <div className="uploader-container">
        <div className="uploader-header">
          <FaCloudUploadAlt className="header-icon" />
          <h1>Image Uploader</h1>
          <p>Upload and manage your images with ease</p>
        </div>
        {error && <div className="error-message">{error}</div>}

        {/* Image upload form */}
        <form onSubmit={handleSubmit} className="upload-form">
          <div className="form-group">
            <label>Image Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              placeholder="Enter image title"
            />
          </div>

          <div className="form-group">
            <label>Select Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              required
            />
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Uploading..." : "Upload Image"}
          </button>
        </form>

        {/* Display uploaded images */}
        <div className="images-grid">
          {allImages.map((img, index) => (
            <div key={index} className="image-card">
              <img
                src={`http://localhost:5000/files/${img.image}`}
                alt={img.title}
              />
              <h3>{img.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ImgUploader;
