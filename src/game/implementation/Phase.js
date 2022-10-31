import { IPhase } from "../interfaces/IPhase";

class PhaseResult {
  constructor(matches) {
    this.matches = matches;
  }
}

export class RoundOfSixteenPhase extends IPhase {
  constructor(teams, matchType, classificationRule) {
    super();
    this.teams = teams;
    this.matchType = matchType;
    this.classificationRule = classificationRule;
    this.matchesHistory = [];
  }

  start(groupsOfTeams) {
    const matches = this.matchType.match(groupsOfTeams);
    this.addMatchesToHistory(matches);
    return matches;
  }

  classify(teams) {
    const classifiedTeams = this.classificationRule.classifyTeams(
      this.teams?.Result,
      teams
    );
    return this.createGroups(classifiedTeams, 2);
  }

  addMatchesToHistory(matches) {
    this.matchesHistory.push(...matches);
  }

  getMatchesResults() {
    return new PhaseResult(this.matchesHistory);
  }

  prepareTeamsForMatches() {
    const shuffledTeams = this.teams?.Result?.sort(
      () => Math.random() - 0.5
    );
    return this.createGroups(shuffledTeams, 4);
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