import React, { useState, useEffect } from 'react'; 
import { useNavigate, Link } from 'react-router-dom';
import './LoginPage.css';
import { useAuth } from '../../contexts/authcontext';

function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');
    const { logIn, isLoggedIn } = useAuth();

    useEffect(() => {
        if (isLoggedIn) {
            navigate('/profile');
        }
    }, [isLoggedIn, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage(''); // Reset error message on new submission
    
        try {
            const response = await fetch("http://localhost:4000/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ username, password })
            });
    
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
        
            const data = await response.json();
            if (data.error) {
                // Set a user-friendly error message
                setErrorMessage('Username or password is incorrect');
            } else {
                logIn();
                localStorage.setItem('token', data.token);  // Store the token
                navigate('/profile');
            }
            
        } catch (error) {
            console.error("Error logging in:", error);
            setErrorMessage('Incorrect username or password');
        }
    };
    
    return (
        <div className="login-form-container">
            <form onSubmit={handleSubmit}>
            {errorMessage && <div className="error-message">{errorMessage}</div>}
   
                <div className="input-group">
                    <label htmlFor="username">Username:</label>
                    <input 
                        type="text" 
                        id="username" 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                        placeholder="Enter your username" 
                        required 
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="password">Password:</label>
                    <input 
                        type="password" 
                        id="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        placeholder="Enter your password" 
                        required 
                    />
                </div>
                <button type="submit">Login</button>
                <div className="register-link-container">
                    Don't have an account? <Link to="/register">Register</Link>
                </div>
            </form>
        </div>
        
    );
}

export default LoginPage;




