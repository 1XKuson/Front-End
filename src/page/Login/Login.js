import './Login-m.css';
import googleLogo from './google.png';
import api from '../../api/api.js';
import React, { useState, useReducer, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../../components/Auth/AuthWrapper.js";

const Login = () => {
    const { login } = useAuth();

    const [formData, setFormData] = useReducer((formData, newItem) => {
        return ({ ...formData, ...newItem });
    }, {
        userName: "",
        password: ""
    });

    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState(null);
    const [loginFailed, setLoginFailed] = useState(false); // Track login failure

    const doLogin = async (e) => {
        e.preventDefault(); // Prevent default form submission
    
        try {
            console.log('Attempting login with:', formData.userName, formData.password);
            const response = await login(formData.userName, formData.password);
            console.log('Login successful.');
            navigate("/Personal");
        } catch (error) {
            console.error('Login failed:', error);
            setErrorMessage(error.message || "An error occurred during login.");
            setLoginFailed(true); // Set login failure state to true
            alert("Login failed. Please check your credentials and try again.");
            navigate("/Login");
        }
    };
    

    useEffect(() => {
        console.log('Current path:', window.location.pathname);
    }, [navigate]);

    // Function to clear form fields
    const clearFormFields = () => {
        setFormData({
            userName: "",
            password: ""
        });
    };

    // Function to handle alert on login failure
    const handleLoginFailureAlert = () => {
        if (loginFailed) {
            setLoginFailed(false);
            clearFormFields(); // Remove
        }
    };

    return (
        <>
            <div className="t-Login">
                <h1>เข้าสู่ระบบ</h1>
            </div>
            <div className="login">
                <h2>ยืนยันตัวตนด้วยบริการของ Google</h2>
                <h3>โดยใช้ Email Account ของสถาบันฯ</h3>
                <div className="GoogleLogin">
                    <button className="GoogleCss" onClick={() => { console.log('Google button clicked') }}>
                        <img src={googleLogo} alt="google-logo" />  <span>LOGIN</span>
                    </button>
                </div>
                <h4>หรือ</h4>
                <h2>ยืนยันตัวตนด้วยบริการของสถาบันฯ</h2>

                <form className="form-login" onSubmit={doLogin}>
                    <input value={formData.userName} onChange={(e) => setFormData({ userName: e.target.value })} type="text" />
                    <input value={formData.password} onChange={(e) => setFormData({ password: e.target.value })} type="password" />
                    <input type="submit" value="เข้าสู่ระบบ"></input>
                </form>
            </div>
            {handleLoginFailureAlert()} {/* Render alert */}
        </>
    )
}

export default Login;
