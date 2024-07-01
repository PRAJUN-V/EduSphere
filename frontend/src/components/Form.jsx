import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api';
import { ACCESS_TOKEN, REFREST_TOKEN } from '../constants';

export const Form = ({ route, method }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const name = method === "login" ? "Login" : "Register";

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();

        try {
            const res = await api.post(route, { username, password });
            if (method === 'login') {
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFREST_TOKEN, res.data.refresh);
                navigate("/");
            } else {
                navigate("/login");
            }
        } catch (error) {
            alert(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex font-poppins items-center justify-center h-screen w-screen dark:bg-gray-900">
            <div className="grid gap-8">
                <div id="back-div" className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-[26px] m-4">
                    <div className="border-[20px] border-transparent rounded-[20px] dark:bg-gray-900 bg-white shadow-lg xl:p-10 2xl:p-10 lg:p-10 md:p-10 sm:p-2 m-2">
                        <form onSubmit={handleSubmit} className="max-w-md mx-auto p-8 bg-white shadow-md rounded-lg">
                            <h1 className="text-2xl font-bold mb-6 text-center">{name}</h1>

                            <input
                                className="form-input w-full mb-4 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Username"
                                required
                            />

                            <input
                                className="form-input w-full mb-6 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password"
                                required
                            />

                            <button
                                className="form-button w-full py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-300"
                                type="submit"
                                disabled={loading}
                            >
                                {name}
                            </button>
                        </form>
                        <div className="flex flex-col mt-4 items-center justify-center text-sm">
                            {name === 'Login' ? (
                                <h3 className="dark:text-gray-300">
                                    Don't have an account?
                                    <Link className="group text-blue-400 transition-all duration-100 ease-in-out" to="/register">
                                        <span className="bg-left-bottom bg-gradient-to-r from-blue-400 to-blue-400 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out">
                                            Sign Up
                                        </span>
                                    </Link>
                                </h3>
                            ) : (
                                <h3 className="dark:text-gray-300">
                                    Already have an account?
                                    <Link className="group text-blue-400 transition-all duration-100 ease-in-out" to="/login">
                                        <span className="bg-left-bottom bg-gradient-to-r from-blue-400 to-blue-400 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out">
                                            Sign In
                                        </span>
                                    </Link>
                                </h3>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
