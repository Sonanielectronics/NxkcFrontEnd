import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { BackendBASE_URL } from '../../../../../../main';

const LivePriceUpdater = () => {

  const navigate = useNavigate();
  
  const [ShareData, SetShareData] = useState([]);

  useEffect(() => {

    const ShareFinder = async (e) => {

      try {

        const response = await fetch(`${BackendBASE_URL}/AllShare`, {
          method: "GET",
          headers: { "Content-Type": "application/json" }
        });
        
        const data = await response.json();

        if(data.status == 200){
          SetShareData(data.data);
        }

      } catch (error) {
        console.error("Error:", error.message);
      }
      
    };

    ShareFinder();

  }, []); 

  const columns = [
    { label: "Name", field: "Name" },
    { label: "Current Price", field: "CurrentPrice" },
    { label: "Launch Price", field: "InitialPrice" },
    { label: "Highest Price", field: "HighestPrice" },
    { label: "Lowest Price", field: "LowestPrice" },
  ];
  
  return (
    <main style={{padding:"1rem 0"}}>
    <h2
      style={{
        fontSize: "1.75rem",
        fontWeight: "bold",
        padding: "1rem 0",
      }}
    >
      LIVE Updates
    </h2>
    <div
      style={{
        backgroundColor: "#2d3748",
        borderRadius: "12px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        height: "50vh",
        alignContent: "center",
        justifyItems: "center",
      }}
    >
      <div
        style={{
          overflow: "auto",
          height: "calc(50vh - 2rem)",
          width: "calc(100% - 2rem)",
          scrollbarWidth:"none"
        }}
      >
        <table style={{    width: "100%",
    borderCollapse: "collapse",
    margin: "1rem",}}>
          <thead>
            <tr style={{    fontWeight: "bold",}}>
              {columns.map((col, index) => (
                <th key={index} style={{       padding: "10px",
    textAlign: "left",
    textAlign: "center",}}>
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ShareData.length > 0 ? (
              ShareData.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  style={{cursor: "pointer"}}
                  onClick={() =>
                    navigate(
                      `/GraphBatches?_id=${row._id}&Name=${row.Name}`
                    )
                  }
                >
                  <td style={{       padding: "10px",
    textAlign: "left",
    textAlign: "center",}}>{row.Name}</td>
                  <td style={{       padding: "10px",
    textAlign: "left",
    textAlign: "center",}}>
                    <div>
                      <strong>{row.PriceData[3][row.PriceData[3].length - 1].value}</strong>
                    </div>
                    {

        (() => {

          const elements = [
            "Last Day",
            "Last Week",
            "Last Month",
            "Last Year",
          ];

          const randomElement = elements[Math.floor(Math.random() * elements.length)];

          let change

          function calculatePercentageChange(oldValue, newValue) {
            if (oldValue === 0) {
                return newValue === 0 ? "No Change (0%)" : "Infinity (Cannot calculate)";
            }
            
            let change = ((newValue - oldValue) / oldValue) * 100;
            let sign = change > 0 ? "+" : ""; // Add "+" sign for positive values
            return `${sign}${change.toFixed(2)}`;
          }

          if (randomElement == "Last Day") {
            var StartValue = row.PriceData[0][0].value
            var EndValue = row.PriceData[0][row.PriceData[0].length - 1].value
            change = calculatePercentageChange(StartValue, EndValue);
          } else if (randomElement == "Last Week") {
            var StartValue = row.PriceData[1][0].value
            var EndValue = row.PriceData[1][row.PriceData[1].length - 1].value
            change = calculatePercentageChange(StartValue, EndValue);
          } else if (randomElement == "Last Month") {
            var StartValue = row.PriceData[2][0].value
            var EndValue = row.PriceData[2][row.PriceData[2].length - 1].value
            change = calculatePercentageChange(StartValue, EndValue);
          } else {
            var StartValue = row.PriceData[3][0].value
            var EndValue = row.PriceData[3][row.PriceData[3].length - 1].value
            change = calculatePercentageChange(StartValue, EndValue);
          }

          return (

            <>
            <div
            style={{
              color: change > 0 ? "limegreen" : "red",
              fontWeight: "bold",
            }}
          >
            {change} %
          </div>
            <div
            style={{
              color: "#a0aec0",
              fontSize: "12px",
            }}
          >
            {randomElement}
          </div>
          </>

          );

        })()

      }

                  </td>
                  <td style={{       padding: "10px",
    textAlign: "left",
    textAlign: "center",}}>{row.PriceData[3][0].value}</td>
    <td style={{ padding: "10px", textAlign: "left", textAlign: "center",}}>{row.PriceData[3].reduce((max, item) => item.value > max ? item.value : max, row.PriceData[3][0].value)}</td>
    <td style={{ padding: "10px", textAlign: "left", textAlign: "center",}}>{row.PriceData[3].reduce((min, item) => item.value < min ? item.value : min, row.PriceData[3][0].value)}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length}
                  style={{ ...{       padding: "10px",
    textAlign: "left",
    textAlign: "center",}, textAlign: "center" }}
                >
                  No Data Available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  </main>
  );
};

export default LivePriceUpdater;
