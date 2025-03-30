
import React, { useState } from "react";
import BuyPopup from "./BuyPopup";
import SellPopup from "./SellPopup";
import DepositPopup from "./DepositPopup";
import WithdrawPopup from "./WithdrawPopup";

const Pop = () => {

  const [buyOpen, setBuyOpen] = useState(false);
  const [sellOpen, setSellOpen] = useState(false);
  const [depositOpen, setDepositOpen] = useState(false);
  const [withdrawOpen, setWithdrawOpen] = useState(false);

  const handleBuy = (amount) => {
    console.log(`Buying ${amount} coins`);
    setBuyOpen(false);
  };

  const handleSell = (quantity) => {
    console.log(`Selling ${quantity} coins`);
    setSellOpen(false);
  };

  const handleDeposit = (amount) => {
    console.log(`Depositing Rs.${amount}`);
    setDepositOpen(false);
  };

  const handleWithdraw = (amount) => {
    console.log(`Withdrawing Rs.${amount}`);
    setWithdrawOpen(false);
  };

  return (
    <div style={styles.container}>
      <button onClick={() => setBuyOpen(true)} style={styles.buyButton}>
        Buy Coins
      </button>
      <button onClick={() => setSellOpen(true)} style={styles.sellButton}>
        Sell Coins
      </button>
      <button onClick={() => setDepositOpen(true)} style={styles.depositButton}>
        Deposit Money
      </button>
      <button onClick={() => setWithdrawOpen(true)} style={styles.withdrawButton}>
        Withdraw Money
      </button>

      <BuyPopup isOpen={buyOpen} onClose={() => setBuyOpen(false)} onConfirm={handleBuy} />
      <SellPopup isOpen={sellOpen} onClose={() => setSellOpen(false)} onConfirm={handleSell} />
      <DepositPopup isOpen={depositOpen} onClose={() => setDepositOpen(false)} onConfirm={handleDeposit} />
      <WithdrawPopup isOpen={withdrawOpen} onClose={() => setWithdrawOpen(false)} onConfirm={handleWithdraw} />
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "10px",
    marginTop: "50px",
  },
  buyButton: {
    padding: "10px 20px",
    background: "#007BFF",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  sellButton: {
    padding: "10px 20px",
    background: "#DC3545",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  depositButton: {
    padding: "10px 20px",
    background: "#28A745",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  withdrawButton: {
    padding: "10px 20px",
    background: "#FFC107",
    color: "black",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default Pop;
