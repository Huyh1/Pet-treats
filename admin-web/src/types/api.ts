// 统一响应格式
export interface ApiResult<T = unknown> {
  code: number;
  msg: string;
  data: T;
}

// 分页响应
export interface PageResult<T> {
  records: T[];
  total: number;
  current: number;
  size: number;
}

// 分页查询基础参数
export interface PageParams {
  page?: number;
  size?: number;
}

// 管理员
export interface Admin {
  id: number;
  username: string;
  nickname: string;
  role: string;
}

export interface LoginResult {
  token: string;
  admin: Admin;
}

export interface ChangePasswordPayload {
  oldPassword: string;
  newPassword: string;
}

// 分类
export interface Category {
  id: number;
  name: string;
  enName?: string;
  sort: number;
  status: number; // 1 启用 0 禁用
}

export interface CategoryPayload {
  name: string;
  enName?: string;
  sort?: number;
  status?: number;
}

// 商品
export type PetType = 'dog' | 'cat' | 'both';

export interface Product {
  id: number;
  name: string;
  categoryId: number;
  categoryName?: string;
  series?: string;
  petType?: PetType;
  price: number;
  weight?: string;
  imageUrl?: string;
  description?: string;
  story?: string;
  ingredients?: string[];
  nutrition?: Record<string, string>;
  feedingAdvice?: string;
  tags?: string[];
  rating?: number;
  monthlySales?: number;
  status: number; // 1 上架 0 下架
  createdAt?: string;
  updatedAt?: string;
}

export interface ProductPayload {
  name: string;
  categoryId: number;
  series?: string;
  petType?: PetType;
  price: number;
  weight?: string;
  imageUrl?: string;
  description?: string;
  story?: string;
  ingredients?: string[];
  nutrition?: Record<string, string>;
  feedingAdvice?: string;
  tags?: string[];
  rating?: number;
  monthlySales?: number;
  status?: number;
}

export interface ProductPageQuery extends PageParams {
  keyword?: string;
  categoryId?: number;
  series?: string;
  status?: number;
}

// 订单（与后端枚举大小写保持一致）
export type OrderStatus =
  | 'PENDING'
  | 'PAID'
  | 'SHIPPED'
  | 'COMPLETED'
  | 'CANCELLED';

export interface OrderItem {
  id: number;
  productId: number;
  productName: string;
  imageUrl?: string;
  price: number;
  quantity: number;
  subtotal: number;
}

export interface Order {
  id: number;
  orderNo: string;
  customerId?: number;
  customerName: string;
  customerPhone?: string;
  address?: string;
  totalAmount: number;
  status: OrderStatus;
  remark?: string;
  items: OrderItem[];
  createdAt: string;
  updatedAt?: string;
}

export interface OrderPageQuery extends PageParams {
  status?: OrderStatus;
}

// 评价
// 评价状态：0=待审核 1=已通过 2=已驳回（与后端一致）
export type ReviewStatus = 0 | 1 | 2;

export interface Review {
  id: number;
  productId: number;
  productName: string;
  customerId?: number;
  customerName: string;
  petType?: PetType;
  rating: number;
  content: string;
  images?: string[];
  status: ReviewStatus;
  createdAt: string;
}

export interface ReviewPageQuery extends PageParams {
  status?: ReviewStatus;
}

// 仪表盘
export interface DashboardSummary {
  todayOrders: number;
  todaySales: number;
  productCount: number;
  pendingReviews: number;
}

export interface SalesTrendItem {
  date: string;
  total: number;
}

export interface TopProductItem {
  productId: number;
  productName: string;
  monthlySales: number;
  total: number;
}
