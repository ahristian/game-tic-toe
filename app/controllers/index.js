import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class IndexController extends Controller {
  @tracked new_user = this.model.new_user;
  @tracked users = this.model.users;
  @tracked player1Name = null;
  @tracked player2Name = null;
  @tracked gameActive = true;
  @tracked playerWin = false;
  @tracked currentPlayer = null;
  @tracked firstPlayer = null;
  @tracked secondPlayer = null;
  @tracked players = ['Player 1', 'Player 2'];
  @tracked statusDisplay = 'Please set a nickname and select a symbol';
  @tracked possibleSymbols = ['X', 'O', 'Δ', '☻', '★', '☉', '☢', '☣'];
  @tracked cellsData = ['', '', '', '', '', '', '', '', ''];
  @tracked winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  onSaveUserResult(newUser, name, users) {
    let userExist;
    users.forEach((user) => {
      if (user.nickName) {
        if (user.nickName.toLowerCase() === name.toLowerCase()) {
          userExist = user;
        }
      }
    });

    if (userExist) {
      let winnings = parseInt(userExist?.numberWinnings);
      winnings += 1;

      userExist.set('numberWinnings', winnings);

      userExist.save();
    } else {
      newUser.set('numberWinnings', 1);
      newUser.set('nickName', name);

      newUser.save();
    }
  }

  gameResultsCheck(game) {
    for (let i = 0; i <= 7; i++) {
      const winCondition = this.winningConditions[i];
      let a = game[winCondition[0]];
      let b = game[winCondition[1]];
      let c = game[winCondition[2]];
      if (a === '' || b === '' || c === '') {
        continue;
      }
      if (a === b && b === c) {
        this.playerWin = true;
        break;
      }
    }

    let playerDraw = game.includes('');

    if (!playerDraw) {
      this.statusDisplay = `Game ended in a draw! Please restart the Game.`;
      this.gameActive = false;
      this.currentPlayer = null;
      this.firstPlayer = null;
      this.secondPlayer = null;
      return;
    }
  }

  onPlayerChange() {
    if (this.currentPlayer === this.firstPlayer) {
      this.currentPlayer = this.secondPlayer;
    } else {
      this.currentPlayer = this.firstPlayer;
    }
  }

  @action async onCellClick(id, cell) {
    let value_state = this.cellsData;
    if (cell === '' && this.gameActive === true) {
      if (!this.firstPlayer) {
        this.firstPlayer = 'X';
      }
      if (!this.secondPlayer) {
        this.secondPlayer = 'O';
      }
      if (!this.currentPlayer) {
        this.currentPlayer = this.firstPlayer;
      }

      value_state[id] = this.currentPlayer;
      this.gameResultsCheck(value_state);
      this.cellsData = value_state;

      if (this.playerWin) {
        const user = this.new_user;
        if (this.currentPlayer === this.firstPlayer) {
          this.statusDisplay = `Player ${this.player1Name} has won! Please restart the Game.`;

          this.onSaveUserResult(user, this.player1Name, this.users);
        } else {
          this.statusDisplay = `Player ${this.player2Name} has won! Please restart the Game.`;

          this.onSaveUserResult(user, this.player2Name, this.users);
        }
        this.gameActive = false;
        return;
      }
      this.onPlayerChange();
    }
  }

  @action async onSetCurrentPlayer(player, symbol) {
    if (player === 'Player 1') {
      this.firstPlayer = symbol;
    }

    if (player === 'Player 2') {
      this.secondPlayer = symbol;
    }

    this.possibleSymbols = this.possibleSymbols.filter(
      (possibleSymbol) => possibleSymbol !== symbol
    );
  }

  @action async onRestartGame() {
    this.playerWin = null;
    this.statusDisplay = null;
    this.currentPlayer = null;
    this.cellsData = ['', '', '', '', '', '', '', '', ''];
    this.possibleSymbols = ['X', 'O', 'Δ', '☻', '★', '☉', '☢', '☣'];
    this.gameActive = true;
  }

  @action onNamePlayer(player, name) {
    if (player === 'Player 1') {
      this.player1Name = name;
    }

    if (player === 'Player 2') {
      this.player2Name = name;
    }

    if (this.player1Name && this.player2Name) {
      this.statusDisplay = null;
    }
  }
}
