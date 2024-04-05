import React, { useState, useEffect } from 'react';
import { Typography, Button, Input, TextField} from "@material-tailwind/react";
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Modal = ({ open, onClose }) => {
  const { userId } = useParams();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    lastname: '',
    birthdate: '',
    phone: '',
    address: '',
    role_jobseeker: '',
    image: '', // Add the imagestring field
  });

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get(`/user/getProfileJobSeekerById/${userId}`);
        const profileData = response.data.profile;
        setFormData(profileData);
       

      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    if (open && userId) {
      fetchProfileData();
    }
  }, [open, userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/user/updateProfileJobSeekerById/${userId}`, formData);
      console.log("Profile updated successfully");

      onClose();
      window.location.reload();

    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  if (!open) return null;

  return (
    <div className='overlay'>
      <div className='modalContainer '>
        <div className='modalRight  bg-gray-300'>
          <button className='closeBtn' onClick={onClose}>X</button>
          <div className='content'>
            <Typography variant="h6" color="gray" className="mb-4">Update Profile</Typography>
            <div className="grid grid-cols-2 gap-4 mb-2">
            <div>
              <Typography variant="small" color="blue-gray" className="mb-1 mt-1 font-medium">
                Name
              </Typography>
              <Input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" className="input-style bg-blue-gray-100 " required/>
            </div>
            <div>
              <Typography variant="small" color="blue-gray" className="mb-1 mt-1 font-medium">
               LastName
              </Typography>
              <Input type="text" name="lastname" value={formData.lastname} onChange={handleChange} placeholder="lastname" className="input-style" required />
            </div>
            </div>

            <div className='mb-4'>
              <Typography variant="small" color="blue-gray" className="mb-1 mt-1 font-medium">
                Email
              </Typography>
              <Input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" className="input-style" required/>
            </div>
         
            {/*
            <div>
              <Typography variant="small" color="blue-gray" className="mb-1 mt-1 font-medium">
                Birthdate
              </Typography>
          <Input type="date" name="birthdate" value={formData.birthdate} onChange={handleChange} placeholder="Birthdate" />
  </div>   */}
            <div className='mb-4'>
              <Typography variant="small" color="blue-gray" className="mb-1 mt-1 font-medium" >
                Phone
              </Typography>
              <Input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" className="input-style" required />
            </div>
            <div className='mb-4'> 
              <Typography variant="small" color="blue-gray" className="mb-1 mt-1 font-medium">
                Address
              </Typography>
              <Input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Address" className="input-style" required />
            </div>
            <div className='mb-4'>
  <Typography variant="small" color="blue-gray" className="mb-1 mt-1 font-medium">
    Role Jobseeker
  </Typography>
  <select
    name="role_jobseeker"
    value={formData.role_jobseeker}
    onChange={handleChange}
    className="input-style bg-blue-gray-100 px-48 py-2 rounded-xl" // Apply a class with the desired background color
    required
  >
    <option value="">Select Role</option>
    <option value="student">Student</option>
    <option value="alumni">Alumni</option>
    <option value="staff">Staff</option>
  </select>
</div>

           
            {/* Add other fields similarly */}
            <div className="flex justify-center mt-8">
              <Button onClick={handleSubmit} className="w-60 bg-red-800">Update</Button>
            </div>
          
          </div>

          
        </div>
        
      </div>

    </div>
    
  );
}

export default Modal;
