import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

// class Square extends React.Component {
//   // initialize
//   // constructor(props) {
//   //   // サブクラスのコンストラクタを定義する際は常に super を呼ぶ必要があります。constructor を持つ React のクラスコンポーネントでは、すべてコンストラクタを super(props) の呼び出しから始めるべきです。
//   //   super(props);
//   //   this.state = {
//   //     value: null,
//   //   };
//   // }

//   render() {
//     return (
//       // <button className='square' onClick={() => { console.log('click'); }}>
//       // button: clickしたら最レンダーする
//       <button
//         className="square"
//         // onClick={() => this.setState({value: 'X'})}
//         onClick={() => this.props.onClick()}
//       >
//         {this.state.value}
//       </button>
//     );
//   }
// }

// 関数コンポーネントとは、render メソッドだけを有して自分の state を持たないコンポーネントを、よりシンプルに書くための方法です。
function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  )
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    // squaresというpropsをBoardが持つ
    this.state = {
      squares: Array(0).fill(null),
      xIsNext: true,
    };
  }

  // Squareがclickしたらこいつを呼びだしたっていう信号を送る。これがBoard上で実行される。
  handleClick(i) {
    // inmutableにすることで、以前のコピーと比較できる、巻き戻しとかできる、再レンダータイミングも決めやすい
    const squares = this.state.squares.slice();
    // 決着が付いてたら何もしない
    if (this.calculateWinner(squares) || squares[i]) {
      return;
    }

    squares[i] = this.state.xIsNext ? 'X' : '0';
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
    });
  }

  calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      // squares[a]: undefined, null以外ならtrue
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

  renderSquare(i) {
    // valueは自分で決めた名前
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }

  render() {
    const winner = this.calculateWinner(this.state.squares);
    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : '0');
    }

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

class Game extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     history: [{
  //       squares: Array(9).fill(null),
  //     }],
  //     xIsNext: true,
  //   };
  // }
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <dif>{/* status */}</dif>
          <dif>{/* TODO */}</dif>
        </div>
      </div>
    );
  }
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);