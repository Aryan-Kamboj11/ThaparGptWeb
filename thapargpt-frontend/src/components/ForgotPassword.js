import React, { useState } from 'react';
import api from '../api'; // Assuming you have an API utility

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [step, setStep] = useState(1); // 1: request, 2: verify, 3: update
  const [message, setMessage] = useState({ text: '', type: '' });

  const handleRequestCode = async (e) => {
    e.preventDefault();
    try {
      await api.post('/api/request-password-reset', { email });
      setMessage({ text: 'Verification code sent to your email', type: 'success' });
      setStep(2);
    } catch (err) {
      setMessage({ text: err.response?.data?.message || 'Failed to send code', type: 'error' });
    }
  };

  const handleVerifyCode = async (e) => {
    e.preventDefault();
    if (!verificationCode) {
      setMessage({ text: 'Please enter the verification code', type: 'error' });
      return;
    }
    
    try {
      await api.post('/api/verify-reset-code', { email, code: verificationCode });
      setMessage({ text: 'Code verified. Please set your new password.', type: 'success' });
      setStep(3);
    } catch (err) {
      setMessage({ text: err.response?.data?.message || 'Invalid verification code', type: 'error' });
    }
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setMessage({ text: 'Passwords do not match', type: 'error' });
      return;
    }

    try {
      await api.post('/api/update-password', { 
        email, 
        code: verificationCode, 
        newPassword 
      });
      setMessage({ text: 'Password updated successfully!', type: 'success' });
      // Reset form or redirect to login
      setStep(1);
      setEmail('');
      setNewPassword('');
      setConfirmPassword('');
      setVerificationCode('');
    } catch (err) {
      setMessage({ text: err.response?.data?.message || 'Failed to update password', type: 'error' });
    }
  };

  return (
    <div className="forgot-password-container">
      <h2>Forgot Password</h2>
      
      {message.text && (
        <div className={`message ${message.type}`}>
          {message.text}
        </div>
      )}

      {step === 1 && (
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
          <button type="submit">Send Verification Code</button>
        </form>
      )}

      {step === 2 && (
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
          <button type="submit">Verify Code</button>
        </form>
      )}

      {step === 3 && (
        <form onSubmit={handleUpdatePassword}>
          <div className="form-group">
            <label>New Password:</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              minLength="6"
            />
          </div>
          <div className="form-group">
            <label>Confirm Password:</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Update Password</button>
        </form>
      )}
    </div>
  );
}