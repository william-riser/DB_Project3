import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const SearchResultsPage = () => {
    const [searchParams] = useSearchParams(); 
    const searchTerm = searchParams.get("name");
    const navigate = useNavigate(); 


    const [playerData, setPlayerData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await axios.get(`http://localhost:3001/players?name=${searchTerm}`);
                setPlayerData(result.data.data); 
                console.log("API Response:", result.data.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);

    const handleAdd = () => {
        navigate('/addPlayer');
    }

    const handleClick = (playerId) => {
        navigate(`/playerCard?id=${playerId}`); 
    };

    return (
        <div className="container mx-auto p-6"> 
            <a href="/" className='bg-orange-600 hover:bg-orange-800 text-white font-bold py-2 px-4 rounded-full inline-block m-3'>Home</a>
            <a href='/addPlayer' className='bg-orange-600 hover:bg-orange-800 text-white font-bold py-2 px-4 rounded-full inline-block m-3'>Add Player</a>
            <h1 className="text-4xl font-bold text-orange-600 mb-4">Search Results</h1>
            <p className="mb-4 px-2 bg-gray-100 rounded-md">Count: {playerData.length}</p>

            <ul className="list-none p-0"> 
                {playerData.map((player) => (
                    <li 
                        key={player.id} 
                        className="mb-4 bg-white shadow-md rounded-lg p-4 cursor-pointer"
                        onClick={() => handleClick(player.player_id)}
                        >

                        <div className="flex items-center"> 
                            <strong className="font-semibold text-lg mr-4">Name:</strong> 
                            <span>{player.name}</span>
                        </div>
                        <div className="flex items-center mt-2">
                            <strong className="font-semibold text-lg mr-4">Age:</strong> 
                            <span>{player.age}</span> 
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );

}
    
export default SearchResultsPage;
      