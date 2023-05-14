import React from "react";

function Hero(props) {
  return (
    <div className={props.cName}>
      <img alt="HerImg" src={props.heroImg} />
      <div className="hero-text">
        <h1>{props.title}</h1>
        <a href={props.url} className={props.btnClass}>
          {props.btnText}
        </a>
      </div>
    </div>
  );
}

export default Hero;
