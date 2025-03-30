import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Register from "./components/Register"
import Auth from "./components/Auth"

import ForgotPassword from "./components/ForgotPassword"

import Privacy from "./components/Shared/Pages/Footer/Privacy"
import Terms from "./components/Shared/Pages/Footer/Terms"
import ContactUsPage from "./components/Shared/Pages/Footer/ContactUsPage"
import About from "./components/Shared/Pages/Footer/About"

import GraphAds from "./components/Shared/Pages/Screen/DashBoard/LivePriceUpdater/Graph/Ads"

import Pop from "./components/Shared/Pages/Screen/DashBoard/pop"

import Assets from "./components/Shared/Pages/Screen/Assets/index"
import Referral from "./components/Shared/Pages/Screen/Referral/index"
import Transaction from "./components/Shared/Pages/Screen/Transaction/index"
import WatchList from "./components/Shared/Pages/Screen/WatchList/index"

const App = () => {
  
  return (
    <Router>
      <Routes> 

        <Route path="/Pop" element={ <Pop/> } />

        <Route path="/" element={ <Auth/> } />
        <Route path="/Register" element={<Register/>} />
        <Route path="/Register/:ReferralCode" element={<Register/>} />

        <Route path="/ContactUs" element={<ContactUsPage />} />
        <Route path="/About" element={<About />} />
        <Route path="/TermsAndCondition" element={<Terms />} />
        <Route path="/PrivacyPolicy" element={<Privacy />} />

        <Route path="/GraphBatches" element={<GraphAds />} />

        <Route path="/Assets" element={<Assets />} />
        <Route path="/Referral" element={<Referral />} />
        <Route path="/Transaction" element={<Transaction />} />
        <Route path="/WatchList" element={<WatchList />} />

        <Route path="/ForgotPassword" element={<ForgotPassword />} />

      </Routes>
    </Router>
  );
};

export default App;