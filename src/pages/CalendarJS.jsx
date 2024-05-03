

import React, { useState, useEffect, useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import axios from "axios";
import "./Calendar.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Navbarjs } from "@/widgets/layout";
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
  Button,
  Input,
} from "@material-tailwind/react";
import Divider from '@mui/material/Divider';

function CalendarJS() {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
 // const modalRef = useRef(null);
  const modalRef = useRef();
  const userId = localStorage.getItem('userId'); // Retrieve userId from localStorage
  useEffect(() => {
    // Fetch interview events from the backend when the component mounts
    const fetchInterviewEvents = async () => {
      try {
        const response = await axios.get(`/Interview/interview-eventsJS/${userId}`);
      
        const eventsWithDateParsed = response.data.map(event => ({
          ...event,
          date: new Date(event.date)
        }));
        setEvents(eventsWithDateParsed);
        console.log(eventsWithDateParsed);
      } catch (error) {
        console.error("Error fetching interview events:", error);
      }
    };
    

    fetchInterviewEvents();
  }, []); // Empty dependency array ensures this effect runs only once when the component mounts

  const handleEventClick = (clickInfo) => {
    setSelectedEvent(clickInfo.event);
    modalRef.current.showModal();
  };
  const handleDeleteEvent = async () => {
    try {
      // Make a DELETE request to delete the interview event using the event ID
      await axios.delete(`/Interview/interview-event/${selectedEvent.extendedProps._id}`);
      console.log('Interview event deleted successfully');
      
      // Show a success notification toast
      toast.success('Interview event has been cancelled');
  
      // Close the modal
      modalRef.current.close();
  
      // Refresh the page after a short delay
      setTimeout(() => {
        window.location.reload();
      }, 2000); // Refresh after 2 seconds (adjust as needed)
    } catch (error) {
      console.error('Error deleting interview event:', error);
      // Handle any errors, such as displaying an error message to the user
    }
  };
  
  return (
    <>
     < Navbarjs />
     <ToastContainer position="top-center" autoClose={5000} />

    <div>

      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          start: "today prev,next",
          center: "title",
          end: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        height="90vh"
        events={events} // Pass the interview events data to the Fullcalendar component
        eventClick={handleEventClick} // Callback to handle event click
      />
  
      {selectedEvent && (
  <dialog className="modal" ref={modalRef}>
    <div className="modal-content">
      <span className="close" onClick={() => modalRef.current.close()}>&times;</span>
      <div className="w-full flex justify-start gap-20"><Typography variant="h4" className="block font-semibold  dark:text-red" style={{ fontFamily: 'Roboto, sans-serif' }} >Interview for the post of: {selectedEvent.extendedProps.joboffertitle}</Typography></div>
  <h2 className="modal-title mb-4"><Typography className="block text-2xl font-medium text-red-900 dark:text-red  " >CompanyName :  {selectedEvent.extendedProps.CompanyName}</Typography></h2>
  <Divider sx={{ height: 8, backgroundColor: '#FFFAF0', flexGrow: 1, borderRadius: '8px' }} className="mr-12 mb-24" />
      <h2 className="modal-title mb-4"><Typography className="block text-xl font-medium text-red-900 dark:text-red mt-12 " >Interview title:</Typography>{selectedEvent.title}</h2>
      <p className="modal-text mb-4"><Typography className="block text-xl font-medium text-red-900 dark:text-white" >Date:</Typography> {selectedEvent.start.toLocaleString()}</p>
      <p className="modal-text mb-4"><Typography className="block text-xl font-medium text-red-900 dark:text-white" >Duration:</Typography> {selectedEvent.extendedProps.duration}</p>
      <p className="modal-text mb-4"><Typography className="block text-xl font-medium text-red-900 dark:text-white" >Location:</Typography>  {selectedEvent.extendedProps.location}</p>
      <p className="modal-text mb-4"><Typography className="block text-xl font-medium text-red-900 dark:text-white" >Event mode:</Typography> {selectedEvent.extendedProps.eventMode}</p>
      <p className="modal-text mb-4"><Typography className="block text-xl font-medium text-red-900 dark:text-white" >Description:</Typography> {selectedEvent.extendedProps.description}</p>
      <button className="modal-button delete" onClick={handleDeleteEvent}>want to Cancel the interview?</button>
      <button className="bg-red-900 mt-10 text-white px-6 rounded" onClick={() => modalRef.current.close()}>Close</button>
    </div>
  </dialog>
)}
    </div>
    <div>
   
    </div>
    </>
  );

}

export default CalendarJS;