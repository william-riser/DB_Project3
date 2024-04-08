import React, { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';

const AddScoutingReport = () =>{
    const [searchParams] = useSearchParams();
    const searchTerm = searchParams.get("id");
    const [playerData, setPlayerData] = useState([]);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        player_id: '',
        strengths: '',
        weaknesses: '',
        notes: '',
      });
    
    formData.player_id = searchTerm;

    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.post('http://localhost:3001/addScoutingReport', formData);
        navigate(`/playerCard?id=${searchTerm}`);
        console.log(response.data);
      } catch (error) {
        console.error('Error adding stat:', error.message);
        }
    };


    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await axios.get(`http://localhost:3001/players/${searchTerm}`);
                setPlayerData(result.data.data[0]); 
                console.log("API Response:", result.data.data); 
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
      }, []);



      return (
        <div className="max-w-md mx-auto mt-8 p-8 bg-gray-100 rounded-lg shadow-xl">
      <form onSubmit={handleSubmit} className="space-y-6">
        <h1 className='text-3xl font-bold text-gray-800 mb-4'>{playerData.name}</h1>
        <h2 className="text-2xl font-bold text-gray-600 mb-4">Add Scouting Report</h2>

        <div className="flex flex-col">
          <label className="block mb-1 text-sm font-medium text-gray-700">
             Strengths:
          </label>
          <input
            type="text"
            name="strengths"
            value={formData.strengths}
            onChange={handleChange}
            className="form-input px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="flex flex-col">
            <label className="block mb-1 text-sm font-medium text-gray-700">
               Weaknesses:
            </label>
            <input
              type="text"
              name="weaknesses"
              value={formData.weaknesses}
              onChange={handleChange}
              className="form-input px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            </div>

            <div className="flex flex-col">
                <label className="block mb-1 text-sm font-medium text-gray-700">
                   Notes:
                </label>
                <input
                  type="text"
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  className="form-input px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
            </div>

          <button
          type="submit"
          className="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Add Report
        </button>
      </form>
    </div>
  );
};

export default AddScoutingReport;