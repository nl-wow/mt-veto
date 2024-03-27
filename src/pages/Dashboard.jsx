import React from 'react';
import { useQuery, useAction, pickBanMap, getGame } from 'wasp/client/operations';
import { Link } from 'react-router-dom';

const DashboardPage = () => {
  const { data: game, isLoading, error } = useQuery(getGame, { id: 1 });
  const pickBanMapFn = useAction(pickBanMap);

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  return (
    <div className='p-4'>
      <h1>Game Details:</h1>
      <p>Team A: {game.teamA.name}</p>
      <p>Team B: {game.teamB.name}</p>
      <p>Current Pick/Ban: {game.currentPickBan}</p>
      <button onClick={() => pickBanMapFn({ gameId: game.id, action: 'ban', map: 'Fall' })}>Ban Fall</button>
      <button onClick={() => pickBanMapFn({ gameId: game.id, action: 'pick', map: 'Rise' })}>Pick Rise</button>
      <Link to={`/team/${game.teamA.code}`} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Team A Details</Link>
      <Link to={`/team/${game.teamB.code}`} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2'>Team B Details</Link>
    </div>
  );
}

export default DashboardPage;