import React, { useState, useEffect } from "react";

import { BackendBASE_URL } from "../../../../../../main";

const OrderCard = ({ order }) => {
  return (
    <div style={{ ...styles.card, ...getTypeStyle(order.Status) }}>
      <div style={styles.header}>
        <span style={styles.Status}>{order.Status}</span>
        <span style={styles.TransferId}>{order.TransferId}</span>
      </div>
      <div style={styles.createdAt}>{formatDate(order.createdAt)}</div>
      <div style={styles.Amount}>{order.Amount} ₹</div>
    </div>
  );
};

const getTypeStyle = (type) => {
  const typeColors = {
    Deposit: { borderLeft: "5px solid #4CAF50" },
    Withdraw: { borderLeft: "5px solid #FF5722" },
  };
  return typeColors[type] || {};
};

const formatDate = (dateString) => {
  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  return new Date(dateString).toLocaleDateString("en-IN", options);
};

const ToggleSwitch = ({ Userdata }) => {
  return (
    <div>
      <h2 style={styles.heading}>Transaction History</h2>
      <div
        style={{
          height: "calc(100vh - 104px)",
          overflowX: "auto",
          scrollbarWidth: "none",
        }}
      >
        {Userdata.map((order, index) => (
          <OrderCard key={index} order={order} />
        ))}
      </div>
    </div>
  );
};

// const Userdata = [
//   {
//     type: "Deposit",
//     transactionId: "TXN123456",
//     amount: 5000,
//     date: "2025-03-19T10:00:00Z",
//   },
//   {
//     type: "Deposit",
//     transactionId: "TXN123456",
//     amount: 5000,
//     date: "2025-03-19T10:00:00Z",
//   },
//   {
//     type: "Deposit",
//     transactionId: "TXN123456",
//     amount: 5000,
//     date: "2025-03-19T10:00:00Z",
//   },
//   {
//     type: "Withdraw",
//     transactionId: "TXN789012",
//     amount: 2000,
//     date: "2025-03-18T15:30:00Z",
//   },
// ];

const UserTransaction = () => {

  const [fontSize, setFontSize] = useState(14);

  const [Userdata, SetUserdata] = useState([]);

  useEffect(() => {
    var UserId = localStorage.getItem("_id");

    async function readFileAsync() {
      const response = await fetch(`${BackendBASE_URL}/GetNxRecord`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ User: UserId }),
      });

      const data = await response.json();

      SetUserdata(data.data);
    }

    readFileAsync();
  }, []);

  return (
    <div style={styles.appContainer}>
      <ToggleSwitch Userdata={Userdata} />
    </div>
  );
};

const styles = {
  appContainer: {
    padding: "16px",
    background: "rgb(45, 55, 72)", // Dark Theme
    boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.3)",
  },
  heading: {
    fontSize: "30px",
    fontWeight: "bold",
    color: "#E0E0E0", // Light Text for Dark Background
    textAlign: "center",
    marginBottom: "16px",
    marginBlockStart: "0px",
    marginTop: "16px",
  },
  card: {
    padding: "15px",
    borderRadius: "12px",
    marginBottom: "12px",
    background: "rgba(255, 255, 255, 0.1)", // Glassmorphism
    backdropFilter: "blur(10px)",
    color: "#FFF", // White text for contrast
    transition: "transform 0.3s ease-in-out, box-shadow 0.3s",
    cursor: "pointer",
  },
  cardHover: {
    transform: "scale(1.05)",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: "20px",
    fontWeight: "500",
    color: "#DDD",
  },
  type: {
    fontWeight: "bold",
    fontSize: "32px",
  },
  TransferId: {
    fontSize: "18px",
    color: "#BBB",
  },
  createdAt: {
    color: "#AAA",
    fontSize: "19px",
    marginTop: "5px",
  },
  Amount: {
    fontSize: "26px",
    fontWeight: "bold",
    color: "#FFF",
    marginTop: "10px",
  },
};

export default UserTransaction;
