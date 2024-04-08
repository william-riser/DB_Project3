import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';



const AddPlayer = () =>{
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        school_id: '',
        name: '',
        age: '',
        height: '',
        weight: '',
        position: '',
      });
    
      const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
          const response = await axios.post('http://localhost:3001/addPlayer', formData);
            navigate('/');
          console.log(response.data);
        } catch (error) {
          console.error('Error adding player:', error.message);
        }
      };
    
      return (
        <div className="max-w-md mx-auto mt-8 p-8 bg-gray-100 rounded-lg shadow-xl">
      <form onSubmit={handleSubmit} className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Add Player</h2>

        <div className="flex flex-col">
          <label className="block mb-1 text-sm font-medium text-gray-700">
            School ID:
          </label>
          <input
            type="text"
            name="school_id"
            value={formData.school_id}
            onChange={handleChange}
            className="form-input px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="flex flex-col">
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Name:
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="form-input px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </ div>
    
        <div className="flex flex-col">
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Age:
          </label>
          <input
            type="text"
            name="age"
            value={formData.age}
            onChange={handleChange}
            className="form-input px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

        <div className="flex flex-col">
            <label className="block mb-1 text-sm font-medium text-gray-700">
                Height (in inches):
            </label>
            <input
                type="text"
                name="height"
                value={formData.height}
                onChange={handleChange}
                className="form-input px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
        </div>

        <div className="flex flex-col">
            <label className="block mb-1 text-sm font-medium text-gray-700">
                Weight:
            </label>
            <input
                type="text"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                className="form-input px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
        </div>

        <div className="flex flex-col">
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Position:
          </label>
          <input
            type="text"
            name="position"
            value={formData.position}
            onChange={handleChange}
            className="form-input px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <button
          type="submit"
          className="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Add Player
        </button>
      </form>
    </div>
  );
};

export default AddPlayer;