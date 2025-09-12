import React from 'react';
import { useModal, MODAL_TYPES } from '../Modals/ModalContext';
import { useGetLiveClassesQuery } from '../../../../Services/admin/zoomService';
import { format } from 'date-fns';
import { Edit2, Trash2, Video } from 'lucide-react';

const LiveClassesTable = () => {
  const { data: liveClasses, isLoading } = useGetLiveClassesQuery();
  const { openModal } = useModal();

  if (isLoading) {
    return <div className="text-center py-4">Loading...</div>;
  }

  return (
   <div className='content-page'>
     <div className="card shadow-sm">
      <div className="card-header bg-light d-flex justify-content-between align-items-center">
        <h5 className="mb-0">Scheduled Live Classes</h5>
        <button 
          className="btn btn-primary btn-sm"
          onClick={() => openModal(MODAL_TYPES.CREATE_MEETING)}
        >
          Schedule New Class
        </button>
      </div>
      <div className="table-responsive">
        <table className="table table-hover mb-0">
          <thead className="table-light">
            <tr>
              <th>Title</th>
              <th>Course</th>
              <th>Batch</th>
              <th>Start Time</th>
              <th>Duration</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {liveClasses?.map((liveClass) => (
              <tr key={liveClass._id}>
                <td>{liveClass.title}</td>
                <td>{liveClass.course?.name}</td>
                <td>{liveClass.batch?.name}</td>
                <td>{format(new Date(liveClass.startTime), 'PPp')}</td>
                <td>{liveClass.duration} mins</td>
                <td>
                  <div className="btn-group">
                    <button
                      className="btn btn-sm btn-outline-primary"
                      onClick={() => openModal(MODAL_TYPES.EDIT_MEETING, { initialData: liveClass })}
                    >
                      <Edit2 size={16} />
                    </button>
                    <a
                      href={liveClass.zoomJoinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-sm btn-primary"
                    >
                      <Video size={16} />
                    </a>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
   </div>
  );
};

export default LiveClassesTable;