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
    socialMedia: {
      facebook: "",
      twitter: "",
      linkedin: "",
    },
    address: "",
    phoneNumber: "",
  });

  const [generalError, setGeneralError] = useState("");

  const registerJobseeker = async (e) => {
    e.preventDefault();

    let formIsValid = true;
    let newErrors = { ...errors };

    // Validate name
    if (!data.name) {
      newErrors.name = "Please enter your name";
      formIsValid = false;
    }

    // Validate email
    if (!data.email) {
      newErrors.email = "Please enter your email";
      formIsValid = false;
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(data.email)) {
        newErrors.email = "Invalid email format";
        formIsValid = false;
      }
    }

   // Validate password
if (!data.password) {
  newErrors.password = "Please enter your password";
  formIsValid = false;
} else if (data.password.length < 6) {
  newErrors.password = "Password must be at least 6 characters long";
  formIsValid = false;
} else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{6,}/.test(data.password)) {
  newErrors.password = "Password should contain at least one lowercase letter, one uppercase letter, one digit, and one special character";
  formIsValid = false;
}

 // Validate matriculeFiscale
 if (!data.matriculeFiscale) {
  newErrors.matriculeFiscale = "Please enter your matricule fiscale";
  formIsValid = false;
}
 // Validate description
 if (!data.description) {
  newErrors.description = "Please enter a description";
  formIsValid = false;
} 



 // Validate domainOfActivity
 if (!data.domainOfActivity) {
  newErrors.domainOfActivity = "Please enter your domain of activity";
  formIsValid = false;
} else if (!/^[a-zA-Z]+$/.test(data.domainOfActivity)) {
  newErrors.domainOfActivity = "Domain of activity should contain only letters";
  formIsValid = false;
}


  // Validate address
  if (!data.address) {
    newErrors.address = "Please enter your address";
    formIsValid = false;
  }

// Validate Facebook
if (!data.socialMedia.facebook) {
  newErrors.socialMedia = {
    ...newErrors.socialMedia,
    facebook: "Please enter your Facebook profile link",
  };
  formIsValid = false;
} else {
  const facebookUrlRegex = /^https?:\/\/(www\.)?facebook\.com\/.*/;
  if (!facebookUrlRegex.test(data.socialMedia.facebook)) {
    newErrors.socialMedia = {
      ...newErrors.socialMedia,
      facebook: "Invalid Facebook profile link",
    };
    formIsValid = false;
  }
}

// Validate Twitter
if (!data.socialMedia.twitter) {
  newErrors.socialMedia = {
    ...newErrors.socialMedia,
    twitter: "Please enter your Twitter profile link",
  };
  formIsValid = false;
} else {
  const twitterUrlRegex = /^https?:\/\/(www\.)?twitter\.com\/.*/;
  if (!twitterUrlRegex.test(data.socialMedia.twitter)) {
    newErrors.socialMedia = {
      ...newErrors.socialMedia,
      twitter: "Invalid Twitter profile link",
    };
    formIsValid = false;
  }
}

// Validate LinkedIn
if (!data.socialMedia.linkedin) {
  newErrors.socialMedia = {
    ...newErrors.socialMedia,
    linkedin: "Please enter your LinkedIn profile link",
  };
  formIsValid = false;
} else {
  const linkedinUrlRegex = /^https?:\/\/(www\.)?linkedin\.com\/.*/;
  if (!linkedinUrlRegex.test(data.socialMedia.linkedin)) {
    newErrors.socialMedia = {
      ...newErrors.socialMedia,
      linkedin: "Invalid LinkedIn profile link",
    };
    formIsValid = false;
  }
}



  // Validate phoneNumber
