'use client'

import FullScreenLaoder from "@/components/FullScreenLaoder";
import Navbar from "./Navbar";
import TemplateGallery from "./templateGallery";
import { useAuth } from "@clerk/nextjs";


export default  function Home() {
  const {isSignedIn } = useAuth()
 
  if(!isSignedIn){
    return <FullScreenLaoder label="Sign out"/>
  }
  return (
    <div className="min-h-screen flex flex-col">
      <div className="fixed top-0 left-0 right-0 z-10 h-16 bg-white p-4">

    <Navbar/>
      </div>
      <div className="mt-16">
        <TemplateGallery/>
      </div>
    </div>
  );
}
