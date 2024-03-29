/*import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { MaterialTailwindControllerProvider } from "@/context"; // Import MaterialTailwindControllerProvider
import { Sidenav } from ".";
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { ReactTyped } from "react-typed";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Modal from 'react-modal';
import { ToastContainer, toast } from "react-toastify";
import {
  Typography,
  Alert,
  Card,
  CardHeader,
  CardBody,
} from "@material-tailwind/react";
//import { motion } from 'framer-motion';
//import Banner from "./Banner.png";
//import {fadeIn} from "./variants.jsx";
//import opportunify from "./opportunify.jpg"
function OfferDetailsPage({jobOfferId}) {
  
  const [showAlerts, setShowAlerts] = React.useState({
    blue: true,
    green: true,
    orange: true,
    red: true,
  });
  const [showAlertsWithIcon, setShowAlertsWithIcon] = React.useState({
    blue: true,
    green: true,
    orange: true,
    red: true,
  });
  const alerts = ["gray", "green", "orange", "red"];

  const Navigate = useNavigate();

  const { id } = useParams();
 



  const [hoverRating, setHoverRating] = useState(0); // Suivre la note survolée par l'utilisateur
  const [rating, setRating] = useState(user ? user.rating : 0);

  const handleHoverRating = (value) => {
    setHoverRating(value);
  };
  const handleClickRating = (value) => {
    setRating(value);
    // Mettre à jour la note dans la base de données ou effectuer d'autres actions nécessaires
  };
    

  useEffect(() => {
    async function fetchOffer(jobOfferId) {
        try {
          // Faire une requête GET vers votre endpoint backend
          const response = await axios.get(`http://localhost:3000/job_offer/${jobOfferId}`);
          
          // Récupérer les données de l'offre d'emploi à partir de la réponse
          const jobOffer = response.data;
          
          // Retourner les données de l'offre d'emploi
          return jobOffer;
        } catch (error) {
          // Gérer les erreurs
          console.error('Error fetching job offer by ID:', error);
          throw error; // Facultatif : propager l'erreur pour la gestion ultérieure
        }
      }
   

    fetchOffer();
  }, [jobOfferId]);
  const handleExportToPDF = () => {
    if (user) {
      const pdf = new jsPDF();
      pdf.setFontSize(18);
      pdf.setTextColor(255, 0, 0); // Couleur rouge pour le titre
      pdf.setFont('helvetica', 'bold'); // Police Helvetica en gras pour le titre
      pdf.text(20, 20, `offer Details:`);
      pdf.setTextColor(0); // Couleur noire pour le reste du texte
      pdf.setFont('helvetica', 'normal'); // Police Helvetica en normal pour le reste du texte
      let yOffset = 30;
  
      // Crée un tableau de données utilisateur
      const userData = Object.entries(user).map(([key, value]) => [key, value]);
  
      // Définit les en-têtes de colonne du tableau
      const headers = ['Field', 'Value'];
  
      // Crée le tableau avec les données utilisateur et les en-têtes de colonne
      pdf.autoTable({
        startY: yOffset + 10, // Définit la position de départ du tableau
        head: [headers], // Ajoute les en-têtes de colonne
        body: userData, // Ajoute les données utilisateur
        theme: 'striped', // Thème du tableau (bandes alternées)
        styles: {
          textColor: [0], // Couleur du texte en noir
        },
      });
  
      // Enregistre le PDF
      pdf.save(`${offer.name}_details.pdf`);
    }
  };
 


  
  return (<MaterialTailwindControllerProvider>
    <Sidenav />
    <ToastContainer position="top-center" autoClose={5000} />

    <div className="container mt-10 ml-40 mr-40 mb-40 center">
      <ReactTyped className='Lato text-red-800 font-bold p-2 text-4xl mt-80 mr-80 center ml-80 mb-40 ' strings={["USER DETAILS"]} typeSpeed={40} />
  
      <div className="card mx-auto mt-5" style={{ maxWidth: '600px', backgroundColor: '#F5F5DC', padding: '60px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', transition: 'box-shadow 0.3s ease' }}>
        <div className="card-body" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p className="text-red-800">{error}</p>
          ) : user ? (
            <div>
              <p className="mb-6 ml-20 mr-5 text-3xl  ">
                {editableField === 'name' ? (
                  <input type="text" name="name" value={user.name} onChange={handleFieldChange} onBlur={handleSaveChanges} />
                ) : (
                  <span onClick={() => handleFieldClick('name')}>{user.name}</span>
                )}
              </p>
  
              <p className="mb-6 ml-20 mr-5 text-3xl "> {isSensitiveInfoVisible ? user.email : '**********'}</p>
  
              <p className="mb-6 ml-20 mr-5 text-3xl">{editableField === 'role' ? (
                <input type="text" name="role" value={user.role} onChange={handleFieldChange} onBlur={handleSaveChanges} />
              ) : (
                <span onClick={() => handleFieldClick('role')}>{user.role}</span>
              )}</p>
<img src={user && user.image ? user.image : 'placeholder-image-url'} alt="User Image" style={{ width: '200px', height: '200px' }} />

  
              <p className="mb-6 ml-20 mr-5 text-3xl "> {user.image}   </p>
              <p className="mb-6 ml-20 mr-5 text-3xl ">{user.address}</p>
              <p className="mb-6 ml-20 mr-5 text-3xl "> {user.phone} </p>
              <p className="mb-6 ml-20 mr-5 text-3xl ">{user.description}</p>
              <p className="mb-6 ml-20 mr-5 text-3xl ">{user.lastname}</p>
              <p className="mb-6 ml-20 mr-5 text-3xl  ">{user.phoneNumber}</p>
            <strong>


<button onClick={isBlocked ? handleUnblockUser : handleBlockUser}>
  {isBlocked ? 'Unblock User' : 'Block User'}
</button>
</strong>  

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                <button
                  className="btn btn-primary"
                  onClick={handleExportToPDF}
                  style={{
                    backgroundColor: 'black',
                    color: '#fff',
                    padding: '10px 10px',
                    borderRadius: '3px',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'background-color 0.3s ease',
                  }}
                >
                  Export to PDF
                </button>
                <div>
  <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}className='ml-10 mr-10'>
    <Link
      style={{ textDecoration: "none" }}
      onClick={handleLinkClick} className='ml-10 mr-10'
    >
      <p style={{ color: "#B91C1C", cursor: "pointer" }}>
        Did you want to hide sensitive info?
      </p>
    </Link>
  </motion.div>
</div>
              </div>
              <div  className="ml-10 mt-8 "
              style={{ display: 'flex', flexDirection: 'row' }}>
  {[1, 2, 3, 4, 5].map((star) => (
    <div key={star} style={{ marginBottom: '10px' }}>
      <FaStar
        size={32}
        color={(star <= (hoverRating || rating)) ? "#FFD700" : "#C0C0C0"}
        onMouseEnter={() => handleHoverRating(star)}
        onMouseLeave={() => handleHoverRating(0)}
        onClick={() => handleClickRating(star)}
      />
    </div>
  ))}
</div>


            </div>
          ) : (
            <p>No user found</p>
          )}
        </div>
        
      </div>
      <div className="mt-8">
      {/* Link to navigate back to the applications list */
      /*
      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}className='ml-10 mr-10'>

      <Link to="/dashboard" className="text-blue-600 hover:underline ml-40">
        did you want to back  your dashboard?
      </Link>
      </motion.div >
      <CardBody className="flex flex-col gap-4 p-4 ml-40">
          {alerts.map((color) => (
            <Alert
              key={color}
              open={showAlerts[color]}
              color={color}
              onClose={() => setShowAlerts((current) => ({ ...current, [color]: false }))}
            >
              you  want <a href="#" > to update user? block or unblock it? give a rate? export details to pdf</a>
            </Alert>
          ))}
        </CardBody>
        
    </div>

    </div>
  </MaterialTailwindControllerProvider>
  
  );
}

export default OfferDetailsPage;*/