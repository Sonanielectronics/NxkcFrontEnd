// /* Global CSS to Remove Arrows */
// const GlobalStyles = () => (
//   <style>{`
//     input::-webkit-outer-spin-button,
//     input::-webkit-inner-spin-button {
//       -webkit-appearance: none;
//       margin: 0;
//     }
    
//     input[type="number"] {
//       -moz-appearance: textfield;
//     }
//   `}</style>
// );

import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaUser, FaShoppingCart, FaPhoneAlt, FaEnvelope, FaCheckCircle } from "react-icons/fa";

import { BackendBASE_URL } from '../../../../../../../../main';

const Buy = ({ SetScreenNumber , chartData , HandleToast }) => {

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    const [Quentity, SetQuentity] = useState("");

    const QuentityOptions = [1, 2, 5, 10, 20, 50];

    const handleVerifyPay = async () => {
        
        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const seconds = now.getSeconds();
    
        var Value = chartData.datasets[0].data[chartData.datasets[0].data.length - 1];
    
        var UpdatedWallet = Number(localStorage.getItem("Wallet")) - (Value * Quentity);

        if(0 <= UpdatedWallet){
            
            localStorage.setItem("Wallet", UpdatedWallet);
        
            const response = await fetch(`${BackendBASE_URL}/PurchaseCurrency`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ UpdatedAmount : UpdatedWallet , Name : localStorage.getItem("Name") , Time : `${hours}:${minutes}:${seconds}` }),
            });

            if(response.status == 200){

              var UserId = localStorage.getItem("_id");
              var ShareId = queryParams.get("_id");

              await fetch(`${BackendBASE_URL}/PurchaseShare`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ UserId : UserId , ShareId : ShareId , PurchsePrice : Value , Quantity : Quentity , PurchaseType : "Paid Purchase" }),
              });

              var ShareName = queryParams.get("Name");

              HandleToast(`You Have Successfully Buy ${Value}Nx Price ${Quentity} ${ShareName} Quentity`);
              // window.location.reload();
              SetScreenNumber(1)

            }

        }
    
    };

    return (
 
        <div style={{backgroundColor:"#2d3748",boxShadow:"0 4px 8px rgba(0, 0, 0, 0.1)",height:"100vh"}}>
            <div style={{ position: "fixed", inset: 0, display: "flex", justifyContent: "center",width:"calc(100% - 2rem)",marginLeft:"1rem",height:"calc(100vh - 2rem)",marginTop:"1rem" }}>
                <div style={{ backgroundColor: "#1a202c", padding: "24px", borderRadius: "8px", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", width: "100%" }}>

                    <div style={{ display: "flex" , justifyContent: "space-between" , alignItems: "center" , marginBottom: "16px" }} >
                        
                        <h2 style={{ fontSize: "18px" , fontWeight: "bold" , color: "#f7fafc" }} >
                            Buy
                        </h2>

                        <button onClick={() => SetScreenNumber(1)} style={{ backgroundColor: "#2d3748" , color: "#f7fafc" , border: "none" , borderRadius: "50%" , width: "32px" , height: "32px" , display: "flex" , justifyContent: "center" , alignItems: "center" , cursor: "pointer" , fontSize: "18px" }} >
                            ×
                        </button>

                    </div>
      
                    {/* <h3 style={{ fontSize: "16px", fontWeight: "bold",color:"#f7fafc" }}>Assets Quentity</h3> */}
      
          {/* <div style={{      position: "relative",
      marginBottom: "0.5rem"}}>
            <FaShoppingCart style={{
                    position: "absolute",
                    left: "16px",
                    top: "calc(50% - 12px)",
                    color: "#a0aec0",
                    fontSize: "1.5rem"
            }} /> 
            <input
              style={{
                width: "calc(100% - 69px)",
                padding: "16px 24px 16px 43px", // Left padding for icon space
                borderRadius: "12px",
                border: "1px solid #4a5568",
                backgroundColor: "#1a202c",
                color: "#e2e8f0",
                fontSize: "1.5rem",
              }}
              type="text"
              id="Password"
              value={Quentity}
              onChange={(e) => SetQuentity(e.target.value)}
              placeholder="Assets Quentity"
              required
            />
          </div> */}

<h3 style={{ fontSize: "16px" , fontWeight: "bold" , marginBottom: "8px" , color: "#f7fafc" }} >
                        Select Quentity
                    </h3>

                    <div style={{ display: "grid" , gridTemplateColumns: "repeat(3, 1fr)" , gap: "8px" , marginBottom: "16px" }} >
                        {QuentityOptions.map((amount) => (
                            <button key={amount} style={{ padding: "8px" , border: "1px solid transparent" , borderRadius: "4px" , backgroundColor: Quentity === amount ? "#47c2be" : "#2d3748" , color: "#f7fafc" }} onClick={() => SetQuentity(amount)} >
                                {amount}
                            </button>
                        ))}
                    </div>

<h3 style={{ fontSize: "16px" , fontWeight: "bold" , marginBottom: "8px" , color: "#f7fafc" }} >
                        Custom Quentity
                    </h3>

                    <input type="number" placeholder="Enter custom Quentity" className="custom-input" style={{ width: "calc(100% - 16px)" , padding: "8px" , border: "none" , borderRadius: "4px" , marginBottom: "16px" , backgroundColor: "#2d3748" , color: "#f7fafc" }}               value={Quentity}
              onChange={(e) => SetQuentity(e.target.value)} />

                             <div style={{    backgroundColor: "#1E3A8A",
    color: "#60A5FA",
    padding: "8px",
    borderRadius: "5px",
    fontSize: "14px",
    marginBottom: "15px"}}>
           <span style={{    display: "flex",
    alignItems: "center",}}>Buy Quantity Cannot Be Less Than 1</span>
         </div>
         <button style={{    backgroundColor: "#10B981",
    color: "white",
    padding: "10px",
    borderRadius: "5px",
    fontSize: "16px",
    border: "none",
    cursor: "pointer",
    width: "100%",}} onClick={handleVerifyPay} disabled={Quentity == ""}>BUY</button>

                </div>
            </div>
        </div>

    );

};

export default Buy;