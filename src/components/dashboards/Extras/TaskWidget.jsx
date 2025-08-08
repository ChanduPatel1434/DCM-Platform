// TaskWidget.jsx
import React from 'react';
import { MdTrendingUp, MdTrendingDown } from 'react-icons/md';
import './taskwidget.css';

const TaskWidget = ({ title, count, trend, icon }) => {
  const isPositive = trend.includes('+');
  const TrendIcon = isPositive ? MdTrendingUp : MdTrendingDown;
  const trendColor = isPositive ? 'text-success' : 'text-danger';

  return (
    <div className="task-widget card border-0 shadow-sm text-white position-relative overflow-hidden">
      <div className="gradient-bg" />
      <div className="card-body position-relative">
        <div className="d-flex align-items-center mb-2">
          <div className="icon-box me-3">
            {icon}
          </div>
          <h6 className="mb-0 fs-14">{title}</h6>
        </div>
        <div className="d-flex justify-content-between align-items-center">
          <h3 className="mb-0 fw-bold">{count}</h3>
          <div className="text-end">
            <span className={`fs-14 ${trendColor}`}>
              <TrendIcon className="me-1" />
              {trend}
            </span>
            <p className="mb-0 text-white-50 fs-12">Last 7 days</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskWidget;