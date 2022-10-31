import { IMatchType } from "../interfaces/IMatchType";

export class EntryPhaseMatchType extends IMatchType {
  constructor(round, score) {
    super();
    this.round = round;
    this.score = score;
    this.matchsHistory = [];
    this.teamsBattles = [];
    this.counter = 0;
    this.teamScore = {};
  }

  match(groups) {
    for (let teams of groups) {
      for (let i = 0; i < this.round.rounds; i++) {
        for (let teamA of teams) {
          let adversaries = teams.filter((team) => team.Name != teamA.Name);
          for (let teamB of adversaries) {
            let canTeamAMatchTeamB =
              !this.matchsHistory.includes(teamA.Name + " x " + teamB.Name) &&
              !this.matchsHistory.includes(teamB.Name + " x " + teamA.Name);
            if (
              canTeamAMatchTeamB &&
              !this.round.matchs.includes(teamA.Name) &&
              !this.round.matchs.includes(teamB.Name)
            ) {
              this.matchsHistory.push(teamA.Name + " x " + teamB.Name);
              this.round.matchs.push(teamA.Name);
              this.round.matchs.push(teamB.Name);

              
              this.teamScore = this.score.calculate(
                Math.floor(Math.random() * 10),
                Math.floor(Math.random() * 10)
              );
              
              this.teamsBattles.push({
                teamA: teamA.Name,
                teamB: teamB.Name,
                teamAScore: this.teamScore.scoreA,
                teamBScore: this.teamScore.scoreB,
                teamAGroup: teamA.Group,
                teamBGroup: teamB.Group,
                teamAToken: teamA.Token,
                teamBToken: teamB.Token,
                teamAGoals: this.teamScore.teamGoalsA,
                teamBGoals: this.teamScore.teamGoalsB,
              });
            }
            if (this.round.matchs.length === 4) this.round.matchs = [];
          }
        }
      }
      this.counter++;
    }
    return this.teamsBattles;
  }
}

export class NextPhaseMatchType extends MatchType {
  constructor(score) {
    super();
    this.score = score;
    this.matchsHistory = [];
    this.teamsBattles = [];
    this.counter = 0;
    this.teamScore = {};
    this.matches = [];
  }
  match(groups) {
    for (let teams of groups) {
        for (let teamA of teams) {
          let adversaries = teams.filter((team) => team.Name != teamA.Name);
          for (let teamB of adversaries) {
            let canTeamAMatchTeamB =
              !this.matchsHistory.includes(teamA.Name + " x " + teamB.Name) &&
              !this.matchsHistory.includes(teamB.Name + " x " + teamA.Name);
            if (
              canTeamAMatchTeamB &&
              !this.matches.includes(teamA.Name) &&
              !this.matches.includes(teamB.Name)
            ) {
              this.matchsHistory.push(teamA.Name + " x " + teamB.Name);
              this.matches.push(teamA.Name);
              this.matches.push(teamB.Name);

              this.teamScore = this.score.calculate(
                Math.floor(Math.random() * 10),
                Math.floor(Math.random() * 10)
              );
              this.teamsBattles.push({
                teamA: teamA.Name,
                teamB: teamB.Name,
                teamAToken: teamA.Token,
                teamBToken: teamB.Token,
                teamAScore: this.teamScore.scoreA,
                teamBScore: this.teamScore.scoreB,
                teamAGroup: teamA.Group,
                teamBGroup: teamB.Group,
                teamAGoals: this.teamScore.teamGoalsA,
                teamBGoals: this.teamScore.teamGoalsB,
              });
            }
            if (this.matches.length === 2) this.matches = [];
          }
        }
      this.counter++;
    }
    return this.teamsBattles;
  }
}