#!/usr/bin/env bash
# =========================================================================
# 毛茸手作 · 一键启动脚本
# 同时启动：前端商城 + 后台管理 + 后端 API
# =========================================================================

set -e

# ----------------------- 颜色定义 -----------------------
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# ----------------------- PID 追踪 -----------------------
declare -a PIDS=()
cleanup() {
  echo ""
  echo -e "${YELLOW}正在停止所有服务...${NC}"
  for pid in "${PIDS[@]}"; do
    kill "$pid" 2>/dev/null && echo "  已停止 PID: $pid"
  done
  echo -e "${GREEN}所有服务已停止。${NC}"
  exit 0
}
trap cleanup SIGINT SIGTERM EXIT

# ----------------------- 项目根目录 -----------------------
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

# ----------------------- 配置 -----------------------
BACKEND_PORT=8544
FRONTEND_PORT=5173
ADMIN_WEB_PORT=5174
LOG_DIR="/tmp/pet-treats-logs"

mkdir -p "$LOG_DIR"

echo ""
echo -e "${CYAN}╔══════════════════════════════════════════╗${NC}"
echo -e "${CYAN}║     🐾 毛茸手作 · 一键启动              ║${NC}"
echo -e "${CYAN}╚══════════════════════════════════════════╝${NC}"
echo ""

# ======================= 环境检查 =======================
echo -e "${YELLOW}[1/6] 环境检查...${NC}"

# Node.js
if ! command -v node &>/dev/null; then
  echo -e "${RED}❌ 未找到 Node.js，请先安装 Node.js ≥ 18${NC}"
  exit 1
fi
NODE_VER=$(node -v)
echo -e "  ✅ Node.js ${GREEN}${NODE_VER}${NC}"

# Java
if ! command -v java &>/dev/null; then
  echo -e "${RED}❌ 未找到 Java，请先安装 JDK ≥ 17${NC}"
  exit 1
fi
JAVA_VER=$(java -version 2>&1 | head -1 | awk -F'"' '{print $2}')
echo -e "  ✅ Java ${GREEN}${JAVA_VER}${NC}"

# Maven Wrapper（无需系统安装 Maven，使用项目自带的 mvnw）
if [ -x "admin-server/mvnw" ]; then
  echo -e "  ✅ Maven Wrapper (mvnw) ${GREEN}就绪${NC}"
else
  echo -e "${RED}❌ 未找到 admin-server/mvnw，请先运行: cd admin-server && mvn wrapper:wrapper${NC}"
  exit 1
fi

# 端口占用检查
check_port() {
  if lsof -ti:"$1" &>/dev/null; then
    echo -e "  ${YELLOW}⚠ 端口 $1 已被占用，将尝试释放...${NC}"
    lsof -ti:"$1" | xargs kill 2>/dev/null || true
    sleep 1
  fi
}
check_port $BACKEND_PORT
check_port $FRONTEND_PORT
check_port $ADMIN_WEB_PORT

echo ""

# ======================= 安装依赖 =======================
echo -e "${YELLOW}[2/6] 安装前端依赖...${NC}"
if [ ! -d "node_modules" ]; then
  npm install --silent
  echo -e "  ✅ 前端依赖安装完成"
else
  echo -e "  ✅ 前端依赖已存在"
fi

echo -e "${YELLOW}[3/6] 安装后台管理依赖...${NC}"
cd admin-web
if [ ! -d "node_modules" ]; then
  npm install --silent
  echo -e "  ✅ 后台管理依赖安装完成"
else
  echo -e "  ✅ 后台管理依赖已存在"
fi
cd "$SCRIPT_DIR"

echo ""

# ======================= 编译后端 =======================
echo -e "${YELLOW}[4/6] 编译后端服务（跳过测试）...${NC}"
cd admin-server
# 仅在源文件变更时重新编译
JAR_FILE="target/admin-server.jar"
NEED_BUILD=false
if [ ! -f "$JAR_FILE" ]; then
  NEED_BUILD=true
