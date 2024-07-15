import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../../api';

const RegistrationForm = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("student");
    const [profilePicture, setProfilePicture] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleRegister = async () => {
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append('username', username);
            formData.append('password', password);
            formData.append('email', email);
            formData.append('role', role);
            if (profilePicture) {
                formData.append('profile.profile_picture', profilePicture);
            }

            const res = await api.post('/register', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (res.status === 201) {
                toast.success('Registration successful. Please check your email for OTP.');
                navigate("/verify-otp"); // Redirect to OTP verification
            }
        } catch (error) {
            toast.error('Registration failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={(e) => e.preventDefault()} className="max-w-md mx-auto p-8 bg-white shadow-md rounded-lg">
            <h1 className="text-2xl font-bold text-gray-600 mb-6 text-center">Register</h1>
            
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
                />
            </div>

            <button
                className="form-button w-full py-3 bg-gray-500 text-white font-semibold rounded-md hover:bg-blue-500 transition duration-300"
                type="button"
                onClick={handleRegister}
                disabled={loading}
            >
                Register
            </button>

            <div className="flex flex-col mt-4 items-center justify-center text-sm">
                <h3 className="dark:text-gray-300">
                    Already have an account?
                    <Link className="group text-gray-600 transition-all duration-100 ease-in-out" to="/login">
                        <span className="bg-left-bottom font-bold bg-gradient-to-r from-gray-600 to-gray-600 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out">
                            Sign In
                        </span>
                    </Link>
                </h3>
            </div>
        </form>
    );
};

export default RegistrationForm;
