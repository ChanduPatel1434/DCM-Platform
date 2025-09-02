import React from "react";

const actions = [
  { label: "Create New Batch", icon: "🆕" },
  { label: "Add New Course", icon: "📚" },
  { label: "Add New Admin", icon: "👤" },
  { label: "Send Class Link", icon: "📧" },
];

const QuickActionsCard = () => {
  return (
    <div className="card shadow border-0 p-4 my-4">
      <h5 className="fw-bold text-primary text-center mb-3">Quick Actions</h5>
      <div className="row g-3 justify-content-center">
        {actions.map((action, idx) => (
          <div key={idx} className="col-6 col-md-3">
            <button className="btn btn-primary w-100 h-100 py-3 shadow-sm">
              <div className="fs-3">{action.icon}</div>
              <small>{action.label}</small>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuickActionsCard;
