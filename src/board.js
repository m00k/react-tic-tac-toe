import React from 'react';
import Square from './square';

export default class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      currentPlayer: 'X',
    };
  }

  handleClick(i) {
    const squares = this.state.squares.slice();
    squares[i] = this.state.currentPlayer;
    const currentPlayer = this.state.currentPlayer === 'X' ? 'O' : 'X';
    this.setState({
      squares,
      currentPlayer,
    });
  }

  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }

  render() {
    const winner = calcWinner(this.state.squares);
    const status = winner
      ? `Winner: ${winner}`
      : `Next player: ${this.state.currentPlayer}`;

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
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