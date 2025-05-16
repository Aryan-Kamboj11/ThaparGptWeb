import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom'; // Changed here
import MainPage from './components/MainPage';
import Login from './components/Login';
import Signup from './components/Signup';
import ProfilePage from './components/ProfilePage.js';
import ForgotPassword from './components/ForgotPassword'; // New import
import ResetPassword from './components/ResetPassword';   // New import
import './App.css';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />  {/* New route */}
                <Route path="/reset-password/:token" element={<ResetPassword />} />  {/* New route */}
            </Routes>
        </Router>
    );
}

export default App;
