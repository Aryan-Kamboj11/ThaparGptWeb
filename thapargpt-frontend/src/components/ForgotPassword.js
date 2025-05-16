import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api'; // Adjust the path based on your project

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        setMessage('');

        try {
            const res = await api.post('/api/forgot-password', { email });
            setMessage(res.data.message || 'Password reset instructions sent to your email.');
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to send reset link. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <h2>Forgot Password</h2>
            <p className="text-center mt-3">Enter your email to reset your password</p>

            {message && (
                <div className="success-message">
                    {message}
                </div>
            )}
            {error && (
                <div className="error-message">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Email Address</label>
                    <input
                        type="email"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <button 
                    type="submit" 
                    className="btn btn-primary btn-block mt-3"
                    disabled={isLoading}
                >
                    {isLoading ? 'Sending...' : 'Send Reset Link'}
                </button>
            </form>

            <div className="text-center mt-3">
                <Link to="/login" className="link-text">Back to Login</Link>
            </div>
        </div>
    );
};

export default ForgotPassword;
