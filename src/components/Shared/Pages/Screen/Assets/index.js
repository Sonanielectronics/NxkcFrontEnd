import React, { useState, useEffect } from "react";

import { BackendBASE_URL } from "../../../../../main";

const OrderCard = ({Quentity,Name,CurrentPrice}) => {
  if(Quentity !== 0){
    return (
      // <div
      //   style={{
      //     ...styles.card,
      //   }}
      // >
  
      //   {/* Details Section */}
      //   <div style={styles.details}>
      //     <div style={styles.infoBox}>
      //       <strong>Quantity : </strong>
      //       <span>{Quentity}{Name}{CurrentPrice}</span>
      //     </div>
      //   </div>
      // </div>
      <div
      style={{
        ...styles.card,
      }}
    >
      {/* Header Section */}
      <div style={styles.header}>
        <div>
          <span style={styles.date}>{Name}</span>
        </div>
      </div>

      {/* Details Section */}
      <div style={styles.details}>
        <div style={styles.infoBox}>
          <strong>Quantity : </strong>
          <span>{Quentity}</span>
        </div>
        <div style={styles.infoBox}>
          <strong>Current Price : </strong>
          <span>{CurrentPrice}</span>
        </div>
      </div>
    </div>
    );
  }
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

const Assets = () => {

  const [Userdata, SetUserdata] = useState([]);

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

  useEffect(() => {
    var UserId = localStorage.getItem("_id");

    async function readFileAsync() {
      const response = await fetch(`${BackendBASE_URL}/GetAllPurchaseShare`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ UserId }),
      });

      const data = await response.json();

      const groupedData = await data.data.reduce(async (acc, item) => {

        const { Share, Quantity, PurchaseType } = item;

        if (!acc[Share]) {

          const responseData = await fetch(`${BackendBASE_URL}/GetShare`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ _id:Share }),
          });
    
          const FindQuentityName = await responseData.json();

          const Name = FindQuentityName.data[0].Name;
          var PriceData = FindQuentityName.data[0].PriceData[0];
          var CurrentPrice = PriceData[PriceData.length - 1].value

          acc[Share] = {
            Share,
            TotalPurchased: 0,
            TotalSold: 0,
            NetQuantity: 0,
            Name : Name, 
            CurrentPrice : CurrentPrice
          };

        }

        if (PurchaseType === "Paid Purchase") {
          acc[Share].TotalPurchased += Quantity;
        } else if (PurchaseType === "Paid Sell") {
          acc[Share].TotalSold += Quantity;
        }

        acc[Share].NetQuantity = acc[Share].TotalPurchased - acc[Share].TotalSold;
    
        return acc;

      }, {});

      const result = Object.values(groupedData);

      SetUserdata(result);

    }

    readFileAsync();

  }, []);

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return [`${day}-${month}-${year}`, `${hours}:${minutes}`];
  };

  return (
        <>

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
              Assets
            </h2>

            {Userdata.slice()
              .reverse()
              .map((row, index) => (

                <OrderCard
                  Quentity={row.NetQuantity}
                  Name={row.Name}
                  CurrentPrice={row.CurrentPrice}
                />
              ))}
          </div>
        </>
  );
};

export default Assets;
