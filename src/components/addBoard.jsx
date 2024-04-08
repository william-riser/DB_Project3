import React, { useState } from 'react';


const AddBoard = () => {
    const [boardInfo, setBoardInfo] = useState([]);
    const [pickInfo, setPickInfo] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/addDraftBoard', boardInfo);
            console.log(response.data);
            for (let i = 0; i < pickInfo.length; i++) {
                const response2 = await axios.post('http://localhost:3001/addDraftPick', pickInfo[i]);
            }
        } catch (error) {
            console.error('Error adding board:', error.message);
        }
    }

    return (
        <div>
            <h1>Add Board</h1>
        </div>
    )
};

export default AddBoard;