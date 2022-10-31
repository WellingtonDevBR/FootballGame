import { Round } from "./implementation/Round";
import { Score } from "./implementation/Score";
import { RoundOfSixteenPhase, RoundOfEightPhase } from "./implementation/Phase";
import { EntryPhaseMatchType, NextPhaseMatchType } from "./implementation/MatchType";
import { EntryPhaseClassificationRule, NextPhaseClassificationRule } from "./implementation/ClassificationRule";
export class Game {
  constructor(teams) {
    this.teams = teams;
    this.matchesHistory = [];
    this.entryPhaseRoundsRule = 3;
  }

  start() {
    if (!this.teams) return null;

    // Entry Phase Games
    const roundOfSixteenPhase = new RoundOfSixteenPhase(
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

    // Round of Eight Phase Games
    const roundOfEightPhase = new RoundOfEightPhase(
      new NextPhaseMatchType(new Score()),
      new NextPhaseClassificationRule()
    );
    const toBeClassifiedForQuarterFinals = roundOfEightPhase.start(
      classifiedsForRoundOfEight
    );
    const classifiedsForQuarterFinals = roundOfEightPhase.classify(
      toBeClassifiedForQuarterFinals
    );
    const roundOfEightPhaseMatchesResults =
      roundOfEightPhase.getMatchesResults();
    this.updateMatchesHistories(roundOfEightPhaseMatchesResults);

    return {
      roundOfSixteenTeams,
      classifiedsForRoundOfEight,
      matchesHistory: this.matchesHistory,
    };
  }

  updateMatchesHistories(phaseResult) {
    this.matchesHistory.push(...phaseResult.matches);
  }
}
