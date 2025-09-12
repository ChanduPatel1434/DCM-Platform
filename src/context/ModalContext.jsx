import React, { createContext, useContext, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import CreateBatchModal from '../components/dashboards/Admin/Batchs/BatchModal';
import CourseModal from '../components/dashboards/Admin/Addcourse/CoursesModal';

const ModalContext = createContext();

export const MODAL_TYPES = {
  ADD_COURSE: 'ADD_COURSE',
  EDIT_COURSE: 'EDIT_COURSE',
  CREATE_BATCH: 'CREATE_BATCH',
};

export const ModalProvider = ({ children }) => {
  const [modalConfig, setModalConfig] = useState({ type: null, props: {} });

  const openModal = (type, props = {}) => {
    setModalConfig({ type, props });
  };

  const closeModal = () => {
    setModalConfig({ type: null, props: {} });
  };

  const renderModal = () => {
    const { type, props } = modalConfig;

    switch (type) {
      case MODAL_TYPES.ADD_COURSE:
      case MODAL_TYPES.EDIT_COURSE:
        return (
          <CourseModal
            {...props}
            handleClose={closeModal}
            mode={type === MODAL_TYPES.EDIT_COURSE ? 'edit' : 'add'}
            showModal={true}
          />
        );
      case MODAL_TYPES.CREATE_BATCH:
        return <CreateBatchModal {...props} handleClose={closeModal} showModal={true} />;
      default:
        return null;
    }
  };

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      <AnimatePresence>
        {modalConfig.type && renderModal()}
      </AnimatePresence>
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};