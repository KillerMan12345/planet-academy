/* ==========================================================================
   🪐 星球学院 (Planet Academy) · 全局状态管理器 (Global State)
   支持 LocalStorage 本地持久化与事件监听
   ========================================================================== */

const AppState = (function () {
  const STORAGE_KEY = 'planet_academy_state_v1';

  const defaultState = {
    starlight: 35,          // 初始给予 35 星光，让孩子立即可体验星球升级/宠物互动
    planetStage: 2,         // 1: 荒芜陨石, 2: 萌发苔原, 3: 生机绿洲, 4: 智慧文明
    planetFeatures: {
      trees: 2,
      lakes: 1,
      observatory: 0
    },
    pet: {
      name: '小狮子波波',
      avatar: '🦁',
      mood: '开心',
      hunger: 80,           // 饱食度 (0~100)
      energy: 90
    },
    // 五大学院能力雷达积分（0~100）
    radarScores: {
      lang: 45,             // 语言阅读
      math: 60,             // 数理逻辑
      sci: 35,              // 科学探究
      code: 25,             // 少儿编程
      art: 50               // 音乐美育
    },
    // 今日学习记录
    dailyLog: [
      { time: '10:15', college: 'lang', title: '怪兽吃字母 A & C', stars: 6 },
      { time: '11:30', college: 'math', title: 'CPA 十格阵凑十法', stars: 10 },
      { time: '14:20', college: 'sci',  title: 'PhET 木块与铁块浮沉', stars: 8 }
    ],
    timeLimitMinutes: 25,
    todayUsedMinutes: 12
  };

  let state = loadState();
  const listeners = [];

  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) return { ...defaultState, ...JSON.parse(raw) };
    } catch (e) {
      console.warn('Load state failed:', e);
    }
    return { ...defaultState };
  }

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.warn('Save state failed:', e);
    }
    notifyListeners();
  }

  function notifyListeners() {
    listeners.forEach(fn => fn(state));
  }

  return {
    get() {
      return state;
    },

    subscribe(fn) {
      listeners.push(fn);
      return () => {
        const idx = listeners.indexOf(fn);
        if (idx !== -1) listeners.splice(idx, 1);
      };
    },

    // 🌟 获得星光货币并记录
    addStarlight(count, collegeKey, taskTitle) {
      state.starlight += count;
      if (collegeKey && state.radarScores[collegeKey] !== undefined) {
        state.radarScores[collegeKey] = Math.min(100, state.radarScores[collegeKey] + 5);
      }
      
      // 检查星球阶段自动跃迁
      if (state.starlight >= 100 && state.planetStage < 4) {
        state.planetStage = 4;
      } else if (state.starlight >= 60 && state.planetStage < 3) {
        state.planetStage = 3;
      } else if (state.starlight >= 20 && state.planetStage < 2) {
        state.planetStage = 2;
      }

      if (taskTitle) {
        const d = new Date();
        const timeStr = `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
        state.dailyLog.unshift({ time: timeStr, college: collegeKey, title: taskTitle, stars: count });
      }

      saveState();
      SoundEngine.playCoin();
      return state.starlight;
    },

    // 🍎 喂养宠物
    feedPet() {
      if (state.starlight < 5) return { ok: false, msg: '星光不足 5 颗，快去做题收集吧！' };
      state.starlight -= 5;
      state.pet.hunger = Math.min(100, state.pet.hunger + 20);
      state.pet.mood = '超级满足！';
      saveState();
      SoundEngine.playCookieChomp();
      return { ok: true, msg: '波波吃饱了，开心得直摇尾巴！' };
    },

    // 🌲 升级星球特征
    upgradeFeature(featureType) {
      const costMap = { trees: 10, lakes: 15, observatory: 25 };
      const cost = costMap[featureType] || 10;
      if (state.starlight < cost) {
        return { ok: false, msg: `建造需要 ${cost} 星光，继续加油哦！` };
      }
      state.starlight -= cost;
      state.planetFeatures[featureType] = (state.planetFeatures[featureType] || 0) + 1;
      saveState();
      SoundEngine.playSuccess();
      return { ok: true, msg: '星球生态进化啦！' };
    }
  };
})();
