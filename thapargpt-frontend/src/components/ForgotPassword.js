import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [step, setStep] = useState(1); // 1 = email, 2 = code
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleRequestCode = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await api.post('/api/request-password-reset', { email });
      setStep(2);
      setMessage('Verification code sent to your email');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Error sending code');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleVerifyCode = async (e) => {
  e.preventDefault();
  setIsLoading(true);
  try {
    // Store email and code for the reset page
    localStorage.setItem('resetEmail', email);
    localStorage.setItem('resetCode', verificationCode);
    
    navigate('/reset-password');
  } catch (err) {
    setMessage(err.response?.data?.message || 'Invalid verification code');
  } finally {
    setIsLoading(false);
  }
};
  return (
    <div className="auth-form">
      <h2>Forgot Password</h2>
      
      {step === 1 ? (
        <form onSubmit={handleRequestCode}>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Sending...' : 'Send Verification Code'}
          </button>
        </form>
      ) : (
        <form onSubmit={handleVerifyCode}>
          <div className="form-group">
            <label>Verification Code:</label>
            <input
              type="text"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              required
            />
          </div>
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Verifying...' : 'Verify Code'}
          </button>
        </form>
      )}

      {message && <div className={`message ${message.includes('Invalid') ? 'error' : ''}`}>{message}</div>}
    </div>
  );
}