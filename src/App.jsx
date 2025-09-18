import React from 'react'
import '../src/components/styles/Variables.css';
import './App.css';
import LogInPage from './pages/LogInPage';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import TreatmentDetails from './components/treatmentDetails/TreatmentDetails';

const RECAPTCHA_SITE_KEY = "6Lduq8wrAAAAALArzaoXKVG4QmBVgfhvQ4wxjL9m";

function App() {

  const mockTreatment = {
    medicationName: "Insulina",
    description: "Lo tomo para regular la cantidad de azúcar dos veces al día",
    duration: "2 al día",
    dosage: "Crónico",
    time: ["09:00h", "17:00h"],
    days: ["Lunes", "Miércoles", "Viernes"]
  };

  return (
    <GoogleReCaptchaProvider reCaptchaKey={RECAPTCHA_SITE_KEY}>
      {/*<LogInPage /> */}
      <TreatmentDetails treatment={mockTreatment} ></TreatmentDetails>
    </GoogleReCaptchaProvider>

    
  )
}

export default App