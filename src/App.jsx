import React, { useState } from 'react';
import '../src/components/styles/Variables.css';
import './App.css';
import LogInPage from './pages/LogInPage';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

const RECAPTCHA_SITE_KEY = "6Lduq8wrAAAAALArzaoXKVG4QmBVgfhvQ4wxjL9m";

function App() {
import LogInModal from './components/logInModal/LogInModal.jsx';
import Navbar from "./components/Navbar/Navbar.jsx";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function Home() {
  return <h1>Home</h1>
}

function Login({ setUser }) {
  return (
    <div>
      <h1>Login</h1>
      <button onClick={() => setUser({ name: "Abaraira", photoUrl: "https://via.placeholder.com/32" })}>
        Simular login
      </button>
    </div>
  );
}

function Calendar() {
  return <h1>Calendar</h1>;
}

export default function App() {
  const [user, setUser] = useState(null);

  return (
    <GoogleReCaptchaProvider reCaptchaKey={RECAPTCHA_SITE_KEY}>
      <LogInPage />
    </GoogleReCaptchaProvider>
  )
    <BrowserRouter>
      <Navbar user={user} />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/calendar" element={<Calendar />} />
        </Routes>
      </main>
    <LogInModal></LogInModal>
    </BrowserRouter>
    
  );
}

