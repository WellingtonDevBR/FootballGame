export class Score {
  constructor() {
    this.scoreForWinner = 3;
    this.scoreForLoser = 0;
    this.scoreForDraw = 1;
  }

  calculate(teamGoalsA, teamGoalsB) {
    let scoreA = 0;
    let scoreB = 0;
    if (teamGoalsA > teamGoalsB) {
      scoreA = this.scoreForWinner;
      scoreB = scoreForLoser;
    } else if (teamGoalsA < teamGoalsB) {
      scoreB = this.scoreForWinner;
      scoreA = scoreForLoser;
    } else {
      this.scoreA = this.scoreForDraw;
      this.scoreB = this.scoreForDraw;
    }

    return {
      scoreA,
      scoreB,
      teamGoalsA,
      teamGoalsB,
    };
  }
}
