# 🪐 星球学院 · Planet Academy

> **让每个孩子拥有一座属于自己的学习星球**  
> 面向 5~10 岁儿童 · 五大跨学科学院 · 全球优质开源教育生态集成 · 离线优先 · 零广告零内购

---

## 🌟 项目愿景

**"将世界最好的开源教育工具，整合成一款中国孩子能用的综合学习宇宙"**

星球学院打破传统单科习题 App 的局限，将学习设计为一座充满生机的宇宙。五大学院彼此独立而又通过共同的**成长货币（星光值）**、**我的星球进化**和**虚拟宠物伴侣**形成有机联动。孩子在玩中探索、在做中建构、在创作中表达。

---

## 🏛️ 五大学院与竞技乐园架构

| 学院 | Emoji | 主题色 | 核心技能 | 深度集成的开源生态 |
|:---|:---:|:---:|:---|:---|
| **语言阅读学院** | 📖 | 暖橙 `#FF8C42` | 自然拼读 / 汉字笔顺 / 古诗词 / 分级绘本 | [Feed The Monster](https://github.com/curiouslearning/FeedTheMonster) · [Antura](https://github.com/vgwb/Antura) · [StoryWeaver](https://storyweaver.org.in/) |
| **数理逻辑学院** | 🔢 | 天蓝 `#4ECDC4` | 新加坡数学 CPA 学具 / 口算赛车 / 几何代数 | [Math Learning Center](https://www.mathlearningcenter.org/apps) · [Mathigon](https://mathigon.org/polypad) · [Tux Math](https://edu.kde.org/tuxmath) |
| **科学探究学院** | 🔬 | 翠绿 `#45B7D1` | 物理微实验 / 生命自然 / 太阳系 / 安全自护 | [PhET Simulations](https://phet.colorado.edu) · [GCompris](https://github.com/KDE/gcompris) · [Kolibri](https://github.com/learningequality/kolibri) |
| **少儿编程学院** | 💻 | 紫罗兰 `#9B59B6`| 计算思维 / 积木迷宫 / 循环逻辑 / 创意编程 | [Google Blockly](https://github.com/google/blockly) · [Blockly Games](https://github.com/google/blockly-games) · [Scratch](https://scratch.mit.edu) |
| **音乐美育学院** | 🎨 | 玫红 `#F39C12` | 编曲创作 / 节奏律动 / 魔法画布 / 几何艺术 | [Chrome Music Lab](https://musiclab.chromeexperiments.com/) · [Music Blocks](https://github.com/sugarlabs/musicblocks) · [Tux Paint](https://tuxpaint.org) |
| **智力竞技乐园** | 🏆 | 金橙 `#E8A838` | 双人同屏 / AI 对战 (象棋、四子棋、记忆对战) | GCompris 经典游戏 · 自研 Minimax 引擎 |

---

## 📱 跨平台架构（双轨制架构）

为了同时满足 **高质量图形互动（App 端）** 与 **裂变传播/免安装试用（微信小程序端）** 的双重诉求，项目采用**双轨制架构**：

```
┌────────────────────────────────────────────────────────┐
│                   共享核心（Shared Layer）              │
│       学科数据 JSON  ·  SM-2 间隔记忆算法  ·  学情 Schema │
└───────────────────────────┬────────────────────────────┘
                            │
              ┌─────────────┴─────────────┐
              ↓                           ↓
   ┌───────────────────────┐   ┌───────────────────────┐
   │    Flutter App 主端   │   │   uni-app 小程序轻量版 │
   │   (Android & iOS)     │   │   (微信/抖音/支付宝)   │
   ├───────────────────────┤   ├───────────────────────┤
   │ • 全功能五大学院      │   │ • 单词/生字闪卡轻练习 │
   │ • PhET / Blockly 本地 │   │ • 口算速算挑战        │
   │ • Flame 游戏引擎      │   │ • 古诗诵读            │
   │ • 完整离线运行        │   │ • 家长报告与引流下载  │
   └───────────────────────┘   └───────────────────────┘
```

- **鸿蒙OS NEXT**：后续规划基于 `uni-app x` 编译为 ArkTS 原生应用，或通过 `flutter_ohos` 引擎承接。

---

## 📚 详细设计文档索引

所有关于下一代星球学院的研究、设计与技术方案均已收录在 [`docs/`](./docs/) 目录中：

1. [📖 01. 前期开源项目调研与教育方法论](./docs/01-product-research.md)
   - 科学理论背书：CPA 模式、Phonics 自然拼读、Papert 建构主义、SM-2 记忆算法
   - 10+ 顶尖开源儿童教育项目深度解构与价值分析
2. [🪐 02. 星球学院产品设计文档 (PRD v1.0)](./docs/02-planet-academy-prd.md)
   - 五大学院完整知识体系脑图（L1~L4 分级）
   - 星球成长体系、宠物伙伴系统、成就勋章设计
   - 儿童无挫 UI 规范（≥88px 热区、零扣分、防沉迷家长门）
3. [🔧 03. 开源项目集成技术指南](./docs/03-integration-technical-guide.md)
   - Google Blockly / Blockly Games 本地构建与 WebView 嵌入
   - Chrome Music Lab 离线打包与 Web Audio API 方案
   - PhET 互动实验本地 HTML5 单文件接入方案
   - Feed The Monster 游戏机制提取与 Web 自实现代码
4. [📐 04. 跨平台技术架构选型报告](./docs/04-cross-platform-architecture.md)
   - Flutter vs React Native vs uni-app vs uni-app x 多维度 65 项对比
   - 微信小程序包体限制 (2MB) 与 WebView 策略突破分析
5. [🚀 05. 双轨制完整实施计划与里程碑](./docs/05-implementation-plan.md)
   - 3 个月 MVP 开发分解（目录结构、依赖清单、验收标准）
   - Phase 1 (Flutter App) → Phase 2 (uni-app 小程序) → Phase 3 (鸿蒙原生)

---

## 🛡️ 儿童产品核心设计公约

- 🟢 **触控友好**：交互控件热区最小 88px × 88px，间距 ≥ 24px。
- 🟢 **三重反馈**：视觉粒子/光晕 + 愉悦音效 + 温暖语音旁白。
- 🟢 **答错零惩罚**：无红叉、不扣分、不扣星、无 Game Over，仅果冻轻柔抖动提示。
- 🟢 **绝对安全纯净**：儿童端严禁任何形式的广告、内购、付费与隐私收集入口；家长管理入口强制图形算术防沉迷验证。

---

## 📄 开源许可证

本项目文档与架构设计采用 [MIT License](./LICENSE)。引用的开源组件遵循其各自的开源许可证（Apache 2.0 / CC BY 4.0 / BSD / MIT）。
