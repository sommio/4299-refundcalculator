import { useState } from 'react';
import type { ProductType, ProductInput, CalculationResult, MonthlyProductInput, YearlyProductInput } from '../types';
import { calculateRemainingValue } from '../utils/calculator';
import { MonthlyProductForm } from './MonthlyProductForm';
import { YearlyProductForm } from './YearlyProductForm';
import { ResultDisplay } from './ResultDisplay';

export function RefundCalculator() {
  const [productType, setProductType] = useState<ProductType>('monthly');
  const [monthlyData, setMonthlyData] = useState({});
  const [yearlyData, setYearlyData] = useState({});
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = (input: Partial<ProductInput>): Record<string, string> => {
    const newErrors: Record<string, string> = {};

    if (productType === 'monthly') {
      const data = input as Partial<MonthlyProductInput>;

      if (!data.subscriptionPrice || data.subscriptionPrice <= 0) {
        newErrors.subscriptionPrice = '订阅价格必须大于0';
      }

      if (!data.subscriptionCycle || data.subscriptionCycle <= 0) {
        newErrors.subscriptionCycle = '订阅周期必须大于0';
      }

      if (!data.refundDate) {
        newErrors.refundDate = '请选择退款日期';
      }

      if (!data.subscriptionEndDate) {
        newErrors.subscriptionEndDate = '请选择订阅结束日期';
      }

      if (data.refundDate && data.subscriptionEndDate) {
        const refundDate = new Date(data.refundDate);
        const endDate = new Date(data.subscriptionEndDate);

        if (refundDate >= endDate) {
          newErrors.refundDate = '退款日期必须早于订阅结束日期';
        }
      }
    } else {
      const data = input as Partial<YearlyProductInput>;

      if (!data.totalSubscriptionPrice || data.totalSubscriptionPrice <= 0) {
        newErrors.totalSubscriptionPrice = '订阅总价必须大于0';
      }

      if (!data.fixedCost || data.fixedCost < 0) {
        newErrors.fixedCost = '固定费用不能为负数';
      }

      if (!data.totalTraffic || data.totalTraffic <= 0) {
        newErrors.totalTraffic = '总流量必须大于0';
      }

      if (!data.usedTraffic || data.usedTraffic < 0) {
        newErrors.usedTraffic = '已用流量不能为负数';
      }

      if (data.totalTraffic && data.usedTraffic && data.usedTraffic > data.totalTraffic) {
        newErrors.usedTraffic = '已用流量不能超过总流量';
      }

      if (!data.refundDate) {
        newErrors.refundDate = '请选择退款日期';
      }

      if (!data.subscriptionEndDate) {
        newErrors.subscriptionEndDate = '请选择订阅结束日期';
      }

      if (data.refundDate && data.subscriptionEndDate) {
        const refundDate = new Date(data.refundDate);
        const endDate = new Date(data.subscriptionEndDate);

        if (refundDate >= endDate) {
          newErrors.refundDate = '退款日期必须早于订阅结束日期';
        }
      }

      if (data.totalSubscriptionPrice && data.fixedCost && data.fixedCost >= data.totalSubscriptionPrice) {
        newErrors.fixedCost = '固定费用必须小于订阅总价';
      }
    }

    return newErrors;
  };

  const handleCalculate = () => {
    const currentData = productType === 'monthly' ? monthlyData : yearlyData;
    const formErrors = validateForm(currentData);

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setErrors({});
    setIsLoading(true);

    // 模拟计算延迟，提升用户体验
    setTimeout(() => {
      try {
        const input: ProductInput = {
          ...currentData,
          productType
        } as ProductInput;

        const calculationResult = calculateRemainingValue(input);
        setResult(calculationResult);
      } catch (error) {
        console.error('计算错误:', error);
        alert('计算过程中出现错误，请检查输入数据');
      } finally {
        setIsLoading(false);
      }
    }, 300);
  };

  const handleReset = () => {
    setMonthlyData({});
    setYearlyData({});
    setResult(null);
    setErrors({});
  };

  return (
    <div className="calculator-container">
      <header className="calculator-header">
        <h1>剩余价值计算器</h1>
        <p>根据订阅类型和相关信息计算剩余价值</p>
      </header>

      <div className="calculator-content">
        {/* 产品类型选择 */}
        <div className="product-type-selector">
          <label>选择产品类型：</label>
          <div className="radio-group">
            <label className="radio-option">
              <input
                type="radio"
                value="monthly"
                checked={productType === 'monthly'}
                onChange={(e) => setProductType(e.target.value as ProductType)}
              />
              月循环流量产品
            </label>
            <label className="radio-option">
              <input
                type="radio"
                value="yearly"
                checked={productType === 'yearly'}
                onChange={(e) => setProductType(e.target.value as ProductType)}
              />
              年循环流量产品
            </label>
          </div>
        </div>

        {/* 表单输入 */}
        <div className="form-container">
          {productType === 'monthly' ? (
            <MonthlyProductForm
              data={monthlyData}
              onChange={setMonthlyData}
              errors={errors}
            />
          ) : (
            <YearlyProductForm
              data={yearlyData}
              onChange={setYearlyData}
              errors={errors}
            />
          )}
        </div>

        {/* 操作按钮 */}
        <div className="action-buttons">
          <button
            className="btn btn-primary"
            onClick={handleCalculate}
            disabled={isLoading}
          >
            {isLoading ? '计算中...' : '计算剩余价值'}
          </button>
          <button
            className="btn btn-secondary"
            onClick={handleReset}
            disabled={isLoading}
          >
            重置
          </button>
        </div>

        {/* 结果显示 */}
        <ResultDisplay
          result={result}
          productType={productType}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}