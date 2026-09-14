# 星球学院 · 开源项目完整集成技术指南

> 针对每个项目：真正可行的集成方式 + 代码示例 + 难点分析 + 工作量评估

---

## 集成策略全局分类

```
A. 直接嵌入型    ── iframe / JS库直接嵌入，改动最小，维护成本低
B. 提取改造型    ── clone源码，提取核心逻辑/内容，整合进自有系统
C. 内容导入型    ── 提取CC授权内容（文本/图片），转化为本地数据
D. 设计借鉴型    ── 不用代码，只借鉴UX设计模式，自行实现
```

---

## 1. Google Blockly ✅ 直接嵌入型 · 最简单

### 集成方式
**方式 A（推荐）：npm 包直接引用**
```bash
npm install blockly
```

**方式 B：CDN 引用（无构建工具）**
```html
<script src="https://unpkg.com/blockly/blockly.min.js"></script>
```

### 可集成的内容
Blockly 分两个独立仓库，集成策略不同：

| 仓库 | 内容 | 集成方式 |
|:---|:---|:---|
| `google/blockly` | 核心编辑器引擎 | npm 安装后自定义积木 |
| `google/blockly-games` | Maze/Bird/Turtle等游戏 | Clone后独立构建，iframe嵌入 |
| `google/blockly-samples` | 20+ 现代集成示例 | 直接参考代码 |

### Blockly Games 集成示例（iframe方式）
```html
<!-- 直接嵌入本地构建的 Blockly Maze 游戏 -->
<iframe
  src="./blockly-games/maze/index.html?level=1&lang=zh-hans"
  width="100%" height="600"
  style="border:none; border-radius:16px;"
  allow="autoplay"
></iframe>
```

### Blockly Core 自定义使用示例
```javascript
// 在页面中创建自定义 Blockly 编辑器
const workspace = Blockly.inject('blocklyDiv', {
  toolbox: {
    kind: 'flyoutToolbox',
    contents: [
      { kind: 'block', type: 'controls_repeat_ext' },
      { kind: 'block', type: 'controls_if' },
      { kind: 'block', type: 'math_number' }
    ]
  },
  scrollbars: false,
  zoom: { controls: false },
  trashcan: false
});
```

### 集成难点
- **Blockly Games** 使用老旧的 Google Closure 模块系统，需要本地构建（`npm run build`）
- 构建后是纯 HTML 文件，可放在 `www/blockly-games/` 目录直接 iframe 嵌入
- **中文化**：Blockly 已有完整 `zh-hans` 翻译，传参 `?lang=zh-hans` 即可

### 工作量估计
| 任务 | 工作量 |
|:---|:---|
| 嵌入 Blockly Games（Maze/Bird/Turtle） | **0.5天** |
| 用 Blockly Core 自建编程模块 | **3~5天** |
| 自定义中文积木和关卡 | **2~3天** |

---

## 2. Chrome Music Lab ✅ 直接嵌入型 · 最简单

### 集成方式
**官方 Apache 2.0 开源，支持直接iframe嵌入**

```html
<!-- Song Maker 编曲矩阵 -->
<iframe
  src="https://musiclab.chromeexperiments.com/Song-Maker/song/5706018"`
  width="512" height="416"
  allow="microphone"
  style="border:none; border-radius:12px;"
></iframe>

<!-- Rhythm Rhythm鼓点 -->
<iframe
  src="https://musiclab.chromeexperiments.com/Rhythm/"
  width="512" height="416"
  style="border:none;"
></iframe>

<!-- Kandinsky 声音画笔 -->
<iframe
  src="https://musiclab.chromeexperiments.com/Kandinsky/"
  width="512" height="416"
  style="border:none;"
