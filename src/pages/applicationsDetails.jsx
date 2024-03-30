import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { Card, Button } from "@material-tailwind/react";
import Rating from 'react-rating-stars-component';
import Modal from 'react-modal';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';

const ApplicationDetails = () => {
  const [ratingText, setRatingText] = useState('');
  const { id } = useParams();
  const [applications, setApplications] = useState(null);
  const [status, setStatus] = useState(null);
  const [rating, setRating] = useState(0);
  const [showRejectConfirmation, setShowRejectConfirmation] = useState(false);
  const [showAcceptConfirmation, setShowAcceptConfirmation] = useState(false);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [buttonState, setButtonState] = useState({ accept: true, reject: true });

  useEffect(() => {
    const fetchApplicationDetails = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) {
          console.error("Access token not found");
          return;
        }
  
        const config = {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        };
  
        const response = await axios.get(`http://localhost:3000/applications/${id}`, config);
        setApplications(response.data);
      } catch (error) {
        console.error('Error fetching application details:', error);
      }
    };

    fetchApplicationDetails();
  }, [id]);
  useEffect(() => {
    const storedComments = JSON.parse(localStorage.getItem('comments')) || [];
    setComments(storedComments);
  }, []);
  useEffect(() => {
    const storedButtonState = JSON.parse(localStorage.getItem('buttonState')) || { accept: true, reject: true };
    setButtonState(storedButtonState);
  }, []);

  const handleAccept = async () => {
    setShowAcceptConfirmation(true);
  };
  
  const handleReject = async () => {
    setShowRejectConfirmation(true);
  };

  const handleConfirmAccept = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        console.error("Access token not found");
        return;
      }
  
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
  
      await axios.put(`http://localhost:3000/applications/accept/${id}`, null, config);
      setStatus('accepted');
      setShowAcceptConfirmation(false);
      toast.error('Application accepted successfully');
  
      const response = await axios.get(`http://localhost:3000/applications/${id}`, config);
      setApplications(response.data);
      setButtonState({ accept: false, reject: false });
      localStorage.setItem('buttonState', JSON.stringify({ accept: false, reject: false }));
    } catch (error) {
      console.error('Error accepting application:', error);
    }
  };
  
  const handleConfirmReject = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        console.error("Access token not found");
        return;
      }
  
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
  
      await axios.put(`http://localhost:3000/applications/reject/${id}`, null, config);
      setStatus('rejected');
      setShowRejectConfirmation(false);
      toast.success('Application rejected successfully');
  
      const response = await axios.get(`http://localhost:3000/applications/${id}`, config);
      setApplications(response.data);
      setButtonState({ accept: false, reject: false });
      localStorage.setItem('buttonState', JSON.stringify({ accept: false, reject: false }));
    } catch (error) {
      console.error('Error rejecting application:', error);
    }
  };

  const handleRatingChange = (newRating) => {
    console.log('New rating:', newRating);
  
    let ratingText = '';
    switch (newRating) {
      case 1:
        ratingText = 'Poor';
        break;
      case 2:
        ratingText = 'Acceptable';
        break;
      case 3:
        ratingText = 'Good';
        break;
      case 4:
        ratingText = 'Very Good';
        break;
      case 5:
        ratingText = 'Excellent';
        break;
      default:
        ratingText = '';
        break;
    }
  
    setRating(newRating);
    setRatingText(ratingText);
  };
   
  const handleAddComment = () => {
    const newComments = [...comments, comment];
    setComments(newComments);
    localStorage.setItem('comments', JSON.stringify(newComments));
    setComment('');
  };
  
  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };
  
  if (!applications) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <ToastContainer position="top-center" autoClose={5000} />

      <div className=' center text-center mt-40 ml-10 ' style={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 999 }}>
        <div className='center text-center mt-40 ml-10' style={{ display: 'flex', justifyContent: 'center' }}>
          <Modal isOpen={showRejectConfirmation || showAcceptConfirmation} onRequestClose={() => setShowRejectConfirmation(false) || setShowAcceptConfirmation(false)} className="custom-modal center text-center mt-40 ml-10">
            <div className="modal-content center text-center mt-40 ml-10">
              {showRejectConfirmation && (
                <>
                  <h4 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'black', fontFamily: 'Arial, sans-serif' }}>Reject Confirmation</h4>
                  <p style={{ fontSize: '1.2rem', color: 'gray', fontFamily: 'Arial, sans-serif' }}>Are you sure you want to reject this application?</p>
                  <Button color="red-800" onClick={handleConfirmReject}>Yes</Button>
                  <Button color="red" onClick={() => setShowRejectConfirmation(false)}>No</Button>
                </>
              )}
              {showAcceptConfirmation && (
                <>
                  <h4 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'black', fontFamily: 'Arial, sans-serif' }}>Accept Confirmation</h4>
                  <p style={{ fontSize: '1.2rem', color: 'gray', fontFamily: 'Arial, sans-serif' }}>Are you sure you want to accept this application?</p>
                  <Button color="black" onClick={handleConfirmAccept}>Yes</Button>
                  <Button color="red" onClick={() => setShowAcceptConfirmation(false)}>No</Button>
                </>
              )}
            </div>
          </Modal>
        </div>
      </div>

      <div className="container relative mx-auto">
        <div className="relative flex content-center justify-center pt-24 pb-8"></div>
      </div>

      <section className="ml-10 mr-10 flex gap-4 items-center">
        <div className="w-full ">
       
       <div style={{ fontSize: '24px', fontWeight: 'bold' }} className="mt-4 bg-red-800 rounded-lg p-3 text-white border border-red-700 text-center">Here there are the details of application</div>

       <div className="mt-8">
      <Link to="/applicationsList" className="text-blue-600 hover:underline ml-40">
        did you want to back to list?
      </Link>
    </div>
 

          <Card className="mt-8 ml-auto mr-auto mb-2 w-80 max-w-screen-lg lg:w-5/6 rounded-lg p-6 bg-gray-200 bg-opacity-90 text-center">
            <div>
              <p>Job Field: {applications.jobField}</p>
              <p>Date: {applications.applicationDate}</p>
              <p> {applications.applicationId}</p>
              <p>Email: {applications.email}</p>
              <p>
                CV: <a href={`http://localhost:3000/${applications.cv}`}>Download CV</a>
              </p>
              <p>
                Cover Letter: <a href={`http://localhost:3000/${applications.coverLetter}`}>Download Cover Letter</a>
              </p>
              <>
                <Button color="gray" onClick={handleAccept} disabled={!buttonState.accept}>Accept</Button>
                <Button color="red" onClick={handleReject} disabled={!buttonState.reject}>Reject</Button>
              </>
              <div>
                <Rating
                  count={5}
                  value={rating}
                  onChange={handleRatingChange}
                  size={24}
                  activeColor="#ffd700"
                />
                <p>{ratingText}</p>
              </div>
            </div>
          </Card>
          <div className=' center text-center mt-40 ml-10  mb-4 ' style={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 999 }}>
            <input className='  mb-4 '
              type="text"
              placeholder="Add a comment..."
              value={comment}
              onChange={handleCommentChange}
            />
            <Button className="bg-red-700 hover:bg-gray-500 text-white font-bold py-3 px-3 rounded-md shadow-md mr-2  mb-1 " color="black" onClick={handleAddComment}>Add Comment</Button>

            <div className=''>
              <h1></h1>
              <ul>
                {comments.map((comment, index) => (
                  <li key={index}>{comment}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
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
    </>
  );
};

export default ApplicationDetails;
