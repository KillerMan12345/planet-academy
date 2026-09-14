/* ==========================================================================
   🪐 星球学院 (Planet Academy) · 核心调度器与路由控制器 (App Controller)
   ========================================================================== */

const App = (function () {
  let currentRoute = 'cosmos';
  let confettiCtx = null;
  let confettiParticles = [];
  let confettiAnimationId = null;

  function init() {
    initCosmicBackground();
    initConfetti();
    initSubscriptions();
    renderRoute(currentRoute);
  }

  // 🌌 1. 宇宙深空随机星辰生成
  function initCosmicBackground() {
    const bg = document.getElementById('cosmos-bg');
    if (!bg) return;
    const starCount = 65;

    for (let i = 0; i < starCount; i++) {
      const star = document.createElement('div');
      star.className = 'star';
      const size = Math.random() * 3 + 1;
      star.style.width = `${size}px`;
      star.style.height = `${size}px`;
      star.style.top = `${Math.random() * 100}%`;
      star.style.left = `${Math.random() * 100}%`;
      star.style.setProperty('--duration', `${Math.random() * 3 + 2}s`);
      star.style.opacity = (Math.random() * 0.7 + 0.3).toFixed(2);
      bg.appendChild(star);
    }
  }

  // 🎊 2. 全屏七彩纸屑彩带粒子引擎
  function initConfetti() {
    const canvas = document.getElementById('confetti-canvas');
    if (!canvas) return;
    confettiCtx = canvas.getContext('2d');
    resizeConfetti();
    window.addEventListener('resize', resizeConfetti);
  }

  function resizeConfetti() {
    const canvas = document.getElementById('confetti-canvas');
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function fireConfetti() {
    if (!confettiCtx) return;
    resizeConfetti();
    const colors = ['#f9d342', '#ff8c42', '#4ecdc4', '#9b59b6', '#2ecc71', '#ff7675'];
    confettiParticles = [];

    for (let i = 0; i < 90; i++) {
      confettiParticles.push({
        x: window.innerWidth / 2 + (Math.random() - 0.5) * 300,
        y: window.innerHeight / 2 - 100,
        r: Math.random() * 7 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        tilt: Math.random() * 10 - 10,
        vx: (Math.random() - 0.5) * 16,
        vy: (Math.random() - 0.5) * 16 - 8,
        gravity: 0.35,
        opacity: 1
      });
    }

    if (confettiAnimationId) cancelAnimationFrame(confettiAnimationId);
    animateConfetti();
  }

  function animateConfetti() {
    if (!confettiCtx) return;
    confettiCtx.clearRect(0, 0, window.innerWidth, window.innerHeight);

    let activeCount = 0;
    confettiParticles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += p.gravity;
      p.opacity -= 0.012;

      if (p.opacity > 0) {
        activeCount++;
        confettiCtx.beginPath();
        confettiCtx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        confettiCtx.fillStyle = p.color;
        confettiCtx.globalAlpha = Math.max(0, p.opacity);
        confettiCtx.fill();
      }
    });

    if (activeCount > 0) {
      confettiAnimationId = requestAnimationFrame(animateConfetti);
    } else {
      confettiCtx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    }
  }

  // 🔔 3. 浮动 Toast 通知
  function showToast(msg) {
    const toast = document.getElementById('reward-toast');
    if (!toast) return;
    toast.innerText = msg;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 2800);
  }

  // 🔄 4. 状态自动订阅与顶部状态栏联动
  function initSubscriptions() {
    AppState.subscribe(state => {
      const starEl = document.getElementById('top-starlight-count');
      if (starEl) starEl.innerText = state.starlight;
    });
  }

  // 🧭 5. 全局路由跳转
  function navigate(routeKey) {
    currentRoute = routeKey;
    SoundEngine.playNote(1);
    renderRoute(routeKey);
    updateDockState(routeKey);

    const vp = document.getElementById('main-viewport');
    if (vp) vp.scrollTop = 0;
  }

  function updateDockState(routeKey) {
    const dockButtons = document.querySelectorAll('.dock-item');
    dockButtons.forEach(btn => {
      const route = btn.getAttribute('data-route');
      const isMatch = (route === routeKey) || 
                      (route === 'cosmos' && routeKey.startsWith('college')) ||
                      (route === 'arena' && routeKey === 'arena');
      btn.classList.toggle('active', isMatch);
    });
  }

  function renderRoute(routeKey) {
    const vp = document.getElementById('main-viewport');
    if (!vp) return;

    if (routeKey === 'cosmos') {
      renderCosmosHub(vp);
    } else if (routeKey === 'planet') {
      PlanetView.render(vp);
    } else if (routeKey === 'college-lang') {
      CollegeLanguage.render(vp);
    } else if (routeKey === 'college-math') {
      CollegeMath.render(vp);
    } else if (routeKey === 'college-sci') {
      CollegeScience.render(vp);
    } else if (routeKey === 'college-code') {
      CollegeCoding.render(vp);
    } else if (routeKey === 'college-art') {
      CollegeArts.render(vp);
    } else if (routeKey === 'arena') {
      ArenaHall.render(vp);
    } else if (routeKey === 'parent') {
      ParentView.render(vp);
    }
  }

  // 🌌 宇宙大厅 (Cosmos Hub 主页)
  function renderCosmosHub(container) {
    const s = AppState.get();

    container.innerHTML = `
      <div class="cosmos-view">
        <!-- 核心主角：我的专属星球概览卡片 -->
        <div class="planet-hero-card">
          <div class="planet-stage-tag">🌟 第 ${s.planetStage} 纪元 · 我的星球</div>

          <div class="planet-sphere-wrap" onclick="App.navigate('planet')">
            <div class="planet-sphere planet-stage-${s.planetStage}">
              <div class="planet-ring"></div>
            </div>
            <!-- 小狮子守护兽 -->
            <div class="planet-mascot">
              ${s.pet.avatar}
              <div class="mascot-bubble">来探索吧！</div>
            </div>
          </div>

          <div class="planet-desc">
            你已经积累了 <b>${s.starlight}</b> 颗星光！正在照亮整座星球生态。
          </div>

          <div class="planet-actions">
            <button class="btn-child btn-gold" onclick="App.navigate('planet')">
              🪐 进入星球建设大世界
            </button>
          </div>
        </div>

        <!-- 🏛️ 五大学院与竞技乐园直达卡片矩阵 -->
        <div style="font-size: 18px; font-weight: 800; color: #fff; margin-top: 6px;">五大学院探索空间：</div>

        <div class="colleges-grid">
          <!-- 1. 语言阅读学院 -->
          <div class="college-card card-lang" onclick="App.navigate('college-lang')">
            <div class="card-top">
              <div class="college-info">
                <div class="college-title">语言阅读学院</div>
                <div class="college-motto">“每个字，都是通往世界的一扇窗”</div>
              </div>
              <div class="college-icon">📖</div>
            </div>
            <div class="card-bottom">
              <div class="module-badges">
                <span class="module-badge">怪兽喂字母</span>
                <span class="module-badge">象形汉字理</span>
                <span class="module-badge">古诗情景</span>
              </div>
              <span class="enter-chip">探索 ➔</span>
            </div>
          </div>

          <!-- 2. 数理逻辑学院 -->
          <div class="college-card card-math" onclick="App.navigate('college-math')">
            <div class="card-top">
              <div class="college-info">
                <div class="college-title">数理逻辑学院</div>
                <div class="college-motto">“数字是宇宙万物运行的奇妙语言”</div>
              </div>
              <div class="college-icon">🔢</div>
            </div>
            <div class="card-bottom">
              <div class="module-badges">
                <span class="module-badge">CPA 十格阵</span>
                <span class="module-badge">代数平衡天平</span>
                <span class="module-badge">凑十法则</span>
              </div>
              <span class="enter-chip">探索 ➔</span>
            </div>
          </div>

          <!-- 3. 科学探究学院 -->
          <div class="college-card card-sci" onclick="App.navigate('college-sci')">
            <div class="card-top">
              <div class="college-info">
                <div class="college-title">科学探究学院</div>
                <div class="college-motto">“像科学家一样观察、猜想与动手实验”</div>
              </div>
              <div class="college-icon">🔬</div>
            </div>
            <div class="card-bottom">
              <div class="module-badges">
                <span class="module-badge">PhET 浮沉实验</span>
                <span class="module-badge">闭合电路点亮</span>
                <span class="module-badge">密度阿基米德</span>
              </div>
              <span class="enter-chip">探索 ➔</span>
            </div>
          </div>

          <!-- 4. 少儿编程学院 -->
          <div class="college-card card-code" onclick="App.navigate('college-code')">
            <div class="card-top">
              <div class="college-info">
                <div class="college-title">少儿编程学院</div>
                <div class="college-motto">“用积木拼装逻辑，指挥机器人探索宇宙”</div>
              </div>
              <div class="college-icon">💻</div>
            </div>
            <div class="card-bottom">
              <div class="module-badges">
                <span class="module-badge">Blockly 迷宫</span>
                <span class="module-badge">计算思维执行流</span>
                <span class="module-badge">宝石寻宝</span>
              </div>
              <span class="enter-chip">探索 ➔</span>
            </div>
          </div>

          <!-- 5. 音乐美育学院 -->
          <div class="college-card card-art" onclick="App.navigate('college-art')">
            <div class="card-top">
              <div class="college-info">
                <div class="college-title">音乐美育学院</div>
                <div class="college-motto">“让耳朵和眼睛感受节拍与色彩的共鸣”</div>
              </div>
              <div class="college-icon">🎨</div>
            </div>
            <div class="card-bottom">
              <div class="module-badges">
                <span class="module-badge">Song Maker 编曲</span>
                <span class="module-badge">小星星名曲</span>
                <span class="module-badge">霓虹魔法画布</span>
              </div>
              <span class="enter-chip">探索 ➔</span>
            </div>
          </div>

          <!-- 6. 智力竞技乐园 -->
          <div class="college-card card-arena" onclick="App.navigate('arena')">
            <div class="card-top">
              <div class="college-info">
                <div class="college-title">智力竞技乐园</div>
                <div class="college-motto">“15 款经典棋类对局，智慧切磋”</div>
              </div>
              <div class="college-icon">🏆</div>
            </div>
            <div class="card-bottom">
              <div class="module-badges">
                <span class="module-badge">五子棋 AI</span>
                <span class="module-badge">象棋对决</span>
                <span class="module-badge">15 款益智大厅</span>
              </div>
              <span class="enter-chip">对战 ➔</span>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  function toggleAudio() {
    const isMuted = SoundEngine.toggleMute();
    const btn = document.getElementById('btn-audio-toggle');
    if (btn) btn.innerText = isMuted ? '🔇' : '🔊';
    showToast(isMuted ? '已静音' : '音效已开启 🔊');
  }

  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  }

  return {
    init,
    navigate,
    showToast,
    fireConfetti,
    toggleAudio,
    toggleFullscreen
  };
})();

// DOM 加载完成后启动
window.addEventListener('DOMContentLoaded', () => {
  App.init();
});
