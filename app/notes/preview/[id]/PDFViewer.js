"use client";

import { useEffect, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc =
  `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export default function PDFViewer({ pdfUrl }) {
  const [width, setWidth] = useState(700);
  const [numPages, setNumPages] = useState(0);

  useEffect(() => {
    const updateWidth = () => {
      if (window.innerWidth < 640) {
        setWidth(window.innerWidth - 30);
      } else if (window.innerWidth < 1024) {
        setWidth(550);
      } else {
        setWidth(700);
      }
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);

    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  return (
    <div className="flex flex-col items-center gap-8">
      <Document
        file={pdfUrl}
        onLoadSuccess={({ numPages }) => setNumPages(numPages)}
      >
        {Array.from({
          length: Math.min(numPages, 1), // Maximum 1 page preview
        }).map((_, index) => (
          <div
            key={index}
            className="shadow-xl rounded-lg overflow-hidden"
          >
            <Page
              pageNumber={index + 1}
              width={width}
              renderTextLayer={false}
              renderAnnotationLayer={false}
            />
          </div>
        ))}
      </Document>
    </div>
  );
}