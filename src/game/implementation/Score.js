export class Score {
  constructor() {
    this.scoreForWinner = 3;
    this.scoreForLoser = 0;
    this.scoreForDraw = 1;
    this.scoreA = 0;
    this.scoreB = 0;
  }

  calculate(teamGoalsA, teamGoalsB) {
    if (teamGoalsA > teamGoalsB) {
      this.scoreA = this.scoreForWinner;
      this.scoreB = scoreForLoser;
    } else if (teamGoalsA < teamGoalsB) {
      this.scoreB = this.scoreForWinner;
      this.scoreA = scoreForLoser;
    } else {
      this.scoreA = this.scoreForDraw;
      this.scoreB = this.scoreForDraw;
    }

    return {
      scoreA: this.scoreA,
      scoreB: this.scoreB,
      teamGoalsA,
      teamGoalsB,
    };
  }
}
