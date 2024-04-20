import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import CustomAlert from './customAlert';

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      setShowAlert(true);
      return;
    }

    try {
      setLoading(true);
      const encodedSearchTerm = encodeURIComponent(searchTerm);
      const response = await axios.get(`http://localhost:3001/players?name=${encodedSearchTerm}`);
      const players = response.data.data;
      if (players.length > 0) {
        navigate(`/searchResults?name=${encodedSearchTerm}`);
      } else {
        // Handle case where no players match the search term
        console.log('No matching players found');
      }
    } catch (error) {
      console.error('Error searching players:', error);
      // Handle error, e.g., show error message to the user
    } finally {
      setLoading(false);
    }
  };

  const closeAlert = () => {
    setShowAlert(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center inset-0 justify-center bg-gray-100 relative" style={{ backgroundImage: "url(/public/bg.jpg)" }}>
      <div className="absolute inset-0 bg-gray-800 opacity-35"></div> 

      {showAlert && (
        <CustomAlert
          message="Please enter a player name."
          onClose={closeAlert}
          className="z-50"
        />
      )}

      <h1 className="text-5xl font-bold text-white mb-8 z-10" >Basketball Scouting</h1>

      <div className="bg-white rounded-lg shadow-md p-6 w-96 z-10">
        <div className="flex items-center">
          <input 
            type="text" 
            placeholder="Player Name..."
            className="flex-grow px-4 py-2 border rounded-l-md focus:outline-none focus:ring-blue-400" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button 
            className="bg-orange-600 px-6 py-2 text-white rounded-r-md hover:bg-orange-700 focus:outline-none"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
                      
        <div className='flex items-center justify-center'>
          <button
            onClick={() => navigate('/draftBoard')}
            className="bg-orange-600 text-white font-bold py-3 px-6 rounded-full hover:bg-orange-700 focus:outline-none focus:shadow-outline-blue active:bg-blue-800 mt-4"
          >
            Draft Boards
          </button>
        </div>
      </div>
    </div>
  );
    }

    export default HomePage;