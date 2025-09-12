
// const actions = [
//   {
//     label: "Create New Batch",
//     icon: "🆕",
//     description: `Create a new student batch to organize classes efficiently. 
// This helps in scheduling, tracking, and managing groups effectively, 
// ensuring smooth batch-wise coordination throughout the semester.`,
//   },
//   {
//     label: "Add New Course",
//     icon: "📚",
//     description: `Add new courses to your curriculum to expand your course offerings. 
// Customize course details, syllabus, duration, and assign instructors 
// to maintain a diverse and comprehensive education platform.`,
//   },
//   {
//     label: "Add New Admin",
//     icon: "👤",
//     description: `Grant administrative access to new team members for improved management capabilities. 
// Control permissions carefully to maintain security and delegate responsibilities 
// within your organization.`,
//   },
//   {
//     label: "Send Class Link",
//     icon: "📧",
//     description: `Send class join links directly to students through email or messaging services. 
// Facilitate easy and timely access to online classes, improving attendance and engagement.`,
//   },
// ];

// const QuickActionsCard = () => {
//   const [selectedActionIndex, setSelectedActionIndex] = useState(null);

//   return (
//     <div className="card shadow border-0 p-4 my-4">
//       <h5 className="fw-bold text-primary text-center mb-3">Quick Actions</h5>

//       <div className="row g-3 justify-content-center">
//         {actions.map((action, idx) => (
//           <div key={idx} className="col-6 col-md-3">
//             <button
//               className={`btn w-100 h-100 py-3 shadow-sm ${
//                 selectedActionIndex === idx ? "btn-success" : "btn-primary"
//               }`}
//               onClick={() => setSelectedActionIndex(idx)}
//             >
//               <div className="fs-3">{action.icon}</div>
//               <small>{action.label}</small>
//             </button>
//           </div>
//         ))}
//       </div>

//       {selectedActionIndex !== null && (
//         <div className="mt-4 p-4 border rounded bg-light text-center">
//           <h6 className="text-primary">{actions[selectedActionIndex].label}</h6>
//           <p className="mb-0" style={{ whiteSpace: "pre-line" }}>
//             {actions[selectedActionIndex].description}
//           </p>
//         </div>
//       )}
//     </div>
//   );
// };
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';



const buttonVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: (i) => ({
    opacity: 1,
    scale: 1,
    transition: {
      delay: i * 0.15,
      duration: 0.4,
      ease: 'easeOut',
    },
  }),
};

const QuickActionCard = () => {
  const navigate=useNavigate()
  const actions = [
  { label: 'Create New Batch', icon: '📦', color: '#4facfe', onClick: () => {navigate('batch/allbatchs')} },
  { label: 'Create New Course', icon: '📚', color: '#43e97b', onClick: () => {} },
  { label: 'See Payments', icon: '💳', color: '#b817e9ff', onClick: () => {} },
  { label: 'Assign Batch', icon: '🧑‍🏫', color: '#290ad8ff', onClick: () => {} },
];
  const cardStyle = {
  maxWidth: '400px',
  margin: 'auto',
  padding: '2rem',
  borderRadius: '16px',
  backdropFilter: 'blur(10px)',

    
  boxShadow: '0 0 25px rgba(0,0,0,0.3)',
  color: '#fff',

  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      style={cardStyle}
    >
      <h4 style={{ fontWeight: 'bold', marginBottom: '1.5rem',color:"black" }}>🚀 Quick Actions</h4>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'space-between' }}>
        {actions.map((action, idx) => (
          <motion.button
            key={idx}
            custom={idx}
            initial="hidden"
            animate="visible"
            variants={buttonVariants}
            onClick={action.onClick}
            style={{
              flexGrow: 1,
              minWidth: '45%',
              padding: '0.75rem 1rem',
              border: 'none',
              borderRadius: '8px',
              background: action.color,
              color: '#fff',
              fontWeight: '600',
              cursor: 'pointer',
              boxShadow: '0 4px 10px rgba(0,0,0,0.15)',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            {action.icon} {action.label}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

export default QuickActionCard;