import { Round } from "./implementation/Round";
import { Score } from "./implementation/Score";

export class Game {
  constructor() {
    this.teams = teams;
    this.matchesHistory = [];
    this.entryPhaseRoundsRule = 3;
  }

  start() {
    // Entry Phase Games
    const roundOfSixteenPhase = new EntryPhase(
      this.teams,
      new EntryPhaseMatchType(
        new Round(this.entryPhaseRoundsRule),
        new Score()
      ),
      new EntryPhaseClassificationRule()
    );
    let roundOfSixteenTeams = roundOfSixteenPhase.prepareTeamsForMatches();
    const toBeClassifiedForRoundOfEight =
      roundOfSixteenPhase.start(roundOfSixteenTeams);
    const classifiedsForRoundOfEight = roundOfSixteenPhase.classify(
      toBeClassifiedForRoundOfEight
    );
    const entryPhaseMatchesResults = roundOfSixteenPhase.getMatchesResults();
    this.updateMatchesHistories(entryPhaseMatchesResults);

    return {
      roundOfSixteenTeams,
      classifiedsForRoundOfEight,
      matchesHistory: this.matchesHistory,
    };
  }

  updateMatchesHistories() {
    this.matchesHistory.push(...phaseResult.matches);
  }
}
