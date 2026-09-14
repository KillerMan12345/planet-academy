/* ==========================================================================
   📖 语言阅读学院 (Language College) 交互微教具
   包含：Feed The Monster (怪兽吃字母)、汉字象形字理、古诗词情景剧场
   ========================================================================== */

const CollegeLanguage = (function () {
  let currentMonsterIdx = 0;
  let currentTab = 'monster';

  function render(container) {
    container.innerHTML = `
      <div class="college-header" style="border-left: 6px solid var(--col-lang-primary);">
        <div class="college-title-group">
          <span style="font-size: 32px;">📖</span>
          <div>
            <div class="college-main-title">语言阅读学院</div>
            <div class="college-sub-motto">“每个字，都是通往世界的一扇窗”</div>
          </div>
        </div>
        <button class="btn-child btn-lang" onclick="App.navigate('cosmos')" style="min-height: 44px; padding: 0 18px; font-size: 15px;">
          🪐 返回大厅
        </button>
      </div>

      <!-- 学院内部教具切换 -->
      <div class="college-tabs">
        <button class="college-tab-btn ${currentTab === 'monster' ? 'active' : ''}" onclick="CollegeLanguage.switchTab('monster')">
          🍪 怪兽吃字母 (Phonics)
        </button>
        <button class="college-tab-btn ${currentTab === 'hanzi' ? 'active' : ''}" onclick="CollegeLanguage.switchTab('hanzi')">
          🀄 象形汉字理
        </button>
        <button class="college-tab-btn ${currentTab === 'poem' ? 'active' : ''}" onclick="CollegeLanguage.switchTab('poem')">
          🏮 古诗情景剧场
        </button>
      </div>

      <div id="lang-stage-content"></div>
    `;

    renderCurrentTab();
  }

  function switchTab(tabKey) {
    currentTab = tabKey;
    const btns = document.querySelectorAll('.college-tabs .college-tab-btn');
    btns.forEach((btn, idx) => {
      const keys = ['monster', 'hanzi', 'poem'];
      btn.classList.toggle('active', keys[idx] === tabKey);
    });
    renderCurrentTab();
  }

  function renderCurrentTab() {
    const stage = document.getElementById('lang-stage-content');
    if (!stage) return;

    if (currentTab === 'monster') {
      renderMonsterPhonics(stage);
    } else if (currentTab === 'hanzi') {
      renderHanziStory(stage);
    } else {
      renderPoemTheater(stage);
    }
  }

  // 🍪 1. Feed The Monster 字母小怪兽
  function renderMonsterPhonics(stage) {
    const level = PlanetData.monsterLevels[currentMonsterIdx] || PlanetData.monsterLevels[0];

    stage.innerHTML = `
      <div class="tool-stage-box">
        <div class="sound-prompt-pill" id="btn-play-prompt" onclick="CollegeLanguage.playMonsterPrompt()">
          <span class="speaker-icon">🔊</span>
          <span>小怪兽想吃发音为 <b style="color: var(--cosmos-accent); font-size: 22px;">${level.soundText}</b> 的字母！</span>
        </div>

        <div class="monster-arena">
          <div class="monster-creature" id="monster-avatar">
            <div class="monster-eyes">
              <div class="monster-eye"></div>
              <div class="monster-eye"></div>
            </div>
            <div class="monster-mouth" id="monster-mouth"></div>
          </div>

          <div style="font-size: 14px; color: var(--text-muted);">点击正确发音的字母饼干投喂怪兽：</div>

          <div class="letter-cookies-box">
            ${level.options.map(letter => `
              <button class="letter-cookie" onclick="CollegeLanguage.feedCookie('${letter}', this)">
                ${letter}
              </button>
            `).join('')}
          </div>
        </div>

        <div style="margin-top: 24px; display: flex; align-items: center; gap: 12px;">
          <span style="font-size: 13px; color: var(--text-muted);">关卡进度: ${currentMonsterIdx + 1} / ${PlanetData.monsterLevels.length}</span>
          <span style="font-size: 13px; color: var(--star-gold);">例词：${level.emoji} ${level.exampleWord}</span>
        </div>
      </div>
    `;

    // 首次自动朗读发音
    setTimeout(() => {
      SoundEngine.speak(level.soundText, 'en-US');
    }, 300);
  }

  function playMonsterPrompt() {
    const level = PlanetData.monsterLevels[currentMonsterIdx];
    SoundEngine.speak(level.targetLetter + ", " + level.exampleWord, 'en-US');
  }

  function feedCookie(letter, element) {
    const level = PlanetData.monsterLevels[currentMonsterIdx];
    const monster = document.getElementById('monster-avatar');

    if (letter === level.targetLetter) {
      // ✅ 答对：嚼碎动画、心心爆发、奖励星光
      if (monster) monster.classList.add('eating');
      SoundEngine.playCookieChomp();

      setTimeout(() => {
        SoundEngine.playSuccess();
        AppState.addStarlight(5, 'lang', `掌握拼读音素 /${level.soundText}/ (${level.targetLetter})`);
        App.showToast('🎉 好吃！小怪兽开心地进化了！+5 星光 ✨');
        App.fireConfetti();

        currentMonsterIdx = (currentMonsterIdx + 1) % PlanetData.monsterLevels.length;
        renderCurrentTab();
      }, 700);

    } else {
      // ❌ 答错：温和果冻抖动、无扣分、允许重试
      element.classList.add('jelly-shake');
      SoundEngine.playJellyShake();
      setTimeout(() => {
        element.classList.remove('jelly-shake');
      }, 600);
    }
  }

  // 🀄 2. 象形汉字理演化
  function renderHanziStory(stage) {
    const list = PlanetData.hanziList;
    stage.innerHTML = `
      <div class="tool-stage-box">
        <div style="text-align: center; margin-bottom: 16px;">
          <div style="font-size: 20px; font-weight: 800; color: var(--col-lang-primary);">汉字象形起源图鉴</div>
          <div style="font-size: 13px; color: var(--text-muted); margin-top: 4px;">观察大自然的形状，是古人造字的奇妙智慧</div>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 16px; width: 100%;">
          ${list.map(item => `
            <div style="background: rgba(255,255,255,0.06); border: 2px solid rgba(255,140,66,0.3); border-radius: 20px; padding: 18px; display: flex; align-items: center; gap: 16px; cursor: pointer;"
                 onclick="SoundEngine.speak('${item.ch}', 'zh-CN'); SoundEngine.playSuccess();">
              <div style="width: 64px; height: 64px; background: #fff; border-radius: 16px; display: flex; align-items: center; justify-content: center; font-size: 38px; color: #2d3748; font-weight: 900; box-shadow: 0 4px 10px rgba(0,0,0,0.3);">
                ${item.ch}
              </div>
              <div style="flex: 1;">
                <div style="display: flex; align-items: center; gap: 8px;">
                  <span style="font-size: 18px; font-weight: 800; color: #fff;">${item.word}</span>
                  <span style="font-size: 14px; color: var(--star-gold); font-weight: 700;">${item.py}</span>
                  <span style="font-size: 20px;">${item.emoji}</span>
                </div>
                <div style="font-size: 12px; color: var(--text-muted); margin-top: 6px; line-height: 1.4;">
                  ${item.origin}
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  // 🏮 3. 古诗情景剧场
  function renderPoemTheater(stage) {
    const poems = PlanetData.poems;
    stage.innerHTML = `
      <div class="tool-stage-box">
        <div style="text-align: center; margin-bottom: 16px;">
          <div style="font-size: 20px; font-weight: 800; color: var(--col-lang-primary);">🏮 经典古诗朗读与赏析</div>
          <div style="font-size: 13px; color: var(--text-muted); margin-top: 4px;">点击任意诗句，聆听标准童声跟读配音</div>
        </div>

        <div style="display: flex; flex-direction: column; gap: 20px; width: 100%; max-width: 580px;">
          ${poems.map(p => `
            <div style="background: radial-gradient(circle at 50% 50%, #2a2233, #1c1825); border: 2px solid rgba(255, 140, 66, 0.4); border-radius: 20px; padding: 20px; text-align: center; box-shadow: 0 6px 18px rgba(0,0,0,0.4);">
              <div style="font-size: 22px; font-weight: 900; color: var(--cosmos-accent);">${p.title}</div>
              <div style="font-size: 13px; color: var(--text-muted); margin: 6px 0 14px 0;">[${p.dynasty}] ${p.author}</div>
              <div style="display: flex; flex-direction: column; gap: 8px; margin-bottom: 14px;">
                ${p.lines.map(line => `
                  <div style="font-size: 20px; font-weight: 800; color: #fff; cursor: pointer; padding: 4px; border-radius: 8px; transition: background 0.2s;"
                       onmouseover="this.style.background='rgba(255,255,255,0.1)'"
                       onmouseout="this.style.background='transparent'"
                       onclick="SoundEngine.speak('${line}', 'zh-CN'); SoundEngine.playNote(2);">
                    ${line} 🔊
                  </div>
                `).join('')}
              </div>
              <div style="font-size: 12px; color: #a0aec0; background: rgba(255,255,255,0.06); padding: 8px 14px; border-radius: 12px;">
                💡 意境：${p.tip}
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  return {
    render,
    switchTab,
    playMonsterPrompt,
    feedCookie
  };
})();
