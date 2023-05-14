import React from "react";
import Footer from "../components/Footer";
//import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
//import FormImg from "../assets/6.jpg";
import Formcontent from "../components/Formcontent";

function Form() {
  return (
    <div>
      <Navbar />
      {/* <Hero
        cName="hero-midd"
        heroImg={FormImg}
        title="Welcome!!"
        btnClass="hide"
      /> */}
      <Formcontent />
      <Footer />
    </div>
  );
}

export default Form;
