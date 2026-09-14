# 星球学院 · 跨平台技术架构选型报告

> 目标平台：Android / iOS / 鸿蒙OS NEXT / 微信小程序  
> 核心约束：WebView嵌入（PhET/Blockly）+ Canvas游戏 + 离线优先 + 儿童低端设备

---

## 一、先看平台覆盖矩阵

中国市场当前设备分布（2026）：

| 平台 | 市场份额 | 目标用户重合度 | 优先级 |
|:---|:---|:---|:---|
| **Android** | ~72% | 高（主要家庭设备） | P0 |
| **iOS** | ~18% | 高（付费能力强用户）| P0 |
| **微信小程序** | 覆盖10亿用户 | 极高（无需下载，传播容易）| P0 |
| **鸿蒙OS NEXT** | ~15%（快速增长）| 高（华为用户） | P1 |
| **Web/H5** | 浏览器 | 中（PC端家长预览）| P2 |

---

## 二、五大技术方案全面对比

### 方案 A：Flutter（Dart）

**架构原理**：
```
Dart 业务代码
    ↓
Flutter Impeller 渲染引擎（自绘）
    ↓
Skia/Metal/Vulkan 直接调用 GPU
    ↓
Android / iOS / Web
```

**平台覆盖**：
| 平台 | 支持程度 |
|:---|:---|
| Android | ✅ 官方一流支持 |
| iOS | ✅ 官方一流支持 |
| 鸿蒙OS NEXT | ⚠️ 社区维护（flutter_ohos），非官方，需 DevEco Studio |
| 微信小程序 | ❌ 不支持 |
| Web | ✅ 官方支持（Flutter Web），但体积大 |

**与本项目的契合度分析**：

| 需求 | 评估 |
|:---|:---|
| 嵌入 PhET / Blockly（WebView）| ✅ `flutter_inappwebview` 插件成熟 |
| Canvas 游戏 | ✅ CustomPainter / Flame 游戏引擎 |
| 音频（TTS/音效） | ✅ `just_audio` / `flutter_tts` |
| 离线本地存储 | ✅ `hive` / `isar` |
| 触控热区 ≥ 88px | ✅ 完全控制 |
| 动画性能 | ✅ 最强，60/120fps 稳定 |
| 微信小程序 | ❌ 不支持，需单独开发 |
| 鸿蒙支持 | ⚠️ 可用但需额外工作量 |

**代码规模与工作量**：
```
单一 Dart 代码库 → 编译为 Android APK + iOS IPA
WebView 嵌入：flutter_inappwebview（5~7天）
额外鸿蒙适配：+15~20天
微信小程序：需另立项目（uni-app/原生）
```

**优缺点总结**：
- ✅ 动画和游戏性能最强
- ✅ 单一代码库覆盖 Android + iOS
- ✅ Flame 游戏引擎可用于棋类/益智游戏
- ❌ **不支持微信小程序**（这是中国市场重大缺失）
- ❌ 鸿蒙支持是社区方案，存在稳定性风险
- ❌ Dart 语言学习成本
- ❌ 编译包体较大（Android 30MB+）

---

### 方案 B：React Native + Expo（TypeScript）

**架构原理**：
```
TypeScript/React 代码
    ↓
React Native 新架构（Fabric + JSI）
    ↓
原生 UIKit / Android Views（复用系统组件）
    ↓
Android / iOS
```

**平台覆盖**：
| 平台 | 支持程度 |
|:---|:---|
| Android | ✅ 官方一流支持 |
| iOS | ✅ 官方一流支持 |
| 鸿蒙OS NEXT | ❌ 无官方支持 |
| 微信小程序 | ❌ 不支持 |
| Web | ⚠️ React Native Web（兼容性有限）|

**与本项目的契合度分析**：

| 需求 | 评估 |
|:---|:---|
| 嵌入 PhET / Blockly（WebView）| ✅ `react-native-webview` 成熟 |
| Canvas 游戏 | ⚠️ `react-native-canvas` / `react-native-skia` |
| 音频 | ✅ `react-native-sound` |
| 生态系统 | ✅ npm 生态最大 |
| 微信小程序 | ❌ 不支持 |
| 鸿蒙支持 | ❌ 无 |

