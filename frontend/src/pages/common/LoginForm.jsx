import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../../api';

const LoginForm = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async () => {
        setLoading(true);
        try {
            // Implement your login API call using 'api' service
            const res = await api.post('/login', { username, password });
            if (res.status === 200) {
                toast.success('Login successful.');
                navigate("/dashboard"); // Redirect to dashboard upon successful login
            }
        } catch (error) {
            toast.error('Invalid credentials.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={(e) => e.preventDefault()} className="max-w-md mx-auto p-8 bg-white shadow-md rounded-lg">
            <h1 className="text-2xl font-bold text-gray-600 mb-6 text-center">Login</h1>
            
            <input
                className="form-input w-full mb-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                required
            />

            <input
                className="form-input w-full mb-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
            />

            <button
                className="form-button w-full py-3 bg-gray-500 text-white font-semibold rounded-md hover:bg-blue-500 transition duration-300"
                type="button"
                onClick={handleLogin}
                disabled={loading}
            >
                Login
            </button>

            <div className="flex flex-col mt-4 items-center justify-center text-sm">
                <h3 className="dark:text-gray-300">
                    Don't have an account?
                    <Link className="group text-gray-600 transition-all duration-100 ease-in-out" to="/register">
                        <span className="bg-left-bottom font-bold bg-gradient-to-r from-gray-600 to-gray-600 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out">
                            Sign Up
                        </span>
                    </Link>
                </h3>
            </div>
        </form>
    );
};

export default LoginForm;
