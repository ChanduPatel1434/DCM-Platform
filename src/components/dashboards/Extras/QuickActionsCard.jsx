
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
  maxWidth: '360px',
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