import React, { useState } from 'react';
import axios from 'axios';

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
      const res = await axios.post('/api/reset-password', { token, newPassword });
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Failed to reset password');
    }
  };

  return (
    <div>
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <label>
          New Password:
          <input
            type="password"
            value={newPassword}
            onChange={e => setNewPassword(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Confirm Password:
          <input
            type="password"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        <br />
        <button type="submit">Reset Password</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}
