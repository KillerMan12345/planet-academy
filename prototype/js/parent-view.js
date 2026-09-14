/* ==========================================================================
   📊 家长中心 (Parent Center View)
   包含：防误触安全算术门禁、五维能力雷达图、学情日志与时长管理
   ========================================================================== */

const ParentView = (function () {
  let isUnlocked = false;
  let mathNum1 = 7;
  let mathNum2 = 8;

  function generateGateQuestion() {
    mathNum1 = Math.floor(Math.random() * 4) + 6; // 6~9
    mathNum2 = Math.floor(Math.random() * 4) + 6; // 6~9
  }

  function render(container) {
    if (!isUnlocked) {
      renderGate(container);
    } else {
      renderDashboard(container);
    }
  }

  // 🔒 1. 防误触算术门禁
  function renderGate(container) {
    generateGateQuestion();
    const correctAns = mathNum1 * mathNum2;

    container.innerHTML = `
      <div class="college-header" style="border-left: 6px solid #636e72;">
        <div class="college-title-group">
          <span style="font-size: 32px;">📊</span>
          <div>
            <div class="college-main-title">家长管控与学情中心</div>
            <div class="college-sub-motto">安全隔离儿童学习端与家长管理端</div>
          </div>
        </div>
        <button class="btn-child" style="min-height: 44px; padding: 0 18px; font-size: 15px; background: rgba(255,255,255,0.15);" onclick="App.navigate('cosmos')">
          ↩️ 返回大厅
        </button>
      </div>

      <div class="tool-stage-box" style="max-width: 480px; margin: 40px auto; text-align: center;">
        <div style="font-size: 52px; margin-bottom: 12px;">🛡️</div>
        <div style="font-size: 22px; font-weight: 900; color: #fff;">家长验证门禁</div>
        <div style="font-size: 14px; color: var(--text-muted); margin: 8px 0 24px 0;">
          为避免小朋友误操作，请回答以下乘法题进入家长中心：
        </div>

        <div style="font-size: 32px; font-weight: 900; color: var(--cosmos-accent); margin-bottom: 20px;">
          ${mathNum1} × ${mathNum2} = ?
        </div>

        <div style="display: flex; gap: 12px; justify-content: center;">
          <input type="number" id="gate-input" placeholder="输入答案" 
                 style="width: 140px; height: 50px; border-radius: 16px; border: 2px solid rgba(255,255,255,0.2); background: rgba(0,0,0,0.3); color: #fff; font-size: 24px; text-align: center; font-weight: 800; outline: none;" />
          <button class="btn-child btn-gold" onclick="ParentView.checkGate(${correctAns})">
            验证进入
          </button>
        </div>
      </div>
    `;
  }

  function checkGate(correctAnswer) {
    const input = document.getElementById('gate-input');
    const val = parseInt(input ? input.value : '0', 10);

    if (val === correctAnswer) {
      isUnlocked = true;
      SoundEngine.playSuccess();
      App.navigate('parent');
    } else {
      SoundEngine.playJellyShake();
      App.showToast('⚠️ 答案不正确哦，请重试');
      if (input) {
        input.classList.add('jelly-shake');
        setTimeout(() => input.classList.remove('jelly-shake'), 500);
      }
    }
  }

  // 📊 2. 家长中心仪表盘
  function renderDashboard(container) {
    const s = AppState.get();
    const scores = s.radarScores;

    container.innerHTML = `
      <div class="college-header" style="border-left: 6px solid #636e72;">
        <div class="college-title-group">
          <span style="font-size: 32px;">📊</span>
          <div>
            <div class="college-main-title">家长管理中心 (已解锁)</div>
            <div class="college-sub-motto">全面掌握宝贝的跨学科成长轨迹与视力健康</div>
          </div>
        </div>
        <button class="btn-child" style="min-height: 44px; padding: 0 18px; font-size: 15px; background: rgba(255,255,255,0.15);" onclick="ParentView.lock()">
          🔒 退出管理
        </button>
      </div>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 20px;">
        <!-- 五维雷达图 -->
        <div class="tool-stage-box" style="align-items: center;">
          <div style="font-size: 18px; font-weight: 800; color: #fff; margin-bottom: 6px;">五大学院综合能力雷达图</div>
          <div style="font-size: 12px; color: var(--text-muted); margin-bottom: 16px;">基于作答正确率与自主探究深度的五维评估</div>

          <div style="width: 280px; height: 260px;">
            ${renderRadarSvg(scores)}
          </div>
        </div>

        <!-- 学习统计与时长管控 -->
        <div style="display: flex; flex-direction: column; gap: 16px;">
          <!-- 核心数据看板 -->
          <div class="tool-stage-box" style="align-items: flex-start;">
            <div style="font-size: 18px; font-weight: 800; color: #fff; margin-bottom: 12px;">📈 今日学习简报</div>
            <div style="display: flex; gap: 24px; width: 100%; justify-content: space-around;">
              <div style="text-align: center;">
                <div style="font-size: 26px; font-weight: 900; color: var(--star-gold);">${s.starlight}</div>
                <div style="font-size: 12px; color: var(--text-muted);">累计星光值</div>
              </div>
              <div style="text-align: center;">
                <div style="font-size: 26px; font-weight: 900; color: #4ecdc4;">${s.todayUsedMinutes} 分钟</div>
                <div style="font-size: 12px; color: var(--text-muted);">今日探索时长</div>
              </div>
              <div style="text-align: center;">
                <div style="font-size: 26px; font-weight: 900; color: #2ecc71;">${s.dailyLog.length} 节</div>
                <div style="font-size: 12px; color: var(--text-muted);">微教具完成数</div>
              </div>
            </div>
          </div>

          <!-- 护眼防沉迷时长设置 -->
          <div class="tool-stage-box" style="align-items: flex-start;">
            <div style="font-size: 18px; font-weight: 800; color: #fff; margin-bottom: 6px;">⏱️ 护眼时长管控</div>
            <div style="font-size: 12px; color: var(--text-muted); margin-bottom: 14px;">达到单次上限将弹出温和休息提示（当前上限：${s.timeLimitMinutes} 分钟）</div>

            <div style="display: flex; gap: 10px;">
              ${[15, 25, 40].map(mins => `
                <button class="btn-child" style="min-height: 40px; padding: 0 14px; font-size: 13px; background: ${s.timeLimitMinutes === mins ? 'var(--col-math-primary)' : 'rgba(255,255,255,0.1)'}"
                        onclick="ParentView.setTimeLimit(${mins})">
                  ${mins} 分钟
                </button>
              `).join('')}
            </div>
          </div>
        </div>
      </div>

      <!-- 纯净公约背书 -->
      <div style="background: rgba(46, 204, 113, 0.15); border: 2px solid #2ecc71; border-radius: var(--radius-card); padding: 16px 20px; display: flex; align-items: center; gap: 16px; margin-top: 20px;">
        <span style="font-size: 32px;">🛡️</span>
        <div>
          <div style="font-size: 16px; font-weight: 800; color: #2ecc71;">星球学院 · 儿童纯净公约</div>
          <div style="font-size: 12px; color: #cbd5e0; margin-top: 2px;">
            承诺：100% 零广告 · 零应用内购买 · 核心资源本地打包离线可用 · 严禁任何儿童隐私数据外传
          </div>
        </div>
      </div>
    `;
  }

  // 动态 SVG 雷达图计算
  function renderRadarSvg(scores) {
    const center = 140;
    const radius = 95;
    const axes = [
      { key: 'lang', label: '语言阅读', angle: -Math.PI / 2 },
      { key: 'math', label: '数理逻辑', angle: -Math.PI / 2 + (2 * Math.PI / 5) },
      { key: 'sci',  label: '科学探究', angle: -Math.PI / 2 + (4 * Math.PI / 5) },
      { key: 'code', label: '少儿编程', angle: -Math.PI / 2 + (6 * Math.PI / 5) },
      { key: 'art',  label: '音乐美育', angle: -Math.PI / 2 + (8 * Math.PI / 5) },
    ];

    // 背景网格线 (3层五边形)
    let gridLines = '';
    [0.33, 0.66, 1.0].forEach(ratio => {
      const pts = axes.map(a => {
        const x = center + radius * ratio * Math.cos(a.angle);
        const y = center + radius * ratio * Math.sin(a.angle);
        return `${x},${y}`;
      }).join(' ');
      gridLines += `<polygon points="${pts}" fill="none" stroke="rgba(255,255,255,0.15)" stroke-width="1.5" />`;
    });

    // 数据多边形
    const dataPts = axes.map(a => {
      const val = (scores[a.key] || 50) / 100;
      const x = center + radius * val * Math.cos(a.angle);
      const y = center + radius * val * Math.sin(a.angle);
      return `${x},${y}`;
    }).join(' ');

    // 标签文字
    let labelsHtml = '';
    axes.forEach(a => {
      const lx = center + (radius + 24) * Math.cos(a.angle);
      const ly = center + (radius + 18) * Math.sin(a.angle);
      labelsHtml += `
        <text x="${lx}" y="${ly}" font-size="11" font-weight="bold" fill="#cbd5e0" text-anchor="middle" dominant-baseline="middle">
          ${a.label} (${scores[a.key]}%)
        </text>
      `;
    });

    return `
      <svg viewBox="0 0 280 280" style="width: 100%; height: 100%;">
        ${gridLines}
        <!-- 填充雷达色块 -->
        <polygon points="${dataPts}" fill="rgba(78, 205, 196, 0.35)" stroke="#4ecdc4" stroke-width="3" />
        ${labelsHtml}
      </svg>
    `;
  }

  function setTimeLimit(mins) {
    const s = AppState.get();
    s.timeLimitMinutes = mins;
    SoundEngine.playSuccess();
    App.showToast(`⏱️ 单次时长上限已调整为 ${mins} 分钟`);
    App.navigate('parent');
  }

  function lock() {
    isUnlocked = false;
    App.navigate('cosmos');
  }

  return {
    render,
    checkGate,
    setTimeLimit,
    lock
  };
})();
