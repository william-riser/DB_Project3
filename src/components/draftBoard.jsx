import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



const DraftBoard = () => {
    const [draftBoards, setDraftBoards] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {   
        const fetchData = async () => {
            try {
                const result = await axios.get(`http://localhost:3001/draftBoards`);
                console.log("API Response:", result.data.data);
                setDraftBoards(result.data.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }
    , []);

    const handleClick = (draftBoardId) => {
        navigate(`/boardViewer?id=${draftBoardId}`);
    }

    const handleAdd = () => {
        navigate('/addBoard');
    }

    return (
        <div className='p-4'>
            <a href="/" className='bg-orange-600 hover:bg-orange-800 text-white font-bold py-2 px-4 rounded-full inline-block m-3'>Home</a>
            <a onClick={handleAdd} className='bg-orange-600 hover:bg-orange-800 text-white font-bold py-2 px-4 rounded-full inline-block m-3'>Add Board</a>
            <h1 className="text-4xl font-bold text-orange-600 mb-4">Draft Board</h1>
            <p className="mb-4 px-2 bg-gray-100 rounded-md">Count: {draftBoards.length}</p>
            <ul className="list-none p-0">
                {draftBoards.map((draftBoard) => (
                    <li
                        key={draftBoard.id}
                        className="mb-4 bg-white shadow-md rounded-lg p-4 cursor-pointer"
                        onClick={() => handleClick(draftBoard.draft_board_id)}
                    >

                        <div className="flex items-center">
                            <strong className="font-semibold text-lg mr-4">
                                <span>{draftBoard.name}</span>
                            </strong>
                            
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
    };

export default DraftBoard;