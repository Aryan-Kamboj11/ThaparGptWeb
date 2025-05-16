import React, { useState } from 'react';
import api from '../api';

export default function ResetPassword({ token }) {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    if (newPassword !== confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }

    try {
      const res = await api.post('/api/reset-password', { token, newPassword });
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Failed to reset password');
    }
  };

  return (
    <div className="reset-password-container">
      <h2 className="title">Reset Password</h2>
      <form className="form" onSubmit={handleSubmit}>
        <label className="label">
          New Password:
          <input
            className="input"
            type="password"
            value={newPassword}
            onChange={e => setNewPassword(e.target.value)}
            required
          />
        </label>
        <br />
        <label className="label">
          Confirm Password:
          <input
            className="input"
            type="password"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        <br />
        <button className="btn" type="submit">Reset Password</button>
      </form>

      {message && <p className="message">{message}</p>}
    </div>
  );
}