></iframe>
```

### 可嵌入的14个实验（筛选适合5~10岁的）

| 实验 | URL | 适龄 | 推荐度 |
|:---|:---|:---|:---|
| **Song Maker** | `/Song-Maker/` | 6-10岁 | ⭐⭐⭐⭐⭐ |
| **Rhythm** | `/Rhythm/` | 5-10岁 | ⭐⭐⭐⭐⭐ |
| **Kandinsky** | `/Kandinsky/` | 5-10岁 | ⭐⭐⭐⭐⭐ |
| **Spectrogram** | `/Spectrogram/` | 8-10岁 | ⭐⭐⭐ |
| **Piano Roll** | `/Piano-Roll/` | 7-10岁 | ⭐⭐⭐⭐ |
| **Harmonics** | `/Harmonics/` | 8-10岁 | ⭐⭐⭐ |
| **Voice Spinner** | `/Voice-Spinner/` | 5-8岁 | ⭐⭐⭐⭐ |
| **Chord Shapes** | `/Chord-Shapes/` | 8-10岁 | ⭐⭐⭐ |

### 离线方案（重要！）
Chrome Music Lab 源码在 GitHub 上 Apache 2.0 开源：
```bash
git clone https://github.com/googlecreativelab/chrome-music-lab
```
可以本地构建并打包进 App，**完全离线运行**。

### 集成难点
- 网络版直接 iframe 即可，0 成本
- 离线版需要 Node.js 构建环境，依赖 Web Audio API
- Song Maker 的"分享"功能需要联网，离线版可禁用分享按钮

### 工作量估计
| 任务 | 工作量 |
|:---|:---|
| iframe 嵌入3个模块（联网） | **0.5天** |
| 本地构建部署（离线） | **2天** |

---

## 3. PhET Interactive Simulations ✅ 直接嵌入型（可完全离线）

### 集成方式
**每个 PhET 实验是独立的 HTML5 文件，支持：**
1. iframe 联网嵌入
2. 下载 `.html` 文件本地嵌入（推荐）

```html
<!-- 方式1：联网iframe -->
<iframe
  src="https://phet.colorado.edu/sims/html/density/latest/density_zh_CN.html"
  width="800" height="600"
  allow="fullscreen"
  style="border:none;"
></iframe>

<!-- 方式2：本地文件（离线） -->
<iframe
  src="./phet-sims/density_zh_CN.html"
  width="800" height="600"
  style="border:none;"
></iframe>
```

### 推荐下载的适龄实验（中文版均可用）

| 实验名 | 下载URL | 适龄 | 推荐度 |
|:---|:---|:---|:---|
| **浮沉与密度** | `density_zh_CN.html` | 7-10岁 | ⭐⭐⭐⭐⭐ |
| **简单电路** | `circuit-construction-kit-dc_zh_CN.html` | 8-10岁 | ⭐⭐⭐⭐⭐ |
| **气球与静电** | `balloons-and-static-electricity_zh_CN.html` | 6-10岁 | ⭐⭐⭐⭐⭐ |
| **比例探索** | `proportion-playground_zh_CN.html` | 7-9岁 | ⭐⭐⭐⭐ |
| **数字方程** | `equality-explorer_zh_CN.html` | 8-10岁 | ⭐⭐⭐⭐ |
| **力与运动** | `forces-and-motion-basics_zh_CN.html` | 7-10岁 | ⭐⭐⭐⭐ |

### 下载方式
```bash
# 每个实验页面右下角有下载按钮，直接下载单文件 HTML
# 文件大小：约 2~8MB/个（包含所有图片和音频）
# 语言：URL中 zh_CN 即为简体中文版
```

### PhET 许可证说明
- 许可证：**CC BY 4.0**（非商业免费使用 + 需注明来源）
- 商业使用需联系 PhET 团队获得授权

### 集成难点
- 文件较大（每个 2-8MB），需控制预下载内容数量
- 部分实验需要 WebGL，低端设备可能卡顿
- 实验界面是英文为主（虽有中文版，但UI部分按钮仍英文）

### 工作量估计
| 任务 | 工作量 |
|:---|:---|
| 下载6个实验并嵌入 | **1天** |
| 包装儿童友好的进入界面 | **1天** |
| 构建"实验室"学院页面 | **2天** |

---

## 4. Scratch / scratch-vm ⚠️ 提取改造型 · 中等难度

### 集成方式分级

**方式A（最简单）：iframe 嵌入已有 Scratch 项目**
```html
<!-- 嵌入特定的 Scratch 项目（需联网） -->
<iframe
  src="https://scratch.mit.edu/projects/10128431/embed"
  allowtransparency="true"
  width="485" height="402"
  frameborder="0"
  scrolling="no"
  allowfullscreen
