import React, { useState } from 'react';
import axios from 'axios';

export default function ForgetPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [resetLink, setResetLink] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setResetLink('');

    try {
      const res = await axios.post('/api/forget-password', { email });
      setMessage(res.data.message);
      setResetLink(res.data.resetLink); // You can show this or send by email in production
    } catch (err) {
      setMessage(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div>
      <h2>Forget Password</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </label>
        <button type="submit">Send Reset Link</button>
      </form>

      {message && <p>{message}</p>}
      {resetLink && (
        <p>
          Reset Link: <a href={resetLink} target="_blank" rel="noopener noreferrer">{resetLink}</a>
        </p>
      )}
    </div>
  );
}
