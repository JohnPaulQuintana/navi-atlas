// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
// import heroImg from './assets/hero.png'
import './App.css'
import Header from './components/Header'
import Hero from './components/Hero'
import { Routes, Route } from "react-router-dom";
import UploadSVG from './pages/UploadSVG';
import ViewGuide from './pages/Guide';
import Footer from './components/Footer';

function App() {
  return (
    <div className="w-full min-h-screen flex flex-col">

      {/* HEADER */}
      <Header />

      {/* PAGE CONTENT */}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/upload" element={<UploadSVG />} />
          <Route path="/guide" element={<ViewGuide />} />
        </Routes>
      </main>

      {/* FOOTER */}
      <Footer />

    </div>
  );
}

export default App