></iframe>
```

**方式B（推荐）：TurboWarp 打包器生成离线 HTML**
```
1. 在 scratch.mit.edu 上选择项目
2. 打开 packager.turbowarp.org
3. 输入项目ID，导出为独立 HTML 文件
4. 放入 www/scratch-projects/ 目录
5. iframe 嵌入即可完全离线运行
```

**方式C（高级）：集成 scratch-vm + scratch-gui 完整编辑器**
```bash
npm install scratch-vm scratch-gui
# 需要 React 环境，与纯 Vanilla JS 项目冲突较大
```

### 推荐策略（方式B）
```
1. 精选 20 个适合 5~10 岁的 Scratch 项目
2. 用 TurboWarp Packager 导出为独立 HTML
3. 按学科分类存入本地
4. 用自定义的儿童友好界面包装，iframe嵌入展示
```

### 可选的精品 Scratch 项目方向
- 数学类：加法可视化、乘法表动画、几何图形互动
- 科学类：太阳系动画、动物分类游戏
- 语言类：字母书写动画、单词故事
- 艺术类：绘图程序、音乐节拍器

### 集成难点
- **授权问题**：Scratch 项目为用户生成内容，需确认具体项目的 CC BY-SA 2.0 授权
- **离线化**：TurboWarp 打包后文件约 2-5MB/个，需管理下载包
- **完整编辑器集成**：scratch-gui 依赖 React，与纯 Vanilla JS 不兼容

### 工作量估计
| 任务 | 工作量 |
|:---|:---|
| 方式A（iframe联网嵌入精选项目） | **1天** |
| 方式B（TurboWarp离线打包+嵌入） | **2天** |
| 方式C（完整编辑器集成） | **10~15天** |

---

## 5. Music Blocks (SugarLabs) ✅ 直接嵌入型

### 集成方式
**直接 iframe 嵌入（无需构建）**
```html
<iframe
  src="https://musicblocks.sugarlabs.org"
  width="100%" height="600"
  style="border:none;"
></iframe>
```

**本地部署（离线方案）**：
```bash
git clone https://github.com/sugarlabs/musicblocks
# 是纯 HTML/CSS/JS 项目，无构建步骤
# 直接在本地 http-server 运行
cd musicblocks && python3 -m http.server 8080
# 打开 http://localhost:8080 即可运行
```

### Music Blocks 可集成的核心功能
- **音符积木**：拖拽控制音高（C/D/E/F/G/A/B）和时值
- **节奏积木**：设置 BPM 和节拍模式
- **循环积木**：用 repeat 创作重复旋律段落
- **数学-音乐桥梁**：倍数关系→音程比例，直觉感受音程数学

### 集成难点
- Music Blocks 界面是英文，中文化需要 fork 并修改语言文件
- v4 正在用 TypeScript 重构，API 有变化
- 积木操作对 5-6 岁儿童稍复杂，建议 7 岁以上使用

### 工作量估计
| 任务 | 工作量 |
|:---|:---|
| iframe 嵌入（联网）| **0.5天** |
| 本地克隆并离线部署 | **1天** |
| 中文化 UI | **2~3天** |

---

## 6. Feed The Monster ⚠️ 提取改造型 · 关键设计提取

### 真实情况
Feed The Monster 是一个 **Unity/原生移动端游戏**，不是 Web 应用，**无法直接嵌入**。

GitHub: `curiouslearning/FeedTheMonster` — 主要是 Unity 项目文件

### 正确集成策略：**提取设计模式，自行实现 Web 版**

核心游戏机制（可借鉴实现）：
```
游戏循环：
1. 显示目标音素/字母（如：发 [b] 音的字母）
2. 呈现 3-4 个选项（正确1个 + 干扰项2-3个）
3. 儿童点击正确字母 → 怪兽张嘴吃掉 → 饱食度+1
4. 怪兽积累食物 → 进化升级（4个阶段）
5. 答错 → 轻柔提示，不扣分，继续尝试
```

### Web 自实现代码框架
```javascript
class FeedTheMonsterGame {
  constructor(container, options) {
    this.phonemes = options.phonemes; // 音素数据
    this.stage = 0;                   // 怪兽进化阶段
    this.stages = ['🥚','🐣','👾','🦖','🐉'];
    this.fedCount = 0;
    this.render(container);
  }

