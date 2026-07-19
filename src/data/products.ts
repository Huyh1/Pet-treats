// 商品与评价数据类型定义 + Mock 数据

export type Series = 'dog' | 'cat' | 'functional';
export type PetType = 'dog' | 'cat';
export type Tag = 'new' | 'bestseller' | 'hypoallergenic';

export interface Nutrition {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  name: string;
  series: Series;
  petType: PetType[];
  price: number;
  weight: string;
  image: string;
  ingredients: string[];
  nutrition: Nutrition[];
  feeding: string;
  tags: Tag[];
  rating: number;
  reviewCount: number;
  monthlySales: number;
  description: string;
  story: string;
}

export interface Review {
  id: string;
  productId: string;
  petName: string;
  petType: PetType;
  rating: number;
  content: string;
  author: string;
  date: string;
  petBreed?: string;
}

// 图片源：使用公开稳定的图床 picsum.photos
// 通过 seed 保证每个商品图片稳定不变
const IMG_BASE = 'https://picsum.photos/seed';

function img(seed: string, _size = 'landscape_4_3') {
  return `${IMG_BASE}/${encodeURIComponent(seed)}/800/600`;
}

export const products: Product[] = [
  {
    id: 'chicken-jerky',
    name: '手撕鸡胸肉条',
    series: 'dog',
    petType: ['dog'],
    price: 68,
    weight: '80g · 约 25 条',
    image: img('Handcrafted artisan dog treat, thin strips of air-dried chicken jerky arranged on a rustic parchment paper, warm natural lighting, editorial food photography, cream and cocoa tones'),
    ingredients: ['单源鸡胸肉 95%', '南瓜泥 3%', '迷迭香提取物 2%'],
    nutrition: [
      { label: '粗蛋白', value: '≥ 65%' },
      { label: '粗脂肪', value: '≥ 8%' },
      { label: '水分', value: '≤ 10%' },
      { label: '粗灰分', value: '≤ 5%' },
    ],
    feeding: '小型犬每日 1-2 条，中型犬 2-3 条。开封后冷藏并于 14 天内食用。',
    tags: ['bestseller'],
    rating: 4.9,
    reviewCount: 326,
    monthlySales: 1820,
    description: '单源蛋白 · 低温风干 18 小时',
    story: '选用山东单源养殖场的鸡胸肉，剔筋去膜后整条低温风干 18 小时，保留 95% 的真实肉感。无任何诱食剂、无淀粉填充。',
  },
  {
    id: 'salmon-bites',
    name: '北大西洋三文鱼粒',
    series: 'cat',
    petType: ['cat'],
    price: 88,
    weight: '50g · 约 60 粒',
    image: img('Artisanal cat treats, small square cubes of salmon jerky on a ceramic plate, soft warm natural light, editorial food photography, beige linen background'),
    ingredients: ['北大西洋三文鱼 92%', '亚麻籽油 5%', '猫薄荷粉 3%'],
    nutrition: [
      { label: '粗蛋白', value: '≥ 60%' },
      { label: 'Omega-3', value: '≥ 2.5%' },
      { label: '水分', value: '≤ 8%' },
      { label: '牛磺酸', value: '≥ 0.4%' },
    ],
    feeding: '成年猫每日 6-10 粒，分两次给予。开封后冷藏。',
    tags: ['bestseller', 'hypoallergenic'],
    rating: 4.8,
    reviewCount: 214,
    monthlySales: 980,
    description: '单源鱼蛋白 · 富含 Omega-3',
    story: '挪威海域捕捞的北大西洋三文鱼，富含天然 Omega-3，对猫咪毛发与关节友好。整鱼去刺后切粒低温慢烘。',
  },
  {
    id: 'sweet-potato-chews',
    name: '烤地瓜软嚼',
    series: 'dog',
    petType: ['dog'],
    price: 42,
    weight: '120g · 约 30 块',
    image: img('Handmade dog treats, golden chunks of sweet potato chews on brown parchment, warm editorial food photography, soft natural light, cozy kitchen feel'),
    ingredients: ['日本板栗红薯 100%'],
    nutrition: [
      { label: '粗纤维', value: '≥ 5%' },
      { label: '维生素 A', value: '丰富' },
      { label: '水分', value: '≤ 15%' },
      { label: '粗蛋白', value: '≥ 3%' },
    ],
    feeding: '小型犬每日 2-3 块，中型犬 4-5 块。可作为训练奖励。',
    tags: ['hypoallergenic', 'new'],
    rating: 4.7,
    reviewCount: 158,
    monthlySales: 420,
    description: '单一原料 · 蔬果软嚼',
    story: '只用日本板栗红薯一种原料，蒸熟后切条再低温烘烤。自带天然甜香与软糯口感，适合易过敏犬只。',
  },
  {
    id: 'duck-neck',
    name: '风干鸭脖骨',
    series: 'functional',
    petType: ['dog'],
    price: 78,
    weight: '100g · 4 根',
    image: img('Air dried duck neck bones for dogs arranged on a wooden board, warm editorial pet food photography, cream linen background, soft light'),
    ingredients: ['单源鸭颈 100%'],
    nutrition: [
      { label: '粗蛋白', value: '≥ 55%' },
      { label: '钙', value: '≥ 2.8%' },
      { label: '磷', value: '≥ 1.4%' },
      { label: '水分', value: '≤ 12%' },
    ],
    feeding: '中型犬每周 1-2 根，需有成人陪伴啃咬。小型犬请选小型犬专用规格。',
    tags: ['new'],
    rating: 4.9,
    reviewCount: 89,
    monthlySales: 280,
    description: '天然洁齿 · 补钙',
    story: '低温风干的鸭脖保留天然软骨与骨髓，天然洁齿并补充钙质。鸭肉属凉性蛋白，适合易上火犬只。',
  },
  {
    id: 'tuna-puree',
    name: '金枪鱼慕斯管',
    series: 'cat',
    petType: ['cat'],
    price: 36,
    weight: '14g × 6 支',
    image: img('Cat treat puree tubes arranged on a marble surface, editorial pet product photography, soft warm light, cream colored background'),
    ingredients: ['黄鳍金枪鱼 88%', '鱼汤 10%', '维生素 E 2%'],
    nutrition: [
      { label: '粗蛋白', value: '≥ 12%' },
      { label: '水分', value: '≥ 80%' },
      { label: '维生素 E', value: '≥ 30 IU/kg' },
      { label: '牛磺酸', value: '≥ 0.3%' },
    ],
    feeding: '成年猫每日 1-2 支，可直接喂食或拌粮。',
    tags: ['bestseller'],
    rating: 4.9,
    reviewCount: 412,
    monthlySales: 2400,
    description: '高水分 · 补水神器',
    story: '为不爱喝水的猫咪定制，每支含 80% 水分。挤在碗里或直接喂食，互动同时帮助补水。',
  },
  {
    id: 'beef-liver-freeze',
    name: '冻干牛肝粒',
    series: 'functional',
    petType: ['dog', 'cat'],
    price: 92,
    weight: '60g · 约 200 粒',
    image: img('Freeze dried beef liver pet treats in small pieces on a wooden spoon, editorial product photography, warm tones, cream linen background'),
    ingredients: ['草饲牛肝 100%'],
    nutrition: [
      { label: '粗蛋白', value: '≥ 70%' },
      { label: '粗脂肪', value: '≥ 12%' },
      { label: '维生素 A', value: '极高' },
      { label: '铁', value: '丰富' },
    ],
    feeding: '猫每日 5-8 粒，小型犬 8-12 粒。可泡水还原。',
    tags: ['hypoallergenic', 'bestseller'],
    rating: 5.0,
    reviewCount: 503,
    monthlySales: 1580,
    description: '冻干锁鲜 · 单一蛋白',
    story: '新西兰草饲牛肝，零下 40 度真空冻干，保留 95% 以上营养。可直接喂食或泡水还原成鲜肝。',
  },
  {
    id: 'rabbit-stick',
    name: '兔肉低敏棒',
    series: 'functional',
    petType: ['dog', 'cat'],
    price: 76,
    weight: '70g · 12 根',
    image: img('Handmade rabbit meat pet treat sticks on parchment paper, editorial food photography, warm light, cream and cocoa tones'),
    ingredients: ['单源兔肉 90%', '南瓜粉 5%', '亚麻籽 5%'],
    nutrition: [
      { label: '粗蛋白', value: '≥ 58%' },
      { label: '粗脂肪', value: '≥ 9%' },
      { label: '水分', value: '≤ 11%' },
      { label: '粗灰分', value: '≤ 6%' },
    ],
    feeding: '小型犬每日 1 根，猫每日半根。易敏宠物首选。',
    tags: ['hypoallergenic', 'new'],
    rating: 4.8,
    reviewCount: 67,
    monthlySales: 196,
    description: '极低敏 · 易消化',
    story: '兔肉是公认的低敏蛋白源，搭配南瓜与亚麻籽调节肠胃。适合长期软便、皮肤敏感的宠物。',
  },
  {
    id: 'cod-skin-braid',
    name: '鳕鱼皮编织骨',
    series: 'dog',
    petType: ['dog'],
    price: 58,
    weight: '90g · 4 根',
    image: img('Cod fish skin braided dog treat bones on a wooden cutting board, editorial pet food photography, warm tones, beige background'),
    ingredients: ['深海鳕鱼皮 100%'],
    nutrition: [
      { label: '粗蛋白', value: '≥ 70%' },
      { label: 'Omega-3', value: '≥ 3%' },
      { label: '水分', value: '≤ 10%' },
      { label: '粗脂肪', value: '≥ 6%' },
    ],
    feeding: '中型犬每周 1-2 根，需陪伴啃咬。',
    tags: ['bestseller'],
    rating: 4.7,
    reviewCount: 234,
    monthlySales: 760,
    description: '天然洁齿 · 富含胶原',
    story: '北大西洋鳕鱼皮手工编织成骨型，啃咬时天然摩擦牙齿帮助洁齿。富含胶原蛋白对皮肤与毛发友好。',
  },
  {
    id: 'chicken-shred-cat',
    name: '原切鸡胸肉丝',
    series: 'cat',
    petType: ['cat'],
    price: 48,
    weight: '40g · 约 50 缕',
    image: img('Shredded chicken breast cat treat on a small ceramic dish, editorial pet food photography, warm soft light, cream linen'),
    ingredients: ['单源鸡胸肉 98%', '酵母提取物 2%'],
    nutrition: [
      { label: '粗蛋白', value: '≥ 70%' },
      { label: '粗脂肪', value: '≥ 6%' },
      { label: '水分', value: '≤ 10%' },
      { label: '牛磺酸', value: '≥ 0.3%' },
    ],
    feeding: '成年猫每日 5-8 缕，可直接撒在猫粮上。',
    tags: ['new'],
    rating: 4.9,
    reviewCount: 142,
    monthlySales: 540,
    description: '原肉撕丝 · 拌粮神器',
    story: '整块鸡胸肉蒸熟后手工撕成细丝，低温慢烘。质地蓬松可直接吃或撒在猫粮上提升食欲。',
  },
  {
    id: 'turkey-train',
    name: '火鸡训练粒',
    series: 'dog',
    petType: ['dog'],
    price: 62,
    weight: '100g · 约 80 粒',
    image: img('Small training treat pieces for dogs on a wooden surface, editorial pet food photography, warm tones, cream background'),
    ingredients: ['火鸡肉 88%', '紫薯粉 8%', '迷迭香 4%'],
    nutrition: [
      { label: '粗蛋白', value: '≥ 55%' },
      { label: '粗脂肪', value: '≥ 7%' },
      { label: '水分', value: '≤ 12%' },
      { label: '粗灰分', value: '≤ 6%' },
    ],
    feeding: '训练时每次 1-2 粒，单日不超过 15 粒。',
    tags: ['new'],
    rating: 4.8,
    reviewCount: 76,
    monthlySales: 320,
    description: '小颗粒 · 训练专用',
    story: '专为训练设计的硬币大小颗粒，单手可抓握数十粒。火鸡低脂高蛋白，迷迭香天然防腐。',
  },
  {
    id: 'shrimp-cookie',
    name: '南极磷虾饼',
    series: 'cat',
    petType: ['cat'],
    price: 54,
    weight: '50g · 约 30 块',
    image: img('Shrimp cookies pet treats on parchment paper, editorial food photography, warm light, cream tones'),
    ingredients: ['南极磷虾 70%', '燕麦粉 25%', '猫薄荷 5%'],
    nutrition: [
      { label: '粗蛋白', value: '≥ 45%' },
      { label: '虾青素', value: '丰富' },
      { label: '水分', value: '≤ 8%' },
      { label: '粗脂肪', value: '≥ 10%' },
    ],
    feeding: '成年猫每日 3-5 块，可作为奖励。',
    tags: ['hypoallergenic'],
    rating: 4.7,
    reviewCount: 98,
    monthlySales: 280,
    description: '虾青素 · 美毛亮肤',
    story: '南极海域捕捞的磷虾，富含天然虾青素，对猫咪皮肤与毛发友好。搭配燕麦做成酥脆小饼。',
  },
  {
    id: 'lamb-lung',
    name: '冻干羊肺粒',
    series: 'functional',
    petType: ['dog', 'cat'],
    price: 84,
    weight: '55g · 约 180 粒',
    image: img('Freeze dried lamb lung pet treats in small pieces on a wooden spoon, editorial product photography, warm tones, cream background'),
    ingredients: ['单源羊肺 100%'],
    nutrition: [
      { label: '粗蛋白', value: '≥ 75%' },
      { label: '粗脂肪', value: '≥ 8%' },
      { label: '水分', value: '≤ 6%' },
      { label: '铁', value: '丰富' },
    ],
    feeding: '猫每日 4-6 粒，小型犬 8-10 粒。',
    tags: ['hypoallergenic', 'bestseller'],
    rating: 4.9,
    reviewCount: 287,
    monthlySales: 890,
    description: '低脂高蛋白 · 单一原料',
    story: '新西兰草饲羊肺，零下 40 度冻干。质地酥脆易掰碎，是低脂训练奖励的首选。',
  },
];

