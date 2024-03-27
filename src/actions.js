import { HttpError } from 'wasp/server'

export const createGame = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };
  const teamA = await context.entities.Team.create({
    data: { name: args.teamAName, code: Math.random().toString(36).substring(7) }
  });
  const teamB = await context.entities.Team.create({
    data: { name: args.teamBName, code: Math.random().toString(36).substring(7) }
  });
  const game = await context.entities.Game.create({
    data: {
      teamA: { connect: { id: teamA.id } },
      teamB: { connect: { id: teamB.id } },
      currentPickBan: 0
    }
  });
  return game;
}

export const joinGame = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };
  const { teamCode } = args;
  const user = await context.entities.User.findUnique({
    where: { id: context.user.id }
  });
  const team = await context.entities.Team.findUnique({
    where: { code: teamCode }
  });
  if (!team) { throw new HttpError(404, 'Team not found') };
  const game = await context.entities.Game.create({
    data: {
      teamA: { connect: { id: team.id } },
      teamB: { connect: { id: user.teamId } }
    }
  });
  return game;
}

export const pickBanMap = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  const game = await context.entities.Game.findUnique({
    where: { id: args.gameId }
  });

  // Logic for allowing team to pick or ban map based on current pick/ban order.

  return /* Return updated game object after pick/ban */;
}