**优缺点总结**：
- ✅ TypeScript 开发体验好，团队容易上手
- ✅ 最大的 JS 生态，npm 包极丰富
- ❌ **不支持微信小程序和鸿蒙**（中国市场两大缺口）
- ❌ 游戏性能弱于 Flutter
- ❌ 对儿童教育 App 来说，JS Bridge 在低端 Android 机上有卡顿风险

---

### 方案 C：uni-app（Vue 3）

**架构原理**：
```
Vue 3 + uni-app API 代码
    ↓ 编译器
┌─────────────────────────────────┐
│  小程序  │ App（Webview）│  H5  │
│  微信    │ Android+iOS  │ Web  │
│  支付宝  │              │      │
└─────────────────────────────────┘
```

**平台覆盖**：
| 平台 | 支持程度 |
|:---|:---|
| Android | ✅ 支持（基于 WebView 渲染） |
| iOS | ✅ 支持（基于 WebView 渲染）|
| 鸿蒙OS NEXT | ✅ HBuilderX 4.27+ 官方支持（Vue3项目）|
| 微信小程序 | ✅ 最成熟的小程序方案 |
| 支付宝/抖音/百度小程序 | ✅ 一码多发 |

**与本项目的契合度分析**：

| 需求 | 评估 |
|:---|:---|
| 嵌入 PhET / Blockly（WebView）| ✅ `<web-view>` 组件（App端完整支持）|
| 嵌入 WebView（小程序端）| ⚠️ 限制较多（全屏、需备案域名、企业主体）|
| Canvas 游戏 | ⚠️ App 端可用，小程序端性能受限 |
| 音频 | ✅ `uni.playBackgroundAudio()` |
| 微信小程序 | ✅ 最佳选择 |
| 鸿蒙OS | ✅ 官方支持 |
| 离线 | ✅ App 端支持 |

**小程序端的关键限制**：
```
❌ 包大小限制：主包 ≤ 2MB，总包 ≤ 20MB
   → PhET HTML 单个 2~8MB，无法打包进小程序
   
❌ web-view 全屏：无法局部嵌入 PhET/Blockly
   → PhET 只能跳转到 web-view 页面全屏展示
   
❌ web-view 域名白名单：需备案 + 企业主体
   → 嵌入第三方域名受严格限制
   
❌ Canvas 性能：WebView 渲染层，复杂游戏掉帧
   → 棋类/益智游戏体验下降
```

**优缺点总结**：
- ✅ **覆盖最广**：微信小程序 + Android + iOS + 鸿蒙 + 其他小程序
- ✅ Vue 3 开发体验现代，中国开发者社区大
- ✅ DCloud 生态插件丰富，快速上市
- ⚠️ App 端基于 WebView，性能不如 Flutter/RN
- ❌ **小程序端 WebView 限制严重**，PhET/Blockly 集成受阻
- ❌ 小程序端游戏性能弱

---

### 方案 D：uni-app x（编译为原生 ArkTS/Kotlin/Swift）

**架构原理**：
```
Vue-like 语法 (uvue/uts)
    ↓ uni-app x 编译器
┌──────────────────────────────────┐
│ Android  │   iOS    │  鸿蒙NEXT  │
│ Kotlin   │  Swift   │  ArkTS     │
│ 原生渲染  │  原生渲染 │  ArkUI     │
└──────────────────────────────────┘
```

**与 uni-app 的核心区别**：
| 对比 | uni-app | uni-app x |
|:---|:---|:---|
| 渲染方式 | WebView | 原生组件（Kotlin/Swift/ArkTS）|
| 性能 | 中等 | 接近原生 |
| 语言 | Vue + JS | uvue + uts（UTS = 类 TypeScript）|
| 小程序支持 | ✅ | ⚠️ 实验性 |
| 工具链 | HBuilderX | HBuilderX + DevEco Studio |

**平台覆盖**：
| 平台 | 支持程度 |
|:---|:---|
| Android | ✅ 编译为 Kotlin 原生 |
| iOS | ✅ 编译为 Swift 原生 |
| 鸿蒙OS NEXT | ✅ 编译为 ArkTS 原生 |
| 微信小程序 | ⚠️ 实验性，非主力 |

