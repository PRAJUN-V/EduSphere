import React from 'react';
import { useSelector } from 'react-redux';
import { Header } from './common/Header';
import { SubHeader } from './common/SubHeader';
import Footer from './common/Footer';
import { Navigate } from 'react-router-dom';
import api from '../../api';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

export const Profile = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);

    const handleInputChange = (event) => {
        // Implement input change handling if needed
        // Example: console.log(event.target.value);
    };

    console.log(user.profile_picture);

    return (
        <>
            <Header />
            <SubHeader />
            <div className="min-h-screen bg-gray-100 pb-4">
                {/* Top portion with light blue background */}
                <div className="bg-blue-100 py-4">
                    {/* Centered container for user profile */}
                    <div className="max-w-screen-lg mx-auto bg-white rounded-lg shadow-lg px-6 py-4 relative">
                        {/* Profile content */}
                        <div className="flex items-center space-x-4">
                            <img
                                className="h-30 w-30 rounded-full"
                                src="https://randomuser.me/api/portraits/men/81.jpg"
                                alt="User Profile"
                            />
                            <div>
                                <h2 className="text-lg font-bold text-gray-800">{user.first_name} {user.last_name}</h2>
                                {/* <p className="text-sm text-gray-600">UI/UX Designer</p> */}
                            </div>
                        </div>

                        {/* Button to become a teacher */}
                        {/* <button onClick={handleBecomeInstructor} className="absolute font-bold top-1/2 transform -translate-y-1/2 right-0 bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-6 me-12 rounded-lg text-sm">
                            Become a Teacher
                        </button> */}
                    </div>
                </div>

                {/* Account Settings section */}
                <div className="max-w-screen-lg mx-auto mt-4 bg-white rounded-lg shadow-lg px-12 py-12">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Account Settings</h3>
                    <form>
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                            <input
                                type="text"
                                defaultValue={user.username}  // Use defaultValue instead of value
                                id="name"
                                className="mt-1 block w-1/2 sm:w-1/3 border-gray-300 rounded-md shadow-sm focus:outline-none sm:text-lg"
                                onChange={handleInputChange}  // Add onChange handler if needed
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                type="email"
                                defaultValue={user.email}  // Use defaultValue instead of value
                                id="email"
                                className="mt-1 block w-1/2 sm:w-1/3 border-gray-300 rounded-md shadow-sm focus:outline-none sm:text-lg"
                                onChange={handleInputChange}  // Add onChange handler if needed
                            />
                        </div>
                        {/* <div className="mb-4">
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
                            <input
                                type="tel"
                                id="phone"
                                className="mt-1 block w-1/2 sm:w-1/3 border-gray-300 rounded-md shadow-sm focus:outline-none sm:text-lg"
                                onChange={handleInputChange}  // Add onChange handler if needed
                            />
                        </div> */}
                        <div className="flex">
                            <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md text-sm">
                                Save Changes
                            </button>
                        </div>
                    </form>

                    <hr className="my-6 border-gray-300" />

                    {/* Change Password section */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Change Password</h3>
                        <div className="mb-4">
                            <label htmlFor="oldPassword" className="block text-sm font-medium text-gray-700">Old Password</label>
                            <input
                                type="password"
                                id="oldPassword"
                                className="mt-1 block w-1/2 sm:w-1/3 border-gray-300 rounded-md shadow-sm focus:outline-none sm:text-lg"
                                onChange={handleInputChange}  // Add onChange handler if needed
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">New Password</label>
                            <input
                                type="password"
                                id="newPassword"
                                className="mt-1 block w-1/2 sm:w-1/3 border-gray-300 rounded-md shadow-sm focus:outline-none sm:text-lg"
                                onChange={handleInputChange}  // Add onChange handler if needed
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
                            <input
                                type="password"
                                id="confirmPassword"
                                className="mt-1 block w-1/2 sm:w-1/3 border-gray-300 rounded-md shadow-sm focus:outline-none sm:text-lg"
                                onChange={handleInputChange}  // Add onChange handler if needed
                            />
                        </div>
                        <div className="flex">
                            <button type="button" className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md text-sm">
                                Reset Password
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Profile;
