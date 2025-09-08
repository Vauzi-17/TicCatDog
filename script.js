const boardEl = document.getElementById('board');
const cells = Array.from(document.querySelectorAll('.cell'));
const statusEl = document.getElementById('status');
const turnEl = document.getElementById('turn');
const restartBtn = document.getElementById('restart');
const modeSel = document.getElementById('mode');
const humanMarkerSel = document.getElementById('humanMarker');

let x = '🐶'
let o = '😹'

let board = Array(9).fill('');
let current = x;
let gameOver = false;

const LINES = [
  [0,1,2],[3,4,5],[6,7,8], // baris
  [0,3,6],[1,4,7],[2,5,8], // kolom
  [0,4,8],[2,4,6]          // diagonal
];

function setStatus(text){
  statusEl.innerHTML = text;
}

function updateTurnUI(){
  turnEl.textContent = current;
}

function winnerOf(b){
  for(const [a,bb,c] of LINES){
    if(b[a] && b[a] === b[bb] && b[a] === b[c]) return {player:b[a], line:[a,bb,c]};
  }
  return null;
}

function emptyIndices(b){ 
  return b.map((v,i)=>v?null:i).filter(v=>v!==null);
}

function render(){
  cells.forEach((cell,i)=>{
    cell.textContent = board[i];
    cell.classList.toggle('won', false);
  });
  const w = winnerOf(board);
  if(w){
    w.line.forEach(i => cells[i].classList.add('won'));
    setStatus(`Menang: ${w.player}`);
    gameOver = true;
    return;
  }
  if(!board.includes('')){
    setStatus('Seri 😶');
    gameOver = true;
    return;
  }
  setStatus(`Giliran: <span id="turn">${current}</span>`);
  document.getElementById('turn').textContent = current; // re-bind
}

function reset(){
  board = Array(9).fill('');
  gameOver = false;
  // Saat mode AI + human pilih O, AI jalan dulu
  current = x;
  render();
  const isAI = modeSel.value === 'ai';
  const humanMarker = humanMarkerSel.value;
  if(isAI && humanMarker === o){
    aiMove();
  }
}

function playAt(i){
  if(gameOver || board[i]) return;
  board[i] = current;
  current = current === o ? x : o;
  render();

  if(modeSel.value === 'ai' && !gameOver){
    const humanMarker = humanMarkerSel.value;
    const aiMarker = humanMarker === x ? o : x;
    if(current === aiMarker){
      // beri sedikit delay agar terasa natural
      setTimeout(aiMove, 120);
    }
  }
}

function aiMove(){
  if(gameOver) return;
  const humanMarker = humanMarkerSel.value;
  const aiMarker = humanMarker === x ? o : x;

  // Minimax
  const move = bestMove(board, aiMarker, humanMarker);
  if(move !== null){
    board[move] = aiMarker;
    current = humanMarker;
    render();
  }
}

function bestMove(b, ai, human){
  // Cek langkah menang langsung
  for(const i of emptyIndices(b)){
    const tmp = b.slice();
    tmp[i] = ai;
    if(winnerOf(tmp)?.player === ai) return i;
  }
  // Cegah lawan menang
  for(const i of emptyIndices(b)){
    const tmp = b.slice();
    tmp[i] = human;
    if(winnerOf(tmp)?.player === human) return i;
  }
  // Minimax penuh
  let bestScore = -Infinity, bestIndex = null;
  for(const i of emptyIndices(b)){
    const tmp = b.slice();
    tmp[i] = ai;
    const score = minimax(tmp, false, ai, human);
    if(score > bestScore){
      bestScore = score;
      bestIndex = i;
    }
  }
  return bestIndex;
}

function minimax(b, isMax, ai, human){
  const w = winnerOf(b);
  if(w){
    if(w.player === ai) return 10;
    if(w.player === human) return -10;
  }
  if(!b.includes('')) return 0;

  if(isMax){
    let best = -Infinity;
    for(const i of emptyIndices(b)){
      const tmp = b.slice();
      tmp[i] = ai;
      best = Math.max(best, minimax(tmp, false, ai, human));
    }
    return best - 1; // sedikit prefer cepat menang
  }else{
    let best = Infinity;
    for(const i of emptyIndices(b)){
      const tmp = b.slice();
      tmp[i] = human;
      best = Math.min(best, minimax(tmp, true, ai, human));
    }
    return best + 1; // sedikit hindari cepat kalah
  }
}

// Event
cells.forEach(cell=>{
  cell.addEventListener('click', ()=> playAt(Number(cell.dataset.index)));
});

restartBtn.addEventListener('click', reset);

// Ubah mode / marker -> reset game
modeSel.addEventListener('change', reset);
humanMarkerSel.addEventListener('change', reset);

// Init
reset();
