/**
 * 🏆 IPL Season Points Table
 *
 * IPL ka season chal raha hai aur tujhe points table banana hai!
 * Tujhe match results ka array milega, aur tujhe har team ke points
 * calculate karke sorted table return karna hai.
 *
 * Match result types:
 *   - "win": Winning team gets 2 points, losing team gets 0
 *   - "tie": Both teams get 1 point each
 *   - "no_result": Both teams get 1 point each (rain/bad light)
 *
 * Each match object: { team1: "CSK", team2: "MI", result: "win", winner: "CSK" }
 *   - For "tie" and "no_result", the winner field is absent or ignored
 *
 * Rules (use for loop with object accumulator):
 *   - Loop through matches array
 *   - Build an object accumulator: { "CSK": { team, played, won, lost, tied, noResult, points }, ... }
 *   - After processing all matches, convert to array and sort:
 *     1. By points DESCENDING
 *     2. If points are equal, by team name ASCENDING (alphabetical)
 *
 * Validation:
 *   - Agar matches array nahi hai ya empty hai, return []
 *
 * @param {Array<{team1: string, team2: string, result: string, winner?: string}>} matches
 * @returns {Array<{team: string, played: number, won: number, lost: number, tied: number, noResult: number, points: number}>}
 *
 * @example
 *   iplPointsTable([
 *     { team1: "CSK", team2: "MI", result: "win", winner: "CSK" },
 *     { team1: "RCB", team2: "CSK", result: "tie" },
 *   ])
 *   // CSK: played=2, won=1, tied=1, points=3
 *   // MI: played=1, won=0, lost=1, points=0
 *   // RCB: played=1, tied=1, points=1
 *   // Sorted: CSK(3), RCB(1), MI(0)
 */
export function iplPointsTable(matches) {
  if (!Array.isArray(matches) || matches.length <= 0) return [];
  let matchesDetails = {};
  for (let i = 0; i < matches.length; i++) {
    let currentMatch = matches[i];

    matchesDetails[currentMatch.team1] = matchesDetails[currentMatch.team1] || {};
    matchesDetails[currentMatch.team2] = matchesDetails[currentMatch.team2] || {};

    matchesDetails[currentMatch.team1]['played'] = (matchesDetails[currentMatch.team1]['played'] || 0) + 1;
    matchesDetails[currentMatch.team2]['played'] = (matchesDetails[currentMatch.team2]['played'] || 0) + 1;


    if (currentMatch.result === 'win') {
      if (currentMatch.team1 === currentMatch.winner) {
        matchesDetails[currentMatch.team2]['lost'] = (matchesDetails[currentMatch.team2]['lost'] || 0) + 1
      } else matchesDetails[currentMatch.team1]['lost'] = (matchesDetails[currentMatch.team1]['lost'] || 0) + 1

      matchesDetails[currentMatch.winner].won = (matchesDetails[currentMatch.winner]['won'] || 0) + 1
      matchesDetails[currentMatch.winner].points = (matchesDetails[currentMatch.winner]['points'] || 0) + 2

    } else if (currentMatch.result === 'tie') {
      matchesDetails[currentMatch.team1]['points'] = (matchesDetails[currentMatch.team1]['points'] || 0) + 1
      matchesDetails[currentMatch.team2]['points'] = (matchesDetails[currentMatch.team2]['points'] || 0) + 1
      matchesDetails[currentMatch.team1]['tied'] = (matchesDetails[currentMatch.team1]['tied'] || 0) + 1
      matchesDetails[currentMatch.team2]['tied'] = (matchesDetails[currentMatch.team2]['tied'] || 0) + 1
    } else {
      matchesDetails[currentMatch.team1]['points'] = (matchesDetails[currentMatch.team1]['points'] || 0) + 1
      matchesDetails[currentMatch.team2]['points'] = (matchesDetails[currentMatch.team2]['points'] || 0) + 1
      matchesDetails[currentMatch.team1]['noResult'] = (matchesDetails[currentMatch.team1]['noResult'] || 0) + 1
      matchesDetails[currentMatch.team2]['noResult'] = (matchesDetails[currentMatch.team2]['noResult'] || 0) + 1
    }
  }

  let allTeams = []
  for (const key in matchesDetails) {
    let tempObject = {}
    let value = matchesDetails[key]
    tempObject.team = key
    tempObject['won'] = value['won'] || 0;
    tempObject['lost'] = value['lost'] || 0;
    tempObject['tied'] = value['tied'] || 0;
    tempObject['noResult'] = value['noResult'] || 0;
    tempObject['points'] = value['points'] || 0;
    tempObject['played'] = value['played'] || 0;
    allTeams.push(tempObject)
  }
  allTeams = allTeams.sort((a, b) => {
    if (a.points !== b.points) {
      return b.points - a.points
    } else {
      return a.team.localeCompare(b.team)
    }
  })
  return allTeams
}
