# 下一代儿童学习产品 · 前期研究资料库

> 面向 5~10 岁儿童 · 跨学科学院制 · 开源优先 · 离线优先 · 零广告

---

## 一、核心教育方法论（科学依据）

在设计各学院知识体系前，先梳理有研究背书的教学理论框架，这是各学院课程设计的根本依据：

| 理论框架 | 核心思想 | 适用学院 |
|:---|:---|:---|
| **CPA（Concrete-Pictorial-Abstract）** | 新加坡数学三阶段：实物操作 → 图示 → 抽象符号 | 数学学院 |
| **Phonics / 自然拼读（Phonological Awareness）** | 音素感知→字形-音对应，是阅读的基础神经机制 | 语言学院 |
| **Stealth Learning（隐性学习）** | 将学习目标隐入游戏循环，降低认知抗拒 | 全学院通用 |
| **SuperMemo SM-2 间隔复现** | 艾宾浩斯遗忘曲线驱动的自适应记忆调度 | 全学院通用 |
| **建构主义（Constructivism / Papert）** | 儿童通过亲手"搭建"来建构理解，非被动接收 | 编程/科学学院 |
| **STEAM 跨学科融合** | 科学+技术+工程+艺术+数学的整合探究 | 科学/美育学院 |
| **Seymour Papert Logo/MicroWorld** | 让儿童控制计算机，而非被计算机控制 | 编程学院 |
| **Zone of Proximal Development（ZPD）** | 维果斯基：任务难度略超现有能力时学习效率最高 | 自适应关卡设计 |

---

## 二、开源项目全景地图（按学院分类）

### 🌐 A. 语言阅读学院（Language & Literacy）

