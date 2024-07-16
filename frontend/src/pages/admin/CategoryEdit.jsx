import React, { useState } from 'react';
import { SideBar } from './common/SideBar';
import Header from '../instructor/common/Header';

export const CategoryEdit = () => {
  // Example: Initial category data (replace with actual data or fetch from API)
  const initialCategory = {
    id: 1,
    name: 'Category 1',
    details: 'Details about Category 1',
  };

  // State to manage form inputs
  const [category, setCategory] = useState(initialCategory);

  // Event handler for input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategory((prevCategory) => ({
      ...prevCategory,
      [name]: value,
    }));
  };

  // Event handler for form submission (save changes)
  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement logic to save changes (e.g., API call)
    console.log('Updated category:', category);
    // Reset form or perform any other necessary actions
  };

  return (
    <div className="flex">
      <SideBar />
      <div className="flex-grow flex flex-col">
        <Header />
        <div className="p-6 bg-blue-gray-100">
          <h2 className="text-xl font-bold mb-4">Edit Category</h2>
          <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6">
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Category Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={category.name}
                onChange={handleChange}
                className="mt-1 block w-1/2 px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="details" className="block text-sm font-medium text-gray-700">
                Category Details
              </label>
              <textarea
                id="details"
                name="details"
                value={category.details}
                onChange={handleChange}
                rows="6" // Adjust rows based on desired height
                className="mt-1 block w-1/2 px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring-blue-500 sm:text-sm resize-y"
              />
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
