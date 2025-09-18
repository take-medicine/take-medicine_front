import React, { useState } from 'react';
import './App.css';
import LogInPage from './pages/LogInPage';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import './components/styles/Variables.css'

const RECAPTCHA_SITE_KEY = "6Lduq8wrAAAAALArzaoXKVG4QmBVgfhvQ4wxjL9m";

function App() {

  return (
    <GoogleReCaptchaProvider reCaptchaKey={RECAPTCHA_SITE_KEY}>
      <LogInPage />
    </GoogleReCaptchaProvider>
 
  )
}

export default App