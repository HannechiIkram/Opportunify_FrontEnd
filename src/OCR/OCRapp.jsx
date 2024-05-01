import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '@/layout/navbar';
import { Navbar1, Navbarjs } from '@/widgets/layout';

function OCRUploader() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [extractedText, setExtractedText] = useState('');
  const [error, setError] = useState('');

  // Handles file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  // Sends the file to the server for OCR and handles the response
  const handleUpload = async () => {
    if (!selectedFile) {
      setError('Please select an image file.');
      return;
    }

    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      const response = await axios.post('http://localhost:3000/OCR/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        setExtractedText(response.data.jobInfo);
        setError('');
      } else {
        setError(response.data.error);
      }
    } catch (error) {
      setError('An error occurred while uploading the image.');
      console.error('Error during OCR:', error);
    }
  };

  return (
    <>
    <Navbarjs/>
    <form className="mx-auto w-full mt-12 lg:w-5/12 border border-gray-300 rounded-lg shadow-lg p-8">
      <div className="font-bold mb-12">Upload an image or screenshot to extract Job offer information:</div>
      
     
      <div className="mb-8">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full border border-gray-300 rounded-lg p-2"
        />
        
<p className="text-sm text-gray-500 mb-8">
        Supported image formats: JPG, PNG, BMP, TIFF
      </p>
      </div>
      
      <button
        onClick={handleUpload}
        type="button"
        className="bg-red-800 text-white px-4 py-2 rounded w-full"
      >
        Upload and Extract
      </button>

      {error && <p className="text-red-800 mt-4">{error}</p>}

      {extractedText && (
        <div className="mt-8">
          <h2 className="font-bold">Extracted Job Information:</h2>
          <p className="mt-4">{extractedText}</p>
        </div>
      )}
    </form>
    </>
  );
  
}

export default OCRUploader;
