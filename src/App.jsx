import React from 'react';
import { Game } from './game/Game';
import { Header } from './components/header/Header';
import { Axios } from './services/Axios';
import { DefaultSquare } from './components/body/DefaultSquare';
import { RoundOfSixteen } from './components/body/RoundOfSixteen';
import { LoadingSpinner } from './components/body/LoadingSpinner';
import styles from './App.module.css';
import './Global.css';
export class App extends React.Component {
  constructor() {
    super();
    this.state = {
      classificationGroups: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
      isLoading: false,
      data: null,
      error: null
    };
  }

  getWorldCupTeams() {
    const axios = new Axios();
    axios.get("/WorldCup/GetAllTeams").then((response) => {
      this.setState({
        data: response.data,
        isLoading: false,
      });
    }).catch((error) => {
      this.setState({
        error: error,
      });
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.data !== null && this.state.data == nextState.data) {
      return false;
    }
    return true;
  }

  componentDidMount() {
    this.getWorldCupTeams();
  }

  startNewCupWorld() {
    this.getWorldCupTeams();
  }

  render() {
    const { data, classificationGroups, isLoading } = this.state;
    let game = new Game(data).start();
    if (!game) {
      this.setState({ isLoading: true });
    }
    return (
      <div>
        <Header />
        {
          isLoading ? <LoadingSpinner /> :
            <div className={styles.global}>
              <button onClick={() => this.startNewCupWorld()}>Novo Jogo</button>
              {game !== null ? <PostWinner game={game} /> : null}
              <div className={styles.wrapper} >
                <main className={styles.main}>
                  <div className={styles.teamOne}>
                    <div className={styles.roundOfSixteen}>
                      {
                        game?.roundOfSixteenTeams?.slice(0, 4).map((teams, index) => {
                          return (<RoundOfSixteen key={index} teams={teams} group={classificationGroups[index]} />)
                        })
                      }
                    </div>
                    <div className={styles.roundOfEight}>
                      {
                        game?.classifiedsForRoundOfEight?.slice(0, 4).map((teams, index) => {
                          return (<DefaultSquare key={index} teams={teams} />)
                        })
                      }
                    </div>
                    <div className={styles.quarterFinals}>
                      {game?.classifiedsForQuarterFinals?.slice(0, 2).map((teams, index) => {
                        return (<DefaultSquare key={index} teams={teams} />)
                      })}
                    </div>
                    <div className={styles.semiFinals}>
                      {game?.classifiedsForSemiFinals?.slice(1, 2).map((teams, index) => {
                        return (<DefaultSquare key={index} teams={teams} />)
                      })}
                    </div>
                  </div>
                  <div className={styles.final}>
                    {game?.classifiedsForFinals?.slice(0, 1).map((teams, index) => {
                      return (<DefaultSquare key={index} teams={teams} />)
                    })}
                  </div>
                  <div className={styles.teamTwo}>
                    <div className={styles.semiFinals}>
                      {game?.classifiedsForSemiFinals?.slice(0, 1).map((teams, index) => {
                        return (<DefaultSquare key={index} teams={teams} />)
                      })}
                    </div>
                    <div className={styles.quarterFinals}>
                      {game?.classifiedsForQuarterFinals?.slice(2, 4).map((teams, index) => {
                        return (<DefaultSquare key={index} teams={teams} />)
                      })}
                    </div>
                    <div className={styles.roundOfEight}>
                      {
                        game?.classifiedsForRoundOfEight?.slice(4, 8).map((teams, index) => {
                          return (<DefaultSquare key={index} teams={teams} />)
                        })
                      }
                    </div>
                    <div className={styles.roundOfSixteen}>
                      {
                        game?.roundOfSixteenTeams?.slice(4, 8).map((teams, index) => {
                          return (<RoundOfSixteen key={index} teams={teams} group={classificationGroups[index + 4]} />)
                        })
                      }
                    </div>
                  </div>
                  )
                </main>
              </div>
              <div className={styles.app}>
                <table>
                  <tbody>
                    <tr>
                      <th>Rodadas</th>
                      <th>Duelo</th>
                      <th>Goals</th>
                      <th>Vencedor</th>
                    </tr>
                    {
                      game?.matchesHistory?.map((team, index) => {
                        return (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{team.teamA + " x " + team.teamB}</td>
                            <td>{team.teamAGoals + " x " + team.teamBGoals}</td>
                            <td>{team.teamAGoals > team.teamBGoals ? team.teamA : team.teamB}</td>
                          </tr>
                        )
                      })
                    }
                  </tbody>
                </table>
              </div>
            </div>}
      </div>
    );
  }
}


class PostWinner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      game: props.game,
      response: null,
      error: null
    };
  }

  componentDidMount() {
    const axios = new Axios();
    const lastMatch = this.state.game.matchesHistory.pop();
    const data = {
      equipeA: lastMatch.teamAToken,
      equipeB: lastMatch.teamBToken,
      golsEquipeA: lastMatch.teamAGoals,
      golsEquipeB: lastMatch.teamBGoals,
      golsPenaltyTimeA: 0,
      golsPenaltyTimeB: 0
    }
    axios.post("/WorldCup/InsertFinalResult", data).then((response) => {
        this.setState({
            response: response.data,
        });
    }).catch((error) => {
        this.setState({
            error: error,
        });
    });
  }

  render() {
    return (
      <></>
    )
  }
}