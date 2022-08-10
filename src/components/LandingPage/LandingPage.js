import React from "react";
import "./LandingPage.css";

const LandingPage = () => {
  return (
    <div className="landing_page">
      <div className="landing_nav">
        <div className="nav_left">
          <h3>GAMEFLIX</h3>
        </div>
        <div className="nav_right">
          <button>Sign In</button>
        </div>
      </div>
      <div className="landing_banner"></div>
    </div>
  );
};

export default LandingPage;
