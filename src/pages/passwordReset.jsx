import React, { useState } from "react";
import { Card, Input, Button, Typography } from "@material-tailwind/react";

export function ResetPassword() {
    const [data, setData] = useState({
        password1: "",
        password2: ""
    });

    return (
        <>
            <section className="flex justify-center items-center h-screen bg-white">

                <div className="w-full lg:w-2/5">
                    <div className="flex justify-center items-center mb-8">
                        {/* Use the provided SVG as a React component */}
                        <svg className="w-24 h-24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#000000">
                            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                            <g id="SVGRepo_iconCarrier">
                                <path d="M2 16C2 13.1716 2 11.7574 2.87868 10.8787C3.75736 10 5.17157 10 8 10H16C18.8284 10 20.2426 10 21.1213 10.8787C22 11.7574 22 13.1716 22 16C22 18.8284 22 20.2426 21.1213 21.1213C20.2426 22 18.8284 22 16 22H8C5.17157 22 3.75736 22 2.87868 21.1213C2 20.2426 2 18.8284 2 16Z" stroke="#404040" strokeWidth="1.5"></path>
                                <path d="M6 10V8C6 4.68629 8.68629 2 12 2C14.7958 2 17.1449 3.91216 17.811 6.5" stroke="#404040" strokeWidth="1.5" strokeLinecap="round"></path>
                                <path d="M8 16H8.009M11.991 16H12M15.991 16H16" stroke="#404040" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                            </g>
                        </svg>
                    </div>
                    <div className="text-center opacity-90">
                        <Typography variant="h3" className="font-bold text-black decoration-4   mb-4">Change Password</Typography>
                        <Typography variant="paragraph" className="text-lg  text-red-800 font-normal">Enter your new password !</Typography>
                    </div>
                    <Card className="mt-8 ml-auto mr-auto mb-2 w-80 max-w-screen-lg lg:w-5/6 rounded-lg p-6 bg-white shadow-2xl shadow-black shadow-outer opacity-80 overflow-visible">
                        <form className="space-y-4">
                            <div className="flex flex-col gap-6 bg-white ">
                                <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="-mb-3 font-medium"
                                >
                                    New Password
                                </Typography>
                                <Input
                                    size="lg"
                                    type="password"
                                    placeholder="************"
                                    value={data.password}
                                    onChange={(e) =>
                                        setData({ ...data, password1: e.target.value })
                                    }
                                />
                            </div>
                            <div className="flex flex-col gap-6">
                                <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="-mb-3 font-medium"
                                >
                                    Confirm Password
                                </Typography>
                                <Input
                                    size="lg"
                                    type="password"
                                    placeholder="************"
                                    value={data.password2}
                                    onChange={(e) =>
                                        setData({ ...data, password2: e.target.value })
                                    }
                                />
                            </div>

                            <Button type="submit" className="mt-6 bg-red-800" fullWidth>
                                Confirm
                            </Button>
                        </form>

                    </Card>
                </div>

                {/* You can uncomment this part if you want to display an image */}
                {/* <div className="w-3/5 h-full hidden lg:block">
                    <img
                        src="/img/pattern.png"
                        className="mx-auto w-full h-full max-h-full"
                        style={{ maxHeight: "100%", maxWidth: "100%" }}
                        alt="Opportunify"
                    />
                </div> */}

            </section>

        </>
    );
}

export default ResetPassword;
