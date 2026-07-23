#!/usr/bin/env bash
# =========================================================================
# 毛茸手作 · 一键启动脚本
# 同时启动：前端商城 + 后台管理 + 后端 API（全部后台运行）
#
# 用法：
#   ./start-all.sh            # 默认启动（等价于 start）
#   ./start-all.sh start      # 启动全部服务（后台运行）
#   ./start-all.sh stop       # 停止全部服务
#   ./start-all.sh restart    # 重启全部服务
#   ./start-all.sh status     # 查看服务运行状态
# =========================================================================

# ----------------------- 颜色定义 -----------------------
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# ----------------------- 配置 -----------------------
BACKEND_PORT=8544
FRONTEND_PORT=5173
ADMIN_WEB_PORT=5174
LOG_DIR="/tmp/pet-treats-logs"
PID_FILE="$LOG_DIR/pids"

mkdir -p "$LOG_DIR"

# ----------------------- 项目根目录 -----------------------
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

# ----------------------- 日志输出 -----------------------
log()  { echo -e "${GREEN}[$(date +'%H:%M:%S')]${NC} $*"; }
warn() { echo -e "${YELLOW}[$(date +'%H:%M:%S')]${NC} $*"; }
err()  { echo -e "${RED}[$(date +'%H:%M:%S')]${NC} $*"; }

# ----------------------- PID 管理 -----------------------
save_pid() {
  echo "$1" >> "$PID_FILE"
}

is_running() {
  # 参数：$1 = pid
  kill -0 "$1" 2>/dev/null
}

# 停止单个 PID（连同其进程组）
kill_pid() {
  local pid=$1
  if is_running "$pid"; then
    # 杀掉整个进程组（含子进程，如 vite 衍生进程）
    pkill -P "$pid" 2>/dev/null || true
    kill "$pid" 2>/dev/null || true
  fi
}

# ======================= 环境检查 =======================
check_env() {
  if ! command -v node &>/dev/null; then
    err "❌ 未找到 Node.js，请先安装 Node.js ≥ 18"
    exit 1
  fi
  if ! command -v java &>/dev/null; then
    err "❌ 未找到 Java，请先安装 JDK ≥ 17"
    exit 1
  fi
  if [ ! -x "admin-server/mvnw" ]; then
    err "❌ 未找到 admin-server/mvnw，请先运行: cd admin-server && mvn wrapper:wrapper"
    exit 1
  fi
}

# 端口占用检查 + 释放
check_port() {
  if lsof -ti:"$1" &>/dev/null; then
    warn "⚠ 端口 $1 已被占用，尝试释放..."
    lsof -ti:"$1" | xargs kill 2>/dev/null || true
    sleep 1
  fi
}

# ======================= 安装依赖 =======================
install_deps() {
  log "${YELLOW}安装前端依赖...${NC}"
  if [ ! -d "node_modules" ]; then
    npm install --silent && log "  ✅ 前端依赖安装完成"
  else
    log "  ✅ 前端依赖已存在"
  fi

  log "${YELLOW}安装后台管理依赖...${NC}"
  cd admin-web
  if [ ! -d "node_modules" ]; then
    npm install --silent && log "  ✅ 后台管理依赖安装完成"
  else
    log "  ✅ 后台管理依赖已存在"
  fi
  cd "$SCRIPT_DIR"
}

# ======================= 编译后端 =======================
build_backend() {
  log "${YELLOW}编译后端服务（跳过测试）...${NC}"
  cd admin-server
  JAR_FILE="target/admin-server.jar"
  NEED_BUILD=false
  if [ ! -f "$JAR_FILE" ]; then
    NEED_BUILD=true
  elif [ -n "$(find src -newer "$JAR_FILE" 2>/dev/null | head -1)" ]; then
    NEED_BUILD=true
  fi
  if $NEED_BUILD; then
    ./mvnw package -DskipTests -q && log "  ✅ 编译完成"
  else
    log "  ✅ JAR 已是最新，跳过编译"
  fi
  cd "$SCRIPT_DIR"
}

# ======================= 启动服务 =======================
start_services() {
  # 清空旧 PID 文件
  : > "$PID_FILE"

  log "${CYAN}启动后端 API (H2 内存数据库)...${NC}"
  nohup java -jar admin-server/target/admin-server.jar \
    --spring.profiles.active=dev-h2 \
    > "$LOG_DIR/backend.log" 2>&1 &
  save_pid $!
  log "  后端 PID: $! (端口 $BACKEND_PORT)"

  # 等待后端就绪
  log "  等待后端就绪"
  for i in {1..30}; do
    if curl -s "http://localhost:$BACKEND_PORT/api/actuator" &>/dev/null 2>&1; then
      log "  ✅ 后端就绪"
      break
    fi
    sleep 1
  done

  log "${CYAN}启动前端服务...${NC}"

  cd admin-web
  nohup npx vite --port $ADMIN_WEB_PORT --strictPort \
    > "$LOG_DIR/admin-web.log" 2>&1 &
  save_pid $!
  log "  后台管理 PID: $! (端口 $ADMIN_WEB_PORT)"
  cd "$SCRIPT_DIR"

  nohup npx vite --port $FRONTEND_PORT --strictPort \
    > "$LOG_DIR/frontend.log" 2>&1 &
  save_pid $!
  log "  前端商城 PID: $! (端口 $FRONTEND_PORT)"

  sleep 2

  echo ""
  echo -e "${GREEN}╔══════════════════════════════════════════╗${NC}"
  echo -e "${GREEN}║          🎉 全部服务已后台启动！          ║${NC}"
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
  echo -e "${GREEN}║  停止服务:  ./start-all.sh stop          ║${NC}"
  echo -e "${GREEN}╚══════════════════════════════════════════╝${NC}"
  echo ""
  echo -e "日志目录: ${CYAN}${LOG_DIR}${NC}"
  echo -e "PID 文件: ${CYAN}${PID_FILE}${NC}"
  echo ""
}

