// RegisterPage.js
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; 
import './RegisterPage.css';


function RegisterPage() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate(); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }
        
        // Send the user data to the backend for registration
        try {
            const response = await fetch("http://localhost:4000/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ username, email, password })
            });
    
            const data = await response.json();
            if (data.error) {
                alert(data.error);
            } else {
                console.log("User registered successfully!");
                navigate('/login'); // <-- Redirect to login page
            }
        } catch (error) {
            console.error("Error registering user:", error);
        }
    };
    
    

    return (
        <div className="register-form-container">
            <form onSubmit={handleSubmit}>
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
                    <label htmlFor="email">Email:</label>
                    <input 
                        type="email" 
                        id="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        placeholder="Enter your email" 
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
                <div className="input-group">
                    <label htmlFor="confirmPassword">Confirm Password:</label>
                    <input 
                        type="password" 
                        id="confirmPassword" 
                        value={confirmPassword} 
                        onChange={(e) => setConfirmPassword(e.target.value)} 
                        placeholder="Confirm your password" 
                        required 
                    />
                </div>
                <button type="submit">Register</button>
            

            <div className="login-link-container">
            Already have an account? <Link to="/login">Login</Link>
        </div>
        </form>
    </div>
    
    );
}

export default RegisterPage;



