import React from "react";
import { useState } from "react";
import { Document, Page } from "react-pdf";
import "./SendPdf.css";

function PdfComp(props) {
  const [numPages, setNumPages] = useState();
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <div className="pdf-viewer">
      {props.PdfFile ? (
        <Document file={props.PdfFile} onLoadSuccess={onDocumentLoadSuccess}>
          {numPages &&
            Array.from(new Array(numPages), (el, index) => (
              <Page
                key={`page_${index + 1}`}
                pageNumber={index + 1}
                renderTextLayer={false}
                renderAnnotationLayer={false}
              />
            ))}
        </Document>
      ) : (
        <div className="no-pdf-message">
          <p>No PDF file selected for display</p>
        </div>
      )}
    </div>
  );
}

export default PdfComp;
