import React, { useState, useEffect } from 'react';
import { Typography, Button, Input, TextField, Select } from "@material-tailwind/react";
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
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  if (!open) return null;

  return (
    <div className='overlay'>
      <div className='modalContainer'>
        <div className='modalRight'>
          <button className='closeBtn' onClick={onClose}>X</button>
          <div className='content'>
            <Typography variant="h6" color="gray" className="mb-4">Update Profile</Typography>

            <div>
              <Typography variant="small" color="blue-gray" className="mb-1 mt-1 font-medium">
                Name
              </Typography>
              <Input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" />
            </div>
            <div>
              <Typography variant="small" color="blue-gray" className="mb-1 mt-1 font-medium">
                Email
              </Typography>
              <Input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
            </div>
            <div>
              <Typography variant="small" color="blue-gray" className="mb-1 mt-1 font-medium">
                Lastname
              </Typography>
              <Input type="text" name="lastname" value={formData.lastname} onChange={handleChange} placeholder="Lastname" />
            </div>
            {/*
            <div>
              <Typography variant="small" color="blue-gray" className="mb-1 mt-1 font-medium">
                Birthdate
              </Typography>
          <Input type="date" name="birthdate" value={formData.birthdate} onChange={handleChange} placeholder="Birthdate" />
  </div>   */}
            <div>
              <Typography variant="small" color="blue-gray" className="mb-1 mt-1 font-medium">
                Phone
              </Typography>
              <Input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" />
            </div>
            <div>
              <Typography variant="small" color="blue-gray" className="mb-1 mt-1 font-medium">
                Address
              </Typography>
              <Input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Address" />
            </div>
            <div>
              <Typography variant="small" color="blue-gray" className="mb-1 mt-1 font-medium">
                Role Jobseeker
              </Typography>
              <Select name="role_jobseeker" value={formData.role_jobseeker} onChange={handleChange}>
                <option value="">Select Role</option>
                <option value="student">Student</option>
                <option value="alumni">Alumni</option>
                <option value="staff">Staff</option>
              </Select>
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