---

### 方案 E：双轨制架构（推荐方案）

**核心思想**：
> 用两套代码，覆盖所有平台，各平台体验最优。

```
┌─────────────────────────────────────────┐
│            共享层（业务逻辑/数据）          │
│  学科数据 JSON / API / 学习进度协议        │
└───────────────┬─────────────────────────┘
                │
       ┌────────┴────────┐
       ↓                 ↓
┌──────────────┐  ┌─────────────────┐
│   Flutter    │  │   uni-app       │
│  App 正式版   │  │  小程序轻量版    │
│              │  │                 │
│ Android ✅   │  │ 微信小程序 ✅   │
│ iOS     ✅   │  │ 支付宝小程序 ✅  │
│ 鸿蒙    ⚠️   │  │ 抖音小程序 ✅   │
│              │  │                 │
│ 完整功能      │  │ 核心功能子集     │
│ 高性能游戏    │  │ 轻量学习练习     │
│ 全WebView    │  │ 引流/试用入口    │
└──────────────┘  └─────────────────┘
```

**小程序版功能子集策略**：
```
✅ 小程序可以做（完美支持）：
  - 单词/汉字闪卡练习
  - 古诗诵读
  - 口算练习
  - 学习进度同步
  - 家长报告查看
  - 引导下载完整版App

❌ 小程序不做（技术限制）：
  - PhET 实验（包体积超限）
  - Blockly 编程（WebView 限制）
  - 棋类游戏（Canvas 性能）
  - 音乐编曲（Web Audio API 限制）
```

---

## 三、评分对比矩阵（针对星球学院具体需求）

| 维度（权重）| Flutter | React Native | uni-app | uni-app x | 双轨制 |
|:---|:---:|:---:|:---:|:---:|:---:|
| **Android/iOS 性能**（25%）| ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| **微信小程序覆盖**（25%）| ⭐ | ⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐ | ⭐⭐⭐⭐⭐ |
| **鸿蒙OS支持**（10%）| ⭐⭐ | ⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| **WebView集成**（15%）| ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| **Canvas/游戏**（15%）| ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| **开发效率**（5%）| ⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ |
| **团队维护成本**（5%）| ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐ |
| **综合加权得分** | **3.9** | **3.1** | **3.7** | **3.6** | **4.6** |

---

## 四、最终推荐方案

### 🏆 推荐：双轨制 Flutter App + uni-app 小程序

```
Phase 1（MVP，3个月）
└── Flutter App（Android + iOS）
    ├── 完整五大学院体验
    ├── PhET / Blockly / Chrome Music Lab WebView嵌入
    ├── Canvas 游戏（Flame引擎）
    └── 离线优先

Phase 2（+2个月）  
└── uni-app 微信小程序
    ├── 语言学院（英语/汉字/古诗练习）
    ├── 数学练习（口算/CPA轻量版）
    ├── 学习报告查看
    └── 引导下载完整App

Phase 3（+2个月）
└── 鸿蒙OS 适配
    ├── 方案A：Flutter_ohos 社区方案
    └── 方案B：uni-app x 编译为 ArkTS（更稳定）
```

### 技术栈选型细节

**Flutter App 技术栈**：
```yaml
语言:        Dart 3.x
状态管理:    Riverpod / Bloc
WebView:     flutter_inappwebview 6.x
游戏引擎:    Flame 1.x（棋类/益智游戏）
音频:        just_audio + flutter_tts
本地存储:    Hive / Isar
图片缓存:    cached_network_image
动画:        Lottie + 原生动画
国际化:      flutter_localizations（中英双语）
```

**uni-app 小程序技术栈**：
```yaml
语言:        Vue 3 + TypeScript
UI组件:      uni-ui + 自定义组件
状态管理:    Pinia
API通信:     uni.request
本地存储:    uni.setStorageSync
音频:        uni.playBackgroundAudio
跨端适配:    条件编译 #ifdef MP-WEIXIN
```

