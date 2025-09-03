import React, { useState } from "react";

const actions = [
  {
    label: "Create New Batch",
    icon: "🆕",
    description: `Create a new student batch to organize classes efficiently. 
This helps in scheduling, tracking, and managing groups effectively, 
ensuring smooth batch-wise coordination throughout the semester.`,
  },
  {
    label: "Add New Course",
    icon: "📚",
    description: `Add new courses to your curriculum to expand your course offerings. 
Customize course details, syllabus, duration, and assign instructors 
to maintain a diverse and comprehensive education platform.`,
  },
  {
    label: "Add New Admin",
    icon: "👤",
    description: `Grant administrative access to new team members for improved management capabilities. 
Control permissions carefully to maintain security and delegate responsibilities 
within your organization.`,
  },
  {
    label: "Send Class Link",
    icon: "📧",
    description: `Send class join links directly to students through email or messaging services. 
Facilitate easy and timely access to online classes, improving attendance and engagement.`,
  },
];

const QuickActionsCard = () => {
  const [selectedActionIndex, setSelectedActionIndex] = useState(null);

  return (
    <div className="card shadow border-0 p-4 my-4">
      <h5 className="fw-bold text-primary text-center mb-3">Quick Actions</h5>

      <div className="row g-3 justify-content-center">
        {actions.map((action, idx) => (
          <div key={idx} className="col-6 col-md-3">
            <button
              className={`btn w-100 h-100 py-3 shadow-sm ${
                selectedActionIndex === idx ? "btn-success" : "btn-primary"
              }`}
              onClick={() => setSelectedActionIndex(idx)}
            >
              <div className="fs-3">{action.icon}</div>
              <small>{action.label}</small>
            </button>
          </div>
        ))}
      </div>

      {selectedActionIndex !== null && (
        <div className="mt-4 p-4 border rounded bg-light text-center">
          <h6 className="text-primary">{actions[selectedActionIndex].label}</h6>
          <p className="mb-0" style={{ whiteSpace: "pre-line" }}>
            {actions[selectedActionIndex].description}
          </p>
        </div>
      )}
    </div>
  );
};

export default QuickActionsCard;
