import type { CalculationResult, ProductType } from '../types';
import { formatCurrency, formatTraffic } from '../utils/calculator';

interface ResultDisplayProps {
  result: CalculationResult | null;
  productType: ProductType | null;
  isLoading?: boolean;
}

export function ResultDisplay({ result, productType, isLoading }: ResultDisplayProps) {
  if (isLoading) {
    return (
      <div className="result-section">
        <div className="loading">计算中...</div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="result-section">
        <div className="empty-result">
          请填写表单并点击"计算剩余价值"查看结果
        </div>
      </div>
    );
  }

  return (
    <div className="result-section">
      <h3>计算结果</h3>

      <div className="result-highlight">
        <div className="result-label">剩余价值</div>
        <div className="result-value primary">{formatCurrency(result.remainingValue)}</div>
      </div>

      <div className="result-details">
        <div className="detail-item">
          <span className="detail-label">剩余天数：</span>
          <span className="detail-value">{result.remainingDays} 天</span>
        </div>

        <div className="detail-item">
          <span className="detail-label">日固定费用：</span>
          <span className="detail-value">{formatCurrency(result.dailyFixedCost)}</span>
        </div>

        {productType === 'yearly' && result.trafficFee !== undefined && (
          <>
            <div className="detail-item">
              <span className="detail-label">流量费用：</span>
              <span className="detail-value">{formatCurrency(result.trafficFee)}</span>
            </div>

            {result.trafficUnitPrice !== undefined && (
              <div className="detail-item">
                <span className="detail-label">流量单价：</span>
                <span className="detail-value">{formatCurrency(result.trafficUnitPrice)}/GB</span>
              </div>
            )}

            {result.remainingTraffic !== undefined && (
              <div className="detail-item">
                <span className="detail-label">剩余流量：</span>
                <span className="detail-value">{formatTraffic(result.remainingTraffic)}</span>
              </div>
            )}
          </>
        )}
      </div>

      {/* 计算过程说明 */}
      <div className="calculation-breakdown">
        <h4>计算说明</h4>
        <div className="breakdown-content">
          {productType === 'monthly' ? (
            <p>
              剩余价值 = 剩余天数 × 日固定费用<br/>
              = {result.remainingDays} 天 × {formatCurrency(result.dailyFixedCost)}<br/>
              = {formatCurrency(result.remainingValue)}
            </p>
          ) : (
            <p>
              剩余价值 = (剩余天数 × 日固定费用) + (剩余流量 × 流量单价)<br/>
              = ({result.remainingDays} 天 × {formatCurrency(result.dailyFixedCost)}) +
              {result.remainingTraffic && result.trafficUnitPrice &&
                ` (${formatTraffic(result.remainingTraffic)} × ${formatCurrency(result.trafficUnitPrice)})`}<br/>
              = {formatCurrency(result.remainingDays * result.dailyFixedCost)} +
              {result.remainingTraffic && result.trafficUnitPrice &&
                ` ${formatCurrency(result.remainingTraffic * result.trafficUnitPrice)}`}<br/>
              = {formatCurrency(result.remainingValue)}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}