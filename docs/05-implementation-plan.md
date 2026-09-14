# 星球学院 · 完整实施计划

> **双轨制架构**：Flutter App（Android/iOS）+ uni-app 微信小程序  
> 总工期：约 6 个月（MVP 3个月，完整版 +3个月）

---

## 一、项目目录结构

```
planet-academy/
│
├── apps/
│   ├── flutter_app/          # Flutter 主 App（Android + iOS）
│   └── miniprogram/          # uni-app 微信小程序
│
├── shared/                   # 两端共用的内容数据
│   ├── content/
│   │   ├── english/          # 英语词汇/音素 JSON
│   │   ├── hanzi/            # 汉字笔顺数据
│   │   ├── poems/            # 古诗词数据
│   │   ├── math/             # 数学题库
│   │   ├── science/          # 科普百科
│   │   └── stories/          # 分级绘本
│   └── schemas/              # 数据格式 Schema 定义
│
├── assets/                   # 共用资源（图片/音频）
│   ├── phet/                 # PhET HTML 本地文件（中文版）
│   ├── blockly-games/        # Blockly Games 构建产物
│   └── audio/                # 背景音乐/音效
│
└── docs/                     # 文档
    ├── prd.md
    ├── design-system.md
    └── api-schema.md
```

---

## 二、Flutter App 技术栈

```yaml
SDK 版本:    Flutter 3.22+ / Dart 3.4+
目标平台:    Android 7.0+ / iOS 14+

核心依赖:
  路由:         go_router: ^14.0
  状态管理:     flutter_riverpod: ^2.5
  WebView:      flutter_inappwebview: ^6.1
  游戏引擎:     flame: ^1.18       # 棋类/益智游戏
  音频:         just_audio: ^0.9   # 背景音乐/音效
  TTS:          flutter_tts: ^4.0  # 语音朗读
  本地存储:     hive_flutter: ^1.1  # 学习进度
  图片缓存:     cached_network_image: ^3.3
  动画:         lottie: ^3.1       # Lottie 庆祝动画
  图表:         fl_chart: ^0.68    # 家长学情图表
  国际化:       flutter_localizations (SDK内置)
```

---

## 三、Flutter App 目录结构

```
lib/
├── main.dart
├── app.dart
│
├── core/                        # 核心基础设施
│   ├── router/app_router.dart   # GoRouter 路由
│   ├── theme/
│   │   ├── app_colors.dart      # 6学院主色 + 中性色
│   │   ├── app_typography.dart  # 圆润字体
│   │   └── app_theme.dart       # ThemeData
│   ├── storage/local_storage.dart
│   └── audio/audio_service.dart
│
├── features/
│   ├── home/                    # 🌌 星球大厅
│   │   ├── home_page.dart
│   │   ├── planet_widget.dart   # 我的星球 Lottie 动画
│   │   └── daily_task_card.dart
│   │
│   ├── college_hub/             # 学院选择器
│   │
│   ├── language/                # 📖 语言阅读学院
│   │   ├── english/
│   │   │   ├── phonics_game.dart      # 怪兽喂字母
│   │   │   ├── flashcard_engine.dart  # SM-2 闪卡
│   │   │   └── story_reader.dart      # 分级绘本
│   │   ├── hanzi/
│   │   │   └── stroke_canvas.dart     # 田字格笔顺
│   │   └── poems/
│   │       └── poem_theater.dart      # 古诗情景剧场
│   │
│   ├── math/                    # 🔢 数理逻辑学院
│   │   ├── cpa/
│   │   │   ├── ten_frame.dart         # 十格阵
│   │   │   ├── number_line.dart       # 数轴跳跳蛙
│   │   │   └── balance_scale.dart     # 代数天平
│   │   └── sprint_race.dart           # 口算极速赛车
│   │
│   ├── science/                 # 🔬 科学探究学院
│   │   └── phet_lab/phet_viewer.dart  # PhET WebView
│   │
│   ├── coding/                  # 💻 少儿编程学院
│   │   ├── blockly/blockly_viewer.dart
│   │   └── scratch/scratch_viewer.dart
│   │
│   ├── arts/                    # 🎨 音乐美育学院
│   │   ├── music_lab_viewer.dart      # Chrome Music Lab
│   │   └── paint_canvas.dart          # 绘画画布
│   │
│   ├── arena/                   # 🏆 竞技乐园
│   │   ├── chess_board.dart           # Flame 棋类
│   │   └── memory_game.dart           # 翻牌记忆
│   │
│   ├── growth/                  # 成长系统
│   │   ├── my_planet_page.dart        # 我的星球
│   │   └── badge_gallery.dart         # 成就勋章
│   │
│   └── parent/                  # 家长中心
│       ├── parent_gate.dart           # 密码验证
│       └── dashboard.dart             # 学情仪表盘
│
└── shared/
    ├── widgets/
    │   ├── college_card.dart
    │   ├── star_counter.dart
    │   ├── celebration.dart           # 庆祝 Lottie
    │   └── webview_scaffold.dart      # WebView 统一包装
    └── providers/
        ├── progress_provider.dart
        ├── star_provider.dart
        └── sm2_provider.dart
```

