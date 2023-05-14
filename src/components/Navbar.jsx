import React from "react";
import { Link } from "react-router-dom";
import { Menuitems } from "./Menuitem";

function Navbar() {
  return (
    <div>
      <nav className="Navbaritems">
        <h1 className="navbar-logo">Namaste India</h1>
        <ul className="nav-menu">
          {Menuitems.map((item, index) => {
            return (
              <li key={index}>
                <Link className={item.cName} to={item.url}>
                  <i className={item.icon}></i>
                  {item.title}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
