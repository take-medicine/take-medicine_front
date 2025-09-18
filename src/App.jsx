import React from 'react'
import '../src/components/styles/Variables.css';
import './App.css';
import LogInPage from './pages/LogInPage/LogInPage';
import CalendarPage from "./pages/Calendar/CalendarPage.jsx";
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

const RECAPTCHA_SITE_KEY = "6Lduq8wrAAAAALArzaoXKVG4QmBVgfhvQ4wxjL9m";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={
          <GoogleReCaptchaProvider reCaptchaKey={RECAPTCHA_SITE_KEY}>
            <LogInPage />
          </GoogleReCaptchaProvider>} />
  
        <Route path="/" element={<CalendarPage />} /> 
      </Routes>
    </BrowserRouter>
  );
}

export default App