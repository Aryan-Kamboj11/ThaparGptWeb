import React, { useState } from 'react';
import api from '../api';

export default function ForgetPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [resetLink, setResetLink] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setResetLink('');

    try {
      const res = await api.post('/api/forget-password', { email });
      setMessage(res.data.message);
      setResetLink(res.data.resetLink);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className="forgot-password-container">
      <h2 className="title">Forget Password</h2>
      <form className="form" onSubmit={handleSubmit}>
        <label className="label">
          Email:
          <input
            className="input"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </label>
        <button className="btn" type="submit">Send Reset Link</button>
      </form>

      {message && <p className="message">{message}</p>}
      {resetLink && (
        <p className="reset-link">
          Reset Link: <a href={resetLink} target="_blank" rel="noopener noreferrer">{resetLink}</a>
        </p>
      )}
    </div>
  );
}
