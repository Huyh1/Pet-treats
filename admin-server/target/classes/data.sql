-- =====================================================
-- 初始数据：admin / category / product / order / order_item / review
-- 使用 INSERT IGNORE 保证可重复执行（idempotent）
-- 默认管理员账号：admin / admin123（BCrypt 哈希）
-- =====================================================

-- ---------- 管理员 ----------
-- password = admin123 -> BCrypt($2b$10$ rounds=10)
INSERT IGNORE INTO `admin` (`id`, `username`, `password_hash`, `nickname`, `role`, `status`, `created_at`, `updated_at`, `deleted`)
VALUES (1, 'admin', '$2b$10$Lz7SDj6xzagQxXzvV3jjxepnaKK3XUxLFu1bLILwhbXUe5T9AWKcy', '超级管理员', 'ADMIN', 1, NOW(), NOW(), 0);

-- ---------- 分类 ----------
INSERT IGNORE INTO `category` (`id`, `name`, `en_name`, `sort`, `status`, `created_at`, `updated_at`, `deleted`) VALUES
(1, '犬用主食',  'dog-food',    1, 1, NOW(), NOW(), 0),
(2, '猫用主食',  'cat-food',    2, 1, NOW(), NOW(), 0),
(3, '功能型',    'functional',  3, 1, NOW(), NOW(), 0);

-- ---------- 12 个商品 ----------
INSERT IGNORE INTO `product`
(`id`,`name`,`category_id`,`series`,`pet_type`,`price`,`weight`,`image`,`description`,`story`,`ingredients`,`nutrition`,`feeding`,`tags`,`rating`,`review_count`,`monthly_sales`,`status`,`created_at`,`updated_at`,`deleted`)
VALUES
(1, '手撕鸡胸肉条', 1, 'dog', 'dog', 68.00, '80g · 约 25 条', 'https://picsum.photos/seed/chicken-jerky/800/600',
 '单源蛋白 · 低温风干 18 小时',
 '选用山东单源养殖场的鸡胸肉，剔筋去膜后整条低温风干 18 小时，保留 95% 的真实肉感。无任何诱食剂、无淀粉填充。',
 '["单源鸡胸肉 95%","南瓜泥 3%","迷迭香提取物 2%"]',
 '[{"label":"粗蛋白","value":"≥ 65%"},{"label":"粗脂肪","value":"≥ 8%"},{"label":"水分","value":"≤ 10%"},{"label":"粗灰分","value":"≤ 5%"}]',
 '小型犬每日 1-2 条，中型犬 2-3 条。开封后冷藏并于 14 天内食用。',
 'bestseller', 4.9, 326, 1820, 1, NOW(), NOW(), 0),

(2, '北大西洋三文鱼粒', 2, 'cat', 'cat', 88.00, '50g · 约 60 粒', 'https://picsum.photos/seed/salmon-bites/800/600',
 '单源鱼蛋白 · 富含 Omega-3',
 '挪威海域捕捞的北大西洋三文鱼，富含天然 Omega-3，对猫咪毛发与关节友好。整鱼去刺后切粒低温慢烘。',
 '["北大西洋三文鱼 92%","亚麻籽油 5%","猫薄荷粉 3%"]',
 '[{"label":"粗蛋白","value":"≥ 60%"},{"label":"Omega-3","value":"≥ 2.5%"},{"label":"水分","value":"≤ 8%"},{"label":"牛磺酸","value":"≥ 0.4%"}]',
 '成年猫每日 6-10 粒，分两次给予。开封后冷藏。',
 'bestseller,hypoallergenic', 4.8, 214, 980, 1, NOW(), NOW(), 0),

(3, '烤地瓜软嚼', 1, 'dog', 'dog', 42.00, '120g · 约 30 块', 'https://picsum.photos/seed/sweet-potato-chews/800/600',
 '单一原料 · 蔬果软嚼',
 '只用日本板栗红薯一种原料，蒸熟后切条再低温烘烤。自带天然甜香与软糯口感，适合易过敏犬只。',
 '["日本板栗红薯 100%"]',
 '[{"label":"粗纤维","value":"≥ 5%"},{"label":"维生素 A","value":"丰富"},{"label":"水分","value":"≤ 15%"},{"label":"粗蛋白","value":"≥ 3%"}]',
 '小型犬每日 2-3 块，中型犬 4-5 块。可作为训练奖励。',
 'hypoallergenic,new', 4.7, 158, 420, 1, NOW(), NOW(), 0),

(4, '风干鸭脖骨', 3, 'functional', 'dog', 78.00, '100g · 4 根', 'https://picsum.photos/seed/duck-neck/800/600',
 '天然洁齿 · 补钙',
 '低温风干的鸭脖保留天然软骨与骨髓，天然洁齿并补充钙质。鸭肉属凉性蛋白，适合易上火犬只。',
 '["单源鸭颈 100%"]',
 '[{"label":"粗蛋白","value":"≥ 55%"},{"label":"钙","value":"≥ 2.8%"},{"label":"磷","value":"≥ 1.4%"},{"label":"水分","value":"≤ 12%"}]',
 '中型犬每周 1-2 根，需有成人陪伴啃咬。小型犬请选小型犬专用规格。',
 'new', 4.9, 89, 280, 1, NOW(), NOW(), 0),

