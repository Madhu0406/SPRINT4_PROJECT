import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { register } from '../../features/auth/authSlice';
import { useNavigate, Link } from 'react-router-dom';
import '../../styles/auth.css';

const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: ''
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    dispatch(register(form))
      .unwrap()
      .then(() => {
        setLoading(false);
        navigate('/login');
      })
      .catch((err) => {
        setLoading(false);
        if (err && err.response && err.response.data && err.response.data.message) {
          setErrorMsg(err.response.data.message);
        } else if (err && err.message) {
          setErrorMsg(err.message);
        } else {
          setErrorMsg('Registration failed. Please try again.');
        }
      });
  };

  return (
    <div className="auth-container">
      <form className="auth-form animated-fade-in-up" onSubmit={handleSubmit}>
        <h2>Create your account</h2>
        <input name="firstName" placeholder="First Name" required value={form.firstName} onChange={handleChange} />
        <input name="lastName" placeholder="Last Name" required value={form.lastName} onChange={handleChange} />
        <input type="email" name="email" placeholder="Email" required value={form.email} onChange={handleChange} />
        <input name="phoneNumber" placeholder="Phone Number" required value={form.phoneNumber} onChange={handleChange} />
        <input type="password" name="password" placeholder="Password" required value={form.password} onChange={handleChange} />
        <input type="password" name="confirmPassword" placeholder="Confirm Password" required value={form.confirmPassword} onChange={handleChange} />
        <button type="submit" disabled={loading}>{loading ? 'Registering...' : 'Register'}</button>
        {errorMsg && <div className="auth-error">{errorMsg}</div>}
        <div className="auth-footer">
          <span>Already have an account? </span>
          <Link to="/login">Login</Link>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;
