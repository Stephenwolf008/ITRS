import React from "react";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import HomeImg from "../assets/2.jpg";
import Footer from "../components/Footer";
import SignOut from "./SignOut";
function Home() {
  return (
    <div>
      <Navbar />
      <Hero
        cName="hero"
        heroImg={HomeImg}
        title="Your Journey Your Story"
        btnText="Travel Plan"
        url="/form"
        btnClass="show"
      />
      <Footer />
      {/* <SignOut/> */}
    </div>
  );
}

export default Home;
