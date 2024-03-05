import React, { useState } from 'react';
import {
  Input,
  Card,
  Button,
  Typography,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import axios from "axios";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';






export function SignUp() {
  const [data, setData] = useState({
    name: "",
    lastname: "",
    birthdate:"",
    email: "",
    phone: "",
    adress:"",
    password: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    lastname: "",
    birthdate:"",
    email: "",
    phone: "",
    adress:"",
    password: "",
  });
  const [birthdate, setBirthdate] = useState('');

  function getCurrentDate() {
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();

    // Adding leading zero if month or day is less than 10
    month = month < 10 ? '0' + month : month;
    day = day < 10 ? '0' + day : day;

    return `${year}-${month}-${day}`;
  }

  const registerJobseeker = async (e) => {
    e.preventDefault();

    // Validate form fields before submitting
    let formIsValid = true;

    // Validate name
    if (!data.name) {
      setErrors({ ...errors, name: "Please enter your name" });
      formIsValid = false;
    } else if (data.name.length > 8) {
      setErrors({ ...errors, name: "Name must be less than 8 characters" });
      formIsValid = false;
    }
  

    // Validate lastname
    if (!data.lastname) {
      setErrors({ ...errors, lastname: "Please enter your Lastname" });
      formIsValid = false;
    } else if (data.lastname.length > 8) {
      setErrors({ ...errors, name: "LastName must be less than 8 characters" });
      formIsValid = false;
    }

    // Validate email
    if (!data.email) {
      setErrors({ ...errors, email: "Please enter your email" });
      formIsValid = false;
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(data.email)) {
        setErrors({ ...errors, email: "Invalid email format" });
        formIsValid = false;
      } else {
        setErrors({ ...errors, email: "" }); // Reset email error if valid
      }
    }

    // Validate phone
    if (!data.phone) {
      setErrors({ ...errors, phone: "Please enter your phone number" });
      formIsValid = false;
    }

    // Validate password
    if (!data.password) {
      setErrors({ ...errors, password: "Please enter your password" });
      formIsValid = false;
    }
     // Validate adress
    if (!data.adress) {
      setErrors({ ...errors, password: "Please enter your adress" });
      formIsValid = false;
    }
     // Validate bithdate
    if (!data.birthdate) {
      setErrors({ ...errors, password: "Please enter your birthday" });
      formIsValid = false;
    }
    
    if (!formIsValid) {
      // If form is not valid, prevent submission
      return;
    }

    try {
      const response = await axios.post('/users/registerjobseeker', data);
      console.log('Registration successful:', response.data);
      // Redirect user to login page or any other appropriate page
    } catch (error) {
      console.error('Registration failed:', error.response.data);
      // Handle registration errors
    }
  };

  return (
    <>
     

       
          <div className="text-center">
            <Typography variant="h1" className="font-bold mb-4">Join Opportunify!</Typography>
            <Typography variant="paragraph" color="blue-gray" className="text-lg font-normal">Enter your information to register as a Job Seeker.</Typography>
          </div>

          <Card className="mt-8 ml-auto mr-auto mb-2 w-60 max-w-screen-lg lg:w-5/6 rounded-lg p-6 bg-gray-200 bg-opacity-90">
            <form onSubmit={registerJobseeker} className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg ">

              <div className="mb-1 flex flex-col gap-6">
                <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
                  Your name
                </Typography>
                <Input
                  size="lg"
                  placeholder="Foulen"
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                  value={data.name}
                  onChange={(e) => setData({ ...data, name: e.target.value })}
                />
                {errors.name && <Typography variant="small" color="red">{errors.name}</Typography>}
              </div>

              <div className="mb-1 flex flex-col gap-6">
                <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
                  Your Lastname
                </Typography>
                <Input
                  size="lg"
                  placeholder="Ben Foulen"
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                  value={data.lastname}
                  onChange={(e) => setData({ ...data, lastname: e.target.value })}
                  
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
        placeholder="YYYY-MM-DD"
        className="!border-t-blue-gray-200 focus:!border-t-gray-900"
        value={birthdate}
        onChange={(e) => setBirthdate(e.target.value)}
        max={getCurrentDate()}
       
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
                  value={data.email}
                  onChange={(e) => setData({ ...data, email: e.target.value })}
                />
                {errors.email && <Typography variant="small" color="red">{errors.email}</Typography>}
              </div>

              <div className="mb-1 flex flex-col gap-6">
                <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
                  Your Phone Number
                </Typography>
                <PhoneInput
                  country={'TN'} // Default country
                  size="lg"
                  placeholder="+216-12 345 6789"
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                 
                  value={data.phone}
                  onChange={(phone) => setData({ ...data, phone })}

                />
                {errors.phone && <Typography variant="small" color="red">{errors.phone}</Typography>}
              </div>
              <div className="mb-1 flex flex-col gap-6">
                <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
                  Your Adress
                </Typography>
                <Input
                  size="lg"
                  placeholder="Country,City,Street"
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                  value={data.adress}
                  onChange={(e) => setData({ ...data, adress: e.target.value })}
                />
                {errors.adress && <Typography variant="small" color="red">{errors.adress}</Typography>}
              </div>

             

              <div className="mb-1 flex flex-col gap-6">
                <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
                  Choose a password
                </Typography>
                <Input
                  size="lg"
                  placeholder="*******"
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                  value={data.password}
                  onChange={(e) => setData({ ...data, password: e.target.value })}
                  type='password'                  
                />
                
                {errors.password && <Typography variant="small" color="red">{errors.password}</Typography>}
              </div>

             
            
              <Button className="mt-6 bg-red-800" fullWidth type="submit">
                Register Now
              </Button>

              <Typography variant="paragraph" className="text-center text-blue-gray-500 font-medium mt-4">
                Already have an account?
                <Link to="/sign-in" className="text-gray-900 ml-1">Sign in</Link>
              </Typography>
            </form>
          </Card>
       
      
    </>
  );
}

export default SignUp;

