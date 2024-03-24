import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Card, Input , Button } from "@material-tailwind/react";
import Rating from 'react-rating-stars-component';
import Modal from 'react-modal';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



import {
  Popover,
  PopoverHandler,
  PopoverContent,
 
} from "@material-tailwind/react";
const ApplicationDetails = () => {
  const { id } = useParams();
  const [applications, setApplications] = useState(null);
  const [status, setStatus] = useState(null);
  const [rating, setRating] = useState(0); // Step 1: State to hold the rating value

 const [showRejectConfirmation, setShowRejectConfirmation] = useState(false);
  const [showAcceptConfirmation, setShowAcceptConfirmation] = useState(false);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  useEffect(() => {
    const fetchApplicationDetails = async () => {
      try {

        const response = await axios.get(`http://localhost:3000/applications/${id}`);
    

        setApplications(response.data);
      } catch (error) {
        console.error('Error fetching application details:', error);
      }
    };

    fetchApplicationDetails();
  }, [id]);   const handleAccept = async () => {
    setShowAcceptConfirmation(true);
  };
  
  const handleReject = async () => {
    setShowRejectConfirmation(true);
  };

  const handleConfirmAccept = async () => {
    try {
      await axios.put(`http://localhost:3000/applications/accept/${id}`);
      setStatus('accepted');
      setShowAcceptConfirmation(false);
      toast.error('Application accepted successfully'); 
      
      // Send SMS notification
      await axios.post('http://localhost:3000/applications/send-sms', {
        to: '+21620037070', // Replace with the recipient's phone number
        body: 'Your application has been accepted. Congratulations!' // Replace with your message content
      });
    } catch (error) {
      console.error('Error accepting application:', error);
    }
  };
  
  
  const handleConfirmReject = async () => {
    try {
      await axios.put(`http://localhost:3000/applications/reject/${id}`);
      setStatus('rejected');
      setShowRejectConfirmation(false);
      toast.success('Application rejected successfully');  } catch (error) {
      console.error('Error rejecting application:', error);
    }
  };
  const handleRatingChange = (newRating) => {
    // You can perform any action with the new rating value here
    console.log('New rating:', newRating);
    setRating(newRating);
  };


  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleAddComment = () => {
    setComments([...comments, comment]);
    setComment('');
  };

  
  if (!applications) {
   return <div>Loading...</div>;
  }

  return (
    <>
      <ToastContainer position="top-center" autoClose={5000} />

          {/* Modal container at the bottom of the page */}
  <div className=' center text-center mt-40 ml-10' style={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 999 }}>
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
          <Card className="mt-8 ml-auto mr-auto mb-2 w-80 max-w-screen-lg lg:w-5/6 rounded-lg p-6 bg-gray-200 bg-opacity-90 text-center">
            <div>
            <h2>Application Details</h2>
    <p>Job Field: {applications.jobField}</p>
    <p>Date: {applications.applicationDate}</p>
    <p> {applications.applicationId}</p>

    
    <p>Email
: {applications.email}</p>
<p>
    CV: <a href={`http://localhost:3000/${applications.cv}`}>Download CV</a>
  </p>
  <p>
    Cover Letter: <a href={`http://localhost:3000/${applications.coverLetter}`}>Download Cover Letter</a>
  </p>
    {/* Add more application attributes here */}
    <>
                  <Button color="gray-200" onClick={handleAccept} disabled={status !== null}>Accept</Button>
                  <Button color="red" onClick={handleReject} disabled={status !== null}>Reject</Button>
                </>
                 {/* Step 2: Render a UI component for rating */}
                 <Rating
                count={5}
                value={rating}
                onChange={handleRatingChange}
                size={24}
                activeColor="#ffd700"
              />
            </div>

          </Card>
          <input
  type="text"
  placeholder="Add a comment..."
  value={comment}
  onChange={handleCommentChange}
/>
              <Button  className="bg-gray-600" color="gray" onClick={handleAddComment}>Add Comment</Button>

              <div>
                <h3>Comments:</h3>
                <ul>
                  {comments.map((comment, index) => (
                    <li key={index}>{comment}</li>
                  ))}
                </ul>
              </div>


        </div>
      </section>
 
    </>
    
  );
};

export default ApplicationDetails;
