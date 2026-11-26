import React from 'react';
import PropTypes from 'prop-types';
import { MdRefresh } from 'react-icons/md';
import { RxLightningBolt } from 'react-icons/rx';
import { formatDateTime, formatLabel, formatPeriod } from '../../util/util.js';
import LoadingSpinner from '../LoadingSpinner.jsx';
import { useSelector } from 'react-redux';

function InsightComponent({ insight, isLoading, onGenerate }) {
  const authUser = useSelector((states) => states.authUser);

  return (
    <div className="insight">
      <div className="insight__header">
        <div className="insight__header-content">
          <div className="insight__icon">
            <RxLightningBolt/>
          </div>
          <div className="insight__text">
            <div className="insight__title">
              <h1>AI Insight & Recommendation</h1>
              <p>Terakhir Generate: {formatDateTime(insight?.generatedAt)}</p>
            </div>
            <p>Analisis pola portofolio strategis, audit tata kelola, dan rekomendasi otomatis oleh Project Hub AI engine.</p>
          </div>
        </div>
        {authUser.role !== 'VIEWER' && (
          <button
            className="insight__generate"
            onClick={onGenerate}
            disabled={isLoading}>
            {isLoading ? (
              <>
                <LoadingSpinner size={16} />
                    Generating...
              </>
            ) : (
              <>
                <MdRefresh />
                    Generate Action
              </>
            )}
          </button>
        )}
      </div>
      <div className="insight__main">
        <div className="insight__latest">
          <div className="insight__latest-header">
            <div className="insight__latest-info">
              <h2>Latest analysis</h2>
              <p>{formatDateTime(insight?.generatedAt)}</p>
            </div>
            <span className="insight__latest-period">
              {insight?.period?.start && insight?.period?.end
                ? `${formatPeriod(insight.period.start)} – ${formatPeriod(insight.period.end)}`
                : '-'}
            </span>
          </div>
          <div className="insight__latest-condition">
            <p>OVERALL CONDITION</p>
            <h3>Portofolio membutuhkan perhatian</h3>
            <span>{insight?.condition}</span>
            <h3>Pola Kendala</h3>
            <span>{insight?.blockerPattern}</span>
          </div>
        </div>
        <div className="insight__attention">
          <p>Perlu Perhatian</p>
          {(insight?.attention || []).map((item, index) => (
            <div className={`insight__attention-item insight__attention-item-${item.prioritas.toLowerCase()}`} key={index}>
              <div className="insight__attention-header">
                <p className={`insight__attention-priority insight__attention-priority-${item.prioritas.toLowerCase()}`}>{formatLabel(item.prioritas)}</p>
                <div className="insight__attention-header-info">
                  <p>{item.nama}</p>
                  <p>{item.insight}</p>
                </div>
              </div>
              <div className="insight__attention-action">
                <p>{item.action}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

InsightComponent.propTypes = {
  insight: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  onGenerate: PropTypes.func.isRequired
};

export default InsightComponent;