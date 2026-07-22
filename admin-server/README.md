# 毛茸手作宠物零食 - 后台管理 API（admin-server）

毛茸手作宠物零食网站的后台管理系统，提供商品、分类、订单、评价审核、仪表盘等管理接口，使用 JWT 进行无状态认证。

## 技术栈

| 类别 | 选型 |
|------|------|
| 语言 / 框架 | Java 17 / Spring Boot 3.5 |
| 安全 | Spring Security + JWT (jjwt 0.12.6) |
| ORM | MyBatis-Plus 3.5.7 |
| 数据库 | MySQL 8（主）/ H2（dev-h2 备用） |
| 接口文档 | springdoc-openapi 2.6.0（Swagger UI） |
| SQL 日志 | p6spy-spring-boot-starter |
| 工具 | Lombok |
| 构建 | Maven |

## 目录结构

```
admin-server/
├── pom.xml
├── README.md
└── src/main/
    ├── java/com/furou/admin/
    │   ├── AdminApplication.java          # 启动类
    │   ├── config/                        # 配置类
    │   │   ├── MybatisPlusConfig.java     # 分页插件 + 自动填充
    │   │   ├── WebMvcConfig.java          # CORS
    │   │   ├── SecurityConfig.java        # Spring Security + JWT 无状态
    │   │   └── SwaggerConfig.java         # OpenAPI 3 文档
    │   ├── common/                       # 通用响应/异常
    │   │   ├── R.java                    # 统一响应 {code, msg, data}
    │   │   ├── PageResult.java           # 分页响应
    │   │   ├── BizException.java         # 业务异常
    │   │   └── GlobalExceptionHandler.java
    │   ├── security/                     # JWT 鉴权
    │   │   ├── JwtUtil.java
    │   │   ├── JwtAuthFilter.java
    │   │   └── AdminUserDetails.java
    │   └── module/                       # 业务模块
    │       ├── admin/                    # 管理员（登录 / 当前用户 / 改密）
    │       ├── product/                  # 商品
    │       ├── category/                 # 分类
    │       ├── order/                    # 订单
    │       ├── review/                   # 评价审核
    │       └── dashboard/                # 数据仪表盘
    └── resources/
        ├── application.yml               # 主配置：端口 8544，context-path=/api，默认 dev
        ├── application-dev.yml           # dev：连接真实 MySQL（192.168.1.31）
        ├── application-dev-h2.yml         # dev-h2：H2 内存库（无需外部 MySQL）
        ├── schema.sql                    # 建表脚本
        ├── data.sql                      # 初始数据
        └── logback-spring.xml            # 日志配置
```

## 快速运行

### 前置条件
- JDK 17 及以上（在 JDK 25 环境下，pom.xml 已配置 `--release 17` 兼容）
- Maven 3.6+

### 1. 打包

```bash
cd /workspace/admin-server
mvn clean package -DskipTests
```

### 2. 运行

**方式 A：java -jar**
```bash
java -jar target/admin-server.jar
```

**方式 B：mvn spring-boot:run**
```bash
mvn spring-boot:run
```

### 3. 切换 Profile

- **dev（默认）**：连接真实 MySQL（`192.168.1.31:3306/pet_treats`）。需要 MySQL 可达。
- **dev-h2**：H2 内存库，无需外部依赖，启动即建表 + 灌数据，便于本地调试。

切换方式：
```bash
# 方式 1：命令行参数
java -jar target/admin-server.jar --spring.profiles.active=dev-h2

# 方式 2：环境变量
export SPRING_PROFILES_ACTIVE=dev-h2
mvn spring-boot:run

# 方式 3：修改 application.yml 中的 spring.profiles.active
```

启动后 H2 控制台：http://localhost:8544/api/h2-console （JDBC URL: `jdbc:h2:mem:pet_treats`，用户名 `sa`，密码空）

## 默认账号

| 用户名 | 密码 | 角色 |
|--------|------|------|
| admin  | admin123 | ADMIN |

## API 文档

启动后访问 Swagger UI：
- **接口文档**：http://localhost:8544/api/swagger-ui.html
- **OpenAPI JSON**：http://localhost:8544/api/v3/api-docs

调用受保护接口时，在 Swagger 右上角点击 "Authorize" 按钮，输入：
```
Bearer <你的 JWT token>
```

## 接口路径列表

所有接口前缀均为 `/api`。

