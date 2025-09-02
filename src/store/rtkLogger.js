import { toast } from 'react-toastify';

const rtkLogger = (store) => (next) => (action) => {
  if (action.type.endsWith('/rejected')) {
    toast.error(`API Error: ${action.error?.data || action.error?.message}`);

  }
   if (action.type.endsWith('/rejected')) {
    console.error('❌ RTK Query Rejected:', {
      type: action.type,
      error: action.error,
      payload: action.payload,
    });
  }

  return next(action);
};

export default rtkLogger;