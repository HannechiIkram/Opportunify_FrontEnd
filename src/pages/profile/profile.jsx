import { Avatar, Typography, Button } from "@material-tailwind/react";
import {
  MapPinIcon,
  BriefcaseIcon,
  BuildingLibraryIcon,
} from "@heroicons/react/24/solid";
import { Footer } from "@/widgets/layout";
import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { AiTwotonePhone } from "react-icons/ai";
import Modal from "./Modal.jsx";

import "/public/css/Modal.css";



export function Profile() {
 // const userData = JSON.parse(localStorage.getItem('userData'));
// Fonction pour formater le numéro de téléphone
const formatPhoneNumber = (phoneNumber) => {
  // Supprimer tout ce qui n'est pas un chiffre
  const cleaned = ('' + phoneNumber).replace(/\D/g, '');
  // Appliquer le formatage en ajoutant un espace après chaque groupe de trois chiffres
  const formatted = cleaned.replace(/(\d{3})(\d{2})(\d{3})(\d{3})/,'$1 $2 $3 $4');
  return formatted;
};
const [openModal, setOpenModal] = useState(false);

  const { userId } = useParams();
  const [profile, setprofile] = useState(null);

  useEffect(() => {
    const fetchprofile = async () => {
      try {
        const response = await axios.get(`/user/getProfileJobSeekerById/${userId}`);
        setprofile(response.data.profile); // Assuming response.data contains user information
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchprofile();
  }, [userId]);
  return (
    <>

    <div>
    {profile ? (
          <div>
          



            {/* Display other user information     <p>: {user.role_jobseeker} </p> */}
         
         
      <section className="relative block h-[50vh]">
        <div className="bg-profile-background absolute top-0 h-full w-full bg-[url('/img/background-3.png')] bg-cover bg-center scale-105" />
        <div className="absolute top-0 h-full w-full bg-black/60 bg-cover bg-center" />
      </section>
      <section className="relative bg-white py-16">
        <div className="relative mb-6 -mt-40 flex w-full px-4 min-w-0 flex-col break-words bg-white">
          <div className="container mx-auto">
            <div className="flex flex-col lg:flex-row justify-between">
              <div className="relative flex gap-6 items-start">
                <div className="-mt-20 w-40">
                  <Avatar
                    src="/img/team-5.png"
                    alt="Profile picture"
                    variant="circular"
                    className="h-full w-full"
                  />
                </div>
                <div className="flex flex-col mt-2">
                   <Typography variant="h4" color="blue-gray">
                   {profile.name}    {profile.lastname}
 
                  </Typography>
                  <Typography variant="paragraph" color="gray" className="!mt-0 font-normal">{profile.email}  </Typography>
                </div>
              </div>

              <div className="mt-10 mb-10 flex lg:flex-col justify-between items-center lg:justify-end lg:mb-0 lg:px-4 flex-wrap lg:-mt-5">
                <Button className="bg-gray-900 w-fit lg:ml-auto">Conntect</Button>
                <div className="flex justify-start py-4 pt-8 lg:pt-4">
                  <div className="mr-4 p-3 text-center">
                    <Typography
                      variant="lead"
                      color="blue-gray"
                      className="font-bold uppercase"
                    >
                      22
                    </Typography>
                    <Typography
                      variant="small"
                      className="font-normal text-blue-gray-500"
                    >
                      Friends
                    </Typography>
                  </div>
                  <div className="mr-4 p-3 text-center">
                    <Typography
                      variant="lead"
                      color="blue-gray"
                      className="font-bold uppercase"
                    >
                      10
                    </Typography>
                    <Typography
                      variant="small"
                      className="font-normal text-blue-gray-500"
                    >
                      Photos
                    </Typography>
                  </div>
                  <div className="p-3 text-center lg:mr-4">
                    <Typography
                      variant="lead"
                      color="blue-gray"
                      className="font-bold uppercase"
                    >
                      89
                    </Typography>
                    <Typography
                      variant="small"
                      className="font-normal text-blue-gray-500"
                    >
                  

                      Comments
                    </Typography>
                  </div>
                </div>

              </div>
            </div>
            <div className="-mt-4 container space-y-2">
              <div className="flex items-center gap-2">
                <MapPinIcon className="-mt-px h-4 w-4 text-blue-gray-500" />
                <Typography className="font-medium text-blue-gray-500">
                {profile.address}
                </Typography>
              </div>
              <div className="flex items-center gap-2">
                <BriefcaseIcon className="-mt-px h-4 w-4 text-blue-gray-500" />
                <Typography className="font-medium text-blue-gray-500">
                {profile.role_jobseeker}
                </Typography>
              </div>
              <div className="flex items-center gap-2">
                <AiTwotonePhone className="-mt-px h-4 w-4 text-blue-gray-500" />
                <Typography className="font-medium text-blue-gray-500">
                +{formatPhoneNumber(profile.phone)}
 
                </Typography>
              </div>
            </div>
            <div className="mb-10 py-6">
              <div className="flex w-full flex-col items-start lg:w-1/2">
                <Typography className="mb-6 font-normal text-blue-gray-500">
                  An artist of considerable range, Jenna the name taken by
                  Melbourne-raised, Brooklyn-based Nick Murphy writes,
                  performs and records all of his own music, giving it a
                  warm, intimate feel with a solid groove structure. An
                  artist of considerable range.
                  birthdate: {profile.birthdate}
               {/* <img src={profile.image} alt="Profile Image" className="h-40 w-40 rounded-full" />   */}
                 {profile.image}
                </Typography>
                <Button variant="text">Show more</Button>
              </div>
            </div>
          </div>


        </div>
      </section>

      </div>
        ) : (
          <p>Loading...</p>
        )}



<div>
      <button 
      onClick={() => setOpenModal(true)} 
      className='modalButton'>
        update
      </button>
      <Modal 
      open={openModal} 
      onClose={() => setOpenModal(false)} />
      </div>

      <div className="bg-white">
        <Footer />
      </div>
     <div>

  



      </div>

      </div>

    </>
  );
}

export default Profile;
