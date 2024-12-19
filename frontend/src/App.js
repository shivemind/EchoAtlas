import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import AdminPage from './pages/AdminPage';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage />} />          {/* Landing Page */}
                <Route path="/login" element={<LoginPage />} />       {/* Login Page */}
                <Route path="/dashboard" element={<Dashboard />} />  {/* Dashboard */}
                <Route path="/admin" element={<AdminPage />} />       {/* Admin Page */}
            </Routes>
        </Router>
    );
}

export default App;
