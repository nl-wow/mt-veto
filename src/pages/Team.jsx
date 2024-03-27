import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery, useAction, getGame, getTeam, joinGame, pickBanMap } from 'wasp/client/operations';

const TeamPage = () => {
  const { code } = useParams();
  const { data: game, isLoading, error } = useQuery(getGame, { id: code });
  const { data: team } = useQuery(getTeam, { code });
  const joinGameFn = useAction(joinGame);
  const pickBanMapFn = useAction(pickBanMap);

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  const handleJoinGame = () => {
    joinGameFn({ teamCode: code });
  };

  const handlePickBanMap = (gameId) => {
    pickBanMapFn({ gameId });
  };

  return (
    <div className='p-4'>
      <h1 className='text-2xl font-bold mb-4'>Team Page</h1>
      <div className='mb-4'>
        <h2 className='text-xl font-bold'>Game Details</h2>
        <p>Game ID: {game.id}</p>
        <p>Team A: {game.teamA.name}</p>
        <p>Team B: {game.teamB.name}</p>
      </div>
      <div className='mb-4'>
        <h2 className='text-xl font-bold'>Team Details</h2>
        <p>Team Name: {team.name}</p>
        <p>Team Code: {team.code}</p>
      </div>
      <button onClick={handleJoinGame} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Join Game</button>
      <button onClick={() => handlePickBanMap(game.id)} className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-2'>Pick/Ban Map</button>
    </div>
  );
}

export default TeamPage;