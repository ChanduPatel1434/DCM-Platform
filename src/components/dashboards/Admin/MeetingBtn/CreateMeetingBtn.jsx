import { useSelector } from 'react-redux';
import { useCreateMeetingMutation } from '../../../../Services/admin/zoomService';
import { useState } from 'react';
import './CreateMeetingButton.css'; // or use CSS Modules

const CreateMeetingButton = ({ topic }) => {
  const { user } = useSelector((state) => state.auth);
  
  const [createMeeting, { data, isLoading, error }] = useCreateMeetingMutation();
  const [clicked, setClicked] = useState(false);

  if (user?.role !== 'admin') return null;

  const handleClick = () => {
    createMeeting(topic);
    setClicked(true);
  };

  return (
    <div className="meeting-container">
      <button
        onClick={handleClick}
        disabled={isLoading}
        className="meeting-button"
      >
        {isLoading ? 'Creating...' : `Create Zoom Meeting for ${topic}`}
      </button>

      {data?.join_url && clicked && (
        <a
          href={data.join_url}
          target="_blank"
          rel="noopener noreferrer"
          className="meeting-link"
        >
          Join Meeting
        </a>
      )}

      {error && (
        <p className="meeting-error">
          {error.data?.error || 'Only admins can create meetings'}
        </p>
      )}
    </div>
  );
};

export default CreateMeetingButton;