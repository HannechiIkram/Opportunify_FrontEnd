import React from "react";
import { Navbar as TNavbar, Typography } from "@material-tailwind/react";

export function Navbar0() {
  const [isNavOpen, setIsNavOpen] = React.useState(false);

  // Function to toggle the navbar open/close state
  const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);

  React.useEffect(() => {
    // Close the navbar when the window width is greater than or equal to 960 pixels
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setIsNavOpen(false)
    );

    // Cleanup function to remove event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", () => {});
    };
  }, []);

  return (
    <TNavbar className="mx-auto max-w-screen-xl p-2 lg:rounded-full lg:pl-6">
      <div className="relative mx-auto flex items-center justify-between text-blue-gray-900">
        {/* Logo or brand image */}
        
          <img src="/img/navbar logo.png" alt="logo"  style={{ width: '170px', height: '45px' }}  />
        {/* Other navbar elements go here */}
      </div>
    </TNavbar>
  );
}

Navbar0.displayName = "/src/widgets/layout/navbar0.jsx";
export default Navbar0;
