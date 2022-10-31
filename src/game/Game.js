import { Round } from "./implementation/Round";
import { Score } from "./implementation/Score";
import {
  EntryPhaseMatchType,
  NextPhaseMatchType,
} from "./implementation/MatchType";
import {
  EntryPhaseClassificationRule,
  NextPhaseClassificationRule,
} from "./implementation/ClassificationRule";
import {
  RoundOfSixteenPhase,
  RoundOfEightPhase,
  QuarterFinalsPhase,
  SemiFinalsPhase,
  FinalPhase,
} from "./implementation/Phase";

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

    // Round of Four Phase Games
    const quarterFinals = new QuarterFinalsPhase(
      new NextPhaseMatchType(new Score()),
      new NextPhaseClassificationRule()
    );
    const toBeClassifiedForSemiFinals = quarterFinals.start(
      classifiedsForQuarterFinals
    );
    const classifiedsForSemiFinals = quarterFinals.classify(
      toBeClassifiedForSemiFinals
    );
    const quarterFinalsPhaseMatchesResults = quarterFinals.getMatchesResults();
    this.updateMatchesHistories(quarterFinalsPhaseMatchesResults);

    // Semi Finals Phase Games
    const semiFinals = new SemiFinalsPhase(
      new NextPhaseMatchType(new Score()),
      new NextPhaseClassificationRule()
    );
    const toBeClassifiedForFinals = semiFinals.start(classifiedsForSemiFinals);
    const classifiedsForFinals = semiFinals.classify(toBeClassifiedForFinals);
    const semiFinalsPhaseMatchesResults = semiFinals.getMatchesResults();
    this.updateMatchesHistories(semiFinalsPhaseMatchesResults);

    // Finals Phase Games
    const finals = new FinalPhase(
      new NextPhaseMatchType(new Score()),
      new NextPhaseClassificationRule()
    );
    const semiFinalTeamsMatch = finals.start(classifiedsForFinals);
    finals.classify(semiFinalTeamsMatch);
    const finalsPhaseMatchesResults = finals.getMatchesResults();
    this.updateMatchesHistories(finalsPhaseMatchesResults);

    return {
      roundOfSixteenTeams,
      classifiedsForRoundOfEight,
      classifiedsForQuarterFinals,
      classifiedsForSemiFinals,
      classifiedsForFinals,
      semiFinalTeamsMatch,
      matchesHistory: this.matchesHistory,
    };
  }

  updateMatchesHistories(phaseResult) {
    this.matchesHistory.push(...phaseResult.matches);
  }
}
