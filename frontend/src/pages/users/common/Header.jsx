import React from 'react'
import { useNavigate } from 'react-router-dom';

export const Header = () => {
    const navigate = useNavigate();
    const handleHomeClick = () => {
        navigate('/');
    };
    const handleBecomeAnInstructorClick = () => {
        navigate('/student/become_an_instructor');
    };
    return (
        <header className="bg-gradient-to-r from-blue-500 to-gray-500 p-4">
            <nav className="flex items-center">
                <ul className="flex space-x-8">
                    <li><a onClick={handleHomeClick} className="text-white cursor-pointer hover:text-gray-300">Home</a></li>
                    <li><a href="#" className="text-white hover:text-gray-300">Courses</a></li>
                    <li><a href="#" className="text-white hover:text-gray-300">About</a></li>
                    <li><a href="#" className="text-white hover:text-gray-300">Contact</a></li>
                    <li><a onClick={handleBecomeAnInstructorClick}  className="text-white cursor-pointer hover:text-gray-300">Become an Instructor</a></li>
                </ul>
            </nav>
        </header>
    )
}
