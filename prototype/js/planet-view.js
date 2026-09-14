/* ==========================================================================
   🪐 我的星球 (My Planet View)
   包含：星球生态大世界、地貌进化、星光升级建造与宠物狮子波波互动
   ========================================================================== */

const PlanetView = (function () {
  const STAGE_NAMES = [
    '',
    '第 1 纪元 · 荒芜小行星 🌑',
    '第 2 纪元 · 萌发苔原 🌿',
    '第 3 纪元 · 生机繁星 🌎',
    '第 4 纪元 · 智慧文明 🛸'
  ];

  function render(container) {
    const s = AppState.get();
    const stageName = STAGE_NAMES[s.planetStage] || STAGE_NAMES[2];

    container.innerHTML = `
      <div class="cosmos-view">
        <div class="college-header" style="border-left: 6px solid var(--star-gold);">
          <div class="college-title-group">
            <span style="font-size: 32px;">🪐</span>
            <div>
              <div class="college-main-title">我的专属学习星球</div>
              <div class="college-sub-motto">${stageName}</div>
            </div>
          </div>
          <button class="btn-child btn-gold" onclick="App.navigate('cosmos')" style="min-height: 44px; padding: 0 18px; font-size: 15px;">
            🌌 宇宙星图
          </button>
        </div>

        <!-- 3D 浮空大星球展示区 -->
        <div class="planet-hero-card" style="padding: 30px 20px;">
          <div class="planet-stage-tag">${stageName}</div>

          <div class="planet-sphere-wrap" style="width: 200px; height: 200px;" onclick="PlanetView.pokePlanet()">
            <div class="planet-sphere planet-stage-${s.planetStage}">
              <div class="planet-ring"></div>
            </div>
            <!-- 狮子守护兽波波 -->
            <div class="planet-mascot" id="mascot-bob" onclick="event.stopPropagation(); PlanetView.petBobo();">
              ${s.pet.avatar}
              <div class="mascot-bubble" id="mascot-bubble">摸摸我！✨</div>
            </div>
          </div>

          <!-- 生态指标展示 -->
          <div style="display: flex; gap: 20px; margin: 16px 0; background: rgba(0,0,0,0.25); padding: 10px 24px; border-radius: 20px;">
            <div style="text-align: center;">
              <div style="font-size: 20px;">🌲</div>
              <div style="font-size: 12px; color: var(--text-muted);">智慧树</div>
              <div style="font-size: 16px; font-weight: 800; color: #2ecc71;">${s.planetFeatures.trees} 棵</div>
            </div>
            <div style="text-align: center;">
              <div style="font-size: 20px;">💧</div>
              <div style="font-size: 12px; color: var(--text-muted);">生命泉</div>
              <div style="font-size: 16px; font-weight: 800; color: #3498db;">${s.planetFeatures.lakes} 处</div>
            </div>
            <div style="text-align: center;">
              <div style="font-size: 20px;">🔭</div>
              <div style="font-size: 12px; color: var(--text-muted);">天文台</div>
              <div style="font-size: 16px; font-weight: 800; color: #9b59b6;">${s.planetFeatures.observatory} 座</div>
            </div>
            <div style="text-align: center;">
              <div style="font-size: 20px;">🍖</div>
              <div style="font-size: 12px; color: var(--text-muted);">波波饱食度</div>
              <div style="font-size: 16px; font-weight: 800; color: var(--star-gold);">${s.pet.hunger}%</div>
            </div>
          </div>

          <!-- 伴侣互动与喂食按钮 -->
          <div style="display: flex; gap: 12px; flex-wrap: wrap; justify-content: center;">
            <button class="btn-child btn-gold" onclick="PlanetView.feedBobo()">
              🍖 喂养小狮子 (-5 星光)
            </button>
            <button class="btn-child" style="background: rgba(255,255,255,0.15);" onclick="PlanetView.petBobo()">
              👋 摸摸波波头
            </button>
          </div>
        </div>

        <!-- 星球生态建造所 -->
        <div style="background: rgba(28, 37, 65, 0.85); border: 2px solid rgba(255,255,255,0.1); border-radius: var(--radius-card); padding: 22px;">
          <div style="font-size: 18px; font-weight: 800; color: #fff; margin-bottom: 6px;">🛠️ 星球生态建造所</div>
          <div style="font-size: 13px; color: var(--text-muted); margin-bottom: 16px;">
            消耗做题收获的星光值，为你的星球添砖加瓦，驱动地貌向更高纪元进化！
          </div>

          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 14px;">
            <!-- 建造树木 -->
            <div style="background: rgba(255,255,255,0.06); border: 2px solid rgba(46, 204, 113, 0.3); border-radius: 18px; padding: 16px; display: flex; flex-direction: column; justify-content: space-between; gap: 10px;">
              <div style="display: flex; align-items: center; gap: 10px;">
                <span style="font-size: 32px;">🌲</span>
                <div>
                  <div style="font-size: 16px; font-weight: 800; color: #fff;">栽种智慧森林</div>
                  <div style="font-size: 12px; color: var(--text-muted);">为星球提供绿意与氧气</div>
                </div>
              </div>
              <button class="btn-child" style="background: var(--col-math-grad); min-height: 44px; padding: 0 16px; font-size: 14px;" onclick="PlanetView.build('trees')">
                ✨ 建造 (10 星光)
              </button>
            </div>

            <!-- 建造水系 -->
            <div style="background: rgba(255,255,255,0.06); border: 2px solid rgba(52, 152, 219, 0.3); border-radius: 18px; padding: 16px; display: flex; flex-direction: column; justify-content: space-between; gap: 10px;">
              <div style="display: flex; align-items: center; gap: 10px;">
                <span style="font-size: 32px;">💧</span>
                <div>
                  <div style="font-size: 16px; font-weight: 800; color: #fff;">引流生命泉水</div>
                  <div style="font-size: 12px; color: var(--text-muted);">汇聚水流，孕育奇迹</div>
                </div>
              </div>
              <button class="btn-child" style="background: var(--col-sci-grad); min-height: 44px; padding: 0 16px; font-size: 14px;" onclick="PlanetView.build('lakes')">
                ✨ 建造 (15 星光)
              </button>
            </div>

            <!-- 建造天文台 -->
            <div style="background: rgba(255,255,255,0.06); border: 2px solid rgba(155, 89, 182, 0.3); border-radius: 18px; padding: 16px; display: flex; flex-direction: column; justify-content: space-between; gap: 10px;">
              <div style="display: flex; align-items: center; gap: 10px;">
                <span style="font-size: 32px;">🔭</span>
                <div>
                  <div style="font-size: 16px; font-weight: 800; color: #fff;">筑造星际天文台</div>
                  <div style="font-size: 12px; color: var(--text-muted);">观测星系，迈入智慧纪元</div>
                </div>
              </div>
              <button class="btn-child" style="background: var(--col-code-grad); min-height: 44px; padding: 0 16px; font-size: 14px;" onclick="PlanetView.build('observatory')">
                ✨ 建造 (25 星光)
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  function petBobo() {
    const bubbles = [
      '哇！波波好喜欢你！🦁',
      '今天学到新知识了吗？✨',
      '一起把星球变成最美丽的家园吧！🌏',
      '摸摸头，今天也是聪明的一天！'
    ];
    const b = document.getElementById('mascot-bubble');
    if (b) {
      b.innerText = bubbles[Math.floor(Math.random() * bubbles.length)];
      b.style.display = 'block';
    }
    SoundEngine.playSuccess();
    const bob = document.getElementById('mascot-bob');
    if (bob) {
      bob.classList.add('jelly-shake');
      setTimeout(() => bob.classList.remove('jelly-shake'), 500);
    }
  }

  function pokePlanet() {
    SoundEngine.playCoin();
    App.showToast('🪐 星球脉冲共鸣！正在汲取宇宙星尘养料...');
  }

  function feedBobo() {
    const res = AppState.feedPet();
    if (res.ok) {
      App.showToast('🍖 ' + res.msg);
      App.fireConfetti();
      const b = document.getElementById('mascot-bubble');
      if (b) b.innerText = '哇！太美味啦！嗷呜～';
      App.navigate('planet');
    } else {
      App.showToast('⚠️ ' + res.msg);
      SoundEngine.playJellyShake();
    }
  }

  function build(type) {
    const res = AppState.upgradeFeature(type);
    if (res.ok) {
      App.showToast('🎉 ' + res.msg);
      App.fireConfetti();
      App.navigate('planet');
    } else {
      App.showToast('💡 ' + res.msg);
      SoundEngine.playJellyShake();
    }
  }

  return {
    render,
    petBobo,
    pokePlanet,
    feedBobo,
    build
  };
})();
