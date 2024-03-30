import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { MaterialTailwindControllerProvider } from '@/context';
import { Sidenav } from '.';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { ReactTyped } from 'react-typed';
import { FaStar } from 'react-icons/fa';
import { motion } from 'framer-motion';
import Modal from 'react-modal';
import { ToastContainer } from 'react-toastify';
import { Typography, Alert, Card, CardHeader, CardBody } from '@material-tailwind/react';

function OfferDetailsPage() {
  const [offer, setOffer] = useState(null); // State to store the offer details
  const { id } = useParams();
  const navigate = useNavigate(); // Use useNavigate for navigation

  useEffect(() => {
    async function fetchOffer() {
      try {
        // Fetch offer details by ID from the backend
        const response = await axios.get(`http://localhost:3000/job_offer/${id}`);
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
      pdf.save(`${offer.name}_details.pdf`);
    }
  };

  return (
    <MaterialTailwindControllerProvider>
      <Sidenav />
      <ToastContainer position="top-center" autoClose={5000} />

      <div className="container mt-10 ml-40 mr-40 mb-40 center">
        <ReactTyped
          className="Lato text-red-800 font-bold p-2 text-4xl mt-80 mr-80 center ml-80 mb-40"
          strings={['OFFER DETAILS']}
          typeSpeed={40}
        />

        <div
          className="card mx-auto mt-5"
          style={{
            maxWidth: '600px',
            backgroundColor: '#F5F5DC',
            padding: '60px',
            borderRadius: '10px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            transition: 'box-shadow 0.3s ease',
          }}
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
      <p>Image: {offer.image}</p>
      <p>Created At: {offer.createdAt}</p>
      {/* Render additional fields as needed */}
    </div>
  ) : (
    <p>Loading...</p>
  )}
</div>

        </div>
        <div className="mt-8">
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="ml-10 mr-10">
            <Link to="/dashboard" className="text-blue-600 hover:underline ml-40">
              Go back to dashboard
            </Link>
          </motion.div>
        </div>
      </div>
    </MaterialTailwindControllerProvider>
  );
}

export default OfferDetailsPage;