(5, '金枪鱼慕斯管', 2, 'cat', 'cat', 36.00, '14g × 6 支', 'https://picsum.photos/seed/tuna-puree/800/600',
 '高水分 · 补水神器',
 '为不爱喝水的猫咪定制，每支含 80% 水分。挤在碗里或直接喂食，互动同时帮助补水。',
 '["黄鳍金枪鱼 88%","鱼汤 10%","维生素 E 2%"]',
 '[{"label":"粗蛋白","value":"≥ 12%"},{"label":"水分","value":"≥ 80%"},{"label":"维生素 E","value":"≥ 30 IU/kg"},{"label":"牛磺酸","value":"≥ 0.3%"}]',
 '成年猫每日 1-2 支，可直接喂食或拌粮。',
 'bestseller', 4.9, 412, 2400, 1, NOW(), NOW(), 0),

(6, '冻干牛肝粒', 3, 'functional', 'dog,cat', 92.00, '60g · 约 200 粒', 'https://picsum.photos/seed/beef-liver-freeze/800/600',
 '冻干锁鲜 · 单一蛋白',
 '新西兰草饲牛肝，零下 40 度真空冻干，保留 95% 以上营养。可直接喂食或泡水还原成鲜肝。',
 '["草饲牛肝 100%"]',
 '[{"label":"粗蛋白","value":"≥ 70%"},{"label":"粗脂肪","value":"≥ 12%"},{"label":"维生素 A","value":"极高"},{"label":"铁","value":"丰富"}]',
 '猫每日 5-8 粒，小型犬 8-12 粒。可泡水还原。',
 'hypoallergenic,bestseller', 5.0, 503, 1580, 1, NOW(), NOW(), 0),

(7, '兔肉低敏棒', 3, 'functional', 'dog,cat', 76.00, '70g · 12 根', 'https://picsum.photos/seed/rabbit-stick/800/600',
 '极低敏 · 易消化',
 '兔肉是公认的低敏蛋白源，搭配南瓜与亚麻籽调节肠胃。适合长期软便、皮肤敏感的宠物。',
 '["单源兔肉 90%","南瓜粉 5%","亚麻籽 5%"]',
 '[{"label":"粗蛋白","value":"≥ 58%"},{"label":"粗脂肪","value":"≥ 9%"},{"label":"水分","value":"≤ 11%"},{"label":"粗灰分","value":"≤ 6%"}]',
 '小型犬每日 1 根，猫每日半根。易敏宠物首选。',
 'hypoallergenic,new', 4.8, 67, 196, 1, NOW(), NOW(), 0),

(8, '鳕鱼皮编织骨', 1, 'dog', 'dog', 58.00, '90g · 4 根', 'https://picsum.photos/seed/cod-skin-braid/800/600',
 '天然洁齿 · 富含胶原',
 '北大西洋鳕鱼皮手工编织成骨型，啃咬时天然摩擦牙齿帮助洁齿。富含胶原蛋白对皮肤与毛发友好。',
 '["深海鳕鱼皮 100%"]',
 '[{"label":"粗蛋白","value":"≥ 70%"},{"label":"Omega-3","value":"≥ 3%"},{"label":"水分","value":"≤ 10%"},{"label":"粗脂肪","value":"≥ 6%"}]',
 '中型犬每周 1-2 根，需陪伴啃咬。',
 'bestseller', 4.7, 234, 760, 1, NOW(), NOW(), 0),

(9, '原切鸡胸肉丝', 2, 'cat', 'cat', 48.00, '40g · 约 50 缕', 'https://picsum.photos/seed/chicken-shred-cat/800/600',
 '原肉撕丝 · 拌粮神器',
 '整块鸡胸肉蒸熟后手工撕成细丝，低温慢烘。质地蓬松可直接吃或撒在猫粮上提升食欲。',
 '["单源鸡胸肉 98%","酵母提取物 2%"]',
 '[{"label":"粗蛋白","value":"≥ 70%"},{"label":"粗脂肪","value":"≥ 6%"},{"label":"水分","value":"≤ 10%"},{"label":"牛磺酸","value":"≥ 0.3%"}]',
 '成年猫每日 5-8 缕，可直接撒在猫粮上。',
 'new', 4.9, 142, 540, 1, NOW(), NOW(), 0),

(10, '火鸡训练粒', 1, 'dog', 'dog', 62.00, '100g · 约 80 粒', 'https://picsum.photos/seed/turkey-train/800/600',
 '小颗粒 · 训练专用',
 '专为训练设计的硬币大小颗粒，单手可抓握数十粒。火鸡低脂高蛋白，迷迭香天然防腐。',
 '["火鸡肉 88%","紫薯粉 8%","迷迭香 4%"]',
 '[{"label":"粗蛋白","value":"≥ 55%"},{"label":"粗脂肪","value":"≥ 7%"},{"label":"水分","value":"≤ 12%"},{"label":"粗灰分","value":"≤ 6%"}]',
 '训练时每次 1-2 粒，单日不超过 15 粒。',
 'new', 4.8, 76, 320, 1, NOW(), NOW(), 0),

