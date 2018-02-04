import React from 'react';
import Board from './board';

export default class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      moves: [
        {currentPlayer: 'X', squares: Array(9).fill(null)},
      ],
      currMoveIdx: 0
    };
  }

  handleClick(i) {
    const moves = this.state.moves.slice(0, this.state.currMoveIdx + 1);
    const move = moves[this.state.currMoveIdx];
    const squares = move.squares.slice();
    if (calcWinner(squares) || squares[i]) {
      return;
    }
    const currentPlayer = move.currentPlayer === 'X' ? 'O' : 'X';
    squares[i] = move.currentPlayer;

    this.setState({
      moves: [...moves, {currentPlayer, squares}],
      currMoveIdx: this.state.currMoveIdx + 1,
    });
  }

  jumpToMove(moveIdx) {
    this.setState({currMoveIdx:moveIdx});
  }

  render() {
    const moves = this.state.moves;
    const move = moves[this.state.currMoveIdx];
    const winner = calcWinner(move.squares);
    const status = winner
      ? `Winner: ${winner}`
      : `Next player: ${move.currentPlayer}`;

    const history = moves.map((move, idx) => {
      const desc = idx
        ? `Go to #${idx}`
        : `Go to start`;
      return (
        <li key={idx}>
          <button onClick={() => this.jumpToMove(idx)}>{desc}</button>
        </li>
      );
    });

    return (
      <div className="game">
        <div className="game-board">
          <Board 
            squares={move.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div className="status">{status}</div>
          <ol>{history}</ol>
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