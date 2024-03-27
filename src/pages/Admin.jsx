import React, { useState } from 'react';
import { useAction, createGame } from 'wasp/client/operations';
import { Link } from 'react-router-dom';

const AdminPage = () => {
  const createGameFn = useAction(createGame);
  const [teamAName, setTeamAName] = useState('');
  const [teamBName, setTeamBName] = useState('');

  const handleCreateGame = () => {
    createGameFn({ teamAName, teamBName });
    setTeamAName('');
    setTeamBName('');
  };

  return (
    <div className='p-4'>
      <input
        type='text'
        placeholder='Team A Name'
        className='px-1 py-2 border rounded text-lg'
        value={teamAName}
        onChange={(e) => setTeamAName(e.target.value)}
      />
      <input
        type='text'
        placeholder='Team B Name'
        className='px-1 py-2 border rounded text-lg'
        value={teamBName}
        onChange={(e) => setTeamBName(e.target.value)}
      />
      <button
        onClick={handleCreateGame}
        className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4'
      >
        Create Game
      </button>
    </div>
  );
}

export default AdminPage;