(11, '南极磷虾饼', 2, 'cat', 'cat', 54.00, '50g · 约 30 块', 'https://picsum.photos/seed/shrimp-cookie/800/600',
 '虾青素 · 美毛亮肤',
 '南极海域捕捞的磷虾，富含天然虾青素，对猫咪皮肤与毛发友好。搭配燕麦做成酥脆小饼。',
 '["南极磷虾 70%","燕麦粉 25%","猫薄荷 5%"]',
 '[{"label":"粗蛋白","value":"≥ 45%"},{"label":"虾青素","value":"丰富"},{"label":"水分","value":"≤ 8%"},{"label":"粗脂肪","value":"≥ 10%"}]',
 '成年猫每日 3-5 块，可作为奖励。',
 'hypoallergenic', 4.7, 98, 280, 1, NOW(), NOW(), 0),

(12, '冻干羊肺粒', 3, 'functional', 'dog,cat', 84.00, '55g · 约 180 粒', 'https://picsum.photos/seed/lamb-lung/800/600',
 '低脂高蛋白 · 单一原料',
 '新西兰草饲羊肺，零下 40 度冻干。质地酥脆易掰碎，是低脂训练奖励的首选。',
 '["单源羊肺 100%"]',
 '[{"label":"粗蛋白","value":"≥ 75%"},{"label":"粗脂肪","value":"≥ 8%"},{"label":"水分","value":"≤ 6%"},{"label":"铁","value":"丰富"}]',
 '猫每日 4-6 粒，小型犬 8-10 粒。',
 'hypoallergenic,bestseller', 4.9, 287, 890, 1, NOW(), NOW(), 0);

-- ---------- 3 条订单 + 6 条订单明细 ----------
INSERT IGNORE INTO `order`
(`id`,`order_no`,`customer_name`,`customer_phone`,`total_amount`,`status`,`remark`,`created_at`,`updated_at`,`deleted`)
VALUES
(1, 'NO20260710001', '苏苏',   '13800000001', 280.00, 'COMPLETED',  '老顾客回购',           '2026-07-10 10:23:00', '2026-07-11 09:00:00', 0),
(2, 'NO20260712002', 'Linda',  '13800000002', 124.00, 'PAID',       '需要冰袋',            '2026-07-12 14:55:00', '2026-07-12 14:55:00', 0),
(3, 'NO20260715003', 'Eric',    '13800000003', 158.00, 'PENDING',    '周末送货前请电话确认', '2026-07-15 20:10:00', '2026-07-15 20:10:00', 0);

INSERT IGNORE INTO `order_item`
(`id`,`order_id`,`product_id`,`product_name`,`price`,`quantity`,`subtotal`)
VALUES
(1, 1, 1, '手撕鸡胸肉条',   68.00, 2, 136.00),
(2, 1, 5, '金枪鱼慕斯管',   36.00, 4, 144.00),
(3, 2, 2, '北大西洋三文鱼粒', 88.00, 1, 88.00),
(4, 2, 9, '原切鸡胸肉丝',     48.00, 1, 48.00),
(5, 2, 11,'南极磷虾饼',       54.00, 1, 54.00),
(6, 3, 6, '冻干牛肝粒',       92.00, 1, 92.00);

-- ---------- 5 条评价（2 通过 / 2 待审 / 1 驳回） ----------
INSERT IGNORE INTO `review`
(`id`,`product_id`,`pet_name`,`pet_type`,`pet_breed`,`author`,`rating`,`content`,`status`,`created_at`,`updated_at`,`deleted`)
VALUES
(1, 1, '豆豆',  'dog', '柯基', '苏苏',   5, '拆开包装就被香味惊到了，是真的鸡肉味而不是诱食剂味。豆豆平时很挑食，这次竟然把整袋咬破了…', 1, '2026-07-10 11:00:00', '2026-07-10 12:00:00', 0),
(2, 2, '芝麻',  'cat', '英短', 'Linda',  5, '猫咪吃了两个月，毛色明显变亮。粒度合适，不会弄脏地板。', 1, '2026-07-12 15:30:00', '2026-07-12 16:00:00', 0),
(3, 5, '奶油',  'cat', '美短', '小琳',   5, '奶油本来不爱喝水，自从有了这个管每天抢着吃。补水效果立竿见影。', 0, '2026-07-15 21:00:00', '2026-07-15 21:00:00', 0),
(4, 4, 'Max',   'dog', '金毛', 'Tom',    5, '每周一根，牙齿比之前干净多了。Max 啃得很专注，能玩半小时。', 0, '2026-07-15 22:10:00', '2026-07-15 22:10:00', 0),
(5, 3, 'Cashew','dog', '比熊', 'Eric',   4, '成分只有红薯，安全感拉满。给易过敏的比熊很合适，便便也正常。', 2, '2026-07-13 10:00:00', '2026-07-13 11:00:00', 0);
