class TictaktoGame {
  constructor() {
    this.board = Array(9).fill(null);
    this.currentPlayer = 'X';
    this.gameOver = false;
    this.playerScore = 0;
    this.aiScore = 0;
    this.playerName = 'You';
    this.leaderboard = [];
    
    this.initializeUI();
    this.loadStats();
    this.startNewGame();
  }

  initializeUI() {
    this.squares = document.querySelectorAll('.square');
    this.statusMessage = document.getElementById('statusMessage');
    this.newGameBtn = document.getElementById('newGameBtn');
    this.resetBtn = document.getElementById('resetBtn');
    this.playerScore_el = document.getElementById('playerScore');
    this.aiScore_el = document.getElementById('aiScore');
    this.gameSection = document.getElementById('gameSection');
    this.leaderboardSection = document.getElementById('leaderboardSection');
    this.navPlay = document.getElementById('navPlay');
    this.navLeader = document.getElementById('navLeader');
    this.leaderboardList = document.getElementById('leaderboardList');

    this.squares.forEach((square, index) => {
      square.addEventListener('click', () => this.handleSquareClick(index));
    });

    this.newGameBtn.addEventListener('click', () => this.startNewGame());
    this.resetBtn.addEventListener('click', () => this.resetStats());
    this.navPlay.addEventListener('click', () => this.showGameSection());
    this.navLeader.addEventListener('click', () => this.showLeaderboardSection());

    this.navPlay.classList.add('active');
  }

  startNewGame() {
    this.board = Array(9).fill(null);
    this.currentPlayer = 'X';
    this.gameOver = false;
    this.updateBoard();
    this.updateStatus();
  }

  handleSquareClick(index) {
    if (this.board[index] || this.gameOver) return;

    this.board[index] = 'X';
    this.currentPlayer = 'O';

    if (this.checkWin('X')) {
      this.playerScore++;
      this.playerScore_el.textContent = this.playerScore;
      this.gameOver = true;
      this.statusMessage.textContent = 'You win! Start a new game.';
      this.saveStats();
      this.updateLeaderboard();
      this.disableAllSquares();
      return;
    }

    if (this.isBoardFull()) {
      this.gameOver = true;
      this.statusMessage.textContent = 'Draw!';
      this.updateLeaderboard();
      this.disableAllSquares();
      return;
    }

    this.updateBoard();
    this.updateStatus();

    setTimeout(() => {
      this.aiMove();
    }, 600);
  }

  aiMove() {
    const bestScore = this.minimax(this.board, 9, 'O');
    let bestMove = -1;

    for (let i = 0; i < 9; i++) {
      if (this.board[i] === null) {
        const result = this.minimax(this.board, i, 'O');
        if (result.score === bestScore.score) {
          bestMove = i;
          break;
        }
      }
    }

    if (bestMove === -1) {
      const available = this.board.map((val, idx) => val === null ? idx : null).filter(val => val !== null);
      bestMove = available[Math.floor(Math.random() * available.length)];
    }

    this.board[bestMove] = 'O';

    if (this.checkWin('O')) {
      this.aiScore++;
      this.aiScore_el.textContent = this.aiScore;
      this.gameOver = true;
      this.statusMessage.textContent = 'AI wins!';
      this.saveStats();
      this.updateLeaderboard();
      this.disableAllSquares();
      return;
    }

    if (this.isBoardFull()) {
      this.gameOver = true;
      this.statusMessage.textContent = 'Draw!';
      this.updateLeaderboard();
      this.disableAllSquares();
      return;
    }

    this.currentPlayer = 'X';
    this.updateBoard();
    this.updateStatus();
  }

