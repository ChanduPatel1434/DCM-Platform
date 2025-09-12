
import { Plus, BookOpen, Users, Video } from 'lucide-react';

import { motion } from 'framer-motion';
import { useModal,MODAL_TYPES } from '../Admin/Modals/ModalContext';


const QuickActions = () => {
    
  const { openModal } = useModal();
  
  const actions = [
    {
      title: 'Create Meeting',
      icon: Video,
      onClick: () => openModal(MODAL_TYPES.CREATE_MEETING),
      color: 'primary'
    },
    {
      title: 'Add Course',
      icon: BookOpen,
      onClick: () => openModal(MODAL_TYPES.ADD_COURSE),
      color: 'success'
    },
    {
      title: 'Create Batch',
      icon: Users,
      onClick: () => openModal(MODAL_TYPES.CREATE_BATCH),
      color: 'warning'
    }
  ];

  return (
    <div className="quick-actions-wrapper position-fixed bottom-0 end-0 m-4" style={{ zIndex: 1040 }}>
      <div className="d-flex flex-column gap-2">
        {actions.map((action, index) => (
          <motion.button
            key={action.title}
            onClick={action.onClick}
            className={`btn btn-${action.color} rounded-circle d-flex align-items-center justify-content-center`}
            style={{ width: '50px', height: '50px' }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <action.icon size={24} />
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;