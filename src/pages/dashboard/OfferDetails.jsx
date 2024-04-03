import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Sidebar from './partials/Sidebar'; // Import Sidebar component
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

import { ReactTyped } from 'react-typed';
import { FaStar } from 'react-icons/fa';
import { motion } from 'framer-motion';
import Modal from 'react-modal';
import { Typography, Alert, Card, CardHeader, CardBody,  
} from '@material-tailwind/react';

function OfferDetailsPage() {
  const [offer, setOffer] = useState(null); // State to store the offer details
  const { id } = useParams();
  const navigate = useNavigate(); // Use useNavigate for navigation
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState('');
  const [rating, setRating] = useState(0); // State to store the rating value

  const [recipientEmail, setRecipientEmail] = useState('');
  useEffect(() => {
    async function fetchOffer() {
      try {
        // Check if the access token exists in localStorage
        const accessToken = localStorage.getItem("accessToken");
  
        // If the access token does not exist, handle the error
        if (!accessToken) {
          console.error("Access token not found");
          return;
        }
        // Fetch offer details by ID from the backend with the access token
        const response = await axios.get(`http://localhost:3000/job_offer/get/${id}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
  
        // Set the offer state with the retrieved data
        setOffer(response.data);
      } catch (error) {
        console.error('Error fetching job offer by ID:', error);
        // Handle errors
      }
    }
  
    fetchOffer();
  }, [id]);
 
 
  // Function to export offer details to PDF
  const handleExportToPDF = () => {
    if (offer) {
      const pdf = new jsPDF();
      pdf.setFontSize(18);
      pdf.setTextColor(255, 0, 0); // Red color for the title
      pdf.setFont('helvetica', 'bold'); // Bold Helvetica font for the title
      pdf.text(20, 20, `Offer Details:`);
      pdf.setTextColor(0); // Black color for the rest of the text
      pdf.setFont('helvetica', 'normal'); // Normal Helvetica font for the rest of the text
      let yOffset = 30;

      // Create a user data array
      const offerData = Object.entries(offer).map(([key, value]) => [key, value]);

      // Set the column headers for the table
      const headers = ['Field', 'Value'];

      // Create the table with offer data and column headers
      pdf.autoTable({
        startY: yOffset + 10, // Set the starting position of the table
        head: [headers], // Add column headers
        body: offerData, // Add offer data
        theme: 'striped', // Table theme (alternating rows)
        styles: {
          textColor: [0], // Black text color
        },
      });

      // Save the PDF
      pdf.save(`${offer.title}_details.pdf`);
    }
  };
  const handleShare = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSendEmail = async () => {
    try {
      // Check if the access token exists in localStorage
      const accessToken = localStorage.getItem("accessToken");
  
      // If the access token does not exist, handle the error
      if (!accessToken) {
        console.error("Access token not found");
        // You may choose to display a message to the user or redirect them to log in
        return;
      }
  
      // Make a POST request to the backend to send the email
      await axios.post(
        'http://localhost:3000/job_offer/send',
        {
          recipientEmail,
          message
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          }
        }
      );
     toast.success("Email sent successfully!");

      // Close the modal after sending the email
      setShowModal(false);
    } catch (error) {
      console.error('Error sending email:', error);
      // Handle errors
      toast.error("Email not sent !");

    }
  };
  
  
  // Function to handle rating change
  const handleRatingChange = (value) => {
    setRating(value);
    // You can perform additional actions here, such as sending the rating to the backend
  };

  // Function to render the rating emojis
const renderRatingEmojis = () => {
  const emojis = ['😍', '😊', '😐', '😕', '😠']; // You can customize this array of emojis as per your preference
  const feedbacks = ['Excellent', 'Good', 'Neutral', 'Poor', 'Bad']; // Feedback based on rating
  return emojis.map((emoji, index) => (
    <motion.span
      key={index}
      onClick={() => handleRatingChange(index + 1)}
      whileHover={{ scale: 1.5 }} // Scale up animation on hover
      style={{ cursor: 'pointer', fontSize: '30px', marginRight: '10px', color: index < rating ? '#ffc107' : '#e4e5e9' }}
    >
      <span role="img" aria-label={feedbacks[index]}>{emoji}</span>
      {index === rating - 1 && ( // Render feedback only for the selected rating
        <div style={{ position: '', top: 'px', left: '60px', background: '#000', color: '#fff', padding: '5px', borderRadius: '5px', zIndex: '1' }}>
          {feedbacks[index]}
        </div>
      )}
    </motion.span>
  ));
};


  return (
    <>
    <Sidebar /> 
      <ToastContainer position="top-center" autoClose={5000} />

      <div className="container  mr-40  center">
      <h1 style={{ position: 'absolute', bottom: '750px', left: '800px' }} className="text-4xl mb-8 text-center text-red-700 transition-opacity duration-1000 transform hover:scale-105">
OFFER DETAILS        </h1>  

        <div
className="card mx-auto mb-30 ml-80" style={{ position: 'absolute', bottom: '300px', left: '400px', maxWidth: '1200px', backgroundColor: '#F3F4F6', padding: '100px', borderRadius: '5px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', transition: 'box-shadow 0.3s ease' }}

         
        >
         <div className="card-body" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
  {offer ? (
    <div>
      <h2>{offer.title}</h2>
      <p>Description: {offer.description}</p>
      <p>Qualifications: {offer.qualifications}</p>
      <p>Responsibilities: {offer.responsibilities}</p>
      <p>Lieu: {offer.lieu}</p>
      <p>Langue: {offer.langue}</p>
      <p>Workplace Type: {offer.workplace_type}</p>
      <p>Field: {offer.field}</p>
      <p>Salary Information: {offer.salary_informations}</p>
      <p>Deadline: {offer.deadline}</p>
      <p>Created At: {offer.createdAt}</p>
      {/* Render additional fields as needed */}
    </div>
  ) : (
    <p>Loading...</p>
  )}
</div>

        </div>
   
        <div className="flex justify-center">
  {/* Export to PDF button */}
  <button   style={{ position: 'absolute', bottom: '200px', left: '600px'}}
    className="btn-primary bg-red-700 ml-10 text-white mt-3 py-4 px-1 rounded-lg hover:bg-black transition duration-300 ease-in-out"
    onClick={handleExportToPDF}
  >
    Export to PDF
  </button>
  
 {/* Icon for sharing */}
 <i 
    className="fas fa-share-alt text-black mt-5 cursor-pointer hover:text-black ml-4"
    onClick={handleShare}
    style={{ position: 'absolute', bottom: '210px', left: '750px' , fontSize: "2.3rem" }} // Adjust the font size here
  ></i>
</div>
<div style={{ position: 'absolute', bottom: '207px', left: '800px'}} className="flex items-center ml-40">
            <span className="mr-2"></span>
            {renderRatingEmojis()}
          </div>
        {showModal && (
          <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen">
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
              <div className="relative bg-white rounded-lg p-8">
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="recipientEmail">
                    Recipient's Email Address
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="recipientEmail"
                    type="email"
                    placeholder="Enter email"
                    value={recipientEmail}
                    onChange={(e) => setRecipientEmail(e.target.value)}
                  />
                </div>
                <div className="mb-6">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="message">
                    Personalized Message
                  </label>
                  <textarea
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="message"
                    rows="3"
                    placeholder="Enter your message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  ></textarea>
                </div>
                <div className="flex justify-end">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                    onClick={handleSendEmail}
                  >
                    Send Email
                  </button>
                  <button
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                    onClick={handleCloseModal}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
    
        <div style={{ position: 'absolute', bottom: '200px', left: '1500px'}} className="mt-8">
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="ml-10 mr-10">
            <Link to="/dashboard" className="text-blue-600 hover:underline ml-40">
              Go back to dashboard
            </Link>
          </motion.div>
        </div>
      </div>
</>  );
}

export default OfferDetailsPage;

