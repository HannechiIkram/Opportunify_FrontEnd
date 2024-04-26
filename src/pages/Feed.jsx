import SearchBar from "@/Components/Feed/SearchBar/Searchbar";
import { Navbar } from "@/layout";
import React from "react";

function Feed() {
    return (
      <>
        {' '}
        <div className="">
          <Navbar />
        </div>
        <div className="Container py-2">
            < SearchBar />
        </div>
       
      </>
    );
    }
    export default Feed;