import React, { useState, useEffect } from "react";
import axios from "axios";
import { Avatar, Typography, Button } from "@material-tailwind/react";
import {
  MapPinIcon,
  BriefcaseIcon,
  BuildingLibraryIcon,
} from "@heroicons/react/24/solid";
import { Footer } from "@/widgets/layout";
import { useParams } from "react-router-dom";
import { IconBase } from "react-icons";


export function Profile() {////////////////////
  // const {auth} = useContext(AuthContext);
 
 /* useEffect(()=>{
    // console.log(auth);

  },[]);
  */

  const [profileData, setProfileData] = useState(null);
 

 const userId = sessionStorage.getItem('userId');
  


   useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get(`/profile/${userId}`); // Adjust the API endpoint according to your backend setup
        setProfileData(response.data);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    if (userId) {
      fetchProfileData();
      
    }
  }, [userId]);
  console.log(profileData);
  

  return (
    <>
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
                    {profileData?.name} {profileData?.lastname}
                  </Typography>
                  <Typography variant="paragraph" color="gray" className="!mt-0 font-normal">{profileData?.user.email}</Typography>
                </div>
              </div>

              <div className="mt-10 mb-10 flex lg:flex-col justify-between items-center lg:justify-end lg:mb-0 lg:px-4 flex-wrap lg:-mt-5">
                <Button className="bg-gray-900 w-fit lg:ml-auto">Conntect</Button>
                <div className="flex justify-start py-4 pt-8 lg:pt-4">
                  <div className="mr-4 p-3 text-center">
                    <Typography
                      variant="lead"
                      color="blue-gray"
                      className="font-bold uppercase"
                    >
                      22
                    </Typography>
                    <Typography
                      variant="small"
                      className="font-normal text-blue-gray-500"
                    >
                      Friends
                    </Typography>
                  </div>
                  <div className="mr-4 p-3 text-center">
                    <Typography
                      variant="lead"
                      color="blue-gray"
                      className="font-bold uppercase"
                    >
                      10
                    </Typography>
                    <Typography
                      variant="small"
                      className="font-normal text-blue-gray-500"
                    >
                      Photos
                    </Typography>
                  </div>
                  <div className="p-3 text-center lg:mr-4">
                    <Typography
                      variant="lead"
                      color="blue-gray"
                      className="font-bold uppercase"
                    >
                      89
                    </Typography>
                    <Typography
                      variant="small"
                      className="font-normal text-blue-gray-500"
                    >
                      Comments
                    </Typography>
                  </div>
                </div>

              </div>
            </div>
            <div className="-mt-4 container space-y-2">
              <div className="flex items-center gap-2">
                <MapPinIcon className="-mt-px h-4 w-4 text-blue-gray-500" />
                <Typography className="font-medium text-blue-gray-500">
                  {profileData?.address}
                </Typography>
              </div>
              <div className="flex items-center gap-2">
                <svg className="-mt-px h-4 w-4 " viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M10.0376 5.31617L10.6866 6.4791C11.2723 7.52858 11.0372 8.90532 10.1147 9.8278C10.1147 9.8278 10.1147 9.8278 10.1147 9.8278C10.1146 9.82792 8.99588 10.9468 11.0245 12.9755C13.0525 15.0035 14.1714 13.8861 14.1722 13.8853C14.1722 13.8853 14.1722 13.8853 14.1722 13.8853C15.0947 12.9628 16.4714 12.7277 17.5209 13.3134L18.6838 13.9624C20.2686 14.8468 20.4557 17.0692 19.0628 18.4622C18.2258 19.2992 17.2004 19.9505 16.0669 19.9934C14.1588 20.0658 10.9183 19.5829 7.6677 16.3323C4.41713 13.0817 3.93421 9.84122 4.00655 7.93309C4.04952 6.7996 4.7008 5.77423 5.53781 4.93723C6.93076 3.54428 9.15317 3.73144 10.0376 5.31617Z" fill="#6B7280"></path> </g></svg>
                <Typography className="font-medium text-blue-gray-500">
                  {profileData?.phone}
                </Typography>
              </div>
              <div className="flex items-center gap-2">
                <svg className="-mt-px h-4 w-4 " viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>cake_fill</title> <g id="页面-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="Food" transform="translate(-96.000000, -48.000000)" fill-rule="nonzero"> <g id="cake_fill" transform="translate(96.000000, 48.000000)"> <path d="M24,0 L24,24 L0,24 L0,0 L24,0 Z M12.5934901,23.257841 L12.5819402,23.2595131 L12.5108777,23.2950439 L12.4918791,23.2987469 L12.4918791,23.2987469 L12.4767152,23.2950439 L12.4056548,23.2595131 C12.3958229,23.2563662 12.3870493,23.2590235 12.3821421,23.2649074 L12.3780323,23.275831 L12.360941,23.7031097 L12.3658947,23.7234994 L12.3769048,23.7357139 L12.4804777,23.8096931 L12.4953491,23.8136134 L12.4953491,23.8136134 L12.5071152,23.8096931 L12.6106902,23.7357139 L12.6232938,23.7196733 L12.6232938,23.7196733 L12.6266527,23.7031097 L12.609561,23.275831 C12.6075724,23.2657013 12.6010112,23.2592993 12.5934901,23.257841 L12.5934901,23.257841 Z M12.8583906,23.1452862 L12.8445485,23.1473072 L12.6598443,23.2396597 L12.6498822,23.2499052 L12.6498822,23.2499052 L12.6471943,23.2611114 L12.6650943,23.6906389 L12.6699349,23.7034178 L12.6699349,23.7034178 L12.678386,23.7104931 L12.8793402,23.8032389 C12.8914285,23.8068999 12.9022333,23.8029875 12.9078286,23.7952264 L12.9118235,23.7811639 L12.8776777,23.1665331 C12.8752882,23.1545897 12.8674102,23.1470016 12.8583906,23.1452862 L12.8583906,23.1452862 Z M12.1430473,23.1473072 C12.1332178,23.1423925 12.1221763,23.1452606 12.1156365,23.1525954 L12.1099173,23.1665331 L12.0757714,23.7811639 C12.0751323,23.7926639 12.0828099,23.8018602 12.0926481,23.8045676 L12.108256,23.8032389 L12.3092106,23.7104931 L12.3186497,23.7024347 L12.3186497,23.7024347 L12.3225043,23.6906389 L12.340401,23.2611114 L12.337245,23.2485176 L12.337245,23.2485176 L12.3277531,23.2396597 L12.1430473,23.1473072 Z" id="MingCute" fill-rule="nonzero"> </path> <path d="M17.7071,15.7071 C17.8689,15.5453 18.1311,15.5453 18.2929,15.7071 C19.0249,16.4391 20.1101,16.6028 21,16.1981 L21,16.1981 L21,20 C21.5523,20 22,20.4477 22,21 C22,21.5523 21.5523,22 21,22 L21,22 L3,22 C2.44772,22 2,21.5523 2,21 C2,20.4477 2.44772,20 3,20 L3,20 L3,16.1981 C3.88993,16.6028 4.97508,16.4391 5.70711,15.7071 C5.86887,15.5453 6.13113,15.5453 6.29289,15.7071 C7.2357,16.6499 8.7643,16.6499 9.70711,15.7071 C9.86887,15.5453 10.1311,15.5453 10.2929,15.7071 C11.2357,16.6499 12.7643,16.6499 13.7071,15.7071 C13.8689,15.5453 14.1311,15.5453 14.2929,15.7071 C15.2357,16.6499 16.7643,16.6499 17.7071,15.7071 Z M16,6 C16.5523,6 17,6.44772 17,7 L17,7 L17,9 L18,9 C19.6569,9 21,10.3431 21,12 L21,12 L21,13.5858 L20.2929,14.2929 C20.1311,14.4547 19.8689,14.4547 19.7071,14.2929 C18.7643,13.3501 17.2357,13.3501 16.2929,14.2929 C16.1311,14.4547 15.8689,14.4547 15.7071,14.2929 C14.7643,13.3501 13.2357,13.3501 12.2929,14.2929 C12.1311,14.4547 11.8689,14.4547 11.7071,14.2929 C10.7643,13.3501 9.2357,13.3501 8.29289,14.2929 C8.13113,14.4547 7.86887,14.4547 7.70711,14.2929 C6.7643,13.3501 5.2357,13.3501 4.29289,14.2929 C4.13113,14.4547 3.86887,14.4547 3.70711,14.2929 L3.70711,14.2929 L3,13.5858 L3,12 C3,10.3431 4.34315,9 6,9 L6,9 L7,9 L7,7 C7,6.44772 7.44772,6 8,6 C8.55228,6 9,6.44772 9,7 L9,7 L9,9 L11,9 L11,7 C11,6.44772 11.4477,6 12,6 C12.5523,6 13,6.44772 13,7 L13,7 L13,9 L15,9 L15,7 C15,6.44772 15.4477,6 16,6 Z M12.5,2 C12.1812,2.63761 12.4722,3.05069 12.725,3.40951 C12.8687,3.61345 13,3.79986 13,4 C13,4.55228 12.5523,5 12,5 C11.4477,5 11,4.55228 11,4 C11,3.44772 11.5,2.5 12.5,2 Z M8.5,2 C8.18119,2.63761 8.47221,3.05069 8.725,3.40951 C8.86867,3.61345 9,3.79986 9,4 C9,4.55228 8.55228,5 8,5 C7.44772,5 7,4.55228 7,4 C7,3.44772 7.5,2.5 8.5,2 Z M16.5,2 C16.1812,2.63761 16.4722,3.05069 16.725,3.40951 C16.8687,3.61345 17,3.79986 17,4 C17,4.55228 16.5523,5 16,5 C15.4477,5 15,4.55228 15,4 C15,3.44772 15.5,2.5 16.5,2 Z" id="形状结合" fill="#6B7280"> </path> </g> </g> </g> </g></svg>
                <Typography className="font-medium text-blue-gray-500">
                   {profileData?.birthdate && new Date(profileData.birthdate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </Typography>
              </div>
            </div>
            <div className="mb-10 py-6">
              <div className="flex w-full flex-col items-start lg:w-1/2">
                <Typography className="mb-6 font-normal text-blue-gray-500">
                  An artist of considerable range, Jenna the name taken by
                  Melbourne-raised, Brooklyn-based Nick Murphy writes,
                  performs and records all of his own music, giving it a
                  warm, intimate feel with a solid groove structure. An
                  artist of considerable range.
                </Typography>
                <Button variant="text">Show more</Button>
              </div>
            </div>
          </div>


        </div>
      </section>
      <div className="bg-white">
        <Footer />
      </div>

    </>
  );
}

export default Profile;
