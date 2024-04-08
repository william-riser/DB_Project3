import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const PlayerCard = () => {
    const [searchParams] = useSearchParams();
    const searchTerm = searchParams.get("id");
    const navigate = useNavigate();

    const [playerData, setPlayerData] = useState([]); 
    const [statData, setStatData] = useState([]);
    const [scoutingReport, setScoutingReport] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const playerID = parseInt(searchTerm);
                const result = await axios.get(`http://localhost:3001/players/${playerID}`);
                setPlayerData(result.data.data[0]); 
                console.log("API Response:", result.data.data); 
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const playerID = parseInt(searchTerm);
                const result = await axios.get(`http://localhost:3001/stats/player/${playerID}`);
                setStatData(result.data.data);
                console.log("Stat Data:", statData);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const playerID = parseInt(searchTerm);
                const result = await axios.get(`http://localhost:3001/scoutingReport/player/${playerID}`);
                setScoutingReport(result.data.data);
                console.log("Scouting Report:", scoutingReport);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);

    function convertHeight(heightInInches) {
        const feet = Math.floor(heightInInches / 12);
        const inches = heightInInches % 12; 
        return `${feet}' ${inches}"`;
    }

    const handleDelete = async () => {
        try {
            const result = await axios.delete(`http://localhost:3001/players/${searchTerm}`);
            console.log('Player deleted:', result.data);
            navigate('/');
          // Handle success, e.g., redirect to the player list or show a success message
        } catch (error) {
          console.error('Error deleting player:', error.message);
          // Handle error, e.g., show an error message to the user
        }
      };

    const statClick =() => {
        navigate(`/addStat?id=${searchTerm}`);
    }
    
    const scoutingReportClick = () => {
        navigate(`/addScoutingReport?id=${searchTerm}`);
    }
    

  return (
    <div className='container mx-auto p-6 bg-gradient-to-br from-gray-100 to-gray-200'> 
            <div className='fflex items-center justify-between gap-4 mb-4'> 
                <a href="/" className='bg-orange-600 hover:bg-orange-800 text-white font-bold py-3 px-6 rounded-full order-1'>Home</a>
                <button
                    onClick={handleDelete}
                    className="btn-danger bg-red-700 text-white font-bold py-3 px-6 rounded-full hover:bg-red-900 focus:outline-none focus:shadow-outline-red active:bg-red-800 order-2"
                >
                    Delete Player
                </button>
            </div>

            <div className='player-profile flex flex-col md:flex-row gap-6 mt-6 hover:shadow-3xl'> 
                <div className='player-info w-full md:w-1/2 bg-gray-100 p-6 rounded-lg shadow-md'> 
                    <h1 className='text-4xl font-black mb-4'>{playerData.name}</h1>
                    <div className='player-stats grid grid-cols-2 gap-4'>
                        <div className='text-lg'>
                            <span className='font-semibold'>Age:</span> {playerData.age}
                        </div>
                        <div className='text-lg'>
                            <span className='font-semibold'>Height:</span> {convertHeight(playerData.height)}
                        </div>
                        <div className='text-lg'>
                            <span className='font-semibold'>Position:</span> {playerData.position}
                        </div>
                        <div className='text-lg'>
                            <span className='font-semibold'>Weight:</span> {playerData.weight} lbs
                            </div>
                    </div>
                </div> 

                <div className='stats-section w-full md:w-1/2 mt-6 md:mt-0'> 
                    <div className='flex justify-between items-center mb-4'>
                        <h2 className='text-2xl font-bold text-orange-700'>Stats</h2> 
                        <button
                            onClick={statClick}
                            className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-3 px-6 rounded-full focus:outline-none focus:shadow-outline-blue active:bg-orange-800 transition-colors duration-200"
                        > 
                            Add Stat
                        </button>
                    </div>
                    {statData.map((item) => (
                        <div className="card bg-gradient-to-r from-orange-200 to-orange-300 p-4 rounded-md shadow-xl mt-2 transition-all duration-200 hover:shadow-2xl" key={item.stat_id}> 
                            <p className="font-medium text-gray-700">Type: {item.type}</p> 
                            <p className="text-gray-600">Count: {item.count}</p>
                            <p className="text-gray-600">Season {item.season}</p>
                        </div>
                    ))}

<div className='flex justify-between items-center mt-6'>
                        <h2 className='text-2xl font-bold text-orange-700'>Scouting Reports</h2>
                        <button
                            onClick={scoutingReportClick}
                            className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-3 px-6 rounded-full focus:outline-none focus:shadow-outline-blue active:bg-orange-800 transition-colors duration-200"
                        > 
                            Add Scouting Report
                        </button>
                    </div>
                    {scoutingReport.map((item) => (
                        <div className="card bg-gradient-to-r from-orange-200 to-orange-300 p-4 rounded-md shadow-xl mt-2 transition-all duration-200 hover:shadow-2xl" key={item.scoutingReport_id}> 
                            <p className="font-medium text-gray-700">Strengths: {item.strengths}</p> 
                            <p className="text-gray-600">Weaknesses: {item.weaknesses}</p>
                            <p className="text-gray-600">Notes: {item.notes}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
  );
};

export default PlayerCard;
