import React, { useState, useRef } from "react";
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import axios from "axios";
import ReCAPTCHA from "react-google-recaptcha";

export function SignIn() {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [recaptchaToken, setRecaptchaToken] = useState("");
  const recaptchaRef = useRef();

  const loginUser = async (e) => {
    e.preventDefault();
    try {
      if (!recaptchaToken) {
        window.alert("Please complete the reCAPTCHA verification.");
        return;
      }

      const response = await axios.post("/users/login", { ...data, recaptchaToken });
      console.log('Authentication successful:', response.data);
      window.alert('Authentication successful:');
    } catch (error) {
      console.error('Authentication failed:', error.response.data);
      window.alert('Authentication failed:');
    }
  };

  const handleRecaptchaChange = (token) => {
    setRecaptchaToken(token);
  };

  return (
    <>
      <section className="ml-10 mr-10 mt-4 lg:mt-8 flex gap-4 items-center">
        <div className="w-full lg:w-2/5">
          <div className="text-center">
            <Typography variant="h1" className="font-bold mb-4">Sign In</Typography>
            <Typography variant="paragraph" color="blue-gray" className="text-lg font-normal">Enter your email and password to Sign In.</Typography>
          </div>
          <Card className="mt-8 ml-auto mr-auto mb-2 w-80 max-w-screen-lg lg:w-5/6 rounded-lg p-6 bg-gray-200 bg-opacity-90">
            <form onSubmit={loginUser} className="space-y-4">
              <div className="flex flex-col gap-6">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="-mb-3 font-medium"
                >
                  Your email
                </Typography>
                <Input
                  size="lg"
                  type="email"
                  placeholder="name@mail.com"
                  value={data.email}
                  onChange={(e) =>
                    setData({ ...data, email: e.target.value })
                  }
                />
              </div>
              <div className="flex flex-col gap-6">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="-mb-3 font-medium"
                >
                  Password
                </Typography>
                <Input
                  size="lg"
                  type="password"
                  placeholder="************"
                  value={data.password}
                  onChange={(e) =>
                    setData({ ...data, password: e.target.value })
                  }
                />
              </div>
              <ReCAPTCHA
                sitekey={import.meta.env.VITE_SITE_KEY}
                onChange={handleRecaptchaChange}
                ref={recaptchaRef}
              />
              <Button type="submit" className="mt-6 bg-red-800" fullWidth>
                Sign In
              </Button>
            </form>

            <div className="flex items-center justify-between gap-2 mt-6">
              <Typography variant="small" className="font-medium text-gray-900">
                <a href="#">Forgot Password</a>
              </Typography>
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
