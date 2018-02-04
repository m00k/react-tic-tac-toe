import React from 'react';
import Board from './board';

export default class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {squares: Array(9).fill(null)},
      ],
      currentPlayer: 'X',
    };
  }

  handleClick(i) {
    const history = this.state.history;
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calcWinner(squares) || squares[i]) {
      return;
    }
    const currentPlayer = this.state.currentPlayer === 'X' ? 'O' : 'X';
    squares[i] = this.state.currentPlayer;

    this.setState({
      history: [...history, {squares}],
      currentPlayer,
    });
  }

  render() {
    const history = this.state.history;
    const current = history[history.length - 1];
    const winner = calcWinner(current.squares);
    const status = winner
      ? `Winner: ${winner}`
      : `Next player: ${this.state.currentPlayer}`;

    return (
      <div className="game">
        <div className="game-board">
          <Board 
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div className="status">{status}</div>
          <ol>{}</ol>
        </div>
      </div>
    )
  }
}

function calcWinner(squares) {
  const lines = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
  ];
  for (let line of lines) {
    const val = squares[line[0]];
    if (line.every(_ => squares[_] === val)) {
      return val;
    }
  }
  return null;
}