import React from "react";

function Footer() {
  return (
    <div className="footer">
      <div className="top">
        <div>
          <h1>Namaste India</h1>
          <p>Happy Travelling!!!!!</p>
        </div>
      </div>
      <div className="bottom">
        <div className="bottom">
          <a href="https://www.facebook.com" target="_blank">
            <i className="fa-brands fa-facebook-square"></i>
          </a>
          <a href="https://www.instagram.com" target="_blank">
            <i className="fa-brands fa-instagram-square"></i>
          </a>
          <a href="https://twitter.com" target="_blank">
            <i className="fa-brands fa-twitter-square"></i>
          </a>
          <a href="mailto:vipulverma2311@gmail.com" target="_blank">
            <i className="fa-sharp fa-solid fa-envelope"></i>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Footer;