---

## 四、关键技术实现

### 4.1 WebView 统一包装

```dart
// 所有 WebView 嵌入使用统一包装组件
// 本地 PhET 文件
WebViewScaffold(
  title: '浮沉实验',
  source: 'assets/phet/density_zh_CN.html',
  isLocal: true,
)

// 本地 Blockly Games
WebViewScaffold(
  title: '迷宫编程',
  source: 'assets/blockly_games/maze/index.html?level=1&lang=zh-hans',
  isLocal: true,
)

// 联网 Chrome Music Lab
WebViewScaffold(
  title: 'Song Maker 编曲',
  source: 'https://musiclab.chromeexperiments.com/Song-Maker/',
  isLocal: false,
)
```

### 4.2 SM-2 间隔复现

```dart
class SM2Card {
  double easiness = 2.5;  // 记忆易度因子
  int interval = 1;        // 复习间隔（天）
  int repetitions = 0;     // 复习次数
  DateTime nextReview = DateTime.now();

  void review(int quality) {  // quality: 0~5
    if (quality < 3) {
      repetitions = 0;
      interval = 1;
    } else {
      interval = repetitions == 0 ? 1
               : repetitions == 1 ? 6
               : (interval * easiness).round();
      repetitions++;
    }
    easiness = max(1.3, easiness + 0.1 - (5 - quality) * 0.08);
    nextReview = DateTime.now().add(Duration(days: interval));
  }
}
```

### 4.3 答错零惩罚反馈

```dart
// 答对：三重正向反馈
Future<void> onCorrect(BuildContext context) async {
  showCelebration(context);           // 星星粒子特效
  await AudioService.play('correct'); // 悦耳音效
  await TtsService.speak(            // 语音鼓励
    ['太棒了！', '你真厉害！', 'Great job!'][Random().nextInt(3)]
  );
}

// 答错：零惩罚引导
Future<void> onWrong(BuildContext context) async {
  triggerJello(context);              // 果冻抖动，非刺眼红叉
  await AudioService.play('hint');    // 轻柔提示音
  await TtsService.speak('再试一次吧～');
  // ❌ 不扣分、不弹失败页、不跳转
}
```

### 4.4 学院颜色设计系统

```dart
class AppColors {
  static const language = Color(0xFFFF8C42);  // 暖橙
  static const math     = Color(0xFF4ECDC4);  // 天蓝
  static const science  = Color(0xFF45B7D1);  // 翠绿
  static const coding   = Color(0xFF9B59B6);  // 紫罗兰
  static const arts     = Color(0xFFF39C12);  // 玫红
  static const arena    = Color(0xFFE8A838);  // 金橙

  static const background = Color(0xFFFAFAFA);
  static const starGold   = Color(0xFFFFD700);
}
```

---

## 五、开发阶段路线图

### Phase 1：Flutter MVP（第 1~3 月）

#### 第 1 周 · M1 基础框架
- [ ] Flutter 项目初始化
- [ ] 设计系统（颜色/字体/间距）
- [ ] GoRouter 底部 4-Tab 导航
- [ ] Hive 本地存储
- [ ] 音频服务 + TTS 封装

#### 第 2 周 · M2 学院大厅 + 成长系统
- [ ] 5张学院大卡片 Hub 页面
- [ ] 我的星球（Lottie 进化动画）
- [ ] 宠物伴侣（5种，状态表情）
- [ ] 星光值 Riverpod 状态
- [ ] 成就勋章结构

