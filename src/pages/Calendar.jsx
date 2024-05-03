/*import React from "react";
import Fullcalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

function Calendar() {
  return (
    <div>
      <Fullcalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView={"dayGridMonth"}
        headerToolbar={{
          start: "today prev,next", // will normally be on the left. if RTL, will be on the right
          center: "title",
          end: "dayGridMonth,timeGridWeek,timeGridDay", // will normally be on the right. if RTL, will be on the left
        }}
        height={"90vh"}
      />
    </div>
  );
}

export default Calendar;



//////////
import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import axios from "axios";

function Calendar() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Fetch interview events from the backend when the component mounts
    const fetchInterviewEvents = async () => {
      try {
        const response = await axios.get("/Interview/interview-events");
        setEvents(response.data);
      } catch (error) {
        console.error("Error fetching interview events:", error);
      }
    };

    fetchInterviewEvents();
  }, []); // Empty dependency array ensures this effect runs only once when the component mounts

  return (
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
      />
    </div>
  );
}

export default Calendar;

*/
///////lastone
/*import React from "react";
import Fullcalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

function Calendar() {
  return (
    <div>
      <Fullcalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView={"dayGridMonth"}
        headerToolbar={{
          start: "today prev,next", // will normally be on the left. if RTL, will be on the right
          center: "title",
          end: "dayGridMonth,timeGridWeek,timeGridDay", // will normally be on the right. if RTL, will be on the left
        }}
        height={"90vh"}
      />
    </div>
  );
}

export default Calendar;



//////////
import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import axios from "axios";

function Calendar() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Fetch interview events from the backend when the component mounts
    const fetchInterviewEvents = async () => {
      try {
        const response = await axios.get("/Interview/interview-events");
        setEvents(response.data);
      } catch (error) {
        console.error("Error fetching interview events:", error);
      }
    };

    fetchInterviewEvents();
  }, []); // Empty dependency array ensures this effect runs only once when the component mounts

  return (
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
      />
    </div>
  );
}

export default Calendar;



*/

import React, { useState, useEffect, useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import axios from "axios";
import "./Calendar.css";
import { useParams} from 'react-router-dom';

import {
  Card,
  CardBody,
  CardHeader,
  Typography,
  Button,
  Input,
} from "@material-tailwind/react";
import { Navbar } from "@/widgets/layout";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Calendar() {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
 // const modalRef = useRef(null);
  const modalRef = useRef();
  const {pid} = useParams();
  console.log(pid)
  useEffect(() => {
    // Fetch interview events from the backend when the component mounts
    const fetchInterviewEvents = async () => {
      try {
        const response = await axios.get(`/Interview/interview-events/${pid}`);
      
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
 console.log(selectedEvent)
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
    <Navbar />
    <ToastContainer position="top-center" autoClose={3000} />

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
      <div className="w-full flex justify-center"><Typography variant="h4" className="block font-semibold text-red-900 dark:text-red" style={{ fontFamily: 'Roboto, sans-serif' }} >Interview for the post of: <h1 className="ml-14 text-black">{selectedEvent.extendedProps.joboffertitle}</h1> </Typography></div>
   {/*   <h2 className="modal-title mb-4"><Typography className="block text-m font-medium text-red-900 dark:text-red " >CompanyName:</Typography>{selectedEvent.extendedProps.CompanyName}</h2>*/}
      <h2 className="modal-title mb-4"><Typography className="block text-xl font-medium text-red-900 dark:text-red " >Interview title:</Typography>{selectedEvent.title}</h2>
      <p className="modal-text mb-4"><Typography className="block text-xl font-medium text-red-900 dark:text-white" >Date:</Typography> {selectedEvent.start.toLocaleString()}</p>

      <p className="modal-text mb-4"><Typography className="block text-xl font-medium text-red-900 dark:text-white" >Event mode:</Typography> {selectedEvent.extendedProps.eventMode}</p>
      <p className="modal-text mb-4"><Typography className="block text-xl font-medium text-red-900 dark:text-white" >Description:</Typography> {selectedEvent.extendedProps.description}</p>
      <div className="button-container">
  <button className="modal-button delete" onClick={handleDeleteEvent}>want to Cancel the interview?</button>
  <button className="modal-button close" onClick={() => modalRef.current.close()}>Close</button>
</div>

    </div>
  </dialog>
)}
    </div>
    <div>
   
    </div>
    </>
  );

}

export default Calendar;

/*
import React, { useState, useEffect, useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import axios from "axios";
import "./Calendar.css";
import { useParams} from 'react-router-dom';
function Calendar() {
  const { pid } = useParams();
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const modalRef = useRef(null);

  useEffect(() => {
    // Fetch interview events from the backend when the component mounts
    const fetchInterviewEvents = async () => {
      try {
        const response = await axios.get(`/Interview/interview-events/${pid}`);
        setEvents(response.data);
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
  return (
    <>
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
      <h2>{selectedEvent.title}</h2>
      <p>Date Start: {selectedEvent.datestart}</p>
              <p>Duration: {selectedEvent.duration}</p>
              <p>Location: {selectedEvent.location}</p>
              <p>Interviewer's Email: {selectedEvent.intervieweremail}</p>
              <p>Event Mode: {selectedEvent.eventMode}</p>
              <p>Description: {selectedEvent.description}</p>
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

export default Calendar;
*/
