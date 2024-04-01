
import React, { useState } from 'react';
import {
  Input,
  Card,
  Button,
  Typography,
  Select,MenuItem
} from "@material-tailwind/react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';


 
import { Navbar1 } from '@/widgets/layout';
import TermsAndConditions from './TermsAndConditions';

export function RegisterJobseeker() {
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const handleImageChange1 = (e) => {
    const file = e.target.files[0];
    setData({ ...data, image: file });
  };


  const navigate = useNavigate();
  const [termsChecked, setTermsChecked] = useState(false);

  const [data, setData] = useState({
    name: "",
    lastname: "",
    birthdate: "",
    email: "",
    phone: "",
    address: "",
    password: "",
    confirmPassword: '',
    role_jobseeker: "",
    image: null, // Store the selected image file

  });
  const [errors, setErrors] = useState({
    name: "",
    lastname: "",
    birthdate: "",
    email: "",
    phone: "",
    address: "",
    password: "",
    confirmPassword: '',
    role_jobseeker: "",
  });

  const isPasswordMatched = () => {
    return data.password === data.confirmPassword;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
      'lastname': value,
    'email': value,
    'address': value,
    'birthdate': value,
    'phone': value,
    'password': value,
    'role_jobseeker': value


    });

    // Reset errors for the field being edited
    setErrors({
      ...errors,
      [name]: '',
      'lastname': '',
      'email': '',
      'address': '',
      'birthdate': '',
      'phone': '',
      'password': '',
      'role_jobseeker': '',
    });

    // Validation logic for each field
    switch (name) {
      case 'name':
        if (!value) {
          setErrors({ ...errors, name: "Please enter your name" });
        } else if (value.length < 2 || value.length > 10) {
          setErrors({ ...errors, name: 'Name must be between 2 and 10 characters' });
        }
        break;
      case 'lastname':
        if (!value) {
          setErrors({ ...errors, lastname: "Please enter your Lastname" });
        } else if (value.length < 2 || value.length > 10) {
          setErrors({ ...errors, lastname: 'Lastname must be between 2 and 10 characters' });
        }
        break;
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value) {
          setErrors({ ...errors, email: "Please enter your email" });
        } else if (!emailRegex.test(value)) {
          setErrors({ ...errors, email: "Invalid email format" });
        }
        break;
      case 'phone':
        if (!value) {
          setErrors({ ...errors, phone: "Please enter your phone number" });
        }
        break;
      case 'password':
        if (!value) {
          setErrors({ ...errors, password: "Please enter your password" });
        } else if (value.length < 8) {
          setErrors({ ...errors, password: "Password must be at least 8 characters long" });
        } else if (!/[a-z]/.test(value) || !/[A-Z]/.test(value) || !/[0-9]/.test(value) || !/[!@#$%^&*]/.test(value)) {
          setErrors({ ...errors, password: "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character" });
        }
        
        break;
      case 'address':
        if (!value) {
          setErrors({ ...errors, address: "Please enter your address" });
        } else if (value.length < 5) {
          setErrors({ ...errors, address: 'Address must be at least 5 characters' });
        }
        break;
      case 'birthdate':
        if (!value) {
          setErrors({ ...errors, birthdate: "Please enter your birthday" });
        }
        break;
        case 'role_jobseeker':
          if (!value) {
            setErrors({ ...errors, role_jobseeker: "Please choose your role sa a jobseeker" });
          }
          break;
      default:
        break;
    }
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setData({ ...data, image: file });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    let formIsValid = true;

    // Check if any errors exist
    for (const key in errors) {
      if (errors[key]) {
        formIsValid = false;
        break;
      }
    }
   /*
    let formIsValid = true;
      if (!formIsValid) {
        
        return;
      }*/

      if (formIsValid) {
        try {
          const response = await axios.post('/user/registerjobseeker', data);
          console.log('Registration successful:', response.data);
          navigate("/sign-in");
        } catch (error) {
          console.error('Registration failed:',  error.response.data);
          window.alert('Registration failed: ' + JSON.stringify(error.response.data));
        }
      }
    
  };
 // const handleImageChange = (e) => {
   // const file = e.target.files[0];
    //setData({ ...data, image: file });
  //};
  

  

  return (
    <>
    <Navbar1/>
          <div className="text-center">
      <Typography variant="h1" className="font-bold mb-4">
        Join Opportunify!
      </Typography>
      <Typography variant="paragraph" color="blue-gray" className="text-lg font-normal">
        Enter your information to register as a Job Seeker.
      </Typography>
    </div>
          <Card className="mt-8 ml-auto mr-auto mb-2 w-60 max-w-screen-lg lg:w-5/6 rounded-lg p-6 bg-gray-200 bg-opacity-90">
            <form onSubmit={handleSubmit} className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg ">

              <div className="mb-1 flex flex-col gap-6">
                <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
                  Your name
                </Typography>
                <Input
                name="name"
                  size="lg"
                  
                  placeholder="Foulen"
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                  value={data.name}
                  onChange={(e) => {handleInputChange(e);setData({ ...data, name: e.target.value })}}
                />
                {errors.name && <Typography variant="small" color="red">{errors.name}</Typography>}
              </div>

              <div className="mb-1 flex flex-col gap-6">
                <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
                  Your Lastname
                </Typography>
                <Input
                  size="lg"
                  
                  name="lastname"
                  placeholder="Ben Foulen"
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                  value={data.lastname}
                  onChange={(e) => {handleInputChange(e);setData({ ...data, lastname: e.target.value })}}
                  
                />

                {errors.lastname && <Typography variant="small" color="red">{errors.lastname}</Typography>}
              </div>
              <div className="mb-1 flex flex-col gap-6">
      <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
        Your Birthdate
      </Typography>
      <Input
        type="date"
        size="lg"
        
        name='birthdate'
        placeholder="YYYY-MM-DD"
        className="!border-t-blue-gray-200 focus:!border-t-gray-900"
        value={data.birthdate}
        onChange={(e) =>{handleInputChange(e);setData({ ...data, birthdate: e.target.value })}}
   
      />
      {errors.birthdate && <Typography variant="small" color="red">{errors.birthdate}</Typography>}

    </div>

              <div className="mb-1 flex flex-col gap-6">
                <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
                  Your Email
                </Typography>
                <Input
                  size="lg"
                  placeholder="name@mail.com"
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                  name="email"
                  value={data.email}
                  
                  onChange={(e) =>{handleInputChange(e); setData({ ...data, email: e.target.value })}
                  }/>
                {errors.email && <Typography variant="small" color="red">{errors.email}</Typography>}
              </div>


              <div className="mb-1 flex flex-col gap-6">
                <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
                  Your address
                </Typography>
                <Input
                  size="lg"
                  placeholder="Country,City,Street"
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                  
                  name='address'
                  value={data.address}
                  onChange={(e) => {handleInputChange(e);setData({ ...data, address: e.target.value })}}
                />
                {errors.address && <Typography variant="small" color="red">{errors.address}</Typography>}
              </div>

              <div className="mb-1 flex flex-col gap-6">
                <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
                  Your Phone Number
                </Typography>
                <PhoneInput
                  country={'TN'} 
                  placeholder="+216-12 345 6789"
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                  name='phone'
                 
                  value={data.phone}
                  onChange={(phone) => setData({ ...data, phone })}

                />
                {errors.phone && <Typography variant="small" color="red">{errors.phone}</Typography>}
              </div>

        <div className="mb-1 flex flex-col gap-6">
    <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
      Choose Your Role
    </Typography>
    <select
  name="role_jobseeker" 
  size="lg"
  value={data.role_jobseeker}
  onChange={(e) => { handleInputChange(e); setData({ ...data, role_jobseeker: e.target.value }) }}
  className="border-t-blue-gray-200 focus:border-t-gray-900 bg-gray-200 text-black placeholder-gray-500 border-b-2 border-r-2 border-l-2 focus:ring-0 rounded-lg shadow-sm focus:outline-none focus:border-primary-400 w-full py-3 px-4 mt-1">

  <option value="student">Student</option>
  <option value="alumni">Alumni</option>
  <option value="staff">Staff</option>
</select>
    {errors.role_jobseeker && <Typography variant="small" color="red">{errors.role_jobseeker}</Typography>}
  </div>
              <div className="mb-1 flex flex-col gap-6">
                <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
                  Choose a password
                </Typography>
                <Input
                  size="lg"
                  placeholder="*****"
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                  name='password'
                  value={data.password}
                  onChange={(e) => {handleInputChange(e);setData({ ...data, password: e.target.value })}}
                  type='password'  
                                  
                />
                
                {errors.password && <Typography variant="small" color="red">{errors.password}</Typography>}
              </div>

             
        <div className="mb-1 flex flex-col gap-6">
          <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
            Confirm Password
          </Typography>
          <Input
            type="password"
            placeholder="Confirm your password"
            size="lg"
            
            name='confirmPasword'
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            value={data.confirmPassword}
            onChange={(e) => {handleInputChange(e);setData({ ...data, confirmPassword: e.target.value })}}
          />
          {!isPasswordMatched() && (
            <Typography variant="small" color="red">Passwords do not match</Typography>
          )}
        </div>
        
        <div className="mb-1 flex flex-col gap-6">
        <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
          </Typography>
  <div className="relative">
  <input
  type="file"
  id="fileInput"
  className="hidden"
  onChange={handleImageChange} // This line is important
/>

       <label
    htmlFor="fileInput"
    className={`w-full border rounded-md p-3 text-sm text-white cursor-pointer hover:bg-black focus:outline-none focus:border-black ${
      data.image ? 'bg-black border-black' : 'bg-red-800 border-red-800'
    }`}
  >
    {data.image ? 'Image Uploaded' : 'Upload Your Photo'}
  </label>
  </div>

</div>



        <div className="mb-1 flex flex-col gap-6">
        <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
          </Typography>
  <label htmlFor="terms" className="flex items-center">
    <input
      type="checkbox"
      id="terms"
      checked={termsChecked}
      onChange={(e) => setTermsChecked(e.target.checked)}
      className="mr-2"
    />
   <Typography variant="small" color="blueGray">
        I accept{' '}
        <Link
          onClick={() => setIsConfirmationOpen(prevState => !prevState)}
          underline="always" 
          style={{ color: '#007bff' }} 
        >
          Opportunify terms and conditions
        </Link>
      </Typography>

  </label>
  <TermsAndConditions isOpen={isConfirmationOpen} onClose={() => setIsConfirmationOpen(false)} onConfirm={setIsConfirmationOpen}/>

</div>
{!termsChecked && (
  <Typography variant="small" color="red">
    Please accept Opportunify terms and conditions before registering.
  </Typography>
)}

            
              <Button className="mt-6 bg-red-800" fullWidth type="submit" disabled={!termsChecked}  >
                Register Now
              </Button>

              <Typography variant="paragraph" className="text-center text-blue-gray-500 font-medium mt-4">
                Already have an account?
                <Link to="/sign-in" className="text-gray-900 ml-1">Sign in</Link>
              </Typography>
              
            </form>
          </Card>
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

}

export default RegisterJobseeker;
