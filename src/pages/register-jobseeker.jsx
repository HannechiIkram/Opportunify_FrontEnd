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

export function RegisterJobseeker() {
    const navigate = useNavigate();
    const roles = [
        { value: "student", label: "Student" },
        { value: "staff", label: "Staff" },
        { value: "alumni", label: "Alumni" },
      ];
      
  const [data, setData] = useState({
    name: "",
    lastname: "",
    birthdate:"",
    email: "",
    phone: "",
    address:"",
    password: "",
    confirmPassword: '',
    role_jobseeker: roles[0].value, 
  });
  const [errors, setErrors] = useState({
    name: "",
    lastname: "",
    birthdate:"",
    email: "",
    phone: "",
    address:"",
    password: "",
    confirmPassword: '',
    role_jobseeker:""
  });
  const isPasswordMatched = () => {
    return data.password === data.confirmPassword;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    let formIsValid = true;
      if (!formIsValid) {
        
        return;
      }

    try {
      const response = await axios.post('/user/registerjobseeker', data);
      console.log('Registration successful:', response.data);
      navigate("/sign-in");
      
        } catch (error) {
      console.error('Registration failed:',  error.response.data);
      window.alert('Registration failed: ' + JSON.stringify(error.response.data));
    }
  };

  return (
    <>
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
        value={data.birthdate}
        onChange={(e) => setData({ ...data, birthdate: e.target.value })}
   
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
                  Your address
                </Typography>
                <Input
                  size="lg"
                  placeholder="Country,City,Street"
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
            value={data.phone}
            onChange={(e) => setData({ ...data, phone: e.target.value })}
          />
          {errors.phone && <Typography variant="small" color="red">{errors.phone}</Typography>}
        </div>

        <div className="mb-1 flex flex-col gap-6">
    <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
      Choose Your Role
    </Typography>
    <Select
      value={data.role_jobseeker}
      onChange={(e) => setData({ ...data, role_jobseeker: e.target.value })}
      className="!border-t-blue-gray-200 focus:!border-t-gray-900"
    >
      {roles.map((role) => (
        <MenuItem key={role.value} value={role.value}>
          {role.label}
        </MenuItem>
      ))}
    </Select>
    {errors.role_jobseeker && <Typography variant="small" color="red">{errors.role_jobseeker}</Typography>}
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
            Confirm Password
          </Typography>
          <Input
            type="password"
            placeholder="Confirm password"
            size="lg"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            value={data.confirmPassword}
            onChange={(e) => setData({ ...data, confirmPassword: e.target.value })}
          />
          {!isPasswordMatched() && (
            <Typography variant="small" color="red">Passwords do not match</Typography>
          )}
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

export default RegisterJobseeker;

