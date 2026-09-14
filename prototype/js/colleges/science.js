/* ==========================================================================
   🔬 科学探究学院 (Science College) 交互微教具
   包含：PhET 密度与浮力实验室、闭合电路点亮微实验
   ========================================================================== */

const CollegeScience = (function () {
  let currentMaterial = PlanetData.phetMaterials[0]; // 默认木块
  let isSwitchClosed = false;
  let currentTab = 'phet';

  function render(container) {
    container.innerHTML = `
      <div class="college-header" style="border-left: 6px solid var(--col-sci-primary);">
        <div class="college-title-group">
          <span style="font-size: 32px;">🔬</span>
          <div>
            <div class="college-main-title">科学探究学院</div>
            <div class="college-sub-motto">“像科学家一样观察、猜想与动手实验”</div>
          </div>
        </div>
        <button class="btn-child btn-sci" onclick="App.navigate('cosmos')" style="min-height: 44px; padding: 0 18px; font-size: 15px;">
          🪐 返回大厅
        </button>
      </div>

      <div class="college-tabs">
        <button class="college-tab-btn ${currentTab === 'phet' ? 'active' : ''}" onclick="CollegeScience.switchTab('phet')">
          🌊 PhET 密度与浮力实验室
        </button>
        <button class="college-tab-btn ${currentTab === 'circuit' ? 'active' : ''}" onclick="CollegeScience.switchTab('circuit')">
          ⚡ 闭合电路点亮灯泡
        </button>
      </div>

      <div id="sci-stage-content"></div>
    `;

    renderCurrentTab();
  }

  function switchTab(tabKey) {
    currentTab = tabKey;
    renderCurrentTab();
  }

  function renderCurrentTab() {
    const stage = document.getElementById('sci-stage-content');
    if (!stage) return;
    if (currentTab === 'phet') {
      renderPhetTank(stage);
    } else {
      renderCircuit(stage);
    }
  }

  // 🌊 1. PhET 浮沉实验室
  function renderPhetTank(stage) {
    // 水面基准线在 35%
    // 沉浮物体 top 位置计算：
    // floatPercent 是露出水面的百分比 (例如木块40%露出，则水下60%)
    // 铁块 floatPercent = 0，沉入水底 (top: 65%)
    // 泡沫 floatPercent = 85%，高高漂浮 (top: 22%)
    let blockTop = '30%';
    if (currentMaterial.density > 1.0) {
      blockTop = '62%'; // 沉到底部
    } else {
      // 0.15 密度 -> 23%
      // 0.60 密度 -> 31%
      // 0.92 密度 -> 36%
      blockTop = `${20 + (currentMaterial.density * 18)}%`;
    }

    stage.innerHTML = `
      <div class="tool-stage-box">
        <div style="text-align: center; margin-bottom: 14px;">
          <div style="font-size: 22px; font-weight: 900; color: var(--col-sci-primary);">🌊 阿基米德浮沉微实验室</div>
          <div style="font-size: 13px; color: var(--text-muted); margin-top: 4px;">
            纯净水密度为 <b>1.00 g/cm³</b>。选择不同材质立方体投入水槽，观察它的沉浮状态！
          </div>
        </div>

        <div class="phet-tank-wrapper">
          <div class="water-tank">
            <div class="water-surface-line"></div>
            <!-- 沉浮块 -->
            <div class="submerged-block" style="top: ${blockTop}; background: ${currentMaterial.color};">
              <span>${currentMaterial.name}</span>
              <span style="font-size: 10px; opacity: 0.85;">ρ=${currentMaterial.density}</span>
            </div>
          </div>

          <div style="background: rgba(255,255,255,0.08); border-radius: 14px; padding: 10px 18px; width: 100%; text-align: center; font-size: 14px; font-weight: 700; color: var(--cosmos-accent);">
            🔬 科学结论：${currentMaterial.desc}
          </div>

          <div class="material-selector">
            ${PlanetData.phetMaterials.map(m => `
              <button class="material-btn ${currentMaterial.id === m.id ? 'active' : ''}" onclick="CollegeScience.selectMaterial('${m.id}')">
                ${m.name} (ρ=${m.density})
              </button>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  }

  function selectMaterial(id) {
    currentMaterial = PlanetData.phetMaterials.find(m => m.id === id) || PlanetData.phetMaterials[0];
    SoundEngine.playSuccess();
    AppState.addStarlight(5, 'sci', `探究 ${currentMaterial.name} 的沉浮物理规律`);
    App.showToast(`✨ 观察 ${currentMaterial.name}：${currentMaterial.desc}`);
    renderCurrentTab();
  }

  // ⚡ 2. 闭合电路微实验
  function renderCircuit(stage) {
    stage.innerHTML = `
      <div class="tool-stage-box">
        <div style="text-align: center; margin-bottom: 16px;">
          <div style="font-size: 22px; font-weight: 900; color: var(--col-sci-primary);">⚡ 闭合电路：点亮心中的科学小灯泡</div>
          <div style="font-size: 13px; color: var(--text-muted); margin-top: 4px;">
            电荷需要完整的闭合回路才能流动。点击闸刀开关，看看小灯泡会发生什么！
          </div>
        </div>

        <!-- 电路画板 -->
        <div style="width: 320px; height: 220px; background: #172138; border: 3px solid #45b7d1; border-radius: 20px; position: relative; display: flex; align-items: center; justify-content: center;">
          <!-- 导线 -->
          <svg viewBox="0 0 320 220" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none;">
            <!-- 回路导线 -->
            <path d="M 60 110 L 60 40 L 260 40 L 260 110" stroke="${isSwitchClosed ? '#f9d342' : '#718096'}" stroke-width="6" fill="none" stroke-linecap="round" />
            <path d="M 60 110 L 60 180 L 260 180 L 260 110" stroke="${isSwitchClosed ? '#f9d342' : '#718096'}" stroke-width="6" fill="none" stroke-linecap="round" />
          </svg>

          <!-- 电池 位于左侧 -->
          <div style="position: absolute; left: 35px; top: 85px; width: 50px; height: 50px; background: #e74c3c; border: 2px solid #fff; border-radius: 8px; display: flex; flex-direction: column; align-items: center; justify-content: center; font-size: 24px; box-shadow: 0 4px 10px rgba(0,0,0,0.5);">
            🔋
          </div>

          <!-- 开关 位于上方 -->
          <div style="position: absolute; top: 15px; left: 135px; background: #2d3748; border: 2px solid #fff; border-radius: 12px; padding: 6px 14px; cursor: pointer;"
               onclick="CollegeScience.toggleSwitch()">
            <span style="font-size: 13px; font-weight: 800; color: #fff;">
              ${isSwitchClosed ? '🟢 开关：已闭合' : '🔴 开关：已断开'}
            </span>
          </div>

          <!-- 灯泡 位于右侧 -->
          <div style="position: absolute; right: 35px; top: 85px; width: 50px; height: 50px; border-radius: 50%; background: ${isSwitchClosed ? 'radial-gradient(circle, #fff, #f9d342)' : '#4a5568'}; display: flex; align-items: center; justify-content: center; font-size: 32px; box-shadow: ${isSwitchClosed ? '0 0 30px #f9d342, 0 0 60px #f9d342' : 'none'}; transition: all 0.3s;">
            💡
          </div>
        </div>

        <div style="margin-top: 16px;">
          <button class="btn-child btn-sci" onclick="CollegeScience.toggleSwitch()">
            ${isSwitchClosed ? '🔌 断开开关' : '⚡ 闭合开关（点亮）'}
          </button>
        </div>
      </div>
    `;
  }

  function toggleSwitch() {
    isSwitchClosed = !isSwitchClosed;
    if (isSwitchClosed) {
      SoundEngine.playSuccess();
      AppState.addStarlight(8, 'sci', '成功完成闭合回路点亮实验');
      App.showToast('🎉 灯泡亮啦！电路形成完整闭合回路！+8 星光 ✨');
      App.fireConfetti();
    } else {
      SoundEngine.playNote(0);
    }
    renderCurrentTab();
  }

  return {
    render,
    switchTab,
    selectMaterial,
    toggleSwitch
  };
})();