  // 核心：生成一道题（目标音素 + 干扰项）
  generateQuestion(targetPhoneme) {
    const correct = targetPhoneme.letter;
    const distractors = this.pickDistractors(correct, 2);
    return shuffle([correct, ...distractors]);
  }

  // 答对处理
  onCorrect() {
    this.fedCount++;
    if (this.fedCount % 3 === 0) this.evolve(); // 每3次进化
    // 显示吃食动画
  }

  // 答错处理（零惩罚）
  onWrong() {
    // 轻柔震动提示，不扣分
    this.showHint();
  }
}
```

### 可从 Feed The Monster 提取的音素数据
虽不能直接用代码，但 **开源的音素教学内容** 可以参考：
- 26字母发音规则（CVC单词族）
- 音素感知练习序列（从简单到复杂）
- 多语言本地化结构（支持中文拼音类比改造）

### 工作量估计
| 任务 | 工作量 |
|:---|:---|
| 自实现英文版怪兽喂字母（Web） | **3~4天** |
| 适配拼音版怪兽吃声母韵母 | **2天** |
| 怪兽进化动画系统 | **1~2天** |

---

## 7. Antura and the Letters ⚠️ 提取改造型 · 设计参考

### 真实情况
Antura 是 **Unity 游戏**（iOS/Android），C# 代码，不能直接嵌入 Web。

### 正确集成策略：**提取设计思想，自行实现**

值得借鉴的核心设计（Antura 创新点）：
```
① 隐性学习（Stealth Learning）
   → 所有学习任务都包裹在游戏任务中
   → 孩子在"玩"，不意识到在"学"

② 三重映射
   → 图像（视觉）+ 书写形（认知）+ 发音（听觉）
   → 同时激活多感官通道

③ 非惩罚评估（Non-punitive Assessment）
   → "检查站"而非"考试"
   → 答错不失败，重来即可

④ 世界-关卡-小游戏层级
   World 1 → Zone A → MiniGame 1,2,3
   → 有明确进度感，不迷失

⑤ 渐进式暴露
   → 新概念在多个小游戏中反复出现
   → 间隔复现自然嵌入游戏流
