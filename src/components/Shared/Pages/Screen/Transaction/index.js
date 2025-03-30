import React, { useState, useEffect } from "react";

import Admin from "./Admin/index";
import User from "./User/index";

const ToggleSwitch = () => {
  return (
    <>

      {localStorage.getItem("AccountType") == "Admin" ? (

        <div
          style={{
            backgroundColor: "#2d3748",
            minHeight: "100vh",
            color: "#f7fafc",
            fontFamily: "'Poppins', sans-serif",
            padding: "1rem",
          }}
        >
          <Admin />
        </div>
        
      ) : (

        <User />

      )}

    </>
  );
};

export default ToggleSwitch;