### 管理员
| 方法 | 路径 | 说明 |
|------|------|------|
| POST | `/admin/login` | 登录，返回 JWT token |
| GET  | `/admin/me` | 获取当前登录管理员 |
| PUT  | `/admin/password` | 修改密码 |

### 商品
| 方法 | 路径 | 说明 |
|------|------|------|
| GET    | `/product/page` | 商品分页查询（支持 keyword / categoryId / series / status） |
| GET    | `/product/{id}` | 商品详情 |
| POST   | `/product` | 新增商品 |
| PUT    | `/product/{id}` | 更新商品 |
| DELETE | `/product/{id}` | 删除商品（逻辑删） |
| PUT    | `/product/{id}/status?status=1` | 商品上下架 |

### 分类
| 方法 | 路径 | 说明 |
|------|------|------|
| GET    | `/category/list` | 全部分类 |
| GET    | `/category/{id}` | 分类详情 |
| POST   | `/category` | 新增分类 |
| PUT    | `/category/{id}` | 更新分类 |
| DELETE | `/category/{id}` | 删除分类 |

### 订单
| 方法 | 路径 | 说明 |
|------|------|------|
| GET | `/order/page` | 订单分页查询（支持 orderNo / customerName / status） |
| GET | `/order/{id}` | 订单详情（含订单明细） |
| PUT | `/order/{id}/status?status=PAID` | 修改订单状态 |

订单状态枚举：`PENDING`（待付款）/ `PAID`（已付款）/ `SHIPPED`（已发货）/ `COMPLETED`（已完成）/ `CANCELLED`（已取消）

### 评价审核
| 方法 | 路径 | 说明 |
|------|------|------|
| GET    | `/review/page?status=0` | 评价分页查询（status: 0=待审 / 1=已通过 / 2=已驳回） |
| PUT    | `/review/{id}/status?status=1` | 通过(1) / 驳回(2) 评价 |
| DELETE | `/review/{id}` | 删除评价 |

### 仪表盘
| 方法 | 路径 | 说明 |
|------|------|------|
| GET | `/dashboard/summary` | 今日订单数 / 今日销售额 / 商品数 / 待审评价数 |
| GET | `/dashboard/sales-trend?days=7` | 最近 N 天销售曲线 |
| GET | `/dashboard/top-products?limit=5` | 热销商品 TOP N |

### 放行接口（无需登录）
- `/admin/login`
- `/v3/api-docs/**`
- `/swagger-ui/**`、`/swagger-ui.html`
- `/h2-console/**`（仅 dev-h2 profile）

## 统一响应格式

```json
{
  "code": 200,
  "msg": "success",
  "data": { ... }
}
```

错误响应：
```json
{
  "code": 401,
  "msg": "未登录或登录已过期",
  "data": null
}
```

## 鉴权说明

1. 调用 `POST /api/admin/login`，body：`{"username":"admin","password":"admin123"}`
2. 响应中拿到 `data.token`
3. 后续请求在 HTTP Header 中携带：
   ```
   Authorization: Bearer <token>
   ```
4. token 默认 24 小时过期，可在 `application.yml` 的 `jwt.expire` 调整（单位：秒）

## 初始数据

- 管理员：1 个（admin/admin123）
- 分类：3 个（犬用主食 / 猫用主食 / 功能型）
- 商品：12 个（直接照搬前台 `src/data/products.ts`，ingredients / nutrition 序列化为 JSON 字符串）
- 订单：3 条 + 6 条订单明细
- 评价：5 条（2 通过 / 2 待审 / 1 驳回）

## 常见问题

### Q: 在 JDK 25 环境下打包失败？
A: pom.xml 的 `maven-compiler-plugin` 已配置 `--release 17`，应该可正常打包。如仍报错，确认 `JAVA_HOME` 指向 JDK 17+。

### Q: 启动时连不上 MySQL（192.168.1.31）？
A: 切换到 dev-h2 profile：`--spring.profiles.active=dev-h2`，使用 H2 内存库。

### Q: schema.sql / data.sql 每次启动都执行？
A: 是的。schema.sql 用 `CREATE TABLE IF NOT EXISTS`，data.sql 用 `INSERT IGNORE`，可重复执行不会出错。

### Q: H2 控制台打不开？
A: 仅在 dev-h2 profile 下启用。先确认 profile 是否正确，再访问 `/api/h2-console`。
