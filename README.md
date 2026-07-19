# 毛茸手作 · 宠物零食售卖网站

一个手作式宠物零食工作室的前端展示与售卖站点。强调"单一原料、低温慢做、配方克制、透明溯源"的品牌主张，整站采用编辑设计风格（Editorial Design），用暖色调与衬线字体营造手作厨房的温度感。

> 项目仅供学习与原型展示使用，商品与评价数据全部为 Mock。

---

## 项目介绍

### 品牌定位
"毛茸手作"是一个虚构的上海本土宠物零食工作室：主理人因捡到一只流浪橘猫，看不下去宠物店货架上的"化学课本式配料表"，于是回到厨房自己做起零食。整站围绕"少即是多"的克制美学展开。

### 核心功能
- **首页**：Hero 大图 → 三大系列导航 → 畅销商品 → 热销榜 TOP 5 → 品牌故事 → 溯源工艺 → 用户评价 → 邮件订阅
- **全部商品**：支持按系列（犬用 / 猫用 / 功能型）筛选，按标签 / 价格排序
- **商品详情**：原料组成、营养分析、喂食建议、用户评价、相关推荐
- **品牌故事**：三章节叙事 + 品牌价值观
- **购物车**：基于 Zustand 的全局状态管理，支持数量调整、删除、合计结算

### 设计亮点
- **月销量与热销榜**：每个商品都有 `monthlySales` 字段，商品卡片和详情页都展示"月销 1.8k"徽标；首页用横向条形图可视化 TOP 5 热销榜（冠军卡 + 排名色：金 / 橙 / 苔绿）
- **字体系统**：Fraunces（衬线展示） + Space Mono（等宽 mono） + Caveat（手写体） + 系统默认无衬线
- **配色**：cocoa（可可棕） / cream（米白） / ember（火橙） / gold（金） / moss（苔绿）
- **动效**：Framer Motion 的 `whileInView` 滚动渐入、阶梯延迟、Hero 标题分行动画
- **图片源**：商品与场景图全部采用 `https://picsum.photos/seed/<seed>/<w>/<h>` 形式，seed 固定保证图片稳定可复现，且不依赖任何鉴权

---

## 技术栈

| 类别 | 选型 |
|---|---|
| 框架 | React 18 |
| 构建工具 | Vite 6 |
| 语言 | TypeScript 5.8 |
| 样式 | Tailwind CSS 3 + PostCSS + Autoprefixer |
| 状态管理 | Zustand 5 |
| 路由 | React Router 7 |
| 动画 | Framer Motion 11 |
| 图标 | lucide-react |
| 工具 | clsx + tailwind-merge |
| Lint | ESLint 9 + typescript-eslint |

---

## 目录结构

```
.
├── public/
│   └── favicon.svg
├── scripts/                  # 隧道与代理辅助脚本（开发期用）
│   ├── proxy-nc.sh
│   └── tunnel.cjs
├── src/
│   ├── components/           # 通用组件
│   │   ├── Breadcrumb.tsx
│   │   ├── Footer.tsx
│   │   ├── Navbar.tsx
│   │   ├── ProductCard.tsx
│   │   ├── RatingStars.tsx
│   │   └── illustrations.tsx # 自制 SVG 装饰图标
│   ├── data/
│   │   └── products.ts       # 12 个 Mock 商品 + 评价数据
│   ├── hooks/
│   │   ├── useReveal.ts
│   │   └── useScrollToTop.ts
│   ├── lib/
│   │   └── utils.ts
│   ├── pages/
│   │   ├── Cart.tsx
│   │   ├── Home.tsx
│   │   ├── NotFound.tsx
│   │   ├── ProductDetail.tsx
│   │   ├── Products.tsx
│   │   └── Story.tsx
│   ├── sections/             # 首页区块
│   │   ├── Hero.tsx
│   │   ├── SeriesNav.tsx
│   │   ├── BestSellers.tsx
│   │   ├── BestSellersChart.tsx   # 热销榜 TOP 5
│   │   ├── BrandStory.tsx
│   │   ├── Traceability.tsx
│   │   ├── Reviews.tsx
│   │   └── Subscribe.tsx
│   ├── store/
│   │   └── cartStore.ts      # Zustand 购物车
│   ├── utils/
│   │   └── format.ts        # 价格 / 日期 / 月销量格式化
│   ├── App.tsx
│   ├── index.css            # Tailwind 入口 + 设计 tokens
│   ├── main.tsx
│   └── vite-env.d.ts
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── pnpm-lock.yaml
├── postcss.config.js
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

---

## 快速运行

### 环境要求
- Node.js ≥ 18
- pnpm ≥ 8 （或 npm / yarn 也可以，但 lockfile 是 pnpm 的）

### 安装依赖

```bash
pnpm install
```

### 启动开发服务器

```bash
pnpm dev
```

默认在 `http://localhost:5173/` 启动。如需让局域网 / 外部访问，可显式指定 host：

```bash
pnpm exec vite --host 0.0.0.0 --port 5173
```

### 构建生产版本

```bash
pnpm build
```

输出到 `dist/` 目录，产物包含：
- `dist/index.html`
- `dist/assets/index-*.css`
- `dist/assets/index-*.js`

### 预览生产构建

```bash
pnpm preview
```

### 类型检查

```bash
pnpm check
```

### Lint

```bash
pnpm lint
```

---

## 主要页面一览

| 路径 | 页面 | 说明 |
|---|---|---|
| `/` | 首页 | 8 个区块纵向叙事，包含热销榜 |
| `/products` | 全部商品 | 筛选 + 排序，支持 query string（`?series=dog`） |
| `/products/:id` | 商品详情 | 原料 / 营养 / 喂食 / 评价 / 相关推荐 |
| `/story` | 品牌故事 | 三章节叙事 + 品牌价值观 |
| `/cart` | 购物车 | 数量调整、删除、合计 |
| `*` | 404 | NotFound 页面 |

---

## 关键实现说明

### 月销量字段
商品类型 `Product` 增加了 `monthlySales: number` 字段，所有 12 个商品都已填充（范围 196 ~ 2400）。

- 商品卡片：weight 旁展示 `月销 1.8k` 徽标（橙色 ember）
- 商品详情页：评分旁展示 `近 30 天售出 1,820 件`
- 格式化函数在 [src/utils/format.ts](src/utils/format.ts) 的 `formatMonthlySales`

### 热销榜组件
[src/sections/BestSellersChart.tsx](src/sections/BestSellersChart.tsx) 实现：
- 取 `monthlySales` 前 5 名
- 横向条形图，bar 宽度按销量百分比动画展开
- 右侧 sticky 冠军卡，带 Crown 图标
- 排名色：第 1 名金、第 2 名橙、第 3 名苔绿、其余可可棕

### 图片源
所有 `<img>` 都指向 `https://picsum.photos/seed/<seed>/<w>/<h>`：
- seed 与商品 / 场景绑定，保证图片稳定不变
- 公开可访问，不依赖任何鉴权或 session token
- 在 [src/data/products.ts](src/data/products.ts) 顶部封装了 `img(seed)` 帮助函数

### 设计 tokens
Tailwind config 与 [src/index.css](src/index.css) 中扩展了：
- 自定义颜色：`cocoa` `cream` `ember` `gold` `moss`（每色含多档明度）
- 自定义字体族：`font-display` (Fraunces) / `font-mono` (Space Mono) / `font-hand` (Caveat)
- 自定义字号 token：`text-hero` `text-display` `text-section` 等（基于 `clamp()` 响应式缩放）

---

## 部署

`dist/` 是纯静态产物，可直接部署到任何静态托管：

- **Vercel / Netlify**：连接 GitHub 仓库，构建命令 `pnpm build`，输出目录 `dist`
- **GitHub Pages**：`pnpm build` 后将 `dist/` 推到 `gh-pages` 分支
- **Nginx / Caddy**：将 `dist/` 拷贝到 web root，配置 SPA fallback 到 `index.html`

---

## License

MIT — 仅用于学习与原型展示。
