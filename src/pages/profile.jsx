import { Avatar, Typography, Button ,input} from "@material-tailwind/react";
import {
  MapPinIcon,
  BriefcaseIcon,
  BuildingLibraryIcon,
} from "@heroicons/react/24/solid";
import { BiSolidCake } from "react-icons/bi";
import { Footer, Navbar } from "@/widgets/layout";
import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { AiTwotonePhone } from "react-icons/ai";
import Modal from "./Modal.jsx";
import { AiFillEdit } from "react-icons/ai";
import  "./Modal.css";
import { Navbarjs } from "@/widgets/layout";
import { AiOutlineArrowRight } from "react-icons/ai";
import PostsList from "@/Containers/PostsList/index.jsx";
import { Card, Container } from "@mui/material";
import AddPost from "@/Containers/AddPost/index.jsx";

export function Profile() {

 
  const [isInputFocused, setInputFocused] = useState(false);



  const [showBirthdate, setShowBirthdate] = useState(false);

  const handleButtonClick = () => {
    setShowBirthdate(!showBirthdate);
  };
  const [posts, setPosts] = useState([]);
  const [displayPostForm, setDisplayPostForm] = useState(false);
  const toggleDisplayPostForm = () => {
    setDisplayPostForm((prev) => !prev);
  };
 // const userData = JSON.parse(localStorage.getItem('userData'));
// Fonction pour formater le numéro de téléphone
const formatPhoneNumber = (phoneNumber) => {
  // Supprimer tout ce qui n'est pas un chiffre
  const cleaned = ('' + phoneNumber).replace(/\D/g, '');
  // Appliquer le formatage en ajoutant un espace après chaque groupe de trois chiffres
  const formatted = cleaned.replace(/(\d{3})(\d{2})(\d{3})(\d{3})/,'$1 $2 $3 $4');
  return formatted;
};

 // Function to format the birthdate
 const formatBirthdate = (birthdate) => {
  const date = new Date(birthdate);
  return date.toLocaleDateString(); // Adjust the format as needed
};
const [openModal, setOpenModal] = useState(false);

  const { userId } = useParams();
  const [profile, setprofile] = useState(null);
 // const [description, setDescription] = useState('');

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const updateDescription = async () => {
    try {
      const response = await axios.put(`/user/profileJobSeeker_description/${userId}`, {
        description: description
      });
      console.log(response.data.message); // Log success message
      handleUpdateDescription();
    } catch (error) {
      console.error('Error:', error.message); // Log error message
    }
  };
  const handleUpdateDescription = () => {
    // Update logic for handling description update
    // Update state to hide the edit button after description update
    setOpenModal(false);
   
    setEditVisible(false);
  };
  useEffect(() => {
    const fetchprofile = async () => {
      try {
        const response = await axios.get(`/user/getProfileJobSeekerById/${userId}`);
        const profile = response.data.profile;
        setprofile(profile); // Assuming response.data contains user information
        return profile._id;
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };
    const fetchPosts = async (id) => {
      try {
        const response = await axios.get(`/status/profile-posts/${id}`);
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchprofile().then((id) => {
      fetchPosts(id);
    });
  }, [userId]);
  const handleAddPost = (postData) => {
    setPosts((prev) => [...posts, postData]);
  };
  const handledeletePost = (postId) => {
    axios.delete(`/status/${postId}`).then((data) => {
      setPosts(posts.filter((e) => e._id !== postId));
    });
  };








  //const [description, setDescription] = useState(profile.description || '');
  const [description, setDescription] = useState('');

  // Set the initial value of description when the profile is available
  useEffect(() => {
    if (profile) {
      setDescription(profile.description);
    }
  }, [profile]);


  const [isEditVisible, setEditVisible] = useState(false);

  const handleEditButtonClick = () => {
    setEditVisible(!isEditVisible);
  };


  const [gitUrl, setGitUrl] = useState('');
  const [isEditing, setIsEditing] = useState(false);
const handleUpdateGitUrl = async () => {
  try {
    const response = await axios.put(`/user/profileJobSeeker_git/${userId}`, {
      git_url: gitUrl // Use gitUrl state here
    });
    console.log(response.data.message); // Log success message
    setIsEditing(false);

  } catch (error) {
    console.error('Error:', error.message); // Log error message
  }
};


const [tempDescription, setTempDescription] = useState('');

// Update the temporary input value instead of directly updating the description state

  return (
    <>
    <div  className="">
 < Navbarjs />
 </div>
    <div>
    {profile ? (
          <div>
          



            {/* Display other user information     <p>: {user.role_jobseeker} </p> */}
           
         
            <section className="relative block h-[50vh]">
           
        <div className="bg-profile-background absolute pt-2 top-0 h-full w-full bg-[url('/img/background-3.png')] bg-cover bg-center scale-105" />
        <div className="absolute top-0 h-full w-full bg-red-900  bg-cover bg-center" />
      </section>
      <section className="relative  py-16 bg-gray-100">
        <div className="relative mb-6 -mt-40 flex w-full px-4 min-w-0 flex-col break-words bg-gray-100">
          <div className="container mx-auto  ">
            <div className="flex flex-col lg:flex-row justify-between  items-center">
              <div className="relative flex gap-6 items-start">
                <div className="-mt-20 w-40">
                  <Avatar
                    src="/img/lll.jpg"
                    alt="Profile picture"
                    variant="circular"
                    className="h-full w-full"
                  />
                </div>

                <div className="flex flex-col mt-2">
                   <Typography variant="h4" color="blue-gray">
                   {profile.name}    {profile.lastname}
 
                  </Typography>
                  <Typography variant="paragraph" color="gray" className="!mt-0 font-normal">{profile.email}   </Typography>
                </div>
                
              </div>

              <div className="mt-10 mb-10 flex lg:flex-col justify-between  lg:justify-end lg:mb-0 lg:px-4 flex-wrap lg:-mt-5">
              <div className="flex gap-4">
  <Button className="bg-white text-gray-900 font-bold">Connect</Button>
  <Button className="bg-white text-gray-900 font-bold">Message</Button>
</div>
</div>


                <div className="flex justify-start py-4 pt-8 lg:pt-4">
                  <div className="mr-4 p-3 text-center">
                  </div>
             

              </div>
            </div>
            <div>
            <button 
      onClick={() => setOpenModal(true)} 
      className="modalButton bg-gray-200 text-black  mt-8 px-6   border mr-1 shadow-md  ml-4 ">
  <span className="flex items-center mx-8 pl-8 my-2 rounded ">
    Edit Profile <AiFillEdit className="text-black ml-1" />
  </span>
</button>
<Modal 
      open={openModal} 
      onClose={() => setOpenModal(false)} />
</div>

            <div className="container mx-auto p-4">

    <div className="flex">
            <div className="w-1/3  bg-white p-8 shadow-md mr-20">
            <div className="-mt-4  -ml-4 container space-y-2 ">
                <div className="flex items-center gap-2">
                <MapPinIcon className="-mt-px  h-4  text-gray-600 w-4  " />
                <Typography className="font-medium text-gray-600">
                {profile.address}
                </Typography>
              </div>
              <hr className="my-2" />
              <div className="mb-12"></div>
              <div className="flex items-center gap-2">
                <BriefcaseIcon className="-mt-px h-4 w-4 text-gray-600" />
                <Typography className="font-medium text-gray-600">
                {profile.role_jobseeker}
                </Typography>
              </div>
              <hr className="my-2" />
              <div className="mb-12"></div>
              <div className="flex items-center gap-2 mb-4">
                <AiTwotonePhone className="-mt-px h-4 w-4 text-gray-600" />
                <Typography className="font-medium text-gray-600 ">
                +{formatPhoneNumber(profile.phone)}
                </Typography>
              </div>
                <hr className="my-2" />
                <div className="flex items-center gap-2">
    <BiSolidCake className="mr-2 text-gray-600" />
    <p className="text-gray-600 font-medium">{formatBirthdate(profile.birthdate)}</p>
  </div>
  {/*
              <div className="mb-12"></div>


              <Button variant="filled" onClick={handleButtonClick}>
                      More info ?
                    </Button>
                  
                    {showBirthdate && (
  <div className="flex items-center gap-2">
    <BiSolidCake className="mr-2 text-gray-600" />
    <p className="text-gray-600 font-medium">{formatBirthdate(profile.birthdate)}</p>
  </div>
  
                    )}   */}
  <hr className="my-2" />
              <div className="mb-12"></div>
              <div className="flex items-center gap-2">
  <i className="fab fa-github text-gray-500 "></i>
          
  <input
  type="text"
  placeholder="Add your git URL...."
  defaultValue={profile.git_url} // Set the default value to profile.git
  className="font-medium text-gray-600"
  onChange={(e) => setGitUrl(e.target.value)} // Update gitUrl state when input changes
/>

<button
  className="mr-2 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-2 rounded-full"
  onClick={handleUpdateGitUrl}
>
<AiFillEdit />
</button>
        </div>
        {/*
          <ul className="list-none">
               
                <li className="flex justify-start items-center py-3 border-b border-gray-200">
                  <i className="fab fa-instagram text-gray-600 mr-2"></i>
                  <input placeholder="Add your instagram URL...." type="text"/>
                </li>
                <li className="flex justify-start items-center py-3">
                  <i className="fab fa-facebook text-gray-600 mr-2"></i>
                  <input placeholder="Add your facebook URL...." type="text"/>
                </li>
              </ul>    */}   
            </div>
            </div>
                   

            <div className="container mx-auto w-2/3">
            <div className="mb-10 ">
            <div className="relative">
  {/* Render input only when isEditVisible is true */}
  {isEditVisible ? (
    <input
      placeholder="Add a description to your bio......"
      type="text"
      className={`w-full h-28 px-3 border rounded-md focus:outline-none focus:border-indigo-500 text-lg placeholder-gray-400 placeholder-opacity-100 ${
        !isEditVisible ? 'bg-gray-200' : '' // Conditionally apply bg-gray-300 when isEditVisible is false
      }`}
      style={{ textAlign: 'left' }}
      onFocus={() => setInputFocused(true)}
      onBlur={() => setInputFocused(false)}
      value={description}
      onChange={handleDescriptionChange}
    />
  ) : (
    // Render the description as text when isEditVisible is false
    <p className="w-full h-28 px-3 border rounded-md focus:outline-none focus:border-indigo-500 text-lg placeholder-gray-400 placeholder-opacity-100 bg-gray-200">
      {description}
    </p>
  )}

  {/* Render the edit button */}
  <button
    className="absolute right-0 top-0 px-2 py-1 bg-white text-gray-600 hover:bg-gray-300 focus:bg-gray-300 rounded-md"
    onClick={handleEditButtonClick}
  >
    <AiFillEdit />
  </button>

  {/* Render the submit button only when isEditVisible is true */}
  {isEditVisible && (
    <button
      className="absolute top-10 right-3 px-2 py-2 bg-gray-200 text-gray-600 hover:bg-gray-300 focus:bg-gray-300 rounded-full"
      onClick={() => {
        updateDescription().then(() => {
          handleUpdateDescription();
        });
      }}
    >
      <AiOutlineArrowRight className="text-red-900" />
    </button>
  )}
</div>
               {/* <img src={profile.image} alt="Profile Image" className="h-40 w-40 rounded-full" />   */}
                 {profile.image}
</div>
</div>
</div>

                
              </div>
            </div>
      
            <div className="flex justify-end">
                  <Button
                    style={{ backgroundColor: '#b41615' }}
                    onClick={toggleDisplayPostForm}
                  >
                    Add new post
                  </Button>
                </div>
         

                {displayPostForm && (
          <Container className=" bg-gray-100">
            <Card sx={{ border: '1px solid #f9f9f9', pt: '1rem' }}>
              <AddPost currentProfile={profile} handleAddPost={handleAddPost} />
            </Card>
          </Container>
        )}
        <PostsList
          posts={posts}
          profile={profile}
          handledeletePost={handledeletePost}
        ></PostsList>

        <div>
         
          <Modal open={openModal} onClose={() => setOpenModal(false)} />
        </div>

        </div>
      </section>

      </div>
      

        ) : (
          <p>Loading...</p>
        )}







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