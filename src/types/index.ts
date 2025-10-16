export type ProductType = 'monthly' | 'yearly';

export interface MonthlyProductInput {
  productType: 'monthly';
  subscriptionPrice: number; // 订阅价格（CNY）
  subscriptionCycle: number; // 订阅周期（月）
  refundDate: string; // 退款日期（YYYY/MM/DD）
  subscriptionEndDate: string; // 订阅结束日期（YYYY/MM/DD）
}

export interface YearlyProductInput {
  productType: 'yearly';
  totalSubscriptionPrice: number; // 订阅总价（CNY）
  fixedCost: number; // 固定费用（CNY）
  totalTraffic: number; // 总流量（GB）
  usedTraffic: number; // 已用流量（GB）
  refundDate: string; // 退款日期（YYYY/MM/DD）
  subscriptionEndDate: string; // 订阅结束日期（YYYY/MM/DD）
}

export type ProductInput = MonthlyProductInput | YearlyProductInput;

export interface CalculationResult {
  remainingValue: number; // 剩余价值
  remainingDays: number; // 剩余天数
  dailyFixedCost: number; // 日固定费用

  // 年循环产品特有字段
  trafficFee?: number; // 流量费用
  trafficUnitPrice?: number; // 流量单价
  remainingTraffic?: number; // 剩余流量
}

export interface CalculationBreakdown {
  remainingValue: number;
  remainingDays: number;
  dailyFixedCost: number;
  trafficFee?: number;
  trafficUnitPrice?: number;
  remainingTraffic?: number;
}