import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import AdminLayout from "layouts/Admin/Admin.js";

import "assets/scss/black-dashboard-react.scss";
import "assets/demo/demo.css";
import "assets/css/nucleo-icons.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import ThemeContextWrapper from "./components/ThemeWrapper/ThemeWrapper";
import BackgroundColorWrapper from "./components/BackgroundColorWrapper/BackgroundColorWrapper";
import RegisterCondidat from "authentification/RegisterCondidat";
import LoginCondidat from "authentification/loginCondidat";
import RegisterEntreprise from "authentification/RegisterEntreprise";
import LoginEntreprise from "authentification/loginEntreprise";
import Homme from "views/Homme";
import DashboardC from "views/DashboardC";
import Condidat from "layouts/Condidat/Condidat";
function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [isLoggedInE, setIsLoggedInE] = React.useState(false);

  return (
    <ThemeContextWrapper>
      <BackgroundColorWrapper>
        <BrowserRouter>
          <Routes>
            <Route path="/logincondidat" element={<LoginCondidat setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="/loginEntreprise" element={<LoginEntreprise setIsLoggedInE={setIsLoggedInE} />} />

            <Route path="/registercondidat" element={<RegisterCondidat />} />
            <Route path="/registerentreprise" element={<RegisterEntreprise />} />
            <Route path="/" element={<Homme />} />
           



            {isLoggedIn ? (
              <Route path="/condidat/*" element={<Condidat />} />
            ) : (
              <Route path="*" element={<Navigate to="/" replace />} />
            )}
            {isLoggedInE ? (
              <Route path="/admin/*" element={<AdminLayout />} />
            ) : (
              <Route path="*" element={<Navigate to="/" replace />} />
            )}
          </Routes>
        </BrowserRouter>
      </BackgroundColorWrapper>
    </ThemeContextWrapper>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
