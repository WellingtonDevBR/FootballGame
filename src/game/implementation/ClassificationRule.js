import { IClassificationRule } from "../interfaces/IClassificationRule";

export class EntryPhaseClassificationRule extends IClassificationRule {
  constructor() {
    super();
    this.groupsOfClassification = ["A", "B", "C", "D", "E", "F", "G", "H"];
    this.teamWithScoresCalculated = [];
    this.classifiedsForQuarterFinals = [];
    this.largestValueA = 0;
    this.largestValueB = 0;
    this.teamA = {};
    this.teamB = {};
  }

  classifyTeams(teams, matches) {
    this.sumUpTeamScores(teams, matches);
    for (var i = 0; i < this.teamWithScoresCalculated.length; i += 4) {
      this.teamWithScoresCalculated.slice(i, i + 4).forEach((team, index) => {
        if (team.Score > this.largestValueA) {
          this.largestValueB = this.largestValueA;
          this.largestValueA = team.Score;
          this.teamA = team;
        } else if (team.Score > this.largestValueB) {
          this.largestValueB = team.Score;
          this.teamB = team;
        } else {
          this.teamB = team;
        }
      });

      this.classifiedsForQuarterFinals.push(this.teamA);
      this.classifiedsForQuarterFinals.push(this.teamB);
      this.largestValueA = 0;
      this.largestValueB = 0;
      this.teamA = {};
      this.teamB = {};
    }

    let newclassifiedsForQuarterFinalsArray = [];
    for (let i = 0; i < 2; i++) {
      for (let j = 0; j < 16; j++) {
        if (j % 2 == i) {
          newclassifiedsForQuarterFinalsArray.push(
            this.classifiedsForQuarterFinals[j]
          );
        }
      }
    }
    return newclassifiedsForQuarterFinalsArray;
  }

  sumUpTeamScores(teams, matches) {
    let counter = 0;
    teams.map((team, index) => {
      index = index + 1;
      const getAllTeamMatchs = matches.filter(
        (match) => match.teamA === team.Name || match.teamB === team.Name
      );
      const sum = getAllTeamMatchs.reduce((acc, object) => {
        if (object.teamA === team.Name) {
          acc = acc + object.teamAScore;
        }
        if (object.teamB === team.Name) {
          acc = acc + object.teamBScore;
        }
        return acc;
      }, 0);
      this.teamWithScoresCalculated.push({
        Name: team.Name,
        Score: sum,
        Token: team.Token,
        Group: this.groupsOfClassification[counter],
      });
      index % 4 == 0 ? counter++ : (counter = counter);
    });
  }
}

export class NextPhaseClassificationRule extends IClassificationRule {
  constructor() {
    super();
  }

  classifyTeams(matches) {
    let isClassifiable = false;
    let classifiedsForQuarterFinals = [];
    matches.forEach((match) => {
      if (match.teamAScore > match.teamBScore) {
        classifiedsForQuarterFinals.push({
          Name: match.teamA,
          Score: match.teamAScore,
          Token: match.teamAToken,
          Goals: match.teamAGoals,
          Group: match.teamAGroup,
        });
      } else if (match.teamAScore < match.teamBScore) {
        classifiedsForQuarterFinals.push({
          Name: match.teamB,
          Score: match.teamBScore,
          Token: match.teamBToken,
          Goals: match.teamBGoals,
          Group: match.teamBGroup,
        });
      } else if (match.teamAScore == match.teamBScore) {
        if (match.teamAGoals > match.teamBGoals) {
          classifiedsForQuarterFinals.push({
            Name: match.teamA,
            Score: match.teamAScore,
            Token: match.teamAToken,
            Goals: match.teamAGoals,
            Group: match.teamAGroup,
          });
        } else if (match.teamAGoals < match.teamBGoals) {
          classifiedsForQuarterFinals.push({
            Name: match.teamB,
            Score: match.teamBScore,
            Token: match.teamBToken,
            Goals: match.teamBGoals,
            Group: match.teamBGroup,
          });
        } else if (match.teamAGoals == match.teamBGoals) {
          classifiedsForQuarterFinals.push({
            Name: match.teamA,
            Score: match.teamAScore,
            Token: match.teamAToken,
            Goals: match.teamAGoals,
            Group: match.teamAGroup,
          });
        }
      }
    });
    return classifiedsForQuarterFinals;
  }
}
