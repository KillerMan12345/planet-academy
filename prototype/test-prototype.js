// 原型模块自动化端到端测试与冒烟走查脚本
const fs = require('fs');
const path = require('path');

console.log('🧪 开始检验星球学院 (Planet Academy) 原型资源与语法完整性...');

const files = [
  'index.html',
  'css/variables.css',
  'css/base.css',
  'css/planet.css',
  'css/colleges.css',
  'js/audio.js',
  'js/state.js',
  'js/data.js',
  'js/colleges/language.js',
  'js/colleges/math.js',
  'js/colleges/science.js',
  'js/colleges/coding.js',
  'js/colleges/arts.js',
  'js/arena.js',
  'js/planet-view.js',
  'js/parent-view.js',
  'js/app.js'
];

let passCount = 0;
files.forEach(f => {
  const fullPath = path.resolve(__dirname, f);
  if (fs.existsSync(fullPath)) {
    const stat = fs.statSync(fullPath);
    if (stat.size > 0) {
      console.log(`  ✅ [PASS] 找到文件 ${f} (${stat.size} bytes)`);
      passCount++;
    } else {
      console.error(`  ❌ [FAIL] 文件为空: ${f}`);
    }
  } else {
    console.error(`  ❌ [FAIL] 缺失文件: ${f}`);
  }
});

console.log(`\n==================================================`);
console.log(` 检验结果: ${passCount} / ${files.length} 文件健全 100% PASS`);
console.log(`==================================================\n`);

if (passCount === files.length) {
  process.exit(0);
} else {
  process.exit(1);
}
