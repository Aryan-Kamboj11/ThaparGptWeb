import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

export default function ResetPassword() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState({ text: '', isError: false });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Client-side validation
    if (newPassword !== confirmPassword) {
      setMessage({ text: 'Passwords do not match', isError: true });
      return;
    }
    
    if (newPassword.length < 6) {
      setMessage({ text: 'Password must be at least 6 characters', isError: true });
      return;
    }

    setIsLoading(true);
    setMessage({ text: '', isError: false });

    try {
      const email = localStorage.getItem('resetEmail');
      const code = localStorage.getItem('resetCode');
      
      if (!email || !code) {
        throw new Error('Reset session expired');
      }

      const response = await api.post('/api/reset-password', {
        email,
        code,
        newPassword
      }, {
        headers: {
          'Content-Type': 'application/json',
          // Explicitly remove Authorization header if present
          Authorization: ''
        }
      });

      if (response.data.success) {
        setMessage({ 
          text: 'Password updated successfully! Redirecting...', 
          isError: false 
        });
        // Clear reset data
        localStorage.removeItem('resetEmail');
        localStorage.removeItem('resetCode');
        setTimeout(() => navigate('/login'), 2000);
      } else {
        throw new Error(response.data.message || 'Update failed');
      }
    } catch (err) {
      console.error('Reset error:', err);
      setMessage({ 
        text: err.response?.data?.message || err.message || 'Failed to update password',
        isError: true 
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-form">
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>New Password (min 6 characters):</label>
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
        <button 
          type="submit" 
          disabled={isLoading}
          className={isLoading ? 'loading' : ''}
        >
          {isLoading ? 'Processing...' : 'Update Password'}
        </button>
      </form>
      
      {message.text && (
        <div className={`message ${message.isError ? 'error' : 'success'}`}>
          {message.text}
        </div>
      )}
    </div>
  );
}