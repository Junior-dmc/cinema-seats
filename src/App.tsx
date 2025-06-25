import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Sessoes from './pages/Sessoes';
import AssentosPage from './pages/AssentosPage';
import ProximasEstreias from './pages/ProximasEstreias';
import Sobre from './pages/Sobre';
import Header from './components/Header';
import Footer from './components/Footer';
import { NotificationProvider } from './contexts/NotificationContext';
import { AuthProvider } from './contexts/AuthContext';
import NoelleSugst from './pages/NoelleSugst';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import ReservationHistory from './pages/ReservationHistory';

function App() {
  return (
    <NotificationProvider>
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-gray-900 flex flex-col">
            <Header />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/sessoes/:id" element={<Sessoes />} />
                <Route path="/assentos/:filmeId/:sessaoId" element={<AssentosPage />} />
                <Route path="/proximas-estreias" element={<ProximasEstreias />} />
                <Route path="/sobre" element={<Sobre />} />
                <Route path="/noelle" element={<NoelleSugst />} />
                <Route path="/login" element={<Login />} />
                <Route path="/registro" element={<Register />} />
                <Route path="/perfil" element={<Profile />} />
                <Route path="/historico" element={<ReservationHistory />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </AuthProvider>
    </NotificationProvider>
  );
}

export default App;