#### A-1. Feed The Monster
- **GitHub**: [github.com/curiouslearning/FeedTheMonster](https://github.com/curiouslearning/FeedTheMonster)
- **许可证**: 开源（Curious Learning 非营利）
- **教育场景**: 自然拼读、音素感知、字母认知，通过喂食怪兽游戏机制驱动
- **核心亮点**:
  - 已翻译为 **50+ 语言**，世界银行研究验证在非洲显著提升识字率
  - 无广告、无内购、支持完全离线
  - 用户数千万，获 EduApp4Syria 国际奖项
- **集成策略**: 提取怪兽喂食游戏循环设计模式，用于英语拼读与中文拼音模块
- **学院归属**: 语言阅读学院 ⭐⭐⭐⭐⭐

#### A-2. Antura and the Letters
- **GitHub**: [github.com/vgwb/Antura](https://github.com/vgwb/Antura)
- **许可证**: 开源（Video Games Without Borders，VGWB）
- **教育场景**: 儿童母语识字与第二语言习得，面向难民与弱势儿童
- **核心亮点**:
  - **隐性学习（Stealth Learning）** + 游戏循环方法论落地典范
  - 采用**渐进式难度设计**：图像→书写形→读音的三重映射
  - 有完整的"不惩罚答错"设计，与儿童心理研究一致
  - v3.0 仍在活跃开发中（2026）
- **集成策略**: 借鉴其"世界-关卡-小游戏"层级结构和非惩罚评估设计
- **学院归属**: 语言阅读学院 ⭐⭐⭐⭐⭐

#### A-3. StoryWeaver（Pratham Books）
- **平台**: [storyweaver.org.in](https://storyweaver.org.in)
- **许可证**: CC BY 4.0（内容开放）
- **教育场景**: 多语言少儿分级绘本，4000+ 故事，超 80 种语言
- **核心亮点**:
  - 内容可自由使用，部分源码开源
  - 分级阅读（Leveled Reading）体系完整
  - 有配音与互动热点功能
- **集成策略**: 直接使用其 CC 授权内容构建本地绘本库；借鉴分级绘本排版与翻页 UX
- **学院归属**: 语言阅读学院 ⭐⭐⭐⭐

#### A-4. ScratchJr（MIT 移植版）
- **GitHub**: [github.com/LLK/scratchjr](https://github.com/LLK/scratchjr)
- **许可证**: BSD 3-Clause
- **教育场景**: 5~7 岁儿童的故事叙事 + 初阶编程，拖拽积木驱动角色表达故事
- **集成策略**: 借鉴其"儿童创作故事"的叙事驱动设计，用于绘本创作模块
- **学院归属**: 语言阅读学院 / 编程学院 ⭐⭐⭐

---

### 🔢 B. 数理逻辑学院（Math & Computational Thinking）

#### B-1. Math Learning Center (MLC) Apps
- **网站**: [mathlearningcenter.org/apps](https://www.mathlearningcenter.org/apps)
- **许可证**: 免费开放使用
- **教育场景**: CPA 三阶段虚拟学具：十格阵、数轴、积木、几何板、分数条
- **核心亮点**:
  - **教育界公认的 CPA 黄金标准工具**
  - 支持保存画布、批注与多模式表示
  - 覆盖 K-5 数学全阶段
- **集成策略**: 直接参考其十格阵、数轴、分数条交互设计，自行实现 Web 版虚拟学具
- **学院归属**: 数理逻辑学院 ⭐⭐⭐⭐⭐

#### B-2. Mathigon · Polypad
- **网站**: [mathigon.org/polypad](https://mathigon.org/polypad)
- **GitHub**: [github.com/mathigon](https://github.com/mathigon)
- **许可证**: 部分开源
- **教育场景**: 数学游乐场，覆盖几何、分数、代数、数字感知等互动学具
- **核心亮点**:
  - 交互极其丰富，被全球数学教育者高度评价
  - 有虚拟天平、分形、概率等探究工具
- **集成策略**: 借鉴其"数学探究游乐场"的设计语言；参考天平平衡学具设计
- **学院归属**: 数理逻辑学院 ⭐⭐⭐⭐⭐

#### B-3. GCompris 数学模块
- **GitHub**: [github.com/KDE/gcompris](https://github.com/KDE/gcompris)
- **许可证**: AGPL-3.0
- **教育场景**: 数数、加减法、乘法表、测量、逻辑排序等 30+ 数学活动
- **核心亮点**:
  - 150+ 活动，2~10 岁全覆盖，支持 50+ 语言
  - 完全离线，GDPR 合规，无数据收集
  - 多平台：Linux / Windows / Android / macOS
- **集成策略**: 提取其数学小游戏的 UI 设计参考；部分活动直接借鉴实现
- **学院归属**: 数理逻辑学院 / 科学探究学院 ⭐⭐⭐⭐

#### B-4. Tux Math（KDE Education）
- **平台**: [edu.kde.org/tuxmath](https://edu.kde.org/tuxmath)
- **许可证**: GPL
- **教育场景**: 口算速算游戏，通过击落陨石保卫企鹅，趣味练习加减乘除
- **集成策略**: 借鉴"口算竞速游戏化"的核心设计模式
- **学院归属**: 数理逻辑学院 ⭐⭐⭐

---

### 🔬 C. 科学探究学院（STEM & Natural Science）

#### C-1. PhET Interactive Simulations
- **网站**: [phet.colorado.edu](https://phet.colorado.edu)
- **GitHub**: [github.com/phetsims](https://github.com/phetsims)
- **许可证**: MIT / CC BY (内容), 完全开源
- **教育场景**: 物理、化学、数学、地球科学 200+ 互动微实验，覆盖小学至大学
- **核心亮点**:
  - 科罗拉多大学研究成果，教育有效性有同行评审研究支持
  - 支持 **iframe 直接嵌入**，也提供 PhET-iO JS API 实现双向通信
  - 小学适用实验：浮沉（Density & Buoyancy）、简单电路（Circuit Construction）、静电（Balloons & Static Electricity）、比例（Proportion Playground）
- **集成策略**:
  - 直接 iframe 嵌入适合少儿的 10 个精选实验
  - 或参考其源码自实现简化版微实验
- **学院归属**: 科学探究学院 ⭐⭐⭐⭐⭐

#### C-2. GCompris 科学模块
- **GitHub**: [github.com/KDE/gcompris](https://github.com/KDE/gcompris)
- **教育场景**: 水循环、电路模拟、天文（太阳系）、地理（世界地图）
- **集成策略**: 直接借鉴其简单电路实验与地理探索设计
- **学院归属**: 科学探究学院 ⭐⭐⭐⭐

#### C-3. Kolibri（Learning Equality）
- **GitHub**: [github.com/learningequality/kolibri](https://github.com/learningequality/kolibri)
- **许可证**: MIT
- **教育场景**: 完整离线学习平台，聚合 Khan Academy、CK-12 等科学内容
- **核心亮点**:
  - 200+ 国家使用，专为无网络环境设计
  - 内含 Coach Dashboard（学情追踪）和自适应练习
  - 可作为内容来源，提取其开放内容授权的科普视频和练习题
- **集成策略**: 借鉴其"离线内容包"管理机制；引用其开放授权的科学内容
- **学院归属**: 科学探究学院 / 全学院内容平台参考 ⭐⭐⭐⭐

---

### 💻 D. 少儿编程学院（Coding & Computational Thinking）

#### D-1. Google Blockly
- **GitHub**: [github.com/google/blockly](https://github.com/google/blockly)
- **许可证**: Apache 2.0
- **教育场景**: 积木式图形化编程框架，是 Scratch、code.org 等平台的底层引擎
- **核心亮点**:
  - **直接 Web 嵌入**，无需安装，纯 JS 运行
  - 提供多种学习游戏场景：属性拼图（Puzzle）、迷宫（Maze）、条件小鸟（Bird）、循环绘图（Turtle）
  - 拥有完整的中文本地化
- **集成策略**: 直接嵌入 Blockly 游戏场景，或使用 Blockly 核心库构建自定义编程挑战
- **学院归属**: 少儿编程学院 ⭐⭐⭐⭐⭐

#### D-2. Scratch（MIT Foundation）
- **GitHub**: [github.com/scratchfoundation](https://github.com/scratchfoundation)
- **许可证**: AGPL / BSD（不同组件）
- **教育场景**: 全球最流行的儿童编程平台，故事创作、游戏制作、动画
- **核心亮点**:
  - 支持 iframe 嵌入任意 Scratch 项目
  - scratch-vm 可作为独立 JS 库嵌入自定义页面
  - ScratchJr（5~7 岁）更简单，BSD 开源
- **集成策略**: 嵌入精选 Scratch 项目用于创意编程展示；ScratchJr 逻辑用于幼龄组
- **学院归属**: 少儿编程学院 ⭐⭐⭐⭐⭐

#### D-3. Code.org 开源课程
- **GitHub**: [github.com/code-dot-org/code-dot-org](https://github.com/code-dot-org/code-dot-org)
- **许可证**: 部分开源（课程内容 CC BY）
- **教育场景**: K-12 计算机科学课程，《一小时编程》系列趣味关卡
- **集成策略**: 直接使用其开放授权的"一小时编程"关卡内容设计；参考其关卡进度地图
- **学院归属**: 少儿编程学院 ⭐⭐⭐⭐

#### D-4. Turtlestitch / Turtle Art
- **GitHub**: [github.com/sugarlabs/turtleart-activity](https://github.com/sugarlabs/turtleart-activity)
- **许可证**: MIT
- **教育场景**: 通过控制"海龟"绘制几何图案学习编程逻辑
- **集成策略**: 作为编程学院"循环绘图"模块的互动工具
- **学院归属**: 少儿编程学院 / 美育学院 ⭐⭐⭐

---

### 🎨 E. 音乐美育学院（Music, Arts & Creativity）

#### E-1. Chrome Music Lab
- **GitHub**: [github.com/googlecreativelab/chrome-music-lab](https://github.com/googlecreativelab/chrome-music-lab)
- **许可证**: Apache 2.0
- **教育场景**: 14 个网页音乐互动实验：Song Maker（编曲）、Rhythm（节奏）、Kandinsky（声音画笔）、Spectrogram（频谱）等
- **核心亮点**:
  - Google Creative Lab 出品，免费开放，支持直接 iframe 嵌入
  - Song Maker 极受儿童欢迎，可创作、分享旋律
  - 完全 Web-based，无需安装
- **集成策略**: 直接嵌入 Song Maker、Rhythm、Kandinsky 三个最适合儿童的模块
- **学院归属**: 音乐美育学院 ⭐⭐⭐⭐⭐

#### E-2. Music Blocks（Sugar Labs）
- **GitHub**: [github.com/sugarlabs/musicblocks](https://github.com/sugarlabs/musicblocks)
- **许可证**: AGPL-3.0
- **教育场景**: 编程 + 音乐融合的可视化音乐创作环境，用积木控制音高、节奏、和声
- **核心亮点**:
  - **Seymour Papert 建构主义传人**设计，音乐即编程的创新融合
  - 浏览器运行，支持 Web Audio API
  - v4 正在用 TypeScript+React 重构（2026活跃开发）
- **集成策略**: 作为编程学院与美育学院的交叉模块；提取其积木音乐逻辑设计
- **学院归属**: 音乐美育学院 / 少儿编程学院 ⭐⭐⭐⭐

#### E-3. Tux Paint
- **网站**: [tuxpaint.org](https://tuxpaint.org)
- **许可证**: GPL
- **教育场景**: 3~12 岁儿童绘画程序，有音效鼓励、魔法画笔、印章工具
- **核心亮点**:
  - 获奖儿童绘画工具，30+ 年开发历史
  - 儿童 UI 设计可供参考（大按钮、音效、无复杂手势）
- **集成策略**: 参考其魔法画笔和印章 UX 设计；提取画布互动模式
- **学院归属**: 音乐美育学院 ⭐⭐⭐

---

### 🧩 F. 智力竞技乐园（Logic & Strategy Games）

#### F-1. GCompris 棋类与逻辑游戏
- **GitHub**: [github.com/KDE/gcompris](https://github.com/KDE/gcompris)
- **教育场景**: 数独、记忆配对、棋类（国际象棋入门）、迷宫、逻辑排序
- **集成策略**: 参考活动设计，尤其是记忆游戏、模式配对的游戏化设计
- **学院归属**: 智力竞技乐园 ⭐⭐⭐⭐

#### F-2. Lichess（国际象棋开源平台）
- **GitHub**: [github.com/lichess-org/lila](https://github.com/lichess-org/lila)
- **许可证**: AGPL-3.0
- **教育场景**: 完整的开源国际象棋平台，有 AI 对战和入门谜题功能
- **集成策略**: 借鉴其对战 AI 难度分级（新手/中等/高手）设计模式
- **学院归属**: 智力竞技乐园 ⭐⭐⭐

---

## 三、可直接使用的科学内容来源

| 内容类型 | 来源 | 许可证 | 说明 |
|:---|:---|:---:|:---|
| **少儿绘本** | StoryWeaver | CC BY 4.0 | 4000+ 故事，中文版本可用 |
| **科学视频** | Khan Academy（开放内容） | CC BY-NC-SA | 可在非商业场景使用 |
| **数学练习** | OpenStax | CC BY 4.0 | 高质量开放教材 |
| **英语词汇** | WordNet / Wiktionary | 开放 | 词典数据库 |
| **古诗词** | 中华古诗词数据库 | 公共领域 | 历史著作版权已过期 |
| **科普百科** | Simple Wikipedia | CC BY-SA | 儿童友好的简化版百科 |

---

## 四、学院知识体系框架（初稿）

### 📖 语言阅读学院
```
知识体系
├── 英语板块
│   ├── L1 音素感知（26字母+基础音素）← Feed The Monster
│   ├── L2 自然拼读（CVC单词/常见词族）
│   └── L3 分级阅读（Sight Words + 段落）← StoryWeaver
├── 汉字板块
│   ├── L1 象形字认知（日/月/山/水等 50字）
│   ├── L2 常用字笔顺（218高频生字）
│   └── L3 词语与句子（组词造句）
├── 古诗词板块
│   ├── L1 绝句启蒙（静夜思/春晓等 20首）
│   ├── L2 律诗精读（唐诗宋词精选 40首）
│   └── L3 诗意理解（意象/白话故事）
└── 拼音板块
    ├── L1 声母韵母（23+24）
    └── L2 整体认读音节 + 声调
```

### 🔢 数理逻辑学院
```
知识体系
├── 数感启蒙板块
│   ├── L1 数数与认数（0~20）← 十格阵 CPA
│   ├── L2 加减法（进退位）← 数轴跳跳蛙
│   └── L3 乘法初探（口诀表）
├── 空间与几何板块
│   ├── L1 形状认知（圆/三角/四边形）
│   └── L2 对称与图案规律
├── 代数思维板块
│   ├── L1 等式平衡（天平学具）← Mathigon
│   └── L2 未知数初探（□+3=7）
└── 数学游戏板块
    ├── 口算极速赛车 ← Tux Math 设计参考
    └── 数独入门 ← GCompris
```

### 🔬 科学探究学院
```
知识体系
├── 物理探究板块
│   ├── L1 浮沉实验（密度直觉）← PhET Density
│   ├── L2 简单电路（开关/串并联）← PhET Circuit
│   └── L3 力与运动（重力/摩擦）← PhET Forces
├── 生命科学板块
│   ├── L1 植物的秘密（种子/光合作用）
│   └── L2 动物世界（哺乳/鸟类/昆虫分类）
├── 地球与宇宙板块
│   ├── L1 天气与四季
│   └── L2 太阳系漫游 ← GCompris 天文模块
├── 科普百科板块
│   └── 十万个为什么 (200 Q&A)
└── 生活安全板块
    └── 110 个安全情景自护技能
```

### 💻 少儿编程学院
```
知识体系
├── 计算思维启蒙板块（5~7岁）
│   ├── 排序与分类 ← Blockly Puzzle
│   └── 简单指令序列 ← ScratchJr
├── 图形化编程板块（7~9岁）
│   ├── 序列指令 ← Blockly Maze
│   ├── 条件判断 ← Blockly Bird
│   └── 循环结构 ← Blockly Turtle
├── 创意编程板块（9~10岁）
│   ├── 故事动画创作 ← Scratch
│   └── 游戏设计初探 ← Scratch
└── 跨学科融合板块
    ├── 音乐编程 ← Music Blocks
    └── 数学绘图 ← Turtle Art
```

### 🎨 音乐美育学院
```
知识体系
├── 音乐感知板块
│   ├── L1 节奏律动（动物节拍鼓）← Chrome Music Lab Rhythm
│   ├── L2 音高旋律（编曲矩阵）← Song Maker
│   └── L3 和声探索 ← Music Blocks
├── 视觉艺术板块
│   ├── L1 声音与颜色（共感觉）← Kandinsky
│   ├── L2 创意涂鸦（魔法画笔）← Tux Paint 参考
│   └── L3 几何美术（海龟绘图）← Turtle Art
└── 综合创作板块
    ├── 音乐故事书（音乐+绘本）
    └── 动画短片创作（音乐+Scratch）
```

---

## 五、竞品对标分析（与宝贝学堂对比）

| 维度 | 宝贝学堂（现版） | 下一代设计目标 | 参考对标产品 |
|:---|:---|:---|:---|
| **学科覆盖** | 英语/汉字/古诗/算术/科普/安全 | 5大学院跨学科融合 | Khan Academy Kids |
| **教学方法** | 单科练习+游戏化 | CPA/Phonics/建构主义多法融合 | Antura + PhET |
| **互动深度** | 选择题为主 | 实验探究+创作+表达 | GCompris + Scratch |
| **内容量级** | 自制数据 | 整合全球开源内容库 | Kolibri |
| **编程教育** | Blockly 基础版 | 完整计算思维阶梯 | Code.org |
| **音乐美育** | Song Maker 矩阵 | 音乐编程+视觉艺术完整体系 | Music Blocks + Tux Paint |
| **离线能力** | 支持 | 强化（内容包管理） | Kolibri |
| **多语言** | 中文为主 | 中英文双语为核心 | Feed The Monster |
| **家长功能** | 学情雷达 | 深化为学习画像+内容推荐 | Kolibri Coach |

---

## 六、集成策略优先级排序

### ✅ 直接集成（代码/内容可直接使用）
1. **Google Blockly** — Apache 2.0，直接 Web 嵌入
2. **Chrome Music Lab** — Apache 2.0，iframe 嵌入
3. **PhET Simulations** — 免费嵌入（CC BY-NC）
4. **StoryWeaver 内容** — CC BY 4.0 内容使用

### 🔄 借鉴设计（提取设计模式，自行实现）
5. **Feed The Monster** — 怪兽喂食游戏循环，适配中文拼音
6. **Antura** — 隐性学习 + 非惩罚评估设计
7. **GCompris** — 全科活动 UI 设计参考（150+ 活动）
8. **Math Learning Center** — CPA 虚拟学具交互设计

### 📚 内容引用（开放授权内容直接使用）
9. **StoryWeaver 绘本** — 中文版绘本直接使用
10. **Simple Wikipedia** — 科普百科问答内容来源
11. **古诗词公共域** — 古诗原文与注释

### 🔬 深度研究参考（架构/课程参考）
12. **Kolibri** — 离线内容包架构、自适应推荐设计
13. **Code.org** — 计算机科学 K-5 课程体系参考
14. **Scratch VM** — 创意编程沙盒底层技术参考

---

## 七、待讨论的核心设计决策

> 以下问题需要在产品设计阶段明确：

1. **学院入口设计**：主界面是"地图探险"模式还是"学院大厅"模式，还是双入口？
2. **年龄分层**：按年龄（5~6/7~8/9~10）分档还是按能力等级（L1/L2/L3）分档？
3. **关卡与自由探索的平衡**：是强主线关卡+自由模块，还是自适应推荐？
4. **中文 vs 双语优先级**：各学院中英文内容如何分配？
5. **创作导出**：儿童的绘画/音乐/编程作品是否支持导出和分享？
6. **虚拟伴侣**：是否保留小狮子（宠物成长系统），还是重新设计？
7. **家长后台深度**：家长看什么？能操作什么？如何防止过度干预？

---

*文档版本：v1.0 · 2026-09-14 · 研究阶段，待进入产品设计阶段*
