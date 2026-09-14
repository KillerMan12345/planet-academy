/* ==========================================================================
   🪐 星球学院 (Planet Academy) · 共享知识库与具象教具数据集合
   包含：自然拼读音素、汉字字理、新加坡数理、PhET物理微参数、编程迷宫、美育旋律
   ========================================================================== */

const PlanetData = {
  // 📖 1. 语言学院 · Feed The Monster 音素关卡
  monsterLevels: [
    {
      targetLetter: 'A',
      soundText: '/æ/',
      exampleWord: 'Apple',
      emoji: '🍎',
      options: ['A', 'B', 'P']
    },
    {
      targetLetter: 'C',
      soundText: '/k/',
      exampleWord: 'Cat',
      emoji: '🐱',
      options: ['S', 'C', 'O']
    },
    {
      targetLetter: 'M',
      soundText: '/m/',
      exampleWord: 'Moon',
      emoji: '🌙',
      options: ['W', 'N', 'M']
    },
    {
      targetLetter: 'S',
      soundText: '/s/',
      exampleWord: 'Sun',
      emoji: '☀️',
      options: ['C', 'Z', 'S']
    },
    {
      targetLetter: 'D',
      soundText: '/d/',
      exampleWord: 'Dog',
      emoji: '🐶',
      options: ['B', 'P', 'D']
    }
  ],

  // 📖 汉字象形与笔顺
  hanziList: [
    { ch: '日', py: 'rì', word: '太阳', emoji: '☀️', strokes: 4, origin: '圆圆的太阳中有黑子，后来演变成四方' },
    { ch: '月', py: 'yuè', word: '月亮', emoji: '🌙', strokes: 4, origin: '弯弯的月牙形状' },
    { ch: '水', py: 'shuǐ', word: '流水', emoji: '💧', strokes: 4, origin: '中间弯曲的水流，两旁是飞溅的水花' },
    { ch: '火', py: 'huǒ', word: '火焰', emoji: '🔥', strokes: 4, origin: '向上跳跃燃烧的火苗' },
    { ch: '木', py: 'mù', word: '树木', emoji: '🌳', strokes: 4, origin: '上方是树枝，下方是深入大地的根系' }
  ],

  // 📖 古诗情景
  poems: [
    {
      title: '静夜思',
      author: '李白',
      dynasty: '唐',
      lines: ['床前明月光', '疑是地上霜', '举头望明月', '低头思故乡'],
      tip: '李白在宁静的夜晚仰望明月，思念远方的故乡亲人。'
    },
    {
      title: '春晓',
      author: '孟浩然',
      dynasty: '唐',
      lines: ['春眠不觉晓', '处处闻啼鸟', '夜来风雨声', '花落知多少'],
      tip: '春天的早晨空气清新，鸟儿在枝头欢快地歌唱。'
    },
    {
      title: '咏鹅',
      author: '骆宾王',
      dynasty: '唐',
      lines: ['鹅鹅鹅', '曲项向天歌', '白毛浮绿水', '红掌拨清波'],
      tip: '七岁神童骆宾王观察大白鹅在碧波中游弋的生动写照。'
    }
  ],

  // 🔢 2. 数理学院 · 新加坡数学 CPA 十格阵 (Ten-Frame) 凑十法
  cpaProblems: [
    {
      numA: 8,
      numB: 4,
      targetTen: 10,
      splitB: { part1: 2, part2: 2 }, // 8 + 2 = 10, 10 + 2 = 12
      answer: 12,
      desc: '把 4 分解为 2 和 2，先给 8 凑成 10！'
    },
    {
      numA: 7,
      numB: 5,
      targetTen: 10,
      splitB: { part1: 3, part2: 2 }, // 7 + 3 = 10, 10 + 2 = 12
      answer: 12,
      desc: '把 5 分解为 3 和 2，先给 7 凑成 10！'
    },
    {
      numA: 9,
      numB: 6,
      targetTen: 10,
      splitB: { part1: 1, part2: 5 }, // 9 + 1 = 10, 10 + 5 = 15
      answer: 15,
      desc: '把 6 分解为 1 和 5，9 只要 1 个就能凑成满格 10！'
    }
  ],

  // 🔬 3. 科学学院 · PhET 浮沉实验室物质密度表 (水的密度: 1.0 g/cm³)
  phetMaterials: [
    { id: 'wood', name: '木块', density: 0.6, color: '#d35400', floatPercent: 40, desc: '密度 0.6 < 水(1.0)，轻松浮在水面！' },
    { id: 'ice', name: '冰块', density: 0.92, color: '#74b9ff', floatPercent: 10, desc: '密度 0.92 接近水，90% 没入水中（冰山一角）' },
    { id: 'styrofoam', name: '泡沫塑料', density: 0.15, color: '#f5f6fa', floatPercent: 85, desc: '密度极低 0.15，高高漂在水面' },
    { id: 'iron', name: '铁块', density: 7.8, color: '#636e72', floatPercent: 0, desc: '密度 7.8 远大于水，迅速沉到水底！' }
  ],

  // 💻 4. 编程学院 · 5×5 迷宫关卡
  codingMazes: [
    {
      title: '第一关：直道寻宝',
      grid: [
        [0, 0, 0, 0, 0],
        [0, 1, 1, 2, 0], // 1: 机器人, 2: 目标星星
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0]
      ],
      targetSteps: ['forward', 'forward']
    },
    {
      title: '第二关：向右转弯',
      grid: [
        [0, 0, 0, 0, 0],
        [0, 1, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 2, 0, 0],
        [0, 0, 0, 0, 0]
      ],
      targetSteps: ['turnRight', 'forward', 'forward']
    }
  ],

  // 🎨 5. 美育学院 · 旋律预设
  musicPresets: {
    star: [
      { step: 0, pitch: 0 }, { step: 1, pitch: 0 }, // 1 1
      { step: 2, pitch: 3 }, { step: 3, pitch: 3 }, // 5 5
      { step: 4, pitch: 2 }, { step: 5, pitch: 2 }, // 6 6
      { step: 6, pitch: 3 }                          // 5 -
    ]
  }
};
