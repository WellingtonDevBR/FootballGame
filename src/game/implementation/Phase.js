import { IPhase } from "../interfaces/IPhase";

class PhaseResult {
  constructor(matches) {
    this.matches = matches;
  }
}

export class EntryPhase extends IPhase {
  constructor() {
    super();
    this.matchesHistory = [];
  }

  start(groupsOfTeams) {
    const matches = this.matchType.match(teams);
    this.addMatchesToHistory(matches);
    return matches;
  }

  classify(teams) {

  }

  addMatchesToHistory(matches) {
    this.matchesHistory.push(...matches);
  }

  getMatchesResults() {

  }
}