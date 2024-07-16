import React from 'react';
import { Link } from 'react-router-dom'; 
import logo from '../../../images/Logo2.png';
import { Home, List, Layers, Users, Book, LogOut } from 'react-feather'; // Import icons from Feather Icons

export const SideBar = () => {
    return (
        <div className="bg-blue-500 text-white h-screen w-64">
            {/* Logo and Name */}
            <div className="flex items-center justify-center p-0">
                <img src={logo} alt="Logo" className="h-20 mr-2" />
                <span className="text-xl font-bold">EduSphere</span>
            </div>

            <div className="border-t border-white my-2"></div>

            {/* Admin Panel Text */}
            <div className="text-center py-4">
                <span className="text-xl font-semibold">EduSphere Admin</span>
            </div>

            <div className="border-t border-white my-2"></div>

            {/* Navigation Links */}
            <nav>
                <ul className="space-y-2">
                    <li>
                        <Link to="/admin/dashboard" className="block py-2 px-4 hover:bg-blue-600">
                            <Home className="inline-block mr-2" /> Dashboard
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/category_add" className="block py-2 px-4 hover:bg-blue-600">
                            <List className="inline-block mr-2" /> Categories
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/request_to_become_instructor" className="block py-2 px-4 hover:bg-blue-600">
                            <Layers className="inline-block mr-2" /> Requests
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/instructors" className="block py-2 px-4 hover:bg-blue-600">
                            <Users className="inline-block mr-2" /> Instructors
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/courses" className="block py-2 px-4 hover:bg-blue-600">
                            <Book className="inline-block mr-2" /> Courses
                        </Link>
                    </li>
                    <li>
                        <Link to="/logout" className="block py-2  px-4 hover:bg-blue-600">
                            <LogOut className="inline-block mr-2" /> Log Out
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    )
}
