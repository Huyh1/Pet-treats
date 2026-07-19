-- =====================================================
-- 毛茸手作宠物零食 - 数据库建表脚本
-- 同时兼容 MySQL 8 与 H2（MODE=MySQL）
-- =====================================================

-- 管理员表
CREATE TABLE IF NOT EXISTS `admin` (
    `id`              BIGINT       NOT NULL AUTO_INCREMENT COMMENT '主键',
    `username`        VARCHAR(50)  NOT NULL COMMENT '用户名',
    `password_hash`   VARCHAR(100) NOT NULL COMMENT 'BCrypt 密码哈希',
    `nickname`        VARCHAR(50)  NULL COMMENT '昵称',
    `role`            VARCHAR(20)  NOT NULL DEFAULT 'ADMIN' COMMENT '角色：ADMIN',
    `status`          TINYINT(1)   NOT NULL DEFAULT 1 COMMENT '状态：1=启用, 0=禁用',
    `created_at`      DATETIME     NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `updated_at`      DATETIME     NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    `deleted`         TINYINT(1)   NOT NULL DEFAULT 0 COMMENT '逻辑删除：1=已删, 0=未删',
    PRIMARY KEY (`id`),
    UNIQUE KEY `uk_username` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='管理员表';

-- 分类表
CREATE TABLE IF NOT EXISTS `category` (
    `id`          BIGINT       NOT NULL AUTO_INCREMENT COMMENT '主键',
    `name`        VARCHAR(50)  NOT NULL COMMENT '分类名',
    `en_name`     VARCHAR(50)  NULL COMMENT '英文名',
    `sort`        INT          NOT NULL DEFAULT 0 COMMENT '排序',
    `status`      TINYINT(1)   NOT NULL DEFAULT 1 COMMENT '状态：1=启用, 0=禁用',
    `created_at`  DATETIME     NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at`  DATETIME     NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `deleted`     TINYINT(1)   NOT NULL DEFAULT 0,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='商品分类表';

-- 商品表
CREATE TABLE IF NOT EXISTS `product` (
    `id`            BIGINT        NOT NULL AUTO_INCREMENT COMMENT '主键',
    `name`          VARCHAR(100)  NOT NULL COMMENT '商品名',
    `category_id`   BIGINT        NULL COMMENT '分类 ID',
    `series`        VARCHAR(20)   NOT NULL DEFAULT 'dog' COMMENT '系列：dog/cat/functional',
    `pet_type`      VARCHAR(50)   NULL COMMENT '适用宠物类型：dog/cat（逗号分隔）',
    `price`         DECIMAL(10,2) NOT NULL DEFAULT 0.00 COMMENT '价格',
    `weight`        VARCHAR(50)   NULL COMMENT '规格重量',
    `image`         VARCHAR(500)  NULL COMMENT '主图 URL',
    `description`   VARCHAR(200)  NULL COMMENT '一句话描述',
    `story`         TEXT          NULL COMMENT '品牌故事',
    `ingredients`   TEXT          NULL COMMENT '成分列表 JSON（兼容 H2 用 TEXT）',
    `nutrition`     TEXT          NULL COMMENT '营养成分 JSON',
    `feeding`       TEXT          NULL COMMENT '喂食建议',
    `tags`           VARCHAR(100)  NULL COMMENT '标签：new/bestseller/hypoallergenic（逗号分隔）',
    `rating`        DECIMAL(2,1)  NOT NULL DEFAULT 5.0 COMMENT '评分',
    `review_count`  INT           NOT NULL DEFAULT 0 COMMENT '评价数',
    `monthly_sales` INT           NOT NULL DEFAULT 0 COMMENT '月销量',
    `status`        TINYINT(1)    NOT NULL DEFAULT 1 COMMENT '状态：1=上架, 0=下架',
    `created_at`    DATETIME      NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at`    DATETIME      NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `deleted`       TINYINT(1)    NOT NULL DEFAULT 0,
    PRIMARY KEY (`id`),
    KEY `idx_category` (`category_id`),
    KEY `idx_series` (`series`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='商品表';

-- 订单表（注意 order 是关键字，反引号包裹）
CREATE TABLE IF NOT EXISTS `order` (
    `id`             BIGINT        NOT NULL AUTO_INCREMENT,
    `order_no`       VARCHAR(50)   NOT NULL COMMENT '订单号',
    `customer_name`  VARCHAR(50)   NULL COMMENT '收货人姓名',
    `customer_phone`  VARCHAR(20)   NULL COMMENT '收货电话',
    `total_amount`   DECIMAL(10,2) NOT NULL DEFAULT 0.00 COMMENT '订单总额',
    `status`         VARCHAR(20)   NOT NULL DEFAULT 'PENDING' COMMENT '订单状态：PENDING/AID/SHIPPED/COMPLETED/CANCELLED',
    `remark`         VARCHAR(255)  NULL COMMENT '备注',
    `created_at`     DATETIME      NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at`     DATETIME      NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `deleted`        TINYINT(1)    NOT NULL DEFAULT 0,
    PRIMARY KEY (`id`),
    UNIQUE KEY `uk_order_no` (`order_no`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='订单表';

-- 订单明细表
CREATE TABLE IF NOT EXISTS `order_item` (
    `id`           BIGINT        NOT NULL AUTO_INCREMENT,
    `order_id`     BIGINT        NOT NULL COMMENT '订单 ID',
    `product_id`   BIGINT        NULL COMMENT '商品 ID',
    `product_name` VARCHAR(100)  NULL COMMENT '商品名快照',
    `price`        DECIMAL(10,2) NOT NULL DEFAULT 0.00 COMMENT '单价',
    `quantity`     INT           NOT NULL DEFAULT 1 COMMENT '数量',
    `subtotal`    DECIMAL(10,2) NOT NULL DEFAULT 0.00 COMMENT '小计',
    PRIMARY KEY (`id`),
    KEY `idx_order` (`order_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='订单明细表';

-- 评价表
CREATE TABLE IF NOT EXISTS `review` (
    `id`          BIGINT       NOT NULL AUTO_INCREMENT,
    `product_id`  BIGINT       NOT NULL COMMENT '商品 ID',
    `pet_name`    VARCHAR(50)  NULL COMMENT '宠物名',
    `pet_type`    VARCHAR(20)  NULL COMMENT '宠物类型：dog/cat',
    `pet_breed`   VARCHAR(50)  NULL COMMENT '宠物品种',
    `author`      VARCHAR(50)  NULL COMMENT '评价人',
    `rating`      INT          NOT NULL DEFAULT 5 COMMENT '评分 1-5',
    `content`     TEXT         NULL COMMENT '评价内容',
    `status`      TINYINT(1)   NOT NULL DEFAULT 0 COMMENT '状态：0=待审, 1=已通过, 2=已驳回',
    `created_at`  DATETIME     NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at`  DATETIME     NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `deleted`     TINYINT(1)   NOT NULL DEFAULT 0,
    PRIMARY KEY (`id`),
    KEY `idx_product` (`product_id`),
    KEY `idx_status` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='评价表';
