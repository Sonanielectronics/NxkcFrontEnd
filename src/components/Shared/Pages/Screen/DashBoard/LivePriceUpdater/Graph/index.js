import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { io } from "socket.io-client";

import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

import { BackendBASE_URL } from "../../../../../../../main";
import Buy from "./Buy/index";
import Sell from "./Sell/index";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

const OrderCard = ({ date, day, Quentity, price, PurchaseType }) => {
  return (
    <div
      style={{
        ...styles.card,
      }}
    >
      {/* Header Section */}
      <div style={styles.header}>
        <div>
          <span style={styles.date}>{date}</span>
          <span style={styles.time}>{day}</span>
        </div>

        <span
          style={{
            ...styles.badge,
            background:
              PurchaseType === "Free Purchase"
                ? "#007bff"
                : PurchaseType === "Paid Purchase"
                ? "#28a745"
                : "red",
          }}
        >
          {PurchaseType === "Free Purchase"
            ? "Free"
            : PurchaseType === "Paid Purchase"
            ? "Buy"
            : "Sell"}
        </span>
      </div>

      {/* Details Section */}
      <div style={styles.details}>
        <div style={styles.infoBox}>
          <strong>Quantity : </strong>
          <span>{Quentity}</span>
        </div>
        <div style={styles.infoBox}>
          <strong>Price : </strong>
          <span>{price}</span>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    maxWidth: "450px",
    margin: "auto",
  },
  title: {
    fontSize: "22px",
    fontWeight: "bold",
    marginBottom: "20px",
    color: "#ffffff",
    textAlign: "center",
    textTransform: "uppercase",
  },
  card: {
    background: "#1f2937",
    borderRadius: "12px",
    padding: "16px",
    marginBottom: "0.83rem",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    color: "#ffffff",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    cursor: "pointer",
  },
  cardHover: {
    transform: "scale(1.02)",
    boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.3)",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    // marginBottom: "12px",
    borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
    paddingBottom: "8px",
  },
  date: {
    fontSize: "14px",
    fontWeight: "bold",
    color: "#f8f9fa",
  },
  time: {
    fontSize: "12px",
    color: "#c4c4c4",
    marginLeft: "8px",
  },
  badge: {
    color: "white",
    padding: "5px 12px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  details: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "10px",
    fontSize: "14px",
  },
  infoBox: {
    background: "rgba(255, 255, 255, 0.1)",
    padding: "8px 12px",
    borderRadius: "8px",
    textAlign: "center",
  },
};

