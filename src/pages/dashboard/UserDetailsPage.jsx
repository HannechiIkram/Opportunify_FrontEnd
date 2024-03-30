

import React, { useState, useEffect } from 'react';


import axios from 'axios';
import { useParams } from 'react-router-dom';

import jsPDF from 'jspdf';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
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
import { MaterialTailwindControllerProvider } from "@/context"; // Import MaterialTailwindControllerProvider
import { Sidenav } from ".";
//import { motion } from 'framer-motion';
//import Banner from "./Banner.png";
//import {fadeIn} from "./variants.jsx";
//import opportunify from "./opportunify.jpg"
function UserDetailsPage({ userId }) {
  const [recording, setRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [audioBlob, setAudioBlob] = useState(null);
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
 

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editableField, setEditableField] = useState(null);
  const [isSensitiveInfoVisible, setIsSensitiveInfoVisible] = useState(true); // Nouvel état pour suivre la visibilité des informations sensibles

  const [user, setUser] = useState(null);
  const [isBlocked, setIsBlocked] = useState(false);

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
    const fetchUser = async () => {
      try {
        // Check if the access token exists in localStorage
        const accessToken = localStorage.getItem("accessToken");
  
        // If the access token does not exist, throw an error
        if (!accessToken) {
          throw new Error("Access token not found");
        }
  
        const config = {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        };
  
        // Fetch user details with the access token included in the headers
        const response = await axios.get(`/user/${id}`, config);
        setUser(response.data);
        setLoading(false);
      } catch (error) {
        // Handle error appropriately (e.g., display error message to user)
        setError('Error fetching user details');
        setLoading(false);
      }
    };
  
    // Call the fetchUser function
    fetchUser();
  }, [userId]);
  
  const handleExportToPDF = () => {
    if (user) {
      const pdf = new jsPDF();
      pdf.setFontSize(18);
      pdf.setTextColor(255, 0, 0); // Couleur rouge pour le titre
      pdf.setFont('helvetica', 'bold'); // Police Helvetica en gras pour le titre
      pdf.text(20, 20, `User Details:`);
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
      pdf.save(`${user.name}_details.pdf`);
    }
  };const handleFieldClick = (fieldName) => {
    setEditableField(fieldName);
  };
  const handleLinkClick = () => {
    toggleSensitiveInfoVisibility(); // Toggle the visibility of sensitive information
  };

  const handleFieldChange = (event) => {
    const { name, value } = event.target;
    setUser(prevUser => ({
      ...prevUser,
      [name]: value
    }));
  };

  const handleSaveChanges = async () => {
    try {
      // Check if the access token exists in localStorage
      const accessToken = localStorage.getItem("accessToken");
  
      // If the access token does not exist, throw an error
      if (!accessToken) {
        throw new Error("Access token not found");
      }
  
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
  
      // Send the PUT request to update user data with the access token included in the headers
      await axios.put(`/user/${id}`, user, config);
      
      // If the request is successful, set editableField to null
      setEditableField(null);
      
      // Fetch updated user data after saving changes
      await fetchUser();
    } catch (error) {
      // Handle error appropriately (e.g., display error message to user)
      console.error("Error saving changes:", error);
    }
  };
  
  const toggleSensitiveInfoVisibility = () => {
    setIsSensitiveInfoVisible(prevState => !prevState); // Inverser la visibilité des informations sensibles
  };



  const handleBlockUser = async () => {
    try {
      // Check if the access token exists in localStorage
      const accessToken = localStorage.getItem("accessToken");
  
      // If the access token does not exist, throw an error
      if (!accessToken) {
        throw new Error("Access token not found");
      }
  
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
  
      // Send the PUT request to block the user with the access token included in the headers
      await axios.put(`/user/block/${id}`, null, config);
      
      // If the request is successful, set isBlocked to true to reflect that the user is blocked
      setIsBlocked(true);
      
      // Display success message
      toast.success('User Blocked successfully');
    } catch (error) {
      // Handle error appropriately (e.g., display error message to user)
      console.error('Error blocking user:', error);
    }
  };
  
  const handleUnblockUser = async () => {
    try {
      // Check if the access token exists in localStorage
      const accessToken = localStorage.getItem("accessToken");
  
      // If the access token does not exist, throw an error
      if (!accessToken) {
        throw new Error("Access token not found");
      }
  
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
  
      // Send the PUT request to unblock the user with the access token included in the headers
      await axios.put(`/user/unblock/${id}`, null, config);
      
      // If the request is successful, set isBlocked to false to reflect that the user is unblocked
      setIsBlocked(false);
      
      // Display success message
      toast.success('User unblocked successfully');
    } catch (error) {
      // Handle error appropriately (e.g., display error message to user)
      console.error('Error unblocking user:', error);
    }
  };
  
  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const recorder = new MediaRecorder(stream);
    const chunks = [];

    recorder.ondataavailable = (e) => {
      chunks.push(e.data);
    };

    recorder.onstop = () => {
      const blob = new Blob(chunks, { type: 'audio/wav' });
      setAudioBlob(blob);
    };

    recorder.start();
    setRecording(true);
    setMediaRecorder(recorder);
  };

  const stopRecording = () => {
    if (mediaRecorder && recording) {
      mediaRecorder.stop();
      setRecording(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      image: file,
      imageUrl: URL.createObjectURL(file),
    }));
  };
  return (
    <MaterialTailwindControllerProvider >
      
    <Sidenav/>
    
    <div className="ml-80 mr-200 mb-20" style={{ position: 'absolute', bottom: '20px', left: '1100px' }}>
  <img
    src="img/logoesprit.png"
    alt="logo"
    style={{ width: 'auto', height: '50px' }}
  />
</div>
<ToastContainer position="top-center" autoClose={5000} />

    <div className="container mt-20 ml-80 mr-40 mb-40 center">
    <h1 className="text-4xl mb-8 text-center text-red-700 transition-opacity duration-1000 transform hover:scale-105">
USER DETAILS        </h1>  
      <div>
      <div className="card mx-auto mb-30 mt-5 ml-80" style={{ maxWidth: '700px', backgroundColor: '#F3F4F6', padding: '50px', borderRadius: '5px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', transition: 'box-shadow 0.3s ease' }}>
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
<img src={user && user.image ? user.image : 'placeholder-image-url'}  />

  
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
              className="btn-primary bg-red-700 text-white py-4 px-1 rounded-lg hover:bg-black transition duration-300 ease-in-out w-full"
              onClick={handleExportToPDF}
              style={{  width: '30%' }}
                >
                  Export to PDF
                </button>
                <div>
  <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}className='ml-10 mr-10'>
    <Link
      style={{ textDecoration: "none" }}
      onClick={handleLinkClick} className='ml-10 mr-10'
    >
    <strong>  <p className='text-red-700' style={{  cursor: "pointer" }}>
        Did you want to hide sensitive info?
      </p></strong>
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
      {/* Link to navigate back to the applications list */}
      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}className='ml-10 mr-10'>

      <Link to="/dashboard" className="text-black hover:underline ml-20">
        did you want to back  your dashboard?
      </Link>
      </motion.div >
      <div className='ml-80 mt-80' style={{ position: 'absolute', bottom: '200px', left: '1100px'  }}>
      {recording ? (
        <button onClick={stopRecording}>Stop Recording</button>
      ) : (
        <button onClick={startRecording}>Start Recording</button>
      )}
      {audioBlob && (
        <audio controls>
          <source src={URL.createObjectURL(audioBlob)} type="audio/wav" />
          Your browser does not support the audio element.
        </audio>
      )}
    </div>
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
    <div className="useful-links ml-80">
  <a href="https://www.linkedin.com/esprit/">
    <LinkedInIcon fontSize="large" /> LinkedIn
  </a>
  <a href="https://www.facebook.com/esprit/">
    <FacebookIcon fontSize="large" /> Facebook
  </a>
  <a href="https://www.instagram.com/esprit/">
    <InstagramIcon fontSize="large" /> Instagram
  </a>
</div>
    </div>
   
    </MaterialTailwindControllerProvider>

  );
}

export default UserDetailsPage;
