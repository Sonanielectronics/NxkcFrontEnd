import React, { useState } from "react";

const SellPopup = ({ isOpen, onClose, onConfirm }) => {
  const [quantity, setQuantity] = useState(4);

  if (!isOpen) return null;

  return (
    <div style={styles.overlay}>
      <div style={styles.popup}>
        <h2>Sell Coins</h2>
        <input
          type="number"
          value={quantity}
          min="4"
          onChange={(e) => setQuantity(Number(e.target.value))}
          style={styles.input}
          placeholder="Enter quantity (min 4)"
        />
        <div style={styles.buttonContainer}>
          <button style={styles.cancelButton} onClick={onClose}>
            Cancel
          </button>
          <button style={styles.confirmButton} onClick={() => onConfirm(quantity)}>
            Sell
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  popup: {
    background: "#fff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
    width: "300px",
    textAlign: "center",
  },
  input: {
    width: "100%",
    padding: "8px",
    margin: "10px 0",
    border: "1px solid #ccc",
    borderRadius: "4px",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "space-between",
  },
  cancelButton: {
    padding: "8px 12px",
    background: "#ccc",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  confirmButton: {
    padding: "8px 12px",
    background: "#007BFF",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default SellPopup;
