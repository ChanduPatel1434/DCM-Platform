// hooks/useJoinLiveClass.js
import { useState } from 'react';
import { useJoinLiveClassMutation } from '../Services/student/liveClassServices';


export const useJoinLiveClass = () => {
  const [joinLiveClass, { isLoading, data }] = useJoinLiveClassMutation();
  const [errorMessage, setErrorMessage] = useState('');

  const handleJoinClass = async (classId) => {
    try {
      setErrorMessage('');
      const result = await joinLiveClass(classId).unwrap();
      console.log(result,"iam result")

      if (result) {
        // ✅ Redirect to Zoom
        console.log("iaminn")
        window.open(result.join, '_blank', 'noopener,noreferrer');
        return { success: true, zoomUrl: result.join };
      }

      return { success: false, error: 'No Zoom URL provided' };
    } catch (err) {
      const errorMsg =
        err?.data?.error || err?.error || 'Failed to join live class';
      setErrorMessage(errorMsg);

      return { success: false, error: errorMsg };
    }
  };

  return {
    joinClass: handleJoinClass,
    isLoading,
    error: errorMessage,
    data,
    resetError: () => setErrorMessage(''),
  };
};