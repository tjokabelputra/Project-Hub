import React from 'react';
import { MdRefresh } from 'react-icons/md';
import { RxLightningBolt } from 'react-icons/rx';
import { formatDateTime, formatLabel, formatPeriod } from '../../util/util.js';
import LoadingSpinner from '../LoadingSpinner.jsx';

function InsightComponent({ insight, isLoading, onGenerate }) {
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
              <p>{formatDateTime(insight.generatedAt)}</p>
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
          </div>
          <div className="insight__latest-stats">
            <div>
              <strong>{insight?.attention?.length ?? 0}</strong>
              <span>Needs attention</span>
            </div>
            <div>
              <strong>{insight?.stageChangeProjectCount ?? 0}</strong>
              <span>Stage changes</span>
            </div>
            <div>
              <strong>{insight?.completedProjectCount ?? 0}</strong>
              <span>Completed</span>
            </div>
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
        <div className="insight__"></div>
      </div>
    </div>
  );
}

export default InsightComponent;