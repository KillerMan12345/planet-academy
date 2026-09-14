#!/bin/bash
# 启动星球学院高保真交互原型本地预览服务

PORT=8092
echo "🪐 正在启动星球学院 (Planet Academy) 原型预览服务..."
echo "📱 本地访问地址: http://127.0.0.1:${PORT}"
echo "按 Ctrl+C 可停止服务"

python3 -m http.server ${PORT}
