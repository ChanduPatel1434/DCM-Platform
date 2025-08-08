// GoalProgressWidget.jsx
import React from 'react';
import './goalprogresswidget.css';

const GoalProgressWidget = ({ goalTitle, percentage, theme = 'primary' }) => {
  const radius = 40;
  const stroke = 8;
  const normalizedRadius = radius - stroke * 0.5;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className={`goal-progress-widget card p-3 border-0 shadow-sm bg-${theme}-subtle`}>
      <div className="text-center mb-2">
        <h6 className="mb-1 text-dark">{goalTitle}</h6>
      </div>
      <svg height={radius * 2} width={radius * 2} className="d-block mx-auto donut">
        <circle
          stroke="#dee2e6"
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        <circle
          stroke="#0d6efd"
          fill="transparent"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={`${circumference} ${circumference}`}
          style={{
            strokeDashoffset,
            transition: 'stroke-dashoffset 1.5s ease-in-out'
          }}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        <text
          x="50%"
          y="50%"
          dominantBaseline="middle"
          textAnchor="middle"
          className="fs-6 fw-bold text-dark"
        >
          {percentage}%
        </text>
      </svg>
    </div>
  );
};

export default GoalProgressWidget;