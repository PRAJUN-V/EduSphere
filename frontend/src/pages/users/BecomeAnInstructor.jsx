import React, { useState } from 'react';
import axios from 'axios';
import { Header } from './common/Header';
import { SubHeader } from './common/SubHeader';

export const BecomeAnInstructor = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [currentProfession, setCurrentProfession] = useState('');
  const [skills, setSkills] = useState('');
  const [documentNames, setDocumentNames] = useState('');
  const [documents, setDocuments] = useState([]);

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  const handleCurrentProfessionChange = (e) => {
    setCurrentProfession(e.target.value);
  };

  const handleSkillsChange = (e) => {
    setSkills(e.target.value);
  };

  const handleDocumentNamesChange = (e) => {
    setDocumentNames(e.target.value);
  };

  const handleDocumentUpload = (e) => {
    const files = Array.from(e.target.files);
    setDocuments([...documents, ...files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('first_name', firstName);
      formData.append('last_name', lastName);
      formData.append('current_profession', currentProfession);
      formData.append('skills', skills);
      formData.append('document_names', documentNames);
      documents.forEach((file, index) => {
        formData.append(`document_${index + 1}`, file);
      });

      const response = await axios.post('http://localhost:8000/instructor/admin_api/instructors/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log('Submitted:', response.data);

      // Reset form fields
      setFirstName('');
      setLastName('');
      setCurrentProfession('');
      setSkills('');
      setDocumentNames('');
      setDocuments([]);
    } catch (error) {
      console.error('Error submitting form:', error);
      // Handle error
    }
  };

  return (
    <>
      <Header />
      <SubHeader />

      <div className="min-h-screen flex items-center justify-center bg-blue-gray-100">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-xl font-bold mb-4 text-center">Become an Instructor</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                First Name
              </label>
              <input
                id="firstName"
                type="text"
                value={firstName}
                onChange={handleFirstNameChange}
                className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                required
              />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                Last Name
              </label>
              <input
                id="lastName"
                type="text"
                value={lastName}
                onChange={handleLastNameChange}
                className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                required
              />
            </div>
            <div>
              <label htmlFor="currentProfession" className="block text-sm font-medium text-gray-700">
                Current Profession
              </label>
              <input
                id="currentProfession"
                type="text"
                value={currentProfession}
                onChange={handleCurrentProfessionChange}
                className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                required
              />
            </div>
            <div>
              <label htmlFor="skills" className="block text-sm font-medium text-gray-700">
                Skills
              </label>
              <input
                id="skills"
                type="text"
                value={skills}
                onChange={handleSkillsChange}
                className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                required
              />
              <p className="text-xs text-gray-500">Separate skills with commas (e.g., Python, Finance)</p>
            </div>
            <div>
              <label htmlFor="documentNames" className="block text-sm font-medium text-gray-700">
                Document Names
              </label>
              <input
                id="documentNames"
                type="text"
                value={documentNames}
                onChange={handleDocumentNamesChange}
                className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                required
              />
              <p className="text-xs text-gray-500">Separate document names with commas (e.g., Certificate of Eligibility, CV)</p>
            </div>
            <div>
              <label htmlFor="documents" className="block text-sm font-medium text-gray-700">
                Upload Documents
              </label>
              <input
                id="documents"
                type="file"
                onChange={handleDocumentUpload}
                multiple
                className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                required
              />
              <p className="text-xs text-gray-500">You can upload multiple documents.</p>
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default BecomeAnInstructor;