#### 第 3 周 · M3 WebView 集成
- [ ] flutter_inappwebview 安装测试
- [ ] PhET 6个实验下载（约 20MB）
- [ ] PhET / Blockly / Music Lab WebView 包装
- [ ] Blockly Games 本地构建（npm run build）

#### 第 4~5 周 · M4 语言学院
- [ ] 英语怪兽喂字母（自实现）
- [ ] 汉字田字格笔顺（CustomPainter）
- [ ] 古诗诵读剧场（TTS + 动画）
- [ ] 分级绘本阅读器（30个故事）
- [ ] SM-2 复习调度器

#### 第 6 周 · M5 数理逻辑学院
- [ ] 十格阵 / 数轴 / 天平（Canvas）
- [ ] 口算极速赛车（Flame）
- [ ] 数独游戏（4×4/6×6）

#### 第 7~8 周 · M6 科学 + 编程 + 美育
- [ ] PhET 实验室页面（6个实验）
- [ ] 科普百科（200 Q&A）
- [ ] Blockly 编程学院（Maze/Bird/Turtle）
- [ ] Chrome Music Lab（3个模块）
- [ ] 魔法画布

#### 第 9 周 · M7 竞技乐园
- [ ] 井字棋 / 四子棋（Flame AI）
- [ ] 记忆翻牌（4种主题）
- [ ] 词语接龙

#### 第 10~12 周 · M8 家长中心 + 发布
- [ ] 家长图形密码验证
- [ ] 学情仪表盘（fl_chart）
- [ ] 全平台 Widget 测试
- [ ] Android APK + iOS IPA 打包发布

---

### Phase 2：uni-app 微信小程序（第 4~5 月）

#### 第 1 周 · S1 基础框架
- [ ] uni-app Vue3 + TypeScript 初始化
- [ ] 视觉系统与 Flutter 版一致
- [ ] 微信小程序企业账号配置

#### 第 2 周 · S2 语言学院（小程序）
- [ ] 英语闪卡（SM-2）
- [ ] 汉字笔顺（canvas 2d）
- [ ] 古诗音频朗读

#### 第 3 周 · S3 数学 + 成长
- [ ] 口算速算练习
- [ ] 打卡 / 勋章 / 今日任务
- [ ] 家长学情报告

#### 第 4~5 周 · S4 测试 + 发布
- [ ] 引流下载完整 App 页面
- [ ] 多机型兼容测试
- [ ] 微信小程序审核发布

---

### Phase 3：鸿蒙 + 增强（第 6 月）

- [ ] uni-app x → HarmonyOS NEXT 适配评估
- [ ] 更多 PhET 实验按需下载
- [ ] 离线内容包管理
- [ ] Performance 优化（首屏 < 2s）

---

## 六、MVP 验收标准

```
✅ 五大学院各至少一个完整功能可用
✅ PhET 实验：浮沉/电路/气球 3个可在 App 内启动
✅ Blockly Maze 至少 10 关可完整游玩
✅ Chrome Music Lab Song Maker 可使用
✅ 汉字笔顺 50字可练习（含笔顺动画引导）
✅ 英语怪兽游戏完整可玩（含进化动画）
✅ 星光值 + 宠物 + 成就系统运转正常
✅ 家长中心密码保护（图形验证题）
✅ 零广告 / 零内购 / 零数据上传
✅ 离线状态下本地功能正常
✅ Android APK + iOS IPA 可安装
✅ 触控热区 ≥ 88px（无小按钮）
✅ 答错零惩罚（无红叉/扣分/失败页）
```

---

## 七、风险评估

| 风险 | 概率 | 影响 | 应对 |
|:---|:---:|:---:|:---|
| Blockly Games 构建复杂（Closure 旧系统）| 中 | 中 | 预留 3 天，先用 Blockly Core 自定义 |
| PhET 文件体积（20MB+）| 高 | 低 | 首批仅内置 3 个，其余按需下载 |
| flutter_tts 中文发音不准 | 中 | 高 | 备选方案：设备 TTS / 豆包 API |
| App Store 儿童类审核 | 低 | 高 | 提前研读 COPPA + App Store 儿童类规则 |
| 微信小程序 WebView 域名限制 | 高 | 中 | 小程序版不集成 WebView，全部自实现 |

---

*实施计划 v1.0 · 星球学院 · 2026-09-14*
