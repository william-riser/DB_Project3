import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



const DraftBoardViewer = () => {
    const [searchParams] = useSearchParams();
    const searchTerm = searchParams.get("id");
    const navigate = useNavigate();
    const [boardData, setBoardData] = useState([]);
    const [pickData, setPickData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await axios.get(`http://localhost:3001/draftBoards/${searchTerm}`);
                console.log("API Response:", result.data.data);
                setBoardData(result.data.data[0]);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }
    , []);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const result = await axios.get(`http://localhost:3001/draftPicks/${searchTerm}`);
            console.log("API Response:", result.data.data);
            setPickData(result.data.data);
          } catch (error) {
            console.error(error);
          }
        };
        fetchData();
      }, []);
    



    return (
        <div className='container mx-auto p-4'>  
            <a href="/" className='bg-orange-600 hover:bg-orange-800 text-white font-bold py-2 px-4 rounded-full inline-block m-3'>Home</a>
            <h1 className="text-3xl font-bold mb-6">{boardData.name}</h1>

            <div> 
                {pickData.map((pick) => (
                <div key={pick.pick_number} className="bg-gray-100 p-6 rounded-lg shadow-md mb-4">
                    <div className="flex items-center justify-between mb-4"> 
                        <h3 className="text-xl font-semibold">Pick #: {pick.pick_number}</h3>
                        <span className="text-gray-500 text-sm font-medium">{pick.team}</span> 
                    </div>
                    <p className="text-lg font-medium mb-2">{pick.name}</p> 
                </div>
                ))}
            </div>
        </div>
    );
};

export default DraftBoardViewer;