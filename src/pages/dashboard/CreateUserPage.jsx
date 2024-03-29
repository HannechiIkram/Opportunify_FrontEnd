import React, { useState } from "react";
import axios from "axios";
import { MaterialTailwindControllerProvider } from "@/context"; 
import { Sidenav } from ".";
import { useNavigate } from 'react-router-dom'; 
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';


import {
  Typography,

} from "@material-tailwind/react";
function CreateUserPage() {
  const navigate = useNavigate(); 
  

  const generateRandomString = (length) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  };

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
    image: null,
    voiceRecording: null, // Nouveau champ pour l'enregistrement vocal

  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
  });
  
  const [captcha, setCaptcha] = useState(generateRandomString(6));
  const [translatedContent, setTranslatedContent] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };
 

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      image: file,
      imageUrl: URL.createObjectURL(file),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset errors
    setErrors({
      name: "",
      email: "",
      password: "",
    });

    // Validate form data
    let formIsValid = true;
    if (formData.name === "") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        name: "Name is required",
      }));
      formIsValid = false;
    }
    if (formData.email === "") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "Email is required",
      }));
      formIsValid = false;
    }
    if (formData.password === "") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: "Password is required",
      }));
      formIsValid = false;
    }

    if (!formIsValid) {
      return;
    }

    try {
      const response = await axios.post("/user/createUser", formData);
      console.log("User created:", response.data);
      navigate('/dashboard');
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };
 
  const regenerateCaptcha = () => {
    setCaptcha(generateRandomString(6));
  };
// Fonction pour traduire le contenu en français
async function translateToFrench(content) {
  try {
      const translatedContent = await translate(content, { to: 'fr' });
      return translatedContent.text;
  } catch (error) {
      console.error('Error translating content:', error);
      throw error;
  }
}



  return (
    <MaterialTailwindControllerProvider>
      <Sidenav />
      <div className="ml-80 mr-200 mb-20" style={{ position: 'absolute', bottom: '20px', left: '1000px' }}>
  <img
    src="img/logoesprit.png"
    alt="logo"
    style={{ width: 'auto', height: '50px' }}
  />
</div>


      <div className="container mx-auto mt-9 mb-20">
        <h1 className="text-4xl mb-8 text-center text-red-700 transition-opacity duration-500 transform hover:scale-105">
          Create account for admin
        </h1>
        <div className="card mx-auto mb-30 mt-5" style={{ maxWidth: '500px', backgroundColor: '#F3F4F6', padding: '50px', borderRadius: '5px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', transition: 'box-shadow 0.3s ease' }}>
          <form onSubmit={handleSubmit} >
            <div className="mb-8">
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:border-blue-500 ${errors.name ? "border-red-500" : "border-gray-300"}`}
                placeholder="Name"
                required
              />
              {errors.name && (
                <p className="text-red-500 mt-1">{errors.name}</p>
              )}
            </div>
            <div className="mb-8">
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:border-blue-500 ${errors.email ? "border-red-500" : "border-gray-300"}`}
                placeholder="Email"
                required
              />
              {errors.email && (
                <p className="text-red-500 mt-1">{errors.email}</p>
              )}
            </div>
            <div className="mb-8">
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:border-blue-500 ${errors.password ? "border-red-500" : "border-gray-300"}`}
                placeholder="Password"
                required
              />
              {errors.password && (
                <p className="text-red-500 mt-1">{errors.password}</p>
              )}
            </div>
            <div className="mb-8 flex justify-center">
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:border-blue-500"
                required
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <div className="mb-8">
              <label htmlFor="image" className="block font-medium mb-2 text-gray-700">Upload User Image</label>
              <div className="flex items-center justify-center bg-gray-100 border border-gray-300 rounded-md p-4">
                <label htmlFor="image" className="cursor-pointer text-blue-600 hover:text-blue-700">
                  <svg
                    className="w-6 h-6 mr-2"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M12 5v14m-7-7h14"></path>
                  </svg>
                  Choose Image
                </label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  accept="image/png, image/jpeg"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>
              {formData.imageUrl && (
                <img src={formData.imageUrl} alt="Uploaded" className="mt-2 mx-auto max-w-xs" />
              )}
            </div>
            <button
              type="submit"
              className="btn-primary bg-red-700 text-white py-3 px-6 rounded-lg hover:bg-black transition duration-300 ease-in-out w-full"
            >
              Add User
            </button>
            <div>
         
              <div>
                <label className="  btn-primary rounded-lg "  htmlFor="captcha"> {captcha}</label>
              </div>
              <div>
                <input type="text" id="captcha" />
              </div>
              <div>
                <button  className="bg-gray-300  btn-primary rounded-lg " onClick={regenerateCaptcha}>Regenerate </button>
              </div>
              
            </div>
          </form>
          
        </div>
        <div className="useful-links ml-80 mt-10 mb-10">
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

export default CreateUserPage;