```

### 工作量估计
| 任务 | 工作量 |
|:---|:---|
| 参考 Antura 关卡结构，设计汉字学院关卡体系 | **2~3天** |
| 实现三重映射（图形+书写+读音）学习卡 | **2天** |

---

## 8. GCompris ⚠️ 提取改造型 · 内容借鉴

### 真实情况
GCompris 是 **Qt/QML 应用**（C++/QML），不是 Web 应用。

虽然 Qt 支持 WebAssembly 编译，但：
- 编译包体积巨大（50MB+），不适合 Web 嵌入
- 无官方 Web 版或 JavaScript 版

### 正确集成策略：**提取活动设计思想 + 内容数据**

GCompris 150+ 活动按类别整理，可以借鉴实现的：

| GCompris 活动 | 借鉴实现 | 难度 |
|:---|:---|:---|
| **数字棋盘（number grids）** | 数字填格游戏 | 低 |
| **记忆配对（memory）** | 图片翻牌记忆 | 低 |
| **分类（classify）** | 动物/植物分类拖拽 | 低 |
| **水循环（watercycle）** | SVG 动画科普 | 中 |
| **简单电路（electric_switch）** | Canvas 拖拽连线 | 中 |
| **数独（sudoku）** | 数独算法+UI | 中 |

GCompris 活动列表可以在 GitHub 查看：
```
github.com/gcompris/GCompris-qt/tree/master/src/activities
```

### 工作量估计
| 任务 | 工作量 |
|:---|:---|
| 参考GCompris，自实现记忆配对游戏 | **1~2天** |
| 实现数独（4x4/6x6） | **2~3天** |
| 实现简单电路拖拽 | **2~3天** |

---

## 9. StoryWeaver（Pratham Books）⚠️ 内容导入型

### 真实情况
- **无官方公开 API**，不能自动批量下载
- 无结构化 JSON 数据接口
- 需要人工操作或联系官方合作

### 可行的内容集成方案

**方案A（推荐）：人工精选 + 手动转换**
```
1. 在 storyweaver.org.in 上筛选中文 CC BY 4.0 故事
2. 选择约 30~50 个适合 5~10 岁的故事
3. 手动整理每页文字 + 下载对应图片
4. 转化为本地 JSON 格式：
   {
     "id": "sw-001",
     "title": "小红帽",
     "level": "L1",
     "language": "zh",
     "license": "CC BY 4.0",
     "attribution": "Pratham Books, StoryWeaver",
     "pages": [
       { "text": "从前有个小女孩...", "image": "page1.jpg" },
       ...
     ]
   }
5. 图片存入 www/stories/images/ 目录
```

**方案B：联系 StoryWeaver 团队合作**
- 邮件：`swopensource.support@prathambooks.org`
- 他们支持教育机构获取结构化数据集

**方案C：自制内容（最可控）**
- 自己创作符合 CC BY 4.0 的中文分级绘本
- 结构更自由，内容更贴合中国儿童认知

### 工作量估计
| 方案 | 工作量 |
|:---|:---|
| 方案A：人工整理30个故事 | **3~5天** |
| 方案C：自制10个原创故事 | **5~10天** |

---

## 10. Math Learning Center Apps ✅ 直接嵌入型

### 集成方式
MLC Apps 是免费开放的 Web 工具，支持 iframe 嵌入：

```html
<!-- 十格阵 Ten Frames -->
<iframe
  src="https://apps.mathlearningcenter.org/ten-frame/"
  width="700" height="500"
  style="border:none;"
></iframe>

<!-- 数轴 Number Line -->
<iframe
  src="https://apps.mathlearningcenter.org/number-line/"
  width="700" height="500"
  style="border:none;"
></iframe>

<!-- 分数条 Fractions -->
<iframe
  src="https://apps.mathlearningcenter.org/fractions/"
  width="700" height="500"
  style="border:none;"
