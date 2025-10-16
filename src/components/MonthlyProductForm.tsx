import type { MonthlyProductInput } from '../types';

interface MonthlyProductFormProps {
  data: Partial<MonthlyProductInput>;
  onChange: (data: Partial<MonthlyProductInput>) => void;
  errors?: Record<string, string>;
}

export function MonthlyProductForm({ data, onChange, errors }: MonthlyProductFormProps) {
  const handleChange = (field: keyof MonthlyProductInput, value: string | number) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="form-section">
      <h3>月循环流量产品</h3>

      <div className="form-group">
        <label htmlFor="subscriptionPrice">订阅价格（CNY）</label>
        <input
          type="number"
          id="subscriptionPrice"
          value={data.subscriptionPrice || ''}
          onChange={(e) => handleChange('subscriptionPrice', parseFloat(e.target.value) || 0)}
          placeholder="请输入订阅价格"
          min="0"
          step="0.01"
        />
        {errors?.subscriptionPrice && (
          <span className="error">{errors.subscriptionPrice}</span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="subscriptionCycle">订阅周期（月）</label>
        <input
          type="number"
          id="subscriptionCycle"
          value={data.subscriptionCycle || ''}
          onChange={(e) => handleChange('subscriptionCycle', parseInt(e.target.value) || 0)}
          placeholder="请输入订阅周期"
          min="1"
          max="12"
        />
        {errors?.subscriptionCycle && (
          <span className="error">{errors.subscriptionCycle}</span>
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