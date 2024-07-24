import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';

// Create an Axios instance with default configuration
const axiosInstance = axios.create({
    baseURL: 'http://localhost:9090/api/',
    timeout: 10000, // Optional: Set a timeout if needed
});

const Login = () => {
    const [form, setForm] = useState({ username: '', password: '' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosInstance.post('auth/signin', form);
            if (response.status === 200) {
                const token = response.data.token;
                console.log('Received JWT Token:', token); // Ensure this logs the token
                localStorage.setItem('jwtToken', token);
                axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                navigate('/track');
            } else {
                alert('Login failed.');
            }
        } catch (error) {
            console.error('Error during login:', error);
            alert('Error during login. Please check your credentials and try again.');
        }
    };



    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="username"
                    value={form.username}
                    onChange={handleChange}
                    placeholder="Username"
                    required
                />
                <input
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Password"
                    required
                />
                <button type="submit">Login</button>
            </form>
            <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
        </div>
    );
};

export default Login;
