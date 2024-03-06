import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import {
  Input,
  Card,
  Button,
  Typography,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import axios from "axios";


export function SignUp() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    matriculeFiscale: "",
    description: "",
    socialMedia: {
      facebook: "",
      twitter: "",
      linkedin: "",
    },
    address: "",
    phoneNumber: "",
    domainOfActivity: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    matriculeFiscale: "",
    description: "",
    domainOfActivity: "",
    description: "",
    socialMedia: {
      facebook: "",
      twitter: "",
      linkedin: "",
    },
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
 // const history = useHistory();

  const registerJobseeker = async (e) => {
    e.preventDefault();

    // Validate form fields before submitting
    let formIsValid = true;

    // ... (same validation checks as before)

    // Validate matriculeFiscale
    if (!data.matriculeFiscale) {
      setErrors({ ...errors, matriculeFiscale: "Please enter your matricule fiscale" });
      formIsValid = false;
    }

    // Validate description
    if (!data.description) {
      setErrors({ ...errors, description: "Please enter your description" });
      formIsValid = false;
    }

    // Validate domainOfActivity
    if (!data.domainOfActivity) {
      setErrors({ ...errors, domainOfActivity: "Please enter your domain of activity" });
      formIsValid = false;
    }

    if (!formIsValid) {
      // If form is not valid, prevent submission
      return;
    }

    try {
      // Adjust data format based on your backend requirements
      const adjustedData = {
        ...data,
        socialMedia: {
          ...data.socialMedia,
          // Add other social media fields as needed
        },
      };

      const response = await axios.post('/user/registerCompany', adjustedData);
      console.log('Registration successful:', response.data);
      // Redirect user to login page or any other appropriate page
      navigate("/sign-in");

    } catch (error) {
      console.error('Registration failed:', error.response.data);
      // Handle registration errors
    }
  };


  return (
    <>
      <div className="text-center">
        <Typography variant="h1" className="font-bold mb-4">Join Opportunify!</Typography>
        <Typography variant="paragraph" color="blue-gray" className="text-lg font-normal">Enter your information to register as a Company.</Typography>
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

          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Your Matricule Fiscale
            </Typography>
            <Input
              size="lg"
              placeholder="123456789"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              value={data.matriculeFiscale}
              onChange={(e) => setData({ ...data, matriculeFiscale: e.target.value })}
            />
            {errors.matriculeFiscale && <Typography variant="small" color="red">{errors.matriculeFiscale}</Typography>}
          </div>

          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Your Description
            </Typography>
            <Input
              size="lg"
              placeholder="Your description here..."
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              value={data.description}
              onChange={(e) => setData({ ...data, description: e.target.value })}
            />
            {errors.description && <Typography variant="small" color="red">{errors.description}</Typography>}
          </div>

          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Your Domain of Activity
            </Typography>
            <Input
              size="lg"
              placeholder="IT, Marketing, etc."
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              value={data.domainOfActivity}
              onChange={(e) => setData({ ...data, domainOfActivity: e.target.value })}
            />
            {errors.domainOfActivity && <Typography variant="small" color="red">{errors.domainOfActivity}</Typography>}
          </div>

          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Your Address
            </Typography>
            <Input
              size="lg"
              placeholder="Country, City, Street"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              value={data.address}
              onChange={(e) => setData({ ...data, address: e.target.value })}
            />
            {errors.address && <Typography variant="small" color="red">{errors.address}</Typography>}
          </div>
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Facebook
            </Typography>
            <Input
              size="lg"
              placeholder="Your Facebook profile link"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              value={data.socialMedia.facebook}
              onChange={(e) => setData({ ...data, socialMedia: { ...data.socialMedia, facebook: e.target.value } })}
            />
            {/* Add error handling for Facebook if needed */}
          </div>

          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Twitter
            </Typography>
            <Input
              size="lg"
              placeholder="Your Twitter profile link"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              value={data.socialMedia.twitter}
              onChange={(e) => setData({ ...data, socialMedia: { ...data.socialMedia, twitter: e.target.value } })}
            />
            {/* Add error handling for Twitter if needed */}
          </div>

          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              LinkedIn
            </Typography>
            <Input
              size="lg"
              placeholder="Your LinkedIn profile link"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              value={data.socialMedia.linkedin}
              onChange={(e) => setData({ ...data, socialMedia: { ...data.socialMedia, linkedin: e.target.value } })}
            />
            {/* Add error handling for LinkedIn if needed */}
          </div>

          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Your Phone Number
            </Typography>
            <Input
              type="tel"
              placeholder="+216-12 345 6789"
              size="lg"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              value={data.phoneNumber}
              onChange={(e) => setData({ ...data, phoneNumber: e.target.value })}
            />
            {errors.phoneNumber && <Typography variant="small" color="red">{errors.phoneNumber}</Typography>}
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
