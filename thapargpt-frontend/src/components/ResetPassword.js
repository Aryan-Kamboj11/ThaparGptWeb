import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

export default function ResetPassword() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }

    setIsLoading(true);
    try {
      // Get email and code from location state
      const email = localStorage.getItem('resetEmail');
      const code = localStorage.getItem('resetCode');
      
      // Make sure to use the correct endpoint
      const response = await api.post('/api/reset-password', {
        email,
        code,
        newPassword
      }, {
        headers: {
          Authorization: '' // Explicitly remove auth header
        }
      });

      setMessage('Password updated successfully! Redirecting...');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Failed to update password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-form">
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit}>
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
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Updating...' : 'Update Password'}
        </button>
      </form>
      {message && <div className={`message ${message.includes('success') ? 'success' : 'error'}`}>
        {message}
      </div>}
    </div>
  );
}