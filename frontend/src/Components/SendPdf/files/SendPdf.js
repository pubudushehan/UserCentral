import React, { useEffect, useState } from "react";
import Nav from "../../Nav/Nav";
import axios from "axios";
import "./SendPdf.css";
import PdfComp from "../files/PdfComp";
import { pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

function SendPdf() {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [allPdf, setAllPdf] = useState(null);
  const [pdfFile, setPDFFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    getPdf();
  }, []);

  const getPdf = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await axios.get("http://localhost:5000/getFile");
      console.log(result.data.data);
      setAllPdf(result.data.data);
    } catch (error) {
      console.error("Error fetching PDFs:", error);
      setError("Failed to fetch PDFs. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const submitPdf = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("file", file);

    try {
      const result = await axios.post(
        "http://localhost:5000/uploadfile",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      console.log(result);

      if (result.data.status === 200) {
        alert("PDF uploaded successfully!");
        setTitle("");
        setFile(null);
        e.target.reset(); // Reset the form
        getPdf();
      } else {
        setError("Failed to upload PDF.");
      }
    } catch (error) {
      console.error("Error uploading PDF:", error.message);
      setError("Error uploading PDF. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const deletePdf = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/deletefile/${id}`
      );
      if (response.data.status === "ok") {
        // Clear the PDF viewer if the deleted PDF was being displayed
        if (pdfFile && pdfFile.includes(id)) {
          setPDFFile(null);
        }
        getPdf(); // Refresh the PDF list
      } else {
        setError("Failed to delete PDF");
      }
    } catch (err) {
      console.error("Error deleting PDF:", err);
      setError(
        err.response?.data?.message || "Error deleting PDF. Please try again."
      );
    }
  };

  const showPdf = (pdf) => {
    setPDFFile(`http://localhost:5000/files/${pdf}`);
  };

  return (
    <div>
      <Nav />
      <div className="send-pdf-container">
        <div className="send-pdf-content">
          <div className="send-pdf-header">
            <h1>Send PDF</h1>
            <p>Upload and manage your PDF documents</p>
          </div>
          {error && <div className="error-message">{error}</div>}
          <form onSubmit={submitPdf} className="send-pdf-form">
            <label>PDF Title</label>
            <input
              required
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <label>Select PDF File</label>
            <input
              type="file"
              accept="application/pdf"
              required
              onChange={(e) => setFile(e.target.files[0])}
            />
            <button type="submit" disabled={loading}>
              {loading ? "Uploading..." : "Submit"}
            </button>
          </form>
          <div className="pdf-details">
            <h4>Pdf Details</h4>
            {loading ? (
              <div>Loading PDFs...</div>
            ) : allPdf == null ? (
              ""
            ) : (
              allPdf.map((data) => (
                <div key={data._id}>
                  <h1>Title: {data.title}</h1>
                  <div className="button-group">
                    <button
                      onClick={() => showPdf(data.pdf)}
                      className="show-btn"
                    >
                      Show Pdf
                    </button>
                    <button
                      onClick={() => deletePdf(data._id)}
                      className="delete-btn"
                    >
                      Delete Pdf
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
          <PdfComp PdfFile={pdfFile} />
        </div>
      </div>
    </div>
  );
}

export default SendPdf;
