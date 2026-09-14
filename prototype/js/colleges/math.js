/* ==========================================================================
   🔢 数理逻辑学院 (Math College) 交互微教具
   包含：新加坡数学 CPA 十格阵 (Ten-Frame) 凑十法、代数天平平衡模拟
   ========================================================================== */

const CollegeMath = (function () {
  let currentProblemIdx = 0;
  let isTenMerged = false;
  let currentTab = 'tenframe';

  // 代数天平状态
  let scaleTargetWeight = 8;
  let scaleFixedRight = 2;
  let scaleSelectedX = null;

  function render(container) {
    container.innerHTML = `
      <div class="college-header" style="border-left: 6px solid var(--col-math-primary);">
        <div class="college-title-group">
          <span style="font-size: 32px;">🔢</span>
          <div>
            <div class="college-main-title">数理逻辑学院</div>
            <div class="college-sub-motto">“数字是宇宙万物运行的奇妙语言”</div>
          </div>
        </div>
        <button class="btn-child btn-math" onclick="App.navigate('cosmos')" style="min-height: 44px; padding: 0 18px; font-size: 15px;">
          🪐 返回大厅
        </button>
      </div>

      <div class="college-tabs">
        <button class="college-tab-btn ${currentTab === 'tenframe' ? 'active' : ''}" onclick="CollegeMath.switchTab('tenframe')">
          🧮 CPA 十格阵凑十法
        </button>
        <button class="college-tab-btn ${currentTab === 'scale' ? 'active' : ''}" onclick="CollegeMath.switchTab('scale')">
          ⚖️ 代数等式天平
        </button>
      </div>

      <div id="math-stage-content"></div>
    `;

    renderCurrentTab();
  }

  function switchTab(tabKey) {
    currentTab = tabKey;
    renderCurrentTab();
  }

  function renderCurrentTab() {
    const stage = document.getElementById('math-stage-content');
    if (!stage) return;
    if (currentTab === 'tenframe') {
      renderTenFrame(stage);
    } else {
      renderBalanceScale(stage);
    }
  }

  // 🧮 1. CPA 十格阵凑十法
  function renderTenFrame(stage) {
    const prob = PlanetData.cpaProblems[currentProblemIdx] || PlanetData.cpaProblems[0];

    // 计算当前两个格子的珠子数量
    const frame1Count = isTenMerged ? 10 : prob.numA;
    const frame2Count = isTenMerged ? prob.splitB.part2 : prob.numB;

    stage.innerHTML = `
      <div class="tool-stage-box">
        <div class="cpa-container">
          <div class="cpa-equation-card">
            ${prob.numA} + ${prob.numB} = <span style="color: var(--star-gold);">${isTenMerged ? prob.answer : '?'}</span>
          </div>

          <div style="font-size: 15px; color: #a0aec0; text-align: center;">
            ${isTenMerged ? `✨ 瞧！${prob.numA} 和 ${prob.splitB.part1} 凑成了整整 10 个，再加上剩下的 ${prob.splitB.part2} 个，答案是 ${prob.answer}！` : `第一盒有 ${prob.numA} 个红色棋子，第二盒有 ${prob.numB} 个蓝色棋子。`}
          </div>

          <div class="ten-frames-grid-wrap">
            <!-- 盒子 1 -->
            <div>
              <div style="font-size: 13px; font-weight: 800; color: #ff7675; margin-bottom: 6px; text-align: center;">
                一号盒 (${isTenMerged ? '已凑满 10' : prob.numA + ' 个'})
              </div>
              <div class="ten-frame-grid">
                ${Array.from({ length: 10 }).map((_, i) => {
                  if (i < prob.numA) {
                    return `<div class="frame-cell"><div class="cpa-counter counter-red"></div></div>`;
                  } else if (isTenMerged && i < 10) {
                    return `<div class="frame-cell"><div class="cpa-counter counter-blue"></div></div>`;
                  } else {
                    return `<div class="frame-cell"></div>`;
                  }
                }).join('')}
              </div>
            </div>

            <!-- 盒子 2 -->
            <div>
              <div style="font-size: 13px; font-weight: 800; color: #74b9ff; margin-bottom: 6px; text-align: center;">
                二号盒 (剩余 ${frame2Count} 个)
              </div>
              <div class="ten-frame-grid">
                ${Array.from({ length: 10 }).map((_, i) => {
                  if (i < frame2Count) {
                    return `<div class="frame-cell"><div class="cpa-counter counter-blue"></div></div>`;
                  } else {
                    return `<div class="frame-cell"></div>`;
                  }
                }).join('')}
              </div>
            </div>
          </div>

          <div style="display: flex; gap: 14px; margin-top: 10px;">
            ${!isTenMerged ? `
              <button class="btn-child btn-math" onclick="CollegeMath.triggerMerge()">
                ✨ 动动脑：一键“凑十”归纳！
              </button>
            ` : `
              <button class="btn-child btn-gold" onclick="CollegeMath.completeProblem()">
                🎉 我懂了！领取星光通关！
              </button>
            `}
          </div>
        </div>
      </div>
    `;
  }

  function triggerMerge() {
    isTenMerged = true;
    SoundEngine.playSuccess();
    renderCurrentTab();
  }

  function completeProblem() {
    const prob = PlanetData.cpaProblems[currentProblemIdx];
    AppState.addStarlight(8, 'math', `掌握 CPA 凑十法 ${prob.numA} + ${prob.numB} = ${prob.answer}`);
    App.showToast('🎉 太棒啦！具象数感能力跃升 +8 星光 ✨');
    App.fireConfetti();

    isTenMerged = false;
    currentProblemIdx = (currentProblemIdx + 1) % PlanetData.cpaProblems.length;
    renderCurrentTab();
  }

  // ⚖️ 2. 代数等式天平
  function renderBalanceScale(stage) {
    const rightTotal = scaleSelectedX !== null ? (scaleSelectedX + scaleFixedRight) : scaleFixedRight;
    const isBalanced = rightTotal === scaleTargetWeight;
    const tiltAngle = isBalanced ? 0 : (scaleTargetWeight > rightTotal ? -8 : 8);

    stage.innerHTML = `
      <div class="tool-stage-box">
        <div style="text-align: center; margin-bottom: 12px;">
          <div style="font-size: 22px; font-weight: 900; color: var(--col-math-primary);">⚖️ 寻找未知数 X：天平平衡实验</div>
          <div style="font-size: 13px; color: var(--text-muted); margin-top: 4px;">
            左盘重 <b>${scaleTargetWeight}kg</b>，右盘已有 <b>${scaleFixedRight}kg</b>，神秘箱 <b>X</b> 应该是多少千克才能平衡？
          </div>
        </div>

        <!-- SVG 物理平衡天平 -->
        <div style="width: 320px; height: 180px; position: relative; margin: 10px 0;">
          <svg viewBox="0 0 320 180" style="width: 100%; height: 100%;">
            <!-- 底座 -->
            <polygon points="160,80 130,170 190,170" fill="#3a506b" />
            <!-- 支点 -->
            <circle cx="160" cy="80" r="10" fill="#f9d342" />

            <!-- 动态横梁 -->
            <g transform="rotate(${tiltAngle}, 160, 80)" style="transition: transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);">
              <line x1="30" y1="80" x2="290" y2="80" stroke="#f9d342" stroke-width="8" stroke-linecap="round" />
              <!-- 左吊盘 -->
              <line x1="40" y1="80" x2="40" y2="130" stroke="#fff" stroke-width="2" />
              <rect x="10" y="130" width="60" height="8" rx="4" fill="#4ecdc4" />
              <!-- 左盘重物 -->
              <text x="40" y="122" font-size="14" font-weight="bold" fill="#fff" text-anchor="middle">8kg</text>

              <!-- 右吊盘 -->
              <line x1="280" y1="80" x2="280" y2="130" stroke="#fff" stroke-width="2" />
              <rect x="250" y="130" width="60" height="8" rx="4" fill="#4ecdc4" />
              <!-- 右盘重物 -->
              <text x="280" y="122" font-size="14" font-weight="bold" fill="#fff" text-anchor="middle">
                ${scaleSelectedX !== null ? `X(${scaleSelectedX})+2` : 'X + 2kg'}
              </text>
            </g>
          </svg>
        </div>

        <div style="font-size: 15px; font-weight: 800; color: ${isBalanced ? '#2ecc71' : '#f9d342'}; margin-bottom: 12px;">
          ${isBalanced ? '🎉 天平完全平衡了！等式成立：8 = 6 + 2！' : '天平倾斜中，请选择正确的神秘箱 X 放入右盘：'}
        </div>

        <div style="display: flex; gap: 14px;">
          ${[4, 6, 8].map(weight => `
            <button class="btn-child btn-math" style="min-height: 50px; padding: 0 20px; font-size: 16px; ${scaleSelectedX === weight ? 'border: 3px solid #fff;' : ''}"
                    onclick="CollegeMath.selectX(${weight}, this)">
              📦 X = ${weight} kg
            </button>
          `).join('')}
        </div>
      </div>
    `;
  }

  function selectX(w, element) {
    scaleSelectedX = w;
    if (w + scaleFixedRight === scaleTargetWeight) {
      SoundEngine.playSuccess();
      AppState.addStarlight(8, 'math', '利用天平解出代数等式 X = 6');
      App.showToast('🎉 解题成功！代数平衡思维 +8 星光 ✨');
      App.fireConfetti();
    } else {
      element.classList.add('jelly-shake');
      SoundEngine.playJellyShake();
      setTimeout(() => element.classList.remove('jelly-shake'), 600);
    }
    renderCurrentTab();
  }

  return {
    render,
    switchTab,
    triggerMerge,
    completeProblem,
    selectX
  };
})();
