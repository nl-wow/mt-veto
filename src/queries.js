import { HttpError } from 'wasp/server'

export const getGame = async ({ id }, context) => {
  if (!context.user) { throw new HttpError(401) }

  const game = await context.entities.Game.findUnique({
    where: { id },
    include: {
      teamA: true,
      teamB: true
    }
  });

  if (!game) throw new HttpError(404, 'No game with id ' + id);

  return game;
}

export const getTeam = async ({ code }, context) => {
  if (!context.user) { throw new HttpError(401) }

  const team = await context.entities.Team.findUnique({
    where: { code },
    include: {
      User: {
        select: {
          id: true,
          teamId: true
        }
      }
    }
  });

  if (!team) { throw new HttpError(404, 'No team with code ' + code) }

  return team;
}