else
  # 检查 src 目录是否有比 jar 更新的文件
  if [ -n "$(find src -newer "$JAR_FILE" 2>/dev/null | head -1)" ]; then
    NEED_BUILD=true
  fi
fi
if $NEED_BUILD; then
  echo "  正在编译..."
  ./mvnw package -DskipTests -q
  echo -e "  ✅ 编译完成"
else
  echo -e "  ✅ JAR 已是最新，跳过编译"
fi
cd "$SCRIPT_DIR"

echo ""

# ======================= 启动后端 =======================
echo -e "${YELLOW}[5/6] 启动后端 API (H2 内存数据库)...${NC}"
java -jar admin-server/target/admin-server.jar \
  --spring.profiles.active=dev-h2 \
  > "$LOG_DIR/backend.log" 2>&1 &
BACKEND_PID=$!
PIDS+=($BACKEND_PID)
echo -e "  PID: ${BACKEND_PID}"

# 等待后端就绪
echo -n "  等待后端就绪"
for i in {1..30}; do
  if curl -s "http://localhost:$BACKEND_PORT/api/actuator" &>/dev/null 2>&1; then
    echo ""
    echo -e "  ✅ 后端就绪"
    break
  fi
  echo -n "."
  sleep 1
done
if [ $i -eq 30 ]; then
  echo ""
  echo -e "  ${YELLOW}⚠ 后端可能未完全启动，查看日志: tail -f $LOG_DIR/backend.log${NC}"
fi

echo ""

# ======================= 启动前端 =======================
echo -e "${YELLOW}[6/6] 启动前端服务...${NC}"

# 后台管理
cd admin-web
npx vite --port $ADMIN_WEB_PORT --strictPort > "$LOG_DIR/admin-web.log" 2>&1 &
ADMIN_PID=$!
PIDS+=($ADMIN_PID)
echo -e "  后台管理 PID: ${ADMIN_PID} (端口 ${ADMIN_WEB_PORT})"
cd "$SCRIPT_DIR"

# 前端商城
npx vite --port $FRONTEND_PORT --strictPort > "$LOG_DIR/frontend.log" 2>&1 &
FRONTEND_PID=$!
PIDS+=($FRONTEND_PID)
echo -e "  前端商城 PID: ${FRONTEND_PID} (端口 ${FRONTEND_PORT})"

sleep 2

echo ""
echo -e "${GREEN}╔══════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║          🎉 全部服务已启动！             ║${NC}"
echo -e "${GREEN}╠══════════════════════════════════════════╣${NC}"
echo -e "${GREEN}║                                          ║${NC}"
echo -e "${GREEN}║  🛍️  前端商城:  http://localhost:${FRONTEND_PORT}     ║${NC}"
echo -e "${GREEN}║  🖥️  后台管理:  http://localhost:${ADMIN_WEB_PORT}     ║${NC}"
echo -e "${GREEN}║  🔧 后端 API:  http://localhost:${BACKEND_PORT}/api   ║${NC}"
echo -e "${GREEN}║  📖 Swagger:   http://localhost:${BACKEND_PORT}/api/swagger-ui.html  ║${NC}"
echo -e "${GREEN}║  🗄️  H2 控制台: http://localhost:${BACKEND_PORT}/api/h2-console     ║${NC}"
echo -e "${GREEN}║                                          ║${NC}"
echo -e "${GREEN}║  后台登录:  admin / admin123             ║${NC}"
echo -e "${GREEN}║                                          ║${NC}"
echo -e "${GREEN}║  按 Ctrl+C 停止所有服务                  ║${NC}"
echo -e "${GREEN}╚══════════════════════════════════════════╝${NC}"
echo ""
echo -e "日志目录: ${CYAN}${LOG_DIR}${NC}"
echo ""

# 保持脚本运行，等待子进程
wait
