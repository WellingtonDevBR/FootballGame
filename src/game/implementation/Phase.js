import { IPhase } from "../interfaces/IPhase";

class PhaseResult {
  constructor(matches) {
    this.matches = matches;
  }
}

export class RoundOfEightPhase extends IPhase {
  constructor(matchType, classificationRule) {
    super();
    this.matchType = matchType;
    this.classificationRule = classificationRule;
    this.matchesHistory = [];
  }

  start(teams) {
    const matches = this.matchType.match(teams);
    this.addMatchesToHistory(matches);
    return matches;
  }

  classify(teams) {
    const classifiedTeams = this.classificationRule.classifyTeams(teams);
    return this.prepareTeamsForMatch(classifiedTeams);
  }

  addMatchesToHistory(matches) {
    this.matchesHistory.push(...matches);
  }

  getMatchesResults() {
    return new PhaseResult(this.matchesHistory);
  }

  prepareTeamsForMatch(teams) {
    return this.createGroups(teams, 2);
  }

  createGroups(teams, teamsPerGroup) {
    return teams?.reduce((resultArray, item, index) => {
      const chunkIndex = Math.floor(index / teamsPerGroup);
      if (!resultArray[chunkIndex]) resultArray[chunkIndex] = [];
      resultArray[chunkIndex].push(item);
      return resultArray;
    }, []);
  }
}