**共享层（两端共用）**：
```
学习内容数据    → JSON（汉字/古诗/英语词汇）
学习记录格式    → 统一 Schema
API 协议        → RESTful（如后期上云）
SM-2 算法        → 各端独立实现（逻辑一样）
```

---

## 五、鸿蒙OS 专项分析

### 三种鸿蒙接入方案

| 方案 | 技术路径 | 成熟度 | 工作量 |
|:---|:---|:---|:---|
| **A. uni-app (Vue3)** | WebView 混合渲染 | ✅ 官方支持 | 中（+5天）|
| **B. uni-app x** | 编译为 ArkTS 原生 | ✅ 官方支持（4.61+）| 高（+20天）|
| **C. flutter_ohos** | 社区 Flutter 引擎 | ⚠️ 社区维护 | 高（+20天，风险高）|
| **D. 纯 ArkTS 原生** | DevEco Studio 开发 | ✅ 官方原生 | 极高（独立项目）|

**推荐**：Phase 3 使用 **uni-app x** 路径，原因：
- DCloud 官方维护，更新及时
- 编译产物是 ArkTS 原生代码，后续维护方便
- 比 flutter_ohos 稳定，比纯原生开发成本低

---

## 六、微信小程序深度分析

### 可以做（技术可行）
```
✅ 闪卡练习（字/词/图片）
✅ 选择题练习（语文/数学）
✅ 古诗朗读（audio 播放）
✅ 汉字笔顺（canvas 2D绘制）
✅ 学习打卡记录
✅ 家长学情查看
✅ 分享激励（生成海报）
✅ 口算速算（纯逻辑，无WebView）
```

### 受限但有解法
```
⚠️ PhET 实验
   → 解法：用 web-view 跳转到自建网页（需备案域名）
   → 或：用 canvas 自实现简化版实验

⚠️ Blockly 编程
   → 解法：设计一套更简单的指令卡片式编程（不用 Blockly）
   → 针对小程序重新设计简化版编程交互

⚠️ 音乐编曲
   → 解法：用原生 canvas 做简化的钢琴键盘+节拍格
```

### 完全不可行（建议放弃）
```
❌ 嵌入运行 PhET HTML 文件（包体积超限，无法打包）
❌ 完整 Scratch 编辑器
❌ Chrome Music Lab 全功能（需自有域名备案）
❌ 复杂 WebGL 游戏
```

---

## 七、三个月 MVP 开发路线

### 第一个月：Flutter App 基础框架
```
Week 1: 项目初始化
  ├── Flutter 3.x 项目创建
  ├── 设计系统（颜色/字体/组件库）
  └── 底部导航 + 路由框架（GoRouter）

Week 2: 学院大厅
  ├── 五大学院 Hub 界面
  ├── WebView 嵌入框架（flutter_inappwebview）
  └── 语言学院骨架

Week 3: 核心教学引擎
  ├── 汉字笔顺 Canvas 实现
  ├── Blockly Games 嵌入（WebView）
  └── 数学 CPA 工具嵌入（MLC + 自研）

Week 4: 成长系统
  ├── 星光值 + 星球进化界面
  ├── 宠物系统
  └── SM-2 间隔复现调度
```

### 第二个月：五大学院内容填充
```
Week 5-6: 语言学院（英语 Phonics + 汉字）
Week 7:   科学学院（PhET 6个实验本地化）
Week 8:   音乐美育学院（Chrome Music Lab集成）
```

### 第三个月：小程序 + 质量
```
Week 9-10: uni-app 微信小程序（核心功能子集）
Week 11:   全平台 QA 测试
Week 12:   Android + iOS 应用商店发布
```

---

## 八、一句话总结

| 如果你的目标是... | 选择 |
|:---|:---|
| **只做 Android + iOS，追求最好体验** | Flutter |
| **覆盖微信小程序是首要目标** | uni-app 为主 |
| **同时覆盖所有平台（推荐）** | **Flutter App + uni-app 小程序双轨** |
| **一人团队，快速上线** | uni-app 全家桶（降低功能预期）|
| **Web + App 一套代码** | uni-app（但体验有妥协）|

---

*架构选型报告 v1.0 · 2026-09-14*