  minimax(board, depth, player) {
    if (this.checkWin('O')) {
      return { score: 10 - depth };
    }
    if (this.checkWin('X')) {
      return { score: depth - 10 };
    }
    if (this.isBoardFull()) {
      return { score: 0 };
    }

    if (player === 'O') {
      let bestScore = -Infinity;
      for (let i = 0; i < 9; i++) {
        if (board[i] === null) {
          board[i] = 'O';
          const score = this.minimax(board, depth + 1, 'X').score;
          board[i] = null;
          bestScore = Math.max(score, bestScore);
        }
      }
      return { score: bestScore };
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < 9; i++) {
        if (board[i] === null) {
          board[i] = 'X';
          const score = this.minimax(board, depth + 1, 'O').score;
          board[i] = null;
          bestScore = Math.min(score, bestScore);
        }
      }
      return { score: bestScore };
    }
  }

  checkWin(player) {
    const winConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    return winConditions.some(condition =>
      condition.every(index => this.board[index] === player)
    );
  }

  isBoardFull() {
    return this.board.every(cell => cell !== null);
  }

  updateBoard() {
    this.squares.forEach((square, index) => {
      square.textContent = this.board[index] || '';
      square.disabled = this.board[index] !== null || this.gameOver;
    });
  }

  updateStatus() {
    if (!this.gameOver) {
      this.statusMessage.textContent = this.currentPlayer === 'X' ? 'Your turn' : 'AI thinking...';
    }
  }

  disableAllSquares() {
    this.squares.forEach(square => {
      square.disabled = true;
    });
  }

  resetStats() {
    if (confirm('Are you sure you want to clear all stats?')) {
      this.playerScore = 0;
      this.aiScore = 0;
      this.playerScore_el.textContent = '0';
      this.aiScore_el.textContent = '0';
      this.leaderboard = [];
      localStorage.removeItem('tiktaktoStats');
      localStorage.removeItem('tiktaktoLeaderboard');
      this.updateLeaderboard();
      this.startNewGame();
    }
  }

  saveStats() {
    const stats = {
      playerScore: this.playerScore,
      aiScore: this.aiScore,
      timestamp: Date.now()
    };
    localStorage.setItem('tiktaktoStats', JSON.stringify(stats));
  }

  loadStats() {
    const stats = localStorage.getItem('tiktaktoStats');
    if (stats) {
      const parsed = JSON.parse(stats);
      this.playerScore = parsed.playerScore || 0;
      this.aiScore = parsed.aiScore || 0;
      this.playerScore_el.textContent = this.playerScore;
      this.aiScore_el.textContent = this.aiScore;
    }
    this.loadLeaderboard();
  }

  updateLeaderboard() {
    const entry = {
      name: this.playerName,
      score: this.playerScore,
      timestamp: Date.now()
    };

    if (this.leaderboard.length === 0 || this.playerScore > 0) {
      const exists = this.leaderboard.findIndex(e => e.name === this.playerName);
      if (exists !== -1) {
        this.leaderboard[exists] = entry;
      } else {
        this.leaderboard.push(entry);
      }
    }

    this.leaderboard.sort((a, b) => b.score - a.score);
    this.leaderboard = this.leaderboard.slice(0, 50);

    localStorage.setItem('tiktaktoLeaderboard', JSON.stringify(this.leaderboard));
    this.renderLeaderboard();
  }

  loadLeaderboard() {
    const stored = localStorage.getItem('tiktaktoLeaderboard');
    if (stored) {
      this.leaderboard = JSON.parse(stored);
    }
    this.renderLeaderboard();
  }

  renderLeaderboard() {
    if (this.leaderboard.length === 0) {
      this.leaderboardList.innerHTML = '<div class="empty-state"><p>No scores yet. Be the first to play!</p></div>';
      return;
    }

    this.leaderboardList.innerHTML = this.leaderboard
      .map((entry, idx) => `
        <div class="leaderboard-item">
          <div class="leaderboard-rank">#${idx + 1}</div>
          <div class="leaderboard-info">
            <div class="leaderboard-name">${this.escapeHtml(entry.name)}</div>
          </div>
          <div class="leaderboard-score">${entry.score}</div>
        </div>
      `)
      .join('');
  }

  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  showGameSection() {
    this.gameSection.style.display = 'block';
    this.leaderboardSection.style.display = 'none';
    this.navPlay.classList.add('active');
    this.navLeader.classList.remove('active');
  }

  showLeaderboardSection() {
    this.gameSection.style.display = 'none';
    this.leaderboardSection.style.display = 'block';
    this.navLeader.classList.add('active');
    this.navPlay.classList.remove('active');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const game = new TictaktoGame();
});