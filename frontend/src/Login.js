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
            console.log('Server response:', response.data); // Log the entire response
            if (response.status === 200) {
                const token = response.data.accessToken; // Ensure correct key is used
                console.log('Received JWT Token:', token); // Log the token
                if (token) {
                    localStorage.setItem('jwtToken', token);
                    console.log('Token stored in localStorage:', localStorage.getItem('jwtToken')); // Verify storage
                    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                    navigate('/track');
                } else {
                    console.error('Token is undefined');
                }
            } else {
                alert('Login failed.');
            }
        } catch (error) {
            console.error('Error during login:', error);
            alert('Error during login. Please check your credentials and try again.');
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.formContainer}>
                <h2 style={styles.heading}>Login</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="username"
                        value={form.username}
                        onChange={handleChange}
                        placeholder="Username"
                        required
                        style={styles.input}
                    />
                    <input
                        type="password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        placeholder="Password"
                        required
                        style={styles.input}
                    />
                    <button type="submit" style={styles.button}>Login</button>
                </form>
                <p style={styles.text}>
                    Don't have an account? <Link to="/signup" style={styles.link}>Sign Up</Link>
                </p>
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f0f0f0',
    },
    formContainer: {
        backgroundColor: '#ffffff',
        padding: '40px',
        borderRadius: '8px',
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
        textAlign: 'center',
    },
    heading: {
        marginBottom: '20px',
        fontSize: '24px',
        color: '#333',
    },
    input: {
        width: '100%',
        padding: '12px',
        marginBottom: '20px',
        borderRadius: '4px',
        border: '1px solid #ccc',
        fontSize: '16px',
    },
    button: {
        width: '100%',
        padding: '12px',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        fontSize: '16px',
        cursor: 'pointer',
    },
    text: {
        marginTop: '20px',
        fontSize: '14px',
        color: '#666',
    },
    link: {
        color: '#007bff',
        textDecoration: 'none',
    }
};

export default Login;
