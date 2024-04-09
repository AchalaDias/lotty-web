import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import './App.scss';
import "./lottery.scss";
import HomePage from './pages/home';
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from "@asgardeo/auth-react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const config = {
  clientID: window.configs.clientID,
  baseUrl: window.configs.baseUrl,
  signInRedirectURL: window.configs.signInRedirectURL,
  signOutRedirectURL: window.configs.signOutRedirectURL,
  scope: window.configs.scope
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthProvider config={config}>
    <React.StrictMode>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </Router>
    </React.StrictMode>
  </AuthProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
