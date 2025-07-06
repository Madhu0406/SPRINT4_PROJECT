import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import '../../styles/auth.css';

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error } = useSelector(state => state.auth);

  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    setLoading(true);
    dispatch(login(form))
      .unwrap()
      .then(() => {
        setLoading(false);
        navigate('/'); 
      })
      .catch(() => {
        setLoading(false);
      });
  };

  return (
    <div className="auth-container">
      <form className="auth-form animated-fade-in-up" onSubmit={handleSubmit}>
        <h2>Sign in to your account</h2>
        <input type="email" name="email" placeholder="Email" required value={form.email} onChange={handleChange} />
        <input type="password" name="password" placeholder="Password" required value={form.password} onChange={handleChange} />
        <button type="submit" disabled={loading}>{loading ? 'Logging in...' : 'Login'}</button>
        {error && <div className="auth-error">{error}</div>}
      </form>
    </div>
  );
};

export default LoginPage;
