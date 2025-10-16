import type { YearlyProductInput } from '../types';

interface YearlyProductFormProps {
  data: Partial<YearlyProductInput>;
  onChange: (data: Partial<YearlyProductInput>) => void;
  errors?: Record<string, string>;
}

export function YearlyProductForm({ data, onChange, errors }: YearlyProductFormProps) {
  const handleChange = (field: keyof YearlyProductInput, value: string | number) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="form-section">
      <h3>年循环流量产品</h3>

      <div className="form-group">
        <label htmlFor="totalSubscriptionPrice">订阅总价（CNY）</label>
        <input
          type="number"
          id="totalSubscriptionPrice"
          value={data.totalSubscriptionPrice || ''}
          onChange={(e) => handleChange('totalSubscriptionPrice', parseFloat(e.target.value) || 0)}
          placeholder="请输入订阅总价"
          min="0"
          step="0.01"
        />
        {errors?.totalSubscriptionPrice && (
          <span className="error">{errors.totalSubscriptionPrice}</span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="fixedCost">固定费用（CNY）</label>
        <input
          type="number"
          id="fixedCost"
          value={data.fixedCost || ''}
          onChange={(e) => handleChange('fixedCost', parseFloat(e.target.value) || 0)}
          placeholder="请输入固定费用（机器+IP等）"
          min="0"
          step="0.01"
        />
        {errors?.fixedCost && (
          <span className="error">{errors.fixedCost}</span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="totalTraffic">总流量（GB）</label>
        <input
          type="number"
          id="totalTraffic"
          value={data.totalTraffic || ''}
          onChange={(e) => handleChange('totalTraffic', parseFloat(e.target.value) || 0)}
          placeholder="请输入总流量"
          min="0"
          step="0.01"
        />
        {errors?.totalTraffic && (
          <span className="error">{errors.totalTraffic}</span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="usedTraffic">已用流量（GB）</label>
        <input
          type="number"
          id="usedTraffic"
          value={data.usedTraffic || ''}
          onChange={(e) => handleChange('usedTraffic', parseFloat(e.target.value) || 0)}
          placeholder="请输入已使用流量"
          min="0"
          step="0.01"
        />
        {errors?.usedTraffic && (
          <span className="error">{errors.usedTraffic}</span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="refundDate">退款日期</label>
        <input
          type="date"
          id="refundDate"
          value={data.refundDate || ''}
          onChange={(e) => handleChange('refundDate', e.target.value)}
        />
        {errors?.refundDate && (
          <span className="error">{errors.refundDate}</span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="subscriptionEndDate">订阅结束日期</label>
        <input
          type="date"
          id="subscriptionEndDate"
          value={data.subscriptionEndDate || ''}
          onChange={(e) => handleChange('subscriptionEndDate', e.target.value)}
        />
        {errors?.subscriptionEndDate && (
          <span className="error">{errors.subscriptionEndDate}</span>
        )}
      </div>
    </div>
  );
}