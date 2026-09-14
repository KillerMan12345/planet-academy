/* ==========================================================================
   💻 少儿编程学院 (Coding College) 交互微教具
   包含：Google Blockly 风格积木指令寻宝迷宫
   ========================================================================== */

const CollegeCoding = (function () {
  let robotPos = { r: 1, c: 1, dir: 1 }; // dir: 0:上, 1:右, 2:下, 3:左
  const targetPos = { r: 1, c: 3 };
  const initialPos = { r: 1, c: 1, dir: 1 };
  let programQueue = [];
  let isRunning = false;

  function render(container) {
    container.innerHTML = `
      <div class="college-header" style="border-left: 6px solid var(--col-code-primary);">
        <div class="college-title-group">
          <span style="font-size: 32px;">💻</span>
          <div>
            <div class="college-main-title">少儿编程学院</div>
            <div class="college-sub-motto">“用积木拼装逻辑，指挥机器人探索宇宙”</div>
          </div>
        </div>
        <button class="btn-child btn-code" onclick="App.navigate('cosmos')" style="min-height: 44px; padding: 0 18px; font-size: 15px;">
          🪐 返回大厅
        </button>
      </div>

      <div class="tool-stage-box">
        <div class="code-maze-box">
          <div style="text-align: center; margin-bottom: 6px;">
            <div style="font-size: 20px; font-weight: 800; color: var(--col-code-primary);">🤖 积木指令迷宫：指引机器人收集宝石</div>
            <div style="font-size: 13px; color: var(--text-muted); margin-top: 4px;">
              点击下方积木放入指令槽，然后点击“运行程序”执行！
            </div>
          </div>

          <!-- 5×5 迷宫网格 -->
          <div class="maze-grid" id="maze-grid">
            ${renderGrid()}
          </div>

          <!-- 积木指令操作区 -->
          <div style="width: 100%; max-width: 480px; display: flex; flex-direction: column; gap: 10px;">
            <div style="font-size: 13px; font-weight: 800; color: #cbd5e0;">选择指令积木：</div>
            <div class="block-actions-palette">
              <button class="code-block-btn" onclick="CollegeCoding.addBlock('forward')">
                ⬆️ 前进一步
              </button>
              <button class="code-block-btn" onclick="CollegeCoding.addBlock('turnLeft')">
                ↩️ 向左转
              </button>
              <button class="code-block-btn" onclick="CollegeCoding.addBlock('turnRight')">
                ↪️ 向右转
              </button>
            </div>

            <!-- 当前指令托盘 -->
            <div style="display: flex; align-items: center; justify-content: space-between; margin-top: 6px;">
              <span style="font-size: 13px; font-weight: 800; color: #cbd5e0;">程序执行流 (${programQueue.length} 步)：</span>
              <button onclick="CollegeCoding.clearQueue()" style="background: none; border: none; color: #ff7675; font-size: 13px; font-weight: 800; cursor: pointer;">
                🗑️ 清空
              </button>
            </div>

            <div class="program-queue-tray" id="program-tray">
              ${programQueue.length === 0 ? '<span style="color: #718096; font-size: 13px; margin: auto;">点击上方积木加入程序...</span>' : ''}
              ${programQueue.map((cmd, idx) => `
                <div style="background: var(--col-code-primary); color: #fff; font-size: 12px; font-weight: 800; padding: 6px 10px; border-radius: 10px; white-space: nowrap;">
                  ${idx + 1}. ${cmdName(cmd)}
                </div>
              `).join('')}
            </div>

            <div style="display: flex; gap: 12px; justify-content: center; margin-top: 10px;">
              <button class="btn-child btn-code" onclick="CollegeCoding.runProgram()" ${isRunning ? 'disabled' : ''}>
                ▶️ 运行程序
              </button>
              <button class="btn-child" style="background: rgba(255,255,255,0.15);" onclick="CollegeCoding.resetRobot()">
                🔄 重置位置
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  function cmdName(cmd) {
    if (cmd === 'forward') return '⬆️ 前进';
    if (cmd === 'turnLeft') return '↩️ 左转';
    return '↪️ 右转';
  }

  function renderGrid() {
    let html = '';
    const dirs = ['⬆️', '➡️', '⬇️', '⬅️'];
    for (let r = 0; r < 5; r++) {
      for (let c = 0; c < 5; c++) {
        const isRobot = (r === robotPos.r && c === robotPos.c);
        const isTarget = (r === targetPos.r && c === targetPos.c);
        const isWall = (r === 0 || r === 4 || c === 0 || c === 4 || (r === 2 && c === 2));

        if (isRobot) {
          html += `<div class="maze-cell" style="background: rgba(155, 89, 182, 0.4);"><span style="transform: rotate(0deg); display: inline-block;">🤖</span></div>`;
        } else if (isTarget) {
          html += `<div class="maze-cell" style="background: rgba(249, 211, 66, 0.3); animation: pulseGlow 1.5s infinite;">💎</div>`;
        } else if (isWall) {
          html += `<div class="maze-cell wall">🪨</div>`;
        } else {
          html += `<div class="maze-cell"></div>`;
        }
      }
    }
    return html;
  }

  function addBlock(cmd) {
    if (isRunning) return;
    programQueue.push(cmd);
    SoundEngine.playNote(1);
    updateTray();
  }

  function clearQueue() {
    if (isRunning) return;
    programQueue = [];
    resetRobot();
    updateTray();
  }

  function resetRobot() {
    robotPos = { ...initialPos };
    updateGrid();
  }

  function updateTray() {
    const tray = document.getElementById('program-tray');
    if (!tray) return;
    tray.innerHTML = programQueue.length === 0 
      ? '<span style="color: #718096; font-size: 13px; margin: auto;">点击上方积木加入程序...</span>'
      : programQueue.map((cmd, idx) => `
        <div style="background: var(--col-code-primary); color: #fff; font-size: 12px; font-weight: 800; padding: 6px 10px; border-radius: 10px; white-space: nowrap;">
          ${idx + 1}. ${cmdName(cmd)}
        </div>
      `).join('');
  }

  function updateGrid() {
    const grid = document.getElementById('maze-grid');
    if (grid) grid.innerHTML = renderGrid();
  }

  function runProgram() {
    if (isRunning || programQueue.length === 0) return;
    isRunning = true;
    resetRobot();

    let step = 0;
    const interval = setInterval(() => {
      if (step >= programQueue.length) {
        clearInterval(interval);
        isRunning = false;
        checkWin();
        return;
      }

      const cmd = programQueue[step];
      SoundEngine.playNote(step % 4);

      if (cmd === 'turnRight') {
        robotPos.dir = (robotPos.dir + 1) % 4;
      } else if (cmd === 'turnLeft') {
        robotPos.dir = (robotPos.dir + 3) % 4;
      } else if (cmd === 'forward') {
        const deltas = [[-1, 0], [0, 1], [1, 0], [0, -1]];
        const [dr, dc] = deltas[robotPos.dir];
        const nr = robotPos.r + dr;
        const nc = robotPos.c + dc;

        // 边界与撞墙保护
        if (nr >= 0 && nr < 5 && nc >= 0 && nc < 5 && !(nr === 2 && nc === 2) && nr !== 0 && nr !== 4 && nc !== 0 && nc !== 4) {
          robotPos.r = nr;
          robotPos.c = nc;
        } else {
          // 撞墙温和提示
          SoundEngine.playJellyShake();
        }
      }

      updateGrid();
      step++;
    }, 450);
  }

  function checkWin() {
    if (robotPos.r === targetPos.r && robotPos.c === targetPos.c) {
      SoundEngine.playSuccess();
      AppState.addStarlight(10, 'code', '通过编程迷宫寻路收集宝石');
      App.showToast('🎉 完美通关！计算思维积木指令 +10 星光 ✨');
      App.fireConfetti();
    } else {
      App.showToast('💡 机器人还没走到宝石哦，调整积木再试一次吧！');
    }
  }

  return {
    render,
    addBlock,
    clearQueue,
    resetRobot,
    runProgram
  };
})();
