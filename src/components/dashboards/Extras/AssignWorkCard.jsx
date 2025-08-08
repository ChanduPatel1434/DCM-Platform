import React from "react";

const AssignWorkCard = ({ count }) => (
  <div className="card shadow-sm border-0 h-100 text-center p-3">
    <div className="display-5 mb-2">📝</div>
    <h6 className="text-muted">Assign Work</h6>
    <h4 className="fw-bold text-primary">{count}</h4>
  </div>
);

export default AssignWorkCard;