const ToggleSwitch = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const batchValue = queryParams.get("Name");

  const [fontSize, setFontSize] = useState(14);

  const [chartData, setChartData] = useState({ labels: [], datasets: [] });

  const [activeChartButton, setActiveChartButton] = useState("1D");

  const [hoveredButton, setHoveredButton] = useState(null);

  const [ReferralCodeStatus, SetReferralCodeStatus] = useState(false);
  const [Userdata, SetUserdata] = useState([]);

  const [ScreenNumber, SetScreenNumber] = useState(1);

  const [SellLimit, SetSellLimit] = useState(0);

  const styles = {
    container: {
      backgroundColor: "#2d3748",
      minHeight: "100vh",
      color: "#f7fafc",
      fontFamily: "'Poppins', sans-serif",
      padding: "1rem",
    },
    main: {
      margin: "0 auto",
    },
    tableContainer: {
      backgroundColor: "#1a202c",
      borderRadius: "12px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      height: "50vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      padding: "10px",
    },
    tableWrapper: {
      overflowX: "auto",
      height: "calc(50vh - 2rem)",
      width: "100%",
      maxWidth: "100%",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
      whiteSpace: "nowrap",
    },
    thTdStyle: {
      padding: "10px",
      textAlign: "center",
    },
    rowHoverStyle: {
      cursor: "pointer",
    },
    firstColStyle: {
      padding: "10px",
      textAlign: "center",
      fontWeight: "bold",
      backgroundColor: "#374151",
      color: "#f7fafc",
    },
    otherColStyle: {
      padding: "10px",
      textAlign: "center",
      backgroundColor: "#4a5568",
      color: "#f7fafc",
      textShadow: "2px 2px 5px rgba(144, 238, 144, 0.6)",
      // rgba(238, 144, 144, 0.6)
    },
    container2: {
      backgroundColor: "#2d3748",
      minHeight: "100vh",
      color: "#f7fafc",
      fontFamily: "'Poppins', sans-serif",
    },
    contentWrapper: {
      margin: "0 auto",
      padding: "1rem",
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "1rem 0",
      background: "#2d3748",
      borderRadius: "8px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    },
    logo: {
      height: "150px",
      objectFit: "contain",
    },
    nav: {
      display: "flex",
      justifyContent: "space-around",
      padding: "1rem 0",
      background: "#2d3748",
      borderRadius: "8px",
      marginTop: "1rem",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    },
    navLink: {
      position: "relative",
      color: "#cbd5e0",
      textDecoration: "none",
      cursor: "pointer",
      fontSize: "1rem",
      padding: "0.5rem 1rem",
      transition: "all 0.3s ease",
    },
    navLinkHover: {
      color: "#ffffff",
      transform: "scale(1.1)",
    },
    chartContainer: {
      backgroundColor: "#2d3748",
      borderRadius: "12px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      height: "calc(100vh - 6rem)",
    },
    chartHeader: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    button: {
      padding: "0.75rem 1.5rem",
      borderRadius: "5px",
      cursor: "pointer",
      fontSize: "1.5rem",
      fontWeight: "bold",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      transition: "all 0.3s ease",
      border: "none",
      backgroundColor: "transparent",
      color: "#ffffff",
    },
    buttonHover: {
      transform: "scale(1.05)",
    },
    graphArea: {
      backgroundColor: "#4a5568",
      height: "350px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: "12px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    },
    graphText: {
      color: "#e2e8f0",
      fontSize: "1.25rem",
      fontWeight: "bold",
    },
    footer: {
      textAlign: "center",
      padding: "1rem 0",
      background: "#2d3748",
      borderRadius: "8px",
      marginTop: "2rem",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    },
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        bodyFont: {
          size: fontSize,
        },
        titleFont: {
          size: fontSize,
        },
        displayColors: false,
        callbacks: {
          label: (tooltipItem) => {
            return `${tooltipItem.raw}`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          color: "transparent",
        },
        type: "category",
        labels: chartData.labels,
        ticks: {
          font: {
            size: fontSize,
          },
          color: "#E0E0E0",
          maxRotation: 90, // Rotate labels for better readability
          minRotation: 90,
        },
      },
      y: {
        grid: {
          drawBorder: false,
          color: "#2d3748",
        },
        ticks: {
          font: {
            size: fontSize,
          },
          color: "#E0E0E0",
          align: "end",
          padding: 10,
        },
      },
    },
  };

  const handleClick = (range) => {
    setActiveChartButton(range);
  };

  useEffect(() => {
    var UserId = localStorage.getItem("_id");
    var ShareId = queryParams.get("_id");

    async function readFileAsync() {
      const response = await fetch(`${BackendBASE_URL}/GetPurchaseShare`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ UserId, ShareId }),
      });

      const data = await response.json();
      
      SetUserdata(data.data);
      SetReferralCodeStatus(true);

      const PurchaseQuentityArray = data.data.filter(
        (item) => item.PurchaseType !== "Paid Sell"
      );
      const PurchaseQuantity = PurchaseQuentityArray.reduce(
        (sum, item) => sum + item.Quantity,
        0
      );

      const SellQuentityArray = data.data.filter(
        (item) => item.PurchaseType == "Paid Sell"
      );
      const SellQuantity = SellQuentityArray.reduce(
        (sum, item) => sum + item.Quantity,
        0
      );

      SetSellLimit(PurchaseQuantity - SellQuantity);
    }

    readFileAsync();

    const socket = io(`${BackendBASE_URL}/${activeChartButton}`);

    socket.emit("sendId", { _id: ShareId }); // Replace 'yourId' with the actual _id value

    socket.on("updateChartData", (data) => {

      const labels = data.map((point) => point.time);
      const values = data.map((point) => point.value);

      setChartData({
        labels,
        datasets: [
          {
            label: "Coin Value (Live)",
            data: values,
            fill: true,
            borderColor: "rgba(75, 192, 192, 1)",
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            pointBackgroundColor: "rgba(75, 192, 192, 1)",
          },
        ],
      });
    });

    return () => {
      socket.disconnect();
    };
  }, [activeChartButton]);

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return [`${day}-${month}-${year}`, `${hours}:${minutes}`];
  };

  const HandleToast = (Message) => {
      
    toast(`${Message}`, {
      position: "bottom-right", // Set the toast position to bottom-right
      className: "custom-toast"
    });
  
  };

  return (
    <>

<style>
      {`

        @media (max-width: 480px) {

          .custom-toast {
            width: 90% !important;
          }

          .Toastify__toast-container--bottom-right {
            bottom: 16px !important;
          }

        }
  
      `}
    </style>
    
        <ToastContainer />
      {ScreenNumber == 1 ? (
        <>
          <div style={styles.container2}>
            <div style={styles.contentWrapper}>
              <main>
                <h2
                  style={{
                    fontSize: "1.75rem",
                    fontWeight: "bold",
                    marginBlock: "0rem",
                    padding: "1rem",
                  }}
                >
                  {batchValue}
                </h2>
                <div style={styles.chartContainer}>
                  <div
                    style={{
                      height: "calc(100vh - 6rem)",
                      width: "calc(100%)",
                      backgroundColor: "#1a202c", // Box background color
                      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Subtle shadow for box effect
                      borderRadius: "10px", // Rounded corners
                      padding: "1rem 1rem 6.5rem 1rem", // Inner padding for content
                      boxSizing: "border-box",
                    }}
                  >
                    <div style={styles.chartHeader}>
                      <div>
                        {["1D", "5D", "1M", "1Y"].map((label) => (
                          <button
                            key={label}
                            onClick={() => handleClick(label)}
                            onMouseEnter={() => setHoveredButton(label)}
                            onMouseLeave={() => setHoveredButton(null)}
                            style={{
                              padding: "0.5rem 1rem",
                              border: "none",
                              backgroundColor: "transparent",
                              color:
                                activeChartButton === label
                                  ? "#47c2be"
                                  : hoveredButton === label
                                  ? "#47c2be"
                                  : "#f7fafc",
                              textDecoration:
                                activeChartButton === label
                                  ? "underline"
                                  : hoveredButton === label
                                  ? "underline"
                                  : "none",
                              textUnderlineOffset:
                                activeChartButton === label
                                  ? "1px"
                                  : hoveredButton === label
                                  ? "1px"
                                  : "0px",
                              transition: "all 0.3s ease",
                            }}
                          >
                            {label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <Line data={chartData} options={options} />

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        padding: "1rem",
                      }}
                    >
                      <div style={{ display: "flex", gap: "8px" }}>
                        <button
                          style={{
                            padding: "10px 20px",
                            backgroundColor: "#28a745",
                            color: "white",
                            borderRadius: "5px",
                            cursor: "pointer",
                            border: "none",
                          }}
                          onClick={() => SetScreenNumber(2)}
                        >
                          Buy
                        </button>
                        <button
                          style={{
                            padding: "10px 20px",
                            backgroundColor: "#dc3545",
                            color: "white",
                            borderRadius: "5px",
                            cursor: "pointer",
                            border: "none",
                          }}
                          onClick={() => SetScreenNumber(3)}
                        >
                          Sell
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </main>
            </div>
          </div>

          <div style={styles.container}>
            <h2
              style={{
                display: "block",
                marginBlockStart: "0px",
                marginBlockEnd: "1rem",
                fontSize: "1.5em",
                fontWeight: "bold",
                unicodeBidi: "isolate",
              }}
            >
              Order History
            </h2>

            {Userdata.slice()
              .reverse()
              .map((row, index) => (
                <OrderCard
                  date={formatDate(row.createdAt)[0]}
                  day={formatDate(row.createdAt)[1]}
                  Quentity={row.Quantity}
                  price={row.PurchsePrice}
                  PurchaseType={row.PurchaseType}
                />
              ))}
          </div>
        </>
      ) : ScreenNumber == 2 ? (
        <Buy SetScreenNumber={SetScreenNumber} chartData={chartData} HandleToast={HandleToast}/>
      ) : (
        <Sell
          SetScreenNumber={SetScreenNumber}
          chartData={chartData}
          SellLimit={SellLimit}
          HandleToast={HandleToast}
        />
      )}
    </>
  );
};

export default ToggleSwitch;
