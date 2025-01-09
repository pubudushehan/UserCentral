import React from "react";
import { useState } from "react";
import { Document, Page } from "react-pdf";

function PdfComp(props) {
  const [numPages, setNumPages] = useState();
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }
  return (
    <div>
      <div>
        {props.PdfFile ? (
          <Document file={props.PdfFile} onLoadSuccess={onDocumentLoadSuccess}>
            {Array.apply(null, Array(numPages))
              .map((_, i) => i + 1)
              .map((page) => {
                return (
                  <Page
                    pageNumber={page}
                    renderTextLayer={false}
                    renderAnnotationLayer={false}
                  />
                );
              })}
            <Page pageNumber={pageNumber} />
          </Document>
        ) : (
          <p>PDF File Not Availabel</p>
        )}
        <p>
          Page {pageNumber} of {numPages}
        </p>
      </div>
    </div>
  );
}

export default PdfComp;
