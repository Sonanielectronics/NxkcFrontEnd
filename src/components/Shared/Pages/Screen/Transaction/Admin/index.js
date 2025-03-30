import React, { useState, useEffect } from "react";

import { BackendBASE_URL } from '../../../../../../main';

const AdminTransaction = () => {

  const [staff, setStaff] = useState([]);
  const [search, setSearch] = useState("");
  const [newTransactionId, setNewTransactionId] = useState("");
  const [newAmount, setNewAmount] = useState("");
  const [showModal, setShowModal] = useState(false); // Modal visibility state

  useEffect(() => {

    const handleSubmit = async (e) => {

      try {

        const response = await fetch(`${BackendBASE_URL}/GetNxAdminRecord`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        
        const data = await response.json();
        console.log(data.data);

        setStaff(data.data);

      } catch (error) {
        console.error("Error:", error.message);
      }
      
    };

    handleSubmit();

  }, []);

  // Function to handle adding a new investment
  const handleAdd = async () => {

    if (newTransactionId.trim() === "" || newAmount.trim() === "") {
      alert("Please enter both Transaction ID and Amount!");
      return;
    }

    await fetch(`${BackendBASE_URL}/NxAdminRecord`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ Amount:newAmount, TransferId:newTransactionId,Status:"WithDraw",User:localStorage.getItem("_id") }),
    });

    setStaff([...staff, {
      TransferId: newTransactionId,
      Amount: parseFloat(newAmount),
    }]); // Add new record

    setNewTransactionId(""); // Reset input fields
    setNewAmount("");
    setShowModal(false); // Close modal after adding
    
  };

  return (
    <div style={{ padding: "24px", fontFamily: "Arial, sans-serif" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <h2 style={{ margin: 0 }}>Investment</h2>
        <div style={{ display: "flex", gap: "10px" }}>
          <input 
            type="text" 
            placeholder="Search by Transaction ID..." 
            value={search} 
            onChange={(e) => setSearch(e.target.value)} 
            style={{ padding: "8px", width: "200px", borderRadius: "5px", border: "1px solid #ccc" }}
          />
          <button 
            onClick={() => setShowModal(true)} // Open modal on button click
            style={{ padding: "10px", backgroundColor: "#28a745", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}>
            Add Investment
          </button>
        </div>
      </div>

      {/* Table */}
      <table style={{ 
        width: "100%", 
        borderCollapse: "collapse", 
        borderRadius: "10px", 
        overflow: "hidden", 
        border: "1px solid #1a202c"
      }}>
        <thead style={{ backgroundColor: "#1a202c", color: "white" }}>
          <tr style={{ textAlign: "center" }}>
            <th style={{ padding: "10px", border: "1px solid #1a202c" }}>Transaction ID</th>
            <th style={{ padding: "10px", border: "1px solid #1a202c" }}>Amount</th>
            <th style={{ padding: "10px", border: "1px solid #1a202c" }}>Actions</th>
          </tr>
        </thead>
        <tbody style={{ backgroundColor: "white", color: "black" }}>
          {staff
            .filter((s) => s.TransferId.toLowerCase().includes(search.toLowerCase()))
            .map((s,index) => (
              <tr key={index} style={{ textAlign: "center" }}>
                <td style={{ padding: "10px", border: "1px solid #1a202c" }}>{s.TransferId}</td>
                <td style={{ padding: "10px", border: "1px solid #1a202c" }}>{s.Amount}</td>
                <td style={{ padding: "10px", border: "1px solid #1a202c" }}>
                  <button 
                    style={{ padding: "5px 10px", backgroundColor: "#dc3545", color: "white", border: "none", borderRadius: "3px", cursor: "pointer" }}>
                    Delete
                  </button>
                </td>
              </tr>
          ))}
        </tbody>
      </table>

      {/* Modal Popup */}
      {showModal && (
        <div style={{ 
          position: "fixed", 
          top: 0, left: 0, width: "100%", height: "100%", 
          backgroundColor: "rgba(0, 0, 0, 0.5)", 
          display: "flex", justifyContent: "center", alignItems: "center"
        }}>
          <div style={{ 
            backgroundColor: "white", padding: "40px", borderRadius: "10px", 
            width: "350px", textAlign: "center", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", 
            position: "relative"
          }}>
            {/* Close Button (❌) */}
            <button 
              onClick={() => setShowModal(false)}
              style={{ 
                position: "absolute", top: "6px", right: "6px", 
                background: "none", border: "none", fontSize: "18px", cursor: "pointer", 
                color: "#555" , height:"10px"
              }}>
              ❌
            </button>

            <h3 style={{marginBlockStart:"0px",color:"black"}}>Add Investment</h3>
            <input 
              type="text" 
              placeholder="Transaction ID" 
              value={newTransactionId} 
              onChange={(e) => setNewTransactionId(e.target.value)} 
              style={{ padding: "8px", width: "calc(100% - 16px)", marginBottom: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
            />
            <input 
              type="number" 
              placeholder="Amount" 
              value={newAmount} 
              onChange={(e) => setNewAmount(e.target.value)} 
              style={{ padding: "8px", width: "calc(100% - 16px)", marginBottom: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
            />

<style>
        {`
.custom-placeholder::placeholder {
  color: white;
}
        `}
      </style>

                        <input 
              type="text" 
              placeholder="Add"  
              className="custom-placeholder"
              style={{ padding: "8px", width: "calc(100% - 16px)", marginBottom: "10px", borderRadius: "5px", border: "1px solid #ccc",backgroundColor:"#28a745",color:"white",textAlign:"center",color:"transparent" }}
              onClick={handleAdd}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminTransaction;