# ======================= 停止服务 =======================
stop_services() {
  log "${YELLOW}正在停止所有服务...${NC}"
  local killed=0

  # 1. 通过 PID 文件停止
  if [ -f "$PID_FILE" ]; then
    while read -r pid; do
      [ -z "$pid" ] && continue
      if is_running "$pid"; then
        kill_pid "$pid"
        killed=$((killed + 1))
      fi
    done < "$PID_FILE"
    rm -f "$PID_FILE"
  fi

  # 2. 兜底：清理仍占用端口的进程
  for port in "$BACKEND_PORT" "$FRONTEND_PORT" "$ADMIN_WEB_PORT"; do
    pids=$(lsof -ti:"$port" 2>/dev/null || true)
    if [ -n "$pids" ]; then
      echo "$pids" | xargs kill 2>/dev/null || true
      killed=$((killed + 1))
    fi
  done

  # 3. 兜底：清理残留的 vite / java 进程（仅本项目）
  pkill -f "admin-server/target/admin-server.jar" 2>/dev/null || true
  pkill -f "vite --port $ADMIN_WEB_PORT" 2>/dev/null || true
  pkill -f "vite --port $FRONTEND_PORT" 2>/dev/null || true

  if [ "$killed" -gt 0 ]; then
    log "  ✅ 已停止服务"
  else
    log "  ℹ️ 没有运行中的服务"
  fi
  echo ""
}

# ======================= 查看状态 =======================
status_services() {
  echo ""
  echo -e "${CYAN}═══════ 服务状态 ═══════${NC}"
  local running=0 total=0

  # 后端
  total=$((total + 1))
  if curl -s "http://localhost:$BACKEND_PORT/api/actuator" &>/dev/null 2>&1; then
    echo -e "  🔧 后端 API   (:$BACKEND_PORT)  ${GREEN}● 运行中${NC}"
    running=$((running + 1))
  else
    echo -e "  🔧 后端 API   (:$BACKEND_PORT)  ${RED}○ 已停止${NC}"
  fi

  # 前端商城
  total=$((total + 1))
  if lsof -ti:"$FRONTEND_PORT" &>/dev/null 2>&1; then
    echo -e "  🛍️  前端商城 (:$FRONTEND_PORT)  ${GREEN}● 运行中${NC}"
    running=$((running + 1))
  else
    echo -e "  🛍️  前端商城 (:$FRONTEND_PORT)  ${RED}○ 已停止${NC}"
  fi

  # 后台管理
  total=$((total + 1))
  if lsof -ti:"$ADMIN_WEB_PORT" &>/dev/null 2>&1; then
    echo -e "  🖥️  后台管理 (:$ADMIN_WEB_PORT)  ${GREEN}● 运行中${NC}"
    running=$((running + 1))
  else
    echo -e "  🖥️  后台管理 (:$ADMIN_WEB_PORT)  ${RED}○ 已停止${NC}"
  fi

  echo -e "${CYAN}────────────────────────${NC}"
  echo -e "  运行中: ${GREEN}$running${NC} / $total"
  echo -e "  日志目录: ${CYAN}$LOG_DIR${NC}"
  echo ""
}

# ======================= 主流程 =======================
usage() {
  cat <<EOF
用法：./start-all.sh [command]

命令：
  start     启动全部服务（后台运行，默认）
  stop      停止全部服务
  restart   重启全部服务
  status    查看服务运行状态
  (无参数)  等价于 start

EOF
}

ACTION="${1:-start}"

case "$ACTION" in
  start)
    check_env
    check_port $BACKEND_PORT
    check_port $FRONTEND_PORT
    check_port $ADMIN_WEB_PORT
    install_deps
    build_backend
    start_services
    ;;
  stop)
    stop_services
    ;;
  restart)
    stop_services
    sleep 2
    check_env
    install_deps
    build_backend
    start_services
    ;;
  status)
    status_services
    ;;
  -h|--help|help)
    usage
    ;;
  *)
    err "未知命令: $ACTION"
    usage
    exit 1
    ;;
esac
