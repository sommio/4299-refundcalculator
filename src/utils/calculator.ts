import type { ProductInput, CalculationResult } from '../types';

const DAYS_PER_MONTH = 365 / 12; // 30.4167
const DAYS_PER_YEAR = 365;

/**
 * 计算两个日期之间的天数差
 */
export function calculateDaysDifference(startDate: string, endDate: string): number {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffTime = end.getTime() - start.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

/**
 * 四舍五入到小数点后两位
 */
export function roundToTwoDecimal(value: number): number {
  return Math.round(value * 100) / 100;
}

/**
 * 计算月循环产品的剩余价值
 */
function calculateMonthlyRemainingValue(input: ProductInput & { productType: 'monthly' }): CalculationResult {
  const { subscriptionPrice, subscriptionCycle, refundDate, subscriptionEndDate } = input;

  // 计算日固定费用 - 使用最高精度计算
  const cycleDays = subscriptionCycle * DAYS_PER_MONTH;
  const dailyFixedCostRaw = subscriptionPrice / cycleDays;

  // 计算剩余天数
  const remainingDays = calculateDaysDifference(refundDate, subscriptionEndDate);

  // 计算剩余价值 - 使用最高精度计算
  const remainingValueRaw = remainingDays * dailyFixedCostRaw;

  // 只在最终结果返回时进行四舍五入
  const dailyFixedCost = roundToTwoDecimal(dailyFixedCostRaw);
  const remainingValue = roundToTwoDecimal(remainingValueRaw);

  return {
    remainingValue,
    remainingDays,
    dailyFixedCost
  };
}

/**
 * 计算年循环产品的剩余价值
 */
function calculateYearlyRemainingValue(input: ProductInput & { productType: 'yearly' }): CalculationResult {
  const {
    totalSubscriptionPrice,
    fixedCost,
    totalTraffic,
    usedTraffic,
    refundDate,
    subscriptionEndDate
  } = input;

  // 计算日固定费用 - 使用最高精度计算
  const dailyFixedCostRaw = fixedCost / DAYS_PER_YEAR;

  // 计算流量费用和单价 - 使用最高精度计算
  const trafficFee = totalSubscriptionPrice - fixedCost;
  const trafficUnitPriceRaw = trafficFee / totalTraffic;

  // 计算剩余流量
  const remainingTraffic = totalTraffic - usedTraffic;

  // 计算剩余天数
  const remainingDays = calculateDaysDifference(refundDate, subscriptionEndDate);

  // 计算剩余价值 = (剩余天数 × 日固定费用) + (剩余流量 × 流量单价)
  // 使用最高精度进行所有中间计算
  const timeBasedValueRaw = remainingDays * dailyFixedCostRaw;
  const trafficBasedValueRaw = remainingTraffic * trafficUnitPriceRaw;
  const remainingValueRaw = timeBasedValueRaw + trafficBasedValueRaw;

  // 只在最终结果返回时进行四舍五入
  const dailyFixedCost = roundToTwoDecimal(dailyFixedCostRaw);
  const trafficUnitPrice = roundToTwoDecimal(trafficUnitPriceRaw);
  const remainingValue = roundToTwoDecimal(remainingValueRaw);

  // 保留中间结果用于潜在的调试扩展（目前未使用但保留计算逻辑）
  // const timeBasedValue = roundToTwoDecimal(timeBasedValueRaw);
  // const trafficBasedValue = roundToTwoDecimal(trafficBasedValueRaw);

  return {
    remainingValue,
    remainingDays,
    dailyFixedCost,
    trafficFee,
    trafficUnitPrice,
    remainingTraffic
  };
}

/**
 * 根据产品类型计算剩余价值
 */
export function calculateRemainingValue(input: ProductInput): CalculationResult {
  if (input.productType === 'monthly') {
    return calculateMonthlyRemainingValue(input);
  } else {
    return calculateYearlyRemainingValue(input);
  }
}

/**
 * 格式化金额显示
 */
export function formatCurrency(amount: number): string {
  return `￥${amount.toFixed(2)}`;
}

/**
 * 格式化流量显示
 */
export function formatTraffic(trafficGB: number): string {
  if (trafficGB >= 1000) {
    return `${(trafficGB / 1000).toFixed(2)} TB`;
  }
  return `${trafficGB.toFixed(2)} GB`;
}