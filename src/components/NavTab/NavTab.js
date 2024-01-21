import React from "react";
import { Link } from "react-scroll";
import "./NavTab.css";

function NavTab() {
  return (
    <nav className="nav-tab">
      <Link to="about" className="nav-tab__link" smooth={true} duration={500}>
        Узнать больше
      </Link>
    </nav>
  );
}

export default NavTab;
