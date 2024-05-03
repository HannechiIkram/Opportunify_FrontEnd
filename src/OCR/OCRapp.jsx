import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '@/layout/navbar';
import { Navbar0, Navbar1, Navbarjs } from '@/widgets/layout';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function OCRUploader() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [extractedText, setExtractedText] = useState('');
  const [editedText, setEditedText] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState('');

  // Handles file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const handleUploadjoboffer = async () => {
    if (!selectedFile) {
      setError('Please select an image file.');
      return;
    }

    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      const response = await axios.post('http://localhost:3000/OCR/extract-job-info', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        setExtractedText(response.data.jobInfo);
        setEditedText(response.data.jobInfo);
        setError('');
      } else {
        setError(response.data.error);
      }
    } catch (error) {
      setError('An error occurred while uploading the image.');
      console.error('Error during OCR:', error);
    }
  };
// Toggle edit mode
const handleEditClick = () => {
  setIsEditing(!isEditing);
  // Set editedText to the string representation of extractedText
  setEditedText(JSON.stringify(extractedText, null, 2));
};
  // Handle text change in the input field
  const handleTextChange = (e) => {
    setEditedText(e.target.value);
  };

  // Handle confirm update
const handleConfirmUpdate = () => {
  setExtractedText(JSON.parse(editedText)); // Update the extractedText with the edited text
  setIsEditing(false);
};
  
const handlePostJobOffer = async (e) => {
  e.preventDefault();
  
  try {
    const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        throw new Error("Access token not found");
      }
      const config = { headers: { Authorization: `Bearer ${accessToken}` } };
     const  data={
        title: extractedText.title || "",
        description: extractedText.description || "",
        qualifications: extractedText.qualifications || "",
        responsibilities: extractedText.responsibilities || "",
        lieu: extractedText.lieu || "",
        salary_informations: extractedText.salary_informations|| "",
        workplace_type: extractedText.workplace_type || "",
        company: extractedText.Company || "",
        field: extractedText.field || "",
        langue: extractedText.langue || "",
        deadline: extractedText.deadline || ""
      }
    const response = await axios.post("/job_offer/add",data,config);
    
    console.log("Job offer added successfully:", response.data);
    toast.success("Job offer added successfully")
  } catch (error) {
    console.error(
      "Failed to add job offer:",
      error.response ? error.response.data : error.message
    );
    toast.error(`Failed to add job offer: ${error.response.data.error}`);}};

  return (
    <>
    <Navbar0/>
      <ToastContainer position="top-center" autoClose={5000}  />

      <form className="mx-auto w-full mt-12 lg:w-5/12 border border-gray-300 rounded-lg shadow-lg p-8">
        <div className="font-bold mb-12 flex">Upload an image or a screenshot to extract job offer information:</div>
        
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
        
        <div className="mb-8">
          <button
            onClick={handleUploadjoboffer}
            type="button"
            className="bg-red-800 text-white px-10 py-1 rounded w-full"
          >
           Extract Job offer information
          </button>
        </div>

        {error && <p className="text-red-800 mt-4">{error}</p>}
        
        {extractedText && (
          <div className="mt-8">
            <div className="flex justify-between items-start">
              <h2 className="font-bold">Extracted Job Information:</h2>
              <div className="text-right">
                <button
                  onClick={handleEditClick}
                  type="button"
                  className="bg-gray text-white px-2 py-2 mt-2 rounded-full"
                >
                  ✏️
                </button>
              </div>
            </div>
            <div className="mt-4">
              {isEditing ? (
                <>
                  <textarea
                    className="w-full border border-gray-300 p-20"
                    value={editedText}
                    onChange={handleTextChange}
                  />
                  <button
                    onClick={handleConfirmUpdate}
                    type="button"
                    className="bg-green-500 text-white px-2 py-1 mt-8 rounded mx-auto block"
                  >
                    Confirm changes
                  </button>
                </>
              ) : (
                <>
                  <p><strong>Title:</strong> {extractedText.title || 'Not specified'}</p>
                  <p><strong>Description:</strong> {extractedText.description || 'Not specified'}</p>
                  <p><strong>Qualifications:</strong> {extractedText.qualifications || 'Not specified'}</p>
                  <p><strong>Responsibilities:</strong> {extractedText.responsibilities || 'Not specified'}</p>
                  <p><strong>Location:</strong> {extractedText.lieu || 'Not specified'}</p>
                  <p><strong>Salary Information:</strong> {extractedText.salary_informations || 'Not specified'}</p>
                  <p><strong>Workplace Type:</strong> {extractedText.workplace_type || 'Not specified'}</p>
                  <p><strong>Company:</strong> {extractedText.Company || 'Not specified'}</p>
                  <p><strong>Field:</strong> {extractedText.field || 'Not specified'}</p>
                  <p><strong>Language:</strong> {extractedText.langue || 'Not specified'}</p>
                  <p><strong>Deadline:</strong> {extractedText.deadline || 'Not specified'}</p>
                </>
              )}
            </div>
            <button
            onClick={handlePostJobOffer}
            type="button"
            className="bg-gray-700 text-white px-2 py-1 mt-8 rounded mx-auto block"
          >
            Post Extracted Job Offer
          </button>
          </div>
          
        )}
        
      </form>
    </>
  );
}

export default OCRUploader;
