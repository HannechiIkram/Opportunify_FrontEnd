import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Avatar, Typography, Button } from "@material-tailwind/react";
import { MapPinIcon, BriefcaseIcon } from "@heroicons/react/24/solid";
import { Footer } from "@/widgets/layout";
import { AiTwotonePhone } from "react-icons/ai";

export function Profilecompany() {
  const { pId } = useParams();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfileCompany = async () => {
      try {
        const response = await axios.get(`/user/getProfileCompanyById/${pId}`);
        setProfile(response.data.profile); // Assuming response.data contains profile company information
      } catch (error) {
        console.error('Error fetching profile company:', error);
      }
    };

    fetchProfileCompany();
  }, [pId]);

  return (
    <>
      <div>
        {profile ? (
          <div>
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
                          {profile.name}
                        </Typography>
                        <Typography variant="paragraph" color="gray" className="!mt-0 font-normal">{profile.email}</Typography>

                      </div>
                    </div>
                    <div className="mt-10 mb-10 flex lg:flex-col justify-between items-center lg:justify-end lg:mb-0 lg:px-4 flex-wrap lg:-mt-5">
                      <Button className="bg-gray-900 w-fit lg:ml-auto">Connect</Button>
                    </div>
                  </div>
                  <div className="-mt-4 container space-y-2">
                    <div className="flex items-center gap-2">
                      <MapPinIcon className="-mt-px h-4 w-4 text-blue-gray-500" />
                      <Typography className="font-medium text-blue-gray-500">{profile.description}</Typography>

                      <Typography className="font-medium text-blue-gray-500">{profile.address}</Typography>
                    </div>
                    <div className="flex items-center gap-2">
                      <BriefcaseIcon className="-mt-px h-4 w-4 text-blue-gray-500" />
                      <Typography className="font-medium text-blue-gray-500">{profile.domainOfActivity}</Typography>
                    </div>
                    <div className="flex items-center gap-2">
                      <AiTwotonePhone className="-mt-px h-4 w-4 text-blue-gray-500" />
                      <Typography className="font-medium text-blue-gray-500">+{profile.phoneNumber}</Typography>
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
          <Footer />
        </div>
      </div>
    </>
  );
}

export default Profilecompany;
