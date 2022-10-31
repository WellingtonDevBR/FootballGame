import React from 'react';
import { Game } from './game/Game';
import { Header } from './components/header/Header';
import { Axios } from './services/Axios';
import { DefaultSquare } from './components/body/DefaultSquare';
import { RoundOfSixteen } from './components/body/RoundOfSixteen';
import { LoadingSpinner } from './components/body/LoadingSpinner';
import './App.module.css';
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
            </div>}
      </div>
    );
  }
}