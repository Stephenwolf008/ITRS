import React from "react";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import HomeImg from "../assets/2.jpg";
import Footer from "../components/Footer";
import MapComponent from "../components/MapComponent";
function Home() {
  return (
    <div>
      <Navbar />
      <div style={{ display: "flex" }}>
        <div style={{ flex: "1" }}>
          <Hero
            cName="hero"
            heroImg={HomeImg}
            title="Your Journey Your Story"
            btnText="Check Travel Plan"
            url="/form"
            btnClass="show"
          />
        </div>
        <div style={{ flex: "1" }} className="map-container">
          <MapComponent />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
