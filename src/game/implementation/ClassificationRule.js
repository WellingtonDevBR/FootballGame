import { IClassificationRule } from "../interfaces/IClassificationRule";

export class EntryPhaseClassificationRule extends ClassificationRule {
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

}