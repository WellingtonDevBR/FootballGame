import { Round } from "./implementation/Round";
import { Score } from "./implementation/Score";
import { EntryPhase } from "./implementation/Phase";
import { EntryPhaseMatchType } from "./implementation/MatchType";
import { EntryPhaseClassificationRule } from "./implementation/ClassificationRule";

export class Game {
  constructor(teams) {
    this.teams = teams;
    this.matchesHistory = [];
    this.entryPhaseRoundsRule = 3;
  }

  start() {
    if (!this.teams) return null;
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
