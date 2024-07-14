import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import api from '../api';
import { ACCESS_TOKEN, REFREST_TOKEN } from '../constants';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Form = ({ route, method }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [profilePicture, setProfilePicture] = useState(null);
    const [role, setRole] = useState("student"); // State for role selection, default to student
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const isLogin = method === "login";
    const formTitle = isLogin ? "Login" : "Register";

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append('username', username);
            formData.append('password', password);
            formData.append('first_name', firstName);
            formData.append('last_name', lastName);
            formData.append('email', email);
            if (profilePicture) {
                formData.append('profile.profile_picture', profilePicture);
            }
            formData.append('role', role); // Append role to form data

            const res = await api.post(route, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (isLogin) {
                const { access, refresh } = res.data;
                localStorage.setItem(ACCESS_TOKEN, access);
                localStorage.setItem(REFREST_TOKEN, refresh);

                const decoded = jwtDecode(access);
                const userRole = decoded.role;

                switch (userRole) {
                    case 'admin':
                        navigate('/admin/dashboard');
                        break;
                    case 'student':
                        navigate('/');
                        break;
                    case 'instructor':
                        navigate('/instructor/dashboard');
                        break;
                    default:
                        navigate('/login');
                        break;
                }
            } else {
                navigate("/login");
            }
        } catch (error) {
            toast.error('Invalid username or password');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex font-poppins items-center justify-center min-h-screen w-screen dark:bg-gray-900">
            <ToastContainer /> {/* ToastContainer for toast notifications */}
            <div className="grid gap-8 overflow-y-auto">
                <div className="border-[20px] border-transparent rounded-[20px] dark:bg-gray-900 bg-white shadow-lg xl:p-10 2xl:p-10 lg:p-10 md:p-10 sm:p-2 m-2">
                    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-8 bg-white shadow-md rounded-lg">
                        <h1 className="text-2xl font-bold text-gray-600 mb-6 text-center">{formTitle}</h1>

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

                        {!isLogin && (
                            <>
                                <input
                                    className="form-input w-full mb-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    type="text"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    placeholder="First Name"
                                    required
                                />

                                <input
                                    className="form-input w-full mb-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    type="text"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    placeholder="Last Name"
                                    required
                                />

                                <input
                                    className="form-input w-full mb-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Email"
                                    required
                                />

                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-1">
                                        Register as :
                                    </label>
                                    <select
                                        className="form-select w-full mb-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        value={role}
                                        onChange={(e) => setRole(e.target.value)}
                                        required
                                    >
                                        <option value="student">Student</option>
                                        <option value="instructor">Instructor</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-gray-700 text-sm font-bold mb-1">
                                        Upload Profile Picture
                                    </label>
                                    <input
                                        className="form-input w-full mb-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        type="file"
                                        onChange={(e) => setProfilePicture(e.target.files[0])}
                                        accept="image/*"
                                        required
                                    />
                                </div>
                            </>
                        )}

                        <button
                            className="form-button w-full py-3 bg-gray-500 text-white font-semibold rounded-md hover:bg-blue-500 transition duration-300"
                            type="submit"
                            disabled={loading}
                        >
                            {formTitle}
                        </button>
                    </form>

                    <div className="flex flex-col mt-4 items-center justify-center text-sm">
                        {isLogin ? (
                            <h3 className="dark:text-gray-300">
                                Don't have an account?
                                <Link className="group text-gray-600 transition-all duration-100 ease-in-out" to="/register">
                                    <span className="bg-left-bottom font-bold bg-gradient-to-r from-gray-600 to-gray-600 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out">
                                        Sign Up
                                    </span>
                                </Link>
                            </h3>
                        ) : (
                            <h3 className="dark:text-gray-300">
                                Already have an account?
                                <Link className="group text-gray-600 transition-all duration-100 ease-in-out" to="/login">
                                    <span className="bg-left-bottom font-bold bg-gradient-to-r from-gray-600 to-gray-600 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out">
                                        Sign In
                                    </span>
                                </Link>
                            </h3>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Form;
