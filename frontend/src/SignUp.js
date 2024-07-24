import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';

const SignUp = () => {
    const [form, setForm] = useState({ username: '', password: '', email: '' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:9090/api/auth/signup', form);
            if (response.status === 200) {
                alert('Sign-up successful. Please log in.');
                navigate('/login');
            } else {
                alert('Sign-up failed.');
            }
        } catch (error) {
            console.error('Error during sign-up:', error);
        }
    };

    return (
        <div>
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="username" value={form.username} onChange={handleChange} placeholder="Username" required />
                <input type="password" name="password" value={form.password} onChange={handleChange} placeholder="Password" required />
                <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="Email" required />
                <button type="submit">Sign Up</button>
            </form>
            <p>Already have an account? <Link to="/login">Login</Link></p>
        </div>
    );
};

export default SignUp;
