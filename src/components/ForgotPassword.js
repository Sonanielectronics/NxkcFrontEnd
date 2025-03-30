import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUser,
  FaLock,
  FaPhoneAlt,
  FaEnvelope,
  FaCheckCircle,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

import { BackendBASE_URL } from "../main";

const ForgotPassword = ({ setIsLogin }) => {

  const [InputName, SetInputName] = useState("");
  const [InputPassword, SetInputPassword] = useState("");
  const [OTPValue, SetOTPValue] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [UserNameWarning, SetUserNameWarning] = useState("");

  const [ButtonPressPosition, SetButtonPressPosition] = useState(false);
  const [OTP, SetOTP] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      if(OTPValue == ""){

        const response = await fetch(`${BackendBASE_URL}/SendOTP`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ Name: InputName }),
        });
    
        const data = await response.json();
    
        if (data.status == 200) {
            SetButtonPressPosition(true);
        }

      }else{

        const response = await fetch(`${BackendBASE_URL}/VerifyOTP`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ Name: InputName, Password: InputPassword, OTP: OTPValue }),
        });
    
        const data = await response.json();

        SetUserNameWarning("");
        SetOTP("");

        if(data.status == 200){
            navigate("/");  
        }else if(data.status == 404){
            SetUserNameWarning("User Not Exist");
        }else{
            SetOTP("Wrong Password");
        }

      }

    } catch (error) {
      console.error("Error:", error.message);
      alert("Something went wrong. Please try again.");
    }

  };

  const ResendOTP = async (e) => {

    try {

        const response = await fetch(`${BackendBASE_URL}/SendOTP`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ Name: InputName }),
        });
    
        const data = await response.json();

        if(data.status == 400){
          SetUserNameWarning("Name Are Required");
        }
    
    } catch (error) {
      console.error("Error:", error.message);
      alert("Something went wrong. Please try again.");
    }

  };

  const styles = {
    container: {
      display: "flex",
      minHeight: "calc(100vh - 16px)",
      alignItems: "center",
      justifyContent: "center",
      background: "linear-gradient(to right, #2d3748, #1a202c)",
      color: "white",
      padding: "8px",
    },
    formContainer: {
      backgroundColor: "#2d3748",
      padding: "8px",
      borderRadius: "12px",
      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
      maxWidth: "256px",
      width: "calc(100% - 2rem)",
    },
    header: {
      textAlign: "center",
      fontSize: "2rem",
      fontWeight: "bold",
      marginBlockStart: "0px",
      marginBlockEnd: "1rem",
    },
    input: {
      width: "calc(100% - 96px)",
      padding: "16px 48px 16px 48px",
      borderRadius: "12px",
      border: "1px solid #4a5568",
      backgroundColor: "#1a202c",
      color: "#e2e8f0",
      fontSize: "1.5rem",
    },
    inputGroup: {
      position: "relative",
      marginBottom: "0.5rem",
    },
    icon: {
      position: "absolute",
      left: "16px",
      top: "calc(50% - 12px)",
      color: "#a0aec0",
      fontSize: "1.5rem",
    },
    button: {
      width: "100%",
      padding: "8px",
      backgroundColor: "#3182ce",
      border: "none",
      borderRadius: "12px",
      fontSize: "1.5rem",
      fontWeight: "bold",
      color: "white",
      cursor: "pointer",
    },
    buttonHover: {
      backgroundColor: "#63b3ed",
    },
    linkText: {
      textAlign: "center",
      color: "#a0aec0",
      fontSize: "1.5rem",
      marginBlockStart: "0px",
      marginBlockEnd: "0rem",
    },
    link: {
      color: "#63b3ed",
      cursor: "pointer",
      textDecoration: "underline",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <h2 style={styles.header}>Forgot Password</h2>
        <form onSubmit={handleSubmit}>
          <div style={styles.inputGroup}>
            <FaUser style={styles.icon} />
            <input
              style={styles.input}
              type="text"
              id="Name"
              placeholder="Name"
              required
              value={InputName}
              onChange={(e) => SetInputName(e.target.value)}
              autoComplete="Name"
            />
          </div>

          {(() => {
            if (UserNameWarning !== "") {
              return (
                <div
                  style={{
                    position: "relative",
                    textAlign: "center",
                    fontSize: "1.5rem",
                    top: "-0.5rem",
                    color: "red",
                  }}
                >
                  {UserNameWarning}
                </div>
              );
            }
          })()}

          <div style={styles.inputGroup}>
            {showPassword ? (
              <FaEyeSlash
                style={styles.icon}
                onClick={() => setShowPassword(!showPassword)}
              />
            ) : (
              <FaEye
                style={styles.icon}
                onClick={() => setShowPassword(!showPassword)}
              />
            )}
            <input
              style={styles.input}
              type={showPassword ? "text" : "password"}
              id="Password"
              placeholder="New Password"
              value={InputPassword}
              onChange={(e) => SetInputPassword(e.target.value)}
              required
            />
          </div>

          {(() => {
            if (ButtonPressPosition) {
              return (
                <div style={styles.inputGroup}>
                  <FaLock style={styles.icon} />
                  <input
                    style={styles.input}
                    type="text"
                    id="Name"
                    placeholder="OTP"
                    required
                    value={OTPValue}
                    onChange={(e) => SetOTPValue(e.target.value)}
                    autoComplete="Name"
                  />
                </div>
              );
            }
          })()}

{(() => {
            if (OTP !== "") {
              return (
                <div
                  style={{
                    position: "relative",
                    textAlign: "center",
                    fontSize: "1.5rem",
                    top: "-0.5rem",
                    color: "red",
                  }}
                >
                  Wrong OTP
                </div>
              );
            }
          })()}

          <button
            style={{
              width: "100%",
              padding: "8px",
              backgroundColor: "#3182ce",
              border: "none",
              borderRadius: "12px",
              fontSize: "1.5rem",
              fontWeight: "bold",
              color: "white",
              cursor: "pointer",
              marginTop: "0.5rem",
              marginBottom: "0.5rem",
            }}
            onMouseEnter={(e) =>
              (e.target.style.backgroundColor =
                styles.buttonHover.backgroundColor)
            }
            onMouseLeave={(e) =>
              (e.target.style.backgroundColor = styles.button.backgroundColor)
            }
            type="submit"
          >
            Forgot Password
          </button>
        </form>

        {(() => {
            if (ButtonPressPosition) {
              return (
                <p style={styles.linkText}>
                Didn't Receive OTP?
                <span style={styles.link} onClick={() => ResendOTP()}>
                  Resend
                </span>
              </p>
              );
            }
          })()}

      </div>
    </div>
  );
};

export default ForgotPassword;