></iframe>
```

### MLC 全部可嵌入的工具

| 工具 | URL | 适龄 | 推荐度 |
|:---|:---|:---|:---|
| **Ten Frames（十格阵）** | `/ten-frame/` | 5-7岁 | ⭐⭐⭐⭐⭐ |
| **Number Line（数轴）** | `/number-line/` | 6-9岁 | ⭐⭐⭐⭐⭐ |
| **Number Frames** | `/number-frames/` | 5-8岁 | ⭐⭐⭐⭐ |
| **Fractions（分数条）** | `/fractions/` | 7-10岁 | ⭐⭐⭐⭐ |
| **Geoboard（钉板）** | `/geoboard/` | 7-10岁 | ⭐⭐⭐ |
| **Math Clock（时钟）** | `/math-clock/` | 6-9岁 | ⭐⭐⭐⭐ |
| **Number Pieces（积木）** | `/number-pieces/` | 6-9岁 | ⭐⭐⭐⭐ |

> ⚠️ MLC 是免费使用但非开源，无法本地离线部署，需要联网

### 离线替代方案
- 参考 MLC 设计，用 Canvas/SVG 自实现十格阵、数轴
- 这也是目前已有 `cpa-manipulatives.js` 中采用的策略

---

## 11. Blockly Games（具体游戏内容分析）

`github.com/google/blockly-games` 包含：

| 游戏 | 描述 | 关卡数 | 适龄 |
|:---|:---|:---|:---|
| **Puzzle（拼图）** | 属性分类，拖拽匹配 | 基础 | 5-7岁 |
| **Maze（迷宫）** | 前后左右指令控制角色走迷宫 | 10关 | 6-8岁 |
| **Bird（小鸟）** | 条件判断，避开障碍 | 10关 | 7-9岁 |
| **Turtle（海龟）** | 循环语句绘图 | 10关 | 7-9岁 |
| **Movie** | 函数参数控制动画 | 10关 | 8-10岁 |
| **Music** | 循环控制音乐演奏 | 10关 | 7-10岁 |
| **Pond（初级）** | 策略对战 | 10关 | 9-10岁 |

**所有游戏都支持中文**（`?lang=zh-hans`），关卡都有完整的引导提示。

### 本地构建步骤
```bash
git clone https://github.com/google/blockly-games
cd blockly-games
npm install
npm run build  # 编译所有游戏
# 构建产物在 appengine/ 目录
# 用任意 HTTP Server 托管即可
```

---

## 综合集成路线图与工作量汇总

### 第一阶段（2周）：直接嵌入，零开发成本
| 任务 | 方法 | 工作量 |
|:---|:---|:---|
| ✅ Blockly Games 本地构建 + 嵌入 | 克隆构建 | **1天** |
| ✅ Chrome Music Lab 3个模块嵌入 | iframe | **0.5天** |
| ✅ PhET 6个实验下载 + 本地嵌入 | 下载文件 | **1天** |
| ✅ MLC 数学工具嵌入（联网） | iframe | **0.5天** |
| **小计** | | **3天** |

### 第二阶段（2周）：自实现借鉴版本
| 任务 | 方法 | 工作量 |
|:---|:---|:---|
| 🔨 Feed The Monster 英文版 | 自实现 | **4天** |
| 🔨 汉字怪兽（拼音音素版） | 自实现 | **2天** |
| 🔨 数学 CPA 学具完整版 | 自实现 | **3天** |
| 🔨 分级绘本引擎 + 内容整理 | 转换30个故事 | **5天** |
| **小计** | | **14天** |

### 第三阶段（2周）：内容与体验完善
| 任务 | 方法 | 工作量 |
|:---|:---|:---|
| 🎨 儿童友好包装界面 | 自研 | **5天** |
| 📊 学习进度追踪集成 | 自研 | **3天** |
| 🔊 TTS 语音集成 | 复用现有 | **1天** |
| 🌐 离线 Service Worker | 自研 | **2天** |
| **小计** | | **11天** |

---

## 关键决策点

> 以下需要确认后才能开始开发：

1. **Scratch 集成深度**：方式A（iframe联网）/ 方式B（TurboWarp离线）/ 方式C（完整编辑器）？
   - 方式C工作量10倍于A，但体验最完整

2. **MLC 工具**：允许联网使用 / 还是全部自实现离线版？
   - 联网方案0开发成本，但依赖外部服务

3. **GCompris**：是否需要从 Qt 编译 WebAssembly 版本？
   - 复杂度极高，建议只借鉴设计，不集成代码

4. **Music Blocks 中文化**：是否需要 fork 并汉化？
   - 约3天工作量，但体验提升显著

5. **PhET 语言**：使用中文版 HTML（已有官方中文） / 英文版？
   - 推荐直接使用官方中文版，下载时选择 `zh_CN` 版本

---

*集成技术指南 v1.0 · 2026-09-14*
