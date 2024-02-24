import React from "react";
import { Card, Input, Checkbox, Button, Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import Navbar from "../widgets/layout/navbar";

export function SignIn() {
  return (
    <>
      
      <section className="ml-10 mr-10 mt-4 lg:mt-8 flex gap-4 items-center">
        <div className="w-full lg:w-2/5">
          <div className="text-center">
            <Typography variant="h1" className="font-bold mb-4">Sign In</Typography>
            <Typography variant="paragraph" color="blue-gray" className="text-lg font-normal">Enter your email and password to Sign In.</Typography>
          </div>
          <Card className="mt-8 ml-auto mr-auto mb-2 w-80 max-w-screen-lg lg:w-5/6 rounded-lg p-6 bg-gray-200 bg-opacity-90">
            <div className="mb-1 flex flex-col gap-6">
              <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
                Your email
              </Typography>
              <Input
                size="lg"
                placeholder="name@mail.com"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
              <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
                Password
              </Typography>
              <Input
                type="password"
                size="lg"
                placeholder="************"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
            </div>

            <Button className="mt-6 bg-red-800" fullWidth>
              Sign In
            </Button>

            <div className="flex items-center justify-between gap-2 mt-6">
              <Checkbox
                label={
                  <Typography
                    variant="small"
                    color="gray"
                    className="flex items-center justify-start font-medium"
                  >
                    Subscribe me to newsletter
                  </Typography>
                }
                containerProps={{ className: "-ml-2.5" }}
              />
              <Typography variant="small" className="font-medium text-gray-900">
                <a href="#">
                  Forgot Password
                </a>
              </Typography>
            </div>

            <div className="space-y-4 mt-8">
              <Button size="lg" color="white" className="flex items-center gap-2 justify-center shadow-md" fullWidth>
                <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* ... */}
                </svg>
                <span>Sign in With Google</span>
              </Button>
              <Button size="lg" color="white" className="flex items-center gap-2 justify-center shadow-md" fullWidth>
                <img src="/img/twitter-logo.svg" height={24} width={24} alt="" />
                <span>Sign in With Twitter</span>
              </Button>
            </div>
            <Typography variant="paragraph" className="text-center text-blue-gray-500 font-medium mt-4">
              Not registered?
              <Link to="/sign-up" className="text-gray-900 ml-1">Create account</Link>
            </Typography>
          </Card>
        </div>
        <div className="w-3/5 h-full hidden lg:block">
          <img
            src="/img/opp.png"
            className="mx-auto mt-8 w-full h-auto max-h-full"
            style={{ maxHeight: "100%", maxWidth: "100%" }}
            alt="Opportunify"
          />
        </div>
      </section>
    </>
  );
}

export default SignIn;