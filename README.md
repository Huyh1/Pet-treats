# 毛茸手作 · 宠物零食售卖网站

一个手作式宠物零食工作室的前端展示与售卖站点。强调"单一原料、低温慢做、配方克制、透明溯源"的品牌主张，整站采用编辑设计风格（Editorial Design），用暖色调与衬线字体营造手作厨房的温度感。

包含：**前端商城** + **后台管理系统** + **Spring Boot 后端 API**

> 项目仅供学习与原型展示使用，商品与评价数据全部为 Mock。

---

## 项目介绍

### 品牌定位
"毛茸手作"是一个虚构的上海本土宠物零食工作室：主理人因捡到一只流浪橘猫，看不下去宠物店货架上的"化学课本式配料表"，于是回到厨房自己做起零食。整站围绕"少即是多"的克制美学展开。

### 系统架构

```
┌──────────────┐  ┌──────────────┐
│  前端商城      │  │  后台管理      │
│  localhost:5173│  │  localhost:5174│
│  React + Vite │  │  React + AntD │
└──────┬───────┘  └──────┬───────┘
       │  Mock 数据        │  /api → proxy
       │                   ▼
       │            ┌──────────────┐
       │            │  后端 API     │
       │            │  localhost:8080│
       │            │  Spring Boot  │
       │            │  + MyBatis-Plus│
       │            │  + H2 / MySQL │
       │            └──────────────┘
```

---

## 快速开始（一键启动）

### 环境要求

| 工具 | 最低版本 | 说明 |
|------|---------|------|
| Node.js | ≥ 18 | 前端运行环境 |
| Java JDK | ≥ 17 | 后端编译与运行 |
| Maven | ≥ 3 | 后端构建工具 |

### 一键启动

```bash
./start-all.sh
```

脚本会自动完成：环境检查 → 安装依赖 → 编译后端 → 按顺序启动所有服务。

### 服务地址

| 服务 | 地址 | 说明 |
|------|------|------|
| 🛍️ 前端商城 | `http://localhost:5173` | 用户端 SPA |
| 🖥️ 后台管理 | `http://localhost:5174` | 管理员后台 (Ant Design) |
| 🔧 后端 API | `http://localhost:8080/api` | Spring Boot REST |
| 📖 Swagger | `http://localhost:8080/api/swagger-ui.html` | API 文档 |
| 🗄️ H2 控制台 | `http://localhost:8080/api/h2-console` | 数据库管理 (JDBC URL: `jdbc:h2:mem:furou`) |

**后台登录**: `admin` / `admin123`

按 `Ctrl + C` 停止所有服务。

---

## 手动构建与运行

### 前端商城

```bash
# 安装依赖
npm install

# 开发模式
npm run dev              # 默认 http://localhost:5173

# 类型检查
npm run check

# 生产构建
npm run build            # 输出到 dist/

# 预览生产构建
npm run preview
```

### 后台管理系统 (admin-web)

```bash
cd admin-web

# 安装依赖
npm install

# 开发模式
npm run dev              # 默认 http://localhost:5174

# 类型检查
npm run typecheck

# 生产构建
npm run build            # 输出到 admin-web/dist/
```

### 后端 API (admin-server)

```bash
cd admin-server

# 编译（跳过测试）
mvn package -DskipTests

# 启动（H2 内存数据库，开发环境）
java -jar target/admin-server.jar --spring.profiles.active=dev-h2

# 启动（MySQL，需先配置 application-dev.yml 中的数据库连接）
java -jar target/admin-server.jar --spring.profiles.active=dev
```

#### Spring 配置说明

| Profile | 数据库 | 适用场景 |
|---------|--------|---------|
| `dev-h2` | H2 内存数据库 | 本地开发，无需安装 MySQL |
| `dev` | MySQL | 连接远程/本地 MySQL |

配置文件位于 `admin-server/src/main/resources/`：
- `application.yml` — 公共配置
- `application-dev.yml` — 开发环境 (MySQL)
- `application-dev-h2.yml` — 开发环境 (H2)

---

## 核心功能

### 前端商城

- **首页**：Hero 大图 → 三大系列导航 → 畅销商品 → 热销榜 TOP 5 → 品牌故事 → 溯源工艺 → 用户评价 → 邮件订阅
- **全部商品**：支持按系列（犬用 / 猫用 / 功能型）筛选，按标签 / 价格排序
- **商品详情**：原料组成、营养分析、喂食建议、用户评价、相关推荐
- **品牌故事**：三章节叙事 + 品牌价值观
- **购物车**：基于 Zustand 的全局状态管理，支持数量调整、删除、合计结算

### 后台管理系统

- **仪表盘**：订单量 / 销售额 / 商品数统计 + 趋势图表
- **商品管理**：增删改查、分类管理
- **订单管理**：列表分页、状态流转（待付款 → 已付款 → 已发货 → 已完成）
- **评价审核**：用户评价列表、审核通过 / 驳回
- **管理员管理**：账号管理、密码修改
- **JWT 认证**：登录拦截、角色权限控制

### 后端 API

- RESTful 接口设计
- MyBatis-Plus 数据访问
- JWT 身份认证 + 拦截器
- Spring Security 安全配置
- Swagger / OpenAPI 文档
- 统一返回格式 `R<T>`（code / msg / data）
- 统一分页返回 `PageResult<T>`
- 全局异常拦截 `BizException` + `GlobalExceptionHandler`

---

## 设计亮点

- **月销量与热销榜**：每个商品都有 `monthlySales` 字段，商品卡片和详情页都展示"月销 1.8k"徽标；首页用横向条形图可视化 TOP 5 热销榜（冠军卡 + 排名色：金 / 橙 / 苔绿）
- **字体系统**：Fraunces（衬线展示） + Space Mono（等宽 mono） + Caveat（手写体） + 系统默认无衬线
- **配色**：cocoa（可可棕） / cream（米白） / ember（火橙） / gold（金） / moss（苔绿）
- **动效**：Framer Motion 的 `whileInView` 滚动渐入、阶梯延迟、Hero 标题分行动画
- **图片源**：商品与场景图全部采用 `https://picsum.photos/seed/<seed>/<w>/<h>` 形式，seed 固定保证图片稳定可复现，且不依赖任何鉴权

---

## 技术栈

| 类别 | 前端商城 | 后台管理 | 后端 |
|------|---------|---------|------|
| 框架 | React 18 | React 18 | Spring Boot 3.5 |
| 构建 | Vite 6 | Vite 6 | Maven |
| 语言 | TypeScript 5.8 | TypeScript 5.6 | Java 17 |
| UI | Tailwind CSS 3 | Ant Design 5 + Tailwind 3 | — |
| 状态管理 | Zustand 5 | Zustand 5 + React Query 5 | — |
| 路由 | React Router 7 | React Router 6 | — |
| 动画 | Framer Motion 11 | — | — |
| 图表 | — | Recharts 2 | — |
| HTTP | — | Axios 1 | — |
| 数据库 | — | — | H2 / MySQL + MyBatis-Plus 3.5 |
| 认证 | — | — | JWT (jjwt 0.12) + Spring Security |
| 文档 | — | — | SpringDoc / Swagger 2.6 |
| 图标 | lucide-react | @ant-design/icons | — |
| Lint | ESLint 9 | — | — |

---

## 项目结构

```
Pet-treats/
├── src/                          # 前端商城源码
│   ├── components/               # 通用组件 (Navbar, Footer, ProductCard, ...)
│   ├── data/                     # Mock 商品数据
│   ├── hooks/                    # 自定义 Hooks
│   ├── lib/                      # 工具函数
│   ├── pages/                    # 页面组件
│   ├── sections/                 # 首页区块 (Hero, SeriesNav, BestSellers, ...)
│   ├── store/                    # Zustand 购物车
│   ├── utils/                    # 格式化函数
│   ├── App.tsx                   # 路由入口
│   ├── index.css                 # Tailwind 入口 + 设计 tokens
│   └── main.tsx                  # 应用入口
│
├── admin-web/                    # 后台管理系统
│   └── src/
│       ├── api/                  # Axios 接口封装 (auth, order, product, review)
│       ├── components/           # 通用组件 (AdminLayout)
│       ├── pages/                # 页面 (Dashboard, ProductList, OrderList, ReviewList, ...)
│       ├── store/                # Zustand 状态管理
│       ├── types/                # TypeScript 类型定义
│       ├── App.tsx               # 路由 + 认证守卫
│       └── main.tsx              # 应用入口
│
├── admin-server/                 # 后端 API
│   └── src/main/
│       ├── java/com/furou/admin/
│       │   ├── common/           # R, PageResult, BizException, GlobalExceptionHandler
│       │   ├── config/           # SecurityConfig, MyBatisPlusConfig, JwtConfig
│       │   ├── interceptor/      # JWT 拦截器
│       │   └── module/
│       │       ├── admin/        # 管理员模块
│       │       ├── order/        # 订单模块
│       │       ├── product/      # 商品模块
│       │       └── review/       # 评价模块
│       └── resources/
│           ├── application.yml
│           ├── application-dev.yml
│           ├── application-dev-h2.yml
│           ├── data.sql          # H2 初始化数据
│           └── logback-spring.xml
│
├── scripts/                      # 辅助脚本
├── public/                       # 静态资源
├── start-all.sh                  # 🔥 一键启动脚本
├── package.json                  # 前端商城依赖
├── vite.config.ts                # 前端商城 Vite 配置
├── tailwind.config.js            # Tailwind 配置
└── README.md                     # 本文档
```

---

## 主要页面一览

### 前端商城

| 路径 | 页面 | 说明 |
|------|------|------|
| `/` | 首页 | 8 个区块纵向叙事，包含热销榜 |
| `/products` | 全部商品 | 筛选 + 排序，支持 query string（`?series=dog`） |
| `/products/:id` | 商品详情 | 原料 / 营养 / 喂食 / 评价 / 相关推荐 |
| `/story` | 品牌故事 | 三章节叙事 + 品牌价值观 |
| `/cart` | 购物车 | 数量调整、删除、合计 |

### 后台管理系统

| 路径 | 页面 | 说明 |
|------|------|------|
| `/login` | 登录 | JWT 认证 |
| `/dashboard` | 仪表盘 | 数据统计 + 趋势图表 |
| `/product` | 商品管理 | 增删改查 |
| `/product/:id` | 商品编辑 | 编辑商品详情 |
| `/order` | 订单管理 | 列表分页 + 状态流转 |
| `/order/:id` | 订单详情 | 订单信息 + 状态操作 |
| `/review` | 评价审核 | 审核通过 / 驳回 |

---

## 关键实现说明

### 月销量字段
商品类型 `Product` 增加了 `monthlySales: number` 字段，所有 12 个商品都已填充（范围 196 ~ 2400）。

- 商品卡片：weight 旁展示 `月销 1.8k` 徽标（橙色 ember）
- 商品详情页：评分旁展示 `近 30 天售出 1,820 件`
- 格式化函数在 `src/utils/format.ts` 的 `formatMonthlySales`

### 热销榜组件
`src/sections/BestSellersChart.tsx` 实现：
- 取 `monthlySales` 前 5 名
- 横向条形图，bar 宽度按销量百分比动画展开
- 右侧 sticky 冠军卡，带 Crown 图标
- 排名色：第 1 名金、第 2 名橙、第 3 名苔绿、其余可可棕

### 图片源
所有 `<img>` 都指向 `https://picsum.photos/seed/<seed>/<w>/<h>`：
- seed 与商品 / 场景绑定，保证图片稳定不变
- 公开可访问，不依赖任何鉴权或 session token
- 在 `src/data/products.ts` 顶部封装了 `img(seed)` 帮助函数

### 设计 tokens
Tailwind config 与 `src/index.css` 中扩展了：
- 自定义颜色：`cocoa` `cream` `ember` `gold` `moss`（每色含多档明度）
- 自定义字体族：`font-display` (Fraunces) / `font-mono` (Space Mono) / `font-hand` (Caveat)
- 自定义字号 token：`text-hero` `text-display` `text-section` 等（基于 `clamp()` 响应式缩放）

---

## 部署

### 前端（商城 + 后台管理）

纯静态产物，可直接部署到任何静态托管：

- **Vercel / Netlify**：连接 GitHub 仓库，构建命令 `npm run build`，输出目录 `dist`
- **Nginx / Caddy**：将 `dist/` 拷贝到 web root，配置 SPA fallback 到 `index.html`

### 后端

```bash
# 打包
cd admin-server
mvn package -DskipTests

# 部署 JAR（需替换数据库连接为生产环境）
java -jar target/admin-server.jar --spring.profiles.active=prod
```

建议配合 MySQL 数据库使用，修改 `application.yml` 中的数据库连接配置。

---

## License

MIT — 仅用于学习与原型展示。
