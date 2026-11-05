import React from 'react';
import { MdRefresh } from 'react-icons/md';
import { RxLightningBolt } from 'react-icons/rx';
import { formatDateTime } from '../../util/util.js';
import LoadingSpinner from '../LoadingSpinner.jsx';

function InsightComponent({ insight, isLoading, onGenerate }) {
  const keyInsights = insight?.response?.keyInsights || [];

  return (
    <div className="insight">
      <div className="insight__header">
        <div className="insight__header-content">
          <div className="insight__icon">
            <RxLightningBolt/>
          </div>
          <div className="insight__text">
            <div className="insight__title">
              <h1>AI Insight & Recommendatio</h1>
              <p>{formatDateTime(insight.createdAt)}</p>
            </div>
            <p>Analisis pola portofolio strategis, audit tata kelola, dan rekomendasi otomatis oleh Project Hub AI engine.</p>
          </div>
        </div>
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
      </div>
      <div className="insight__main">
        <p>Temuan Kunci & Analisis Risiko</p>
        <div className="insight__list">
          {keyInsights.map((point) => (
            <div className={`insight__card insight__card-${point.severity.toLowerCase()}`}>
              <div className="insight__card-header">
                <p className={`insight__severity insight__severity-${point.severity.toLowerCase()}`}>{point.severity}</p>
                <div className="insight__list-info">
                  <p>{point.title}</p>
                  <p>{point.description}</p>
                </div>
              </div>
              <div className="insight__recommendation">
                <strong>Aksi Mitigasi:</strong>
                <p>{point.recommendedAction}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default InsightComponent;