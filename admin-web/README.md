# 毛茸手作宠物零食 · 后台管理

"毛茸手作宠物零食"网站的管理后台前端项目，提供商品、分类、订单、评价等业务模块的管理能力，以及运营数据看板。

## 技术栈

- **React 18** + **Vite 6** + **TypeScript 5.6**
- **Ant Design 5** + **@ant-design/icons 5**（UI 组件库）
- **React Router 6**（路由）
- **Axios 1.7**（HTTP 客户端，统一拦截器）
- **TanStack Query 5**（服务端状态管理 / 数据请求缓存）
- **Zustand 5**（鉴权状态持久化）
- **Recharts 2**（仪表盘图表）
- **Day.js**（日期处理）
- **Tailwind CSS 3**（仅用于少量辅助样式，主体使用 antd）

## 项目结构

```
admin-web/
├── index.html
├── vite.config.ts          # 端口 5174，代理 /api → http://localhost:8544
├── tsconfig.json
├── tailwind.config.js
├── postcss.config.js
├── package.json
└── src/
    ├── main.tsx            # 入口：ConfigProvider + QueryClient + Router
    ├── App.tsx             # 路由配置
    ├── index.css           # tailwind 指令 + 全局样式
    ├── api/                # 各业务接口封装（基于统一 axios 实例）
    │   ├── client.ts       # axios 实例 + 请求/响应拦截器
    │   ├── auth.ts         # 登录、me、改密码
    │   ├── product.ts      # 商品 CRUD + 上下架
    │   ├── category.ts     # 分类 CRUD
    │   ├── order.ts        # 订单列表 / 详情 / 状态流转
    │   ├── review.ts       # 评价审核 / 删除
    │   └── dashboard.ts    # 仪表盘汇总 / 销售趋势 / 热销榜
    ├── store/
    │   └── auth.ts         # Zustand 持久化（token + admin）
    ├── types/
    │   └── api.ts          # 所有 DTO / VO 类型定义
    ├── layouts/
    │   └── AdminLayout.tsx # 侧边栏 + 顶栏 + 内容区（含折叠）
    ├── components/
    │   ├── ProtectedRoute.tsx      # 路由守卫
    │   └── ChangePasswordModal.tsx # 修改密码弹窗
    ├── pages/
    │   ├── Login.tsx
    │   ├── Dashboard.tsx
    │   ├── ProductList.tsx
    │   ├── ProductEdit.tsx
    │   ├── CategoryList.tsx
    │   ├── OrderList.tsx
    │   ├── OrderDetail.tsx   # Drawer 形式
    │   ├── ReviewList.tsx
    │   └── NotFound.tsx
    └── utils/
        └── format.ts          # 金额 / 日期格式化
```

## 环境与启动

> 包管理器推荐使用 [pnpm](https://pnpm.io/)。

```bash
# 安装依赖
pnpm install

# 开发模式启动（默认 5174 端口，自动代理 /api → http://localhost:8544）
pnpm dev
```

启动后访问：<http://localhost:5174>

### 默认账号

```
用户名：admin
密码：  admin123
```

> 默认账号在登录页已预填，便于本地测试。生产环境请通过后端修改默认密码。

## 后端 API 约定

- 基础地址：`http://localhost:8544/api`（开发期通过 Vite 代理转发）
- 统一响应：`{ code: 0, msg: "ok", data: ... }`，`code === 0` 表示成功
- 鉴权方式：`Authorization: Bearer <token>` 请求头
- 拦截器统一处理：
  - 业务错误（`code !== 0`）→ `message.error(msg)` 并 reject
  - HTTP 401 → 清空登录态并跳转 `/login`

主要接口（详见 `src/api/`）：

| 模块 | 接口 |
| --- | --- |
| 鉴权 | `POST /admin/login`、`GET /admin/me`、`PUT /admin/password` |
| 商品 | `GET /product/page`、`GET /product/{id}`、`POST /product`、`PUT /product/{id}`、`DELETE /product/{id}`、`PUT /product/{id}/status` |
| 分类 | `GET /category/list`、`POST /category`、`PUT /category/{id}`、`DELETE /category/{id}` |
| 订单 | `GET /order/page`、`GET /order/{id}`、`PUT /order/{id}/status` |
| 评价 | `GET /review/page`、`PUT /review/{id}/status`、`DELETE /review/{id}` |
| 仪表盘 | `GET /dashboard/summary`、`GET /dashboard/sales-trend`、`GET /dashboard/top-products` |

## 页面说明

- **登录页** `/login`：居中卡片式登录，预填默认账号，登录成功后按来源路径回跳。
- **仪表盘** `/dashboard`：四张统计卡（今日订单 / 今日销售额 / 商品数 / 待审评价）+ 近 7 天销售曲线（折线图）+ 热销榜 TOP 5。
- **商品管理** `/product`：支持关键字、分类、系列、状态多条件搜索；表格展示图片、名称、分类、系列、价格、月销、评分、状态；支持编辑、上下架、删除；点击「新增商品」进入编辑页。
- **商品编辑** `/product/new`、`/product/edit/:id`：完整商品表单，含原料多输入、营养键值对、标签等动态字段。
- **分类管理** `/category`：表格 + 弹窗式新增 / 编辑 / 删除。
- **订单管理** `/order`：状态 Tabs 切换（全部 / 待付款 / 已付款 / 已发货 / 已完成 / 已取消）；点击「查看」打开 Drawer 显示订单详情与明细，支持状态流转操作。
- **评价审核** `/review`：状态 Tabs 切换（待审 / 已通过 / 已驳回）；支持通过 / 驳回 / 删除。
- **404**：未匹配路由统一显示。

## 生产构建

```bash
# 类型检查 + 打包到 dist/
pnpm build

# 本地预览构建产物
pnpm preview
```

构建产物输出在 `dist/`，可直接部署至任意静态资源服务器（Nginx / Vercel / Cloudflare Pages 等），部署时需将 `/api` 反向代理至后端服务。
