import {  Book, BookOpen, User, Users, Video } from 'lucide-react';
import { motion} from 'framer-motion';
import { useModal, MODAL_TYPES } from '../Admin/Modals/ModalContext';
import { useState } from 'react';

const QuickActions = () => {
  const { openModal, modalType } = useModal(); // Get modalType
  const [hoveredAction, setHoveredAction] = useState(null);

  const actions = [
    {
      title: 'Create Meeting',
      icon: Video,
      onClick: () => openModal(MODAL_TYPES.CREATE_MEETING),
      color: 'primary'
    },
    {
      title: 'Add Course',
      icon: Book,
      onClick: () => openModal(MODAL_TYPES.ADD_COURSE),
      color: 'success'
    },
    {
      title: 'Create Batch',
      icon: User,
      onClick: () => openModal(MODAL_TYPES.CREATE_BATCH),
      color: 'warning'
    }
  ];

  // Don't render quick actions if modal is open
  if (modalType) {
    return null;
  }

  return (
    <div className="quick-actions-wrapper position-fixed bottom-0 end-0 m-4" style={{ zIndex: 100}}>
      <div className="d-flex flex-column gap-3">
        {actions.map((action, index) => (
          <div key={action.title} className="position-relative d-flex align-items-center">
           
          

            {/* Button */}
            <motion.button
              onMouseEnter={() => setHoveredAction(action.title)}
              onMouseLeave={() => setHoveredAction(null)}
              onClick={action.onClick}
              className={`btn btn-${action.color} rounded-circle d-flex align-items-center justify-content-center shadow`}
              style={{ 
                width: '50px', 
                height: '50px',
                transition: 'all 0.3s ease'
              }}
              whileHover={{ 
                scale: 1.1,
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
              }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <action.icon size={26} />
            </motion.button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;