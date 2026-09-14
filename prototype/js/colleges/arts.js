/* ==========================================================================
   🎨 音乐美育学院 (Arts College) 交互微教具
   包含：Chrome Music Lab 风格 Song Maker 编曲矩阵、霓虹魔法画板
   ========================================================================== */

const CollegeArts = (function () {
  // 8 步 × 4 音高 矩阵状态 (0: 无, 1: 激活)
  let matrix = Array.from({ length: 4 }, () => Array(8).fill(false));
  let isPlaying = false;
  let playInterval = null;
  let currentStep = 0;
  let currentTab = 'songmaker';

  // 预设小星星
  function loadTwinkle() {
    matrix = Array.from({ length: 4 }, () => Array(8).fill(false));
    // 4 行: 0: C5 (高音), 1: G4, 2: E4, 3: C4 (低音)
    // 1 1 5 5 6 6 5 - (对应: C4 C4 G4 G4 A4 A4 G4)
    // 我们用 4 档: 3(C4), 2(E4), 1(G4), 0(C5)
    matrix[3][0] = true; matrix[3][1] = true; // C4 C4
    matrix[1][2] = true; matrix[1][3] = true; // G4 G4
    matrix[0][4] = true; matrix[0][5] = true; // C5 C5
    matrix[1][6] = true;                      // G4
    renderMatrix();
    SoundEngine.playSuccess();
    App.showToast('🌟 已加载《小星星》旋律谱！点击播放听听看');
  }

  function render(container) {
    container.innerHTML = `
      <div class="college-header" style="border-left: 6px solid var(--col-art-primary);">
        <div class="college-title-group">
          <span style="font-size: 32px;">🎨</span>
          <div>
            <div class="college-main-title">音乐美育学院</div>
            <div class="college-sub-motto">“让耳朵和眼睛感受节拍与色彩的共鸣”</div>
          </div>
        </div>
        <button class="btn-child btn-art" onclick="App.navigate('cosmos')" style="min-height: 44px; padding: 0 18px; font-size: 15px;">
          🪐 返回大厅
        </button>
      </div>

      <div class="college-tabs">
        <button class="college-tab-btn ${currentTab === 'songmaker' ? 'active' : ''}" onclick="CollegeArts.switchTab('songmaker')">
          🎵 Song Maker 编曲矩阵
        </button>
        <button class="college-tab-btn ${currentTab === 'doodle' ? 'active' : ''}" onclick="CollegeArts.switchTab('doodle')">
          🖌️ 霓虹魔法画板
        </button>
      </div>

      <div id="art-stage-content"></div>
    `;

    renderCurrentTab();
  }

  function switchTab(tabKey) {
    stopPlay();
    currentTab = tabKey;
    renderCurrentTab();
  }

  function renderCurrentTab() {
    const stage = document.getElementById('art-stage-content');
    if (!stage) return;
    if (currentTab === 'songmaker') {
      renderSongMaker(stage);
    } else {
      renderDoodleCanvas(stage);
    }
  }

  // 🎵 1. Song Maker 编曲矩阵
  function renderSongMaker(stage) {
    stage.innerHTML = `
      <div class="tool-stage-box">
        <div class="music-maker-box">
          <div style="text-align: center; margin-bottom: 8px;">
            <div style="font-size: 20px; font-weight: 800; color: var(--col-art-primary);">🎶 彩色音符矩阵：创作你的第一首童年乐章</div>
            <div style="font-size: 13px; color: var(--text-muted); margin-top: 4px;">
              点击彩色方块点亮音符，每一列代表一个节拍，点击“播放”即可循环演奏！
            </div>
          </div>

          <!-- 8×4 乐谱矩阵 -->
          <div class="music-matrix" id="music-matrix-dom">
            ${renderMatrixHtml()}
          </div>

          <!-- 控制操作区 -->
          <div style="display: flex; gap: 12px; flex-wrap: wrap; justify-content: center; margin-top: 10px;">
            <button class="btn-child btn-art" id="btn-toggle-play" onclick="CollegeArts.togglePlay()">
              ${isPlaying ? '⏸️ 暂停播放' : '▶️ 播放旋律'}
            </button>
            <button class="btn-child btn-gold" onclick="CollegeArts.loadTwinkle()">
              🌟 示例：小星星
            </button>
            <button class="btn-child" style="background: rgba(255,255,255,0.15);" onclick="CollegeArts.clearMatrix()">
              🗑️ 清空乐谱
            </button>
          </div>
        </div>
      </div>
    `;
  }

  function renderMatrixHtml() {
    let html = '';
    const pitchColors = ['active-p1', 'active-p2', 'active-p3', 'active-p4'];
    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 8; c++) {
        const isActive = matrix[r][c];
        const isColPlaying = isPlaying && (currentStep === c);
        const activeClass = isActive ? pitchColors[r] : '';
        const playColClass = isColPlaying ? 'playing-col' : '';

        html += `
          <div class="music-cell ${activeClass} ${playColClass}" 
               data-r="${r}" data-c="${c}"
               onclick="CollegeArts.toggleCell(${r}, ${c})">
          </div>
        `;
      }
    }
    return html;
  }

  function renderMatrix() {
    const dom = document.getElementById('music-matrix-dom');
    if (dom) dom.innerHTML = renderMatrixHtml();
  }

  function toggleCell(r, c) {
    matrix[r][c] = !matrix[r][c];
    if (matrix[r][c]) {
      // 试听单音 (3-r 映射到低高音阶)
      SoundEngine.playNote(3 - r);
    }
    renderMatrix();
  }

  function togglePlay() {
    if (isPlaying) {
      stopPlay();
    } else {
      startPlay();
    }
    const btn = document.getElementById('btn-toggle-play');
    if (btn) btn.innerHTML = isPlaying ? '⏸️ 暂停播放' : '▶️ 播放旋律';
  }

  function startPlay() {
    isPlaying = true;
    currentStep = 0;
    AppState.addStarlight(5, 'art', '在音乐工坊中编曲并演奏乐章');

    playInterval = setInterval(() => {
      // 演奏当前列所有激活的音符
      for (let r = 0; r < 4; r++) {
        if (matrix[r][currentStep]) {
          SoundEngine.playNote(3 - r);
        }
      }
      renderMatrix();
      currentStep = (currentStep + 1) % 8;
    }, 320);
  }

  function stopPlay() {
    isPlaying = false;
    if (playInterval) clearInterval(playInterval);
    playInterval = null;
    renderMatrix();
  }

  function clearMatrix() {
    stopPlay();
    matrix = Array.from({ length: 4 }, () => Array(8).fill(false));
    renderMatrix();
  }

  // 🖌️ 2. 霓虹魔法画板
  function renderDoodleCanvas(stage) {
    stage.innerHTML = `
      <div class="tool-stage-box">
        <div style="text-align: center; margin-bottom: 12px;">
          <div style="font-size: 20px; font-weight: 800; color: var(--col-art-primary);">✨ 霓虹魔法荧光画布</div>
          <div style="font-size: 13px; color: var(--text-muted); margin-top: 4px;">用手指或鼠标尽情涂鸦，绘制属于你的星球生物</div>
        </div>

        <canvas id="doodle-canvas" width="360" height="240" style="background: #111424; border: 3px solid #f39c12; border-radius: 16px; cursor: crosshair; touch-action: none; box-shadow: 0 8px 24px rgba(0,0,0,0.5);"></canvas>

        <div style="display: flex; gap: 12px; margin-top: 14px;">
          <button class="btn-child btn-art" onclick="CollegeArts.clearCanvas()">
            🧹 一键擦除
          </button>
          <button class="btn-child btn-gold" onclick="CollegeArts.saveDoodle()">
            🌟 完成画作 (+5 星光)
          </button>
        </div>
      </div>
    `;

    setTimeout(initCanvas, 50);
  }

  function initCanvas() {
    const canvas = document.getElementById('doodle-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let drawing = false;

    ctx.strokeStyle = '#f9d342';
    ctx.lineWidth = 6;
    ctx.lineCap = 'round';
    ctx.shadowBlur = 12;
    ctx.shadowColor = '#f9d342';

    function start(e) {
      drawing = true;
      draw(e);
    }
    function stop() {
      drawing = false;
      ctx.beginPath();
    }
    function draw(e) {
      if (!drawing) return;
      const rect = canvas.getBoundingClientRect();
      const x = (e.clientX || (e.touches && e.touches[0].clientX)) - rect.left;
      const y = (e.clientY || (e.touches && e.touches[0].clientY)) - rect.top;

      ctx.lineTo(x, y);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(x, y);
    }

    canvas.addEventListener('mousedown', start);
    canvas.addEventListener('mouseup', stop);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('touchstart', start, { passive: false });
    canvas.addEventListener('touchend', stop);
    canvas.addEventListener('touchmove', (e) => { e.preventDefault(); draw(e); }, { passive: false });
  }

  function clearCanvas() {
    const canvas = document.getElementById('doodle-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    SoundEngine.playJellyShake();
  }

  function saveDoodle() {
    SoundEngine.playSuccess();
    AppState.addStarlight(5, 'art', '创作了一幅霓虹魔法荧光画');
    App.showToast('🎉 画作已展示在星球艺术馆！+5 星光 ✨');
    App.fireConfetti();
  }

  return {
    render,
    switchTab,
    toggleCell,
    togglePlay,
    loadTwinkle,
    clearMatrix,
    clearCanvas,
    saveDoodle
  };
})();
