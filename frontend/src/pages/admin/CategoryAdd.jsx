import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { SideBar } from './common/SideBar';
import Header from '../instructor/common/Header';

export const CategoryAdd = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/admin_panel/admin_api/categories/');
        console.log(response.data);  // Log the response data
        if (Array.isArray(response.data)) {
          setCategories(response.data);
        } else {
          throw new Error('Unexpected response format');
        }
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const toggleCategoryStatus = async (category) => {
    try {
      const updatedCategories = categories.map(cat =>
        cat.id === category.id ? { ...cat, active: !cat.active } : cat
      );
      setCategories(updatedCategories);

      // Simulate updating backend with batch update or handle directly if supported
      console.log(`Category with ID ${category.id} ${!category.active ? 'activated' : 'deactivated'}.`);
    } catch (err) {
      console.error('Error toggling category status:', err);
      // Optionally handle errors, such as displaying an error message
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const handleEditCategory = (categoryId) => {
    // Logic to handle edit action (e.g., navigate to edit page or modal)
    console.log(`Editing category with ID: ${categoryId}`);
  };

  return (
    <div className="flex">
      <SideBar />
      <div className="flex-grow flex flex-col">
        <Header />
        <div className="p-6 bg-blue-gray-100">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Category List</h2>
            <button
              type="button"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            >
              Add Category
            </button>
          </div>
          <div className="overflow-hidden bg-white shadow sm:rounded-lg">
            <ul className="divide-y divide-gray-200">
              {categories.map((category) => (
                <li key={category.id} className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 rounded-md bg-blue-500 text-white flex items-center justify-center">
                        {category.id}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{category.name}</div>
                      </div>
                    </div>
                    <div className="ml-4 flex-shrink-0 space-x-2">
                      <button
                        type="button"
                        onClick={() => handleEditCategory(category.id)}
                        className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded-md text-blue-600 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => toggleCategoryStatus(category)}
                        className={`inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded-md ${
                          category.active
                            ? 'text-green-700 bg-green-100 hover:bg-green-200 focus:ring-green-500'
                            : 'text-blue-600 bg-blue-100 hover:bg-blue-200 focus:ring-blue-500'
                        } focus:outline-none focus:ring-2 focus:ring-offset-2`}
                      >
                        {category.active ? 'Deactivate' : 'Activate'}
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
