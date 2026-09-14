/* ==========================================================================
   🏆 智力竞技乐园 (Arena Hall)
   包含：15 款经典益智游戏大厅与可交互 AI 五子棋对战
   ========================================================================== */

const ArenaHall = (function () {
  let currentView = 'hall'; // 'hall' | 'gomoku'
  const BOARD_SIZE = 9;
  let board = Array.from({ length: BOARD_SIZE }, () => Array(BOARD_SIZE).fill(0)); // 0: 空, 1: 玩家(黑), 2: AI(白)
  let isGameOver = false;

  const GAMES_LIST = [
    { id: 'gomoku', name: '趣味五子棋', icon: '⚫', color: '#2d3436', desc: '经典连五子，支持AI对战' },
    { id: 'chinesechess', name: '中国象棋', icon: '♟️', color: '#e17055', desc: '楚河汉界，智谋交锋' },
    { id: 'chess', name: '国际象棋', icon: '♔', color: '#6c5ce7', desc: '骑士与国王的策略棋' },
    { id: 'ludo', name: '飞行棋', icon: '✈️', color: '#00cec9', desc: '掷骰起飞，四机护航' },
    { id: 'checkers', name: '跳棋', icon: '⚪', color: '#e17055', desc: '隔子连跳，步步为营' },
    { id: 'jungle', name: '斗兽棋', icon: '🦁', color: '#00b894', desc: '象吃虎、虎吃豹、鼠吃象' },
    { id: 'escaperun', name: '口算赛车', icon: '🚗', color: '#0984e3', desc: '极速答题，飞跃终点' },
    { id: 'othello', name: '黑白翻转棋', icon: '☯️', color: '#2d3436', desc: '夹击翻转，一子定乾坤' },
    { id: 'tetris', name: '俄罗斯方块', icon: '🧱', color: '#e17055', desc: '下落几何，消除满行' },
    { id: 'sudoku', name: '数独小达人', icon: '🔢', color: '#00b894', desc: '4×4 九宫逻辑推理' },
    { id: 'game2048', name: '动物2048', icon: '🐾', color: '#0984e3', desc: '同类碰撞合成万兽之王' },
    { id: 'minesweeper', name: '寻宝小猎人', icon: '💎', color: '#636e72', desc: '数字标记，排雷寻宝' },
    { id: 'blockly', name: '编程解谜', icon: '🧩', color: '#4285f4', desc: 'Google积木编程挑战' },
    { id: 'brainspark', name: '数学消消乐', icon: '🧮', color: '#ff6b6b', desc: '下落式心算消除' },
    { id: 'memorypk', name: '记忆对战翻牌', icon: '🃏', color: '#fd79a8', desc: '同图配对，记忆脑力训练' }
  ];

  function render(container) {
    if (currentView === 'gomoku') {
      renderGomoku(container);
    } else {
      renderHall(container);
    }
  }

  function renderHall(container) {
    container.innerHTML = `
      <div class="college-header" style="border-left: 6px solid var(--col-arena-primary);">
        <div class="college-title-group">
          <span style="font-size: 32px;">🏆</span>
          <div>
            <div class="college-main-title">智力竞技乐园</div>
            <div class="college-sub-motto">“15 款经典棋类与策略对抗，随时与小狮子智慧切磋”</div>
          </div>
        </div>
        <button class="btn-child btn-arena" onclick="App.navigate('cosmos')" style="min-height: 44px; padding: 0 18px; font-size: 15px;">
          🪐 返回大厅
        </button>
      </div>

      <!-- 热门即开即玩推荐 -->
      <div style="background: linear-gradient(135deg, rgba(232, 168, 56, 0.2), rgba(28, 37, 65, 0.8)); border: 2px solid var(--col-arena-primary); border-radius: var(--radius-card); padding: 20px; display: flex; align-items: center; justify-content: space-between; margin-bottom: 24px;">
        <div style="display: flex; align-items: center; gap: 16px;">
          <div style="font-size: 48px;">⚫</div>
          <div>
            <div style="font-size: 20px; font-weight: 900; color: #fff;">今日精选：趣味五子棋 (AI 对战)</div>
            <div style="font-size: 13px; color: #cbd5e0; margin-top: 4px;">由浅入深的对弈算法，磨砺全局空间与防守视野</div>
          </div>
        </div>
        <button class="btn-child btn-gold" onclick="ArenaHall.openGomoku()">
          ⚔️ 立即对局
        </button>
      </div>

      <!-- 15 款游戏全景矩阵 -->
      <div style="font-size: 18px; font-weight: 800; color: #fff; margin-bottom: 12px;">乐园全部游戏阵容 (15 款)：</div>
      <div class="colleges-grid">
        ${GAMES_LIST.map(g => `
          <div class="college-card" style="background: linear-gradient(135deg, #1c2541, #253358); border: 2px solid rgba(255,255,255,0.12); min-height: 110px;"
               onclick="${g.id === 'gomoku' ? 'ArenaHall.openGomoku()' : `App.showToast('🎮 即将进入【${g.name}】对战大厅')`}">
            <div class="card-top">
              <div class="college-info">
                <div class="college-title" style="font-size: 18px;">${g.name}</div>
                <div class="college-motto">${g.desc}</div>
              </div>
              <div class="college-icon" style="font-size: 32px;">${g.icon}</div>
            </div>
            <div class="card-bottom">
              <span class="module-badge" style="background: rgba(232, 168, 56, 0.2); color: var(--star-gold);">AI 三级对战</span>
              <span class="enter-chip" style="font-size: 12px; padding: 4px 10px;">${g.id === 'gomoku' ? '▶️ 可玩' : '进入'}</span>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  function openGomoku() {
    currentView = 'gomoku';
    resetBoard();
    App.navigate('arena');
  }

  function closeGomoku() {
    currentView = 'hall';
    App.navigate('arena');
  }

  function resetBoard() {
    board = Array.from({ length: BOARD_SIZE }, () => Array(BOARD_SIZE).fill(0));
    isGameOver = false;
  }

  // 棋盘渲染
  function renderGomoku(container) {
    container.innerHTML = `
      <div class="college-header" style="border-left: 6px solid var(--col-arena-primary);">
        <div class="college-title-group">
          <span style="font-size: 32px;">⚫</span>
          <div>
            <div class="college-main-title">趣味五子棋 (9×9 儿童精炼局)</div>
            <div class="college-sub-motto">你执黑棋先行，小狮子执白棋应战，先连成五子获胜！</div>
          </div>
        </div>
        <button class="btn-child" style="min-height: 44px; padding: 0 18px; font-size: 15px; background: rgba(255,255,255,0.15);" onclick="ArenaHall.closeGomoku()">
          ↩️ 返回乐园
        </button>
      </div>

      <div class="tool-stage-box">
        <!-- 9×9 棋盘 -->
        <div class="gomoku-board" id="gomoku-board-dom" style="grid-template-columns: repeat(${BOARD_SIZE}, 32px); grid-template-rows: repeat(${BOARD_SIZE}, 32px);">
          ${renderBoardCells()}
        </div>

        <div style="display: flex; gap: 14px; margin-top: 18px;">
          <button class="btn-child btn-arena" onclick="ArenaHall.restartGame()">
            🔄 重新开局
          </button>
          <button class="btn-child" style="background: rgba(255,255,255,0.15);" onclick="ArenaHall.closeGomoku()">
            🏆 体验其他游戏
          </button>
        </div>
      </div>
    `;
  }

  function renderBoardCells() {
    let html = '';
    for (let r = 0; r < BOARD_SIZE; r++) {
      for (let c = 0; c < BOARD_SIZE; c++) {
        const val = board[r][c];
        let pieceHtml = '';
        if (val === 1) pieceHtml = '<div class="stone-black"></div>';
        if (val === 2) pieceHtml = '<div class="stone-white"></div>';

        html += `
          <div class="gomoku-cell" onclick="ArenaHall.handleCellClick(${r}, ${c})">
            ${pieceHtml}
          </div>
        `;
      }
    }
    return html;
  }

  function handleCellClick(r, c) {
    if (isGameOver || board[r][c] !== 0) return;

    // 玩家落黑子
    board[r][c] = 1;
    SoundEngine.playNote(2, 'square');
    updateBoard();

    if (checkWin(r, c, 1)) {
      isGameOver = true;
      SoundEngine.playSuccess();
      AppState.addStarlight(15, null, '在竞技乐园战胜五子棋AI');
      App.showToast('🎉 太厉害啦！五子连珠战胜了小狮子！+15 星光 ✨');
      App.fireConfetti();
      return;
    }

    // AI 应答
    setTimeout(aiTurn, 300);
  }

  function aiTurn() {
    if (isGameOver) return;

    // 寻找最佳空位 (贪心寻找临近空格)
    let bestR = -1, bestC = -1;
    let maxDist = 99;

    for (let r = 0; r < BOARD_SIZE; r++) {
      for (let c = 0; c < BOARD_SIZE; c++) {
        if (board[r][c] === 0) {
          // 靠近中心的空格优先
          const d = Math.abs(r - 4) + Math.abs(c - 4);
          if (d < maxDist) {
            maxDist = d;
            bestR = r;
            bestC = c;
          }
        }
      }
    }

    if (bestR !== -1) {
      board[bestR][bestC] = 2;
      SoundEngine.playNote(0, 'triangle');
      updateBoard();

      if (checkWin(bestR, bestC, 2)) {
        isGameOver = true;
        SoundEngine.playJellyShake();
        App.showToast('🦁 小狮子连成五子啦，继续加油！点击重新开局再来一盘！');
      }
    }
  }

  function updateBoard() {
    const b = document.getElementById('gomoku-board-dom');
    if (b) b.innerHTML = renderBoardCells();
  }

  function restartGame() {
    resetBoard();
    updateBoard();
    SoundEngine.playSuccess();
  }

  function checkWin(r, c, player) {
    const dirs = [[1, 0], [0, 1], [1, 1], [1, -1]];
    for (const [dr, dc] of dirs) {
      let count = 1;
      // 正向
      let nr = r + dr, nc = c + dc;
      while (nr >= 0 && nr < BOARD_SIZE && nc >= 0 && nc < BOARD_SIZE && board[nr][nc] === player) {
        count++; nr += dr; nc += dc;
      }
      // 反向
      nr = r - dr; nc = c - dc;
      while (nr >= 0 && nr < BOARD_SIZE && nc >= 0 && nc < BOARD_SIZE && board[nr][nc] === player) {
        count++; nr -= dr; nc -= dc;
      }
      if (count >= 5) return true;
    }
    return false;
  }

  return {
    render,
    openGomoku,
    closeGomoku,
    handleCellClick,
    restartGame
  };
})();