if (!data.phoneNumber) {
  newErrors.phoneNumber = "Please enter your phone number";
  formIsValid = false;
} else if (!/^\d+$/.test(data.phoneNumber)) {
  newErrors.phoneNumber = "Phone number should contain only digits";
  formIsValid = false;
} else if (data.phoneNumber.length < 8) {
  newErrors.phoneNumber = "Phone number should be at least 8 digits long";
  formIsValid = false;
} else if (data.phoneNumber.length > 12) {
  newErrors.phoneNumber = "Phone number should not exceed 12 digits";
  formIsValid = false;
}


 


    // Validate other fields as needed

    if (!formIsValid) {
      setErrors(newErrors);
      setGeneralError("Please fix the errors in the form.");
      return;
    }

 
 
 

    try {
      const adjustedData = {
        ...data,
        socialMedia: {
          ...data.socialMedia,
          // Add other social media fields as needed
        },
      };

      const response = await axios.post('/user/registerCompany', adjustedData);
      console.log('Registration successful:', response.data);
      navigate("/sign-in");
    } catch (error) {
      console.error('Registration failed:', error.response.data);
      setGeneralError("Registration failed. Please try again.");
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
              onChange={(e) => {
                setData({ ...data, name: e.target.value });
                setErrors({ ...errors, name: "" }); // Clear the error for name
              }}
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
              onChange={(e) => {
                setData({ ...data, email: e.target.value });
                setErrors({ ...errors, email: "" }); // Clear the error for name
              }}/>
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
              onChange={(e) => {
                setData({ ...data, password: e.target.value });
                setErrors({ ...errors, password: "" }); // Clear the error for name
              }}
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
              onChange={(e) => {
                setData({ ...data, matriculeFiscale: e.target.value });
                setErrors({ ...errors, matriculeFiscale: "" }); // Clear the error for name
              }}
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
              onChange={(e) => {
                setData({ ...data, description: e.target.value });
                setErrors({ ...errors, description: "" }); // Clear the error for name
              }}
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
              onChange={(e) => {
                setData({ ...data, domainOfActivity: e.target.value });
                setErrors({ ...errors, domainOfActivity: "" }); // Clear the error for name
              }}
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
              onChange={(e) => {
                setData({ ...data, address: e.target.value });
                setErrors({ ...errors, address: "" }); // Clear the error for name
              }}
            />
            {errors.address && <Typography variant="small" color="red">{errors.address}</Typography>}
          </div>{/* Facebook */}
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
    }} value={data.socialMedia.facebook}
    onChange={(e) => {
      setData({
        ...data,
        socialMedia: {
          ...data.socialMedia,
          facebook: e.target.value,
        },
      });setErrors({
        ...errors,
        socialMedia: { ...errors.socialMedia, facebook: "" }, // Clear the error for Facebook
      });
    }}
  />
  {errors.socialMedia && errors.socialMedia.facebook && <Typography variant="small" color="red">{errors.socialMedia.facebook}</Typography>}
</div>

{/* Twitter */}
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
    onChange={(e) => {
      setData({
        ...data,
        socialMedia: {
          ...data.socialMedia,
          twitter: e.target.value,
        },
      });setErrors({
        ...errors,
        socialMedia: { ...errors.socialMedia, twitter: "" }, // Clear the error for Facebook
      });
    }}
  />
  {errors.socialMedia && errors.socialMedia.twitter && <Typography variant="small" color="red">{errors.socialMedia.twitter}</Typography>}
</div>

{/* LinkedIn */}
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
    onChange={(e) => {
      setData({
        ...data,
        socialMedia: {
          ...data.socialMedia,
          linkedin: e.target.value,
        },
      });setErrors({
        ...errors,
        socialMedia: { ...errors.socialMedia, linkedin: "" }, // Clear the error for Facebook
      });
    }}
  />
  {errors.socialMedia && errors.socialMedia.linkedin && <Typography variant="small" color="red">{errors.socialMedia.linkedin}</Typography>}
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
              onChange={(e) => {
                setData({ ...data, phoneNumber: e.target.value });
                setErrors({ ...errors, phoneNumber: "" }); // Clear the error for name
              }}
            />
            {errors.phoneNumber && <Typography variant="small" color="red">{errors.phoneNumber}</Typography>}
          </div>
          

          <Button className="mt-6 bg-red-800" fullWidth type="submit">
            Register Now
          </Button>
          {generalError && <Typography variant="small" color="red">{generalError}</Typography>}


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