export const reviews: Review[] = [
  {
    id: 'r1', productId: 'chicken-jerky', petName: '豆豆', petType: 'dog', petBreed: '柯基',
    rating: 5, author: '苏苏', date: '2026-06-12',
    content: '拆开包装就被香味惊到了，是真的鸡肉味而不是诱食剂味。豆豆平时很挑食，这次竟然把整袋咬破了…',
  },
  {
    id: 'r2', productId: 'salmon-bites', petName: '芝麻', petType: 'cat', petBreed: '英短',
    rating: 5, author: 'Linda', date: '2026-06-08',
    content: '猫咪吃了两个月，毛色明显变亮。粒度合适，不会弄脏地板。',
  },
  {
    id: 'r3', productId: 'beef-liver-freeze', petName: 'Mochi', petType: 'cat', petBreed: '布偶',
    rating: 5, author: '阿May', date: '2026-07-02',
    content: '冻干粒度很均匀，泡水还原后真的像鲜肝。Mochi 是出了名的挑嘴也爱吃。',
  },
  {
    id: 'r4', productId: 'sweet-potato-chews', petName: 'Cashew', petType: 'dog', petBreed: '比熊',
    rating: 4, author: 'Eric', date: '2026-06-25',
    content: '成分只有红薯，安全感拉满。给易过敏的比熊很合适，便便也正常。',
  },
  {
    id: 'r5', productId: 'tuna-puree', petName: '奶油', petType: 'cat', petBreed: '美短',
    rating: 5, author: '小琳', date: '2026-07-10',
    content: '奶油本来不爱喝水，自从有了这个管每天抢着吃。补水效果立竿见影。',
  },
  {
    id: 'r6', productId: 'duck-neck', petName: 'Max', petType: 'dog', petBreed: '金毛',
    rating: 5, author: 'Tom', date: '2026-06-30',
    content: '每周一根，牙齿比之前干净多了。Max 啃得很专注，能玩半小时。',
  },
  {
    id: 'r7', productId: 'rabbit-stick', petName: '栗子', petType: 'dog', petBreed: '法斗',
    rating: 5, author: '阿May', date: '2026-07-05',
    content: '法斗皮肤敏感一直找不到合适的零食，这个低敏棒吃了一周没挠痒。',
  },
  {
    id: 'r8', productId: 'cod-skin-braid', petName: 'Lucky', petType: 'dog', petBreed: '边牧',
    rating: 4, author: '老王', date: '2026-06-18',
    content: '编织得很结实，能啃很久。就是有点鱼腥味，建议在阳台喂。',
  },
  {
    id: 'r9', productId: 'chicken-shred-cat', petName: '糖糖', petType: 'cat', petBreed: '暹罗',
    rating: 5, author: 'Coco', date: '2026-07-08',
    content: '撒在猫粮上瞬间光盘。撕得挺细的，老年猫吃起来也不费力。',
  },
  {
    id: 'r10', productId: 'turkey-train', petName: '布丁', petType: 'dog', petBreed: '泰迪',
    rating: 5, author: '喵爸', date: '2026-06-22',
    content: '颗粒小不脏手，训练时一抓一大把。火鸡味不重但狗很买账。',
  },
];

export function getProduct(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getReviewsByProduct(productId: string): Review[] {
  return reviews.filter((r) => r.productId === productId);
}

export function getRelatedProducts(product: Product, count = 4): Product[] {
  return products
    .filter((p) => p.id !== product.id && (p.series === product.series || p.petType.some((t) => product.petType.includes(t))))
    .slice(0, count);
}
