import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useGetLiveClassesQuery } from '../../../Services/student/liveClassServices';
import { useJoinLiveClass } from '../../../hooks/useJoinLiveClass';

const LiveClasses = () => {
  const [filteredClasses, setFilteredClasses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('all');
  const [selectedBatch, setSelectedBatch] = useState('all');
  const [currentTime, setCurrentTime] = useState(new Date());
  
  const { data: liveClassesData, isLoading, error, refetch } = useGetLiveClassesQuery(undefined,{refetchOnMountOrArgChange:true});
  const { joinClass } = useJoinLiveClass();

  // Update time every 30 seconds for real-time button changes
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 30000);
    
    return () => clearInterval(interval);
  }, []);

  // Process and filter classes
  useEffect(() => {
    if (liveClassesData?.liveClasses) {
      let filtered = liveClassesData.liveClasses;
      
      if (selectedCourse !== 'all') {
        filtered = filtered.filter(cls => cls.course?._id === selectedCourse);
      }
      
      if (selectedBatch !== 'all') {
        filtered = filtered.filter(cls => cls.batch?._id === selectedBatch);
      }
      
      setFilteredClasses(filtered);
    }
  }, [liveClassesData, selectedCourse, selectedBatch]);

  // Get unique courses and batches for filters
  const courses = [...new Set(liveClassesData?.liveClasses
    ?.map(cls => cls.course)
    .filter(Boolean)
    .map(course => ({ id: course._id, name: course.name })) || [])];

  const batches = [...new Set(liveClassesData?.liveClasses
    ?.map(cls => cls.batch)
    .filter(Boolean)
    .map(batch => ({ id: batch._id, name: batch.batchName })) || [])];

  const handleJoinClick = (classId) => {
    joinClass(classId);
  };

  // Format time only (HH:MM AM/PM)
  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  // Check if class should be joinable based on daily time
  const shouldShowJoinButton = (startTime, duration) => {
    const classTime = new Date(startTime);
    const nowTotalMinutes = currentTime.getHours() * 60 + currentTime.getMinutes();
    const classStartMinutes = classTime.getHours() * 60 + classTime.getMinutes();
    const classEndMinutes = classStartMinutes + duration;
    
    return nowTotalMinutes >= classStartMinutes && nowTotalMinutes <= classEndMinutes;
  };

  // Check if class is upcoming today
  const isUpcomingToday = (startTime) => {
    const classTime = new Date(startTime);
    const nowTotalMinutes = currentTime.getHours() * 60 + currentTime.getMinutes();
    const classStartMinutes = classTime.getHours() * 60 + classTime.getMinutes();
    
    return nowTotalMinutes < classStartMinutes;
  };

  // Get daily status for display
  const getDailyStatus = (startTime, duration) => {
    if (shouldShowJoinButton(startTime, duration)) return 'live';
    if (isUpcomingToday(startTime)) return 'upcoming';
    return 'completed';
  };

  if (isLoading) {
    return (
      <div className="live-classes-container">
        <div className="live-classes-loading">
          <div className="live-classes-spinner"></div>
          <p>Loading live classes...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="live-classes-container">
        <div className="live-classes-error">
          <h3>Error Loading Classes</h3>
          <p>{error.data?.error || 'Failed to load live classes'}</p>
          <button onClick={refetch}>Try Again</button>
        </div>
      </div>
    );
  }

  return (
    <div className="live-classes-container">
      <div className="live-classes-header">
        <div className="header-content">
          <h1>Live Classes</h1>
          <p>Join your scheduled live sessions</p>
        </div>
        
        {(courses.length > 0 || batches.length > 0) && (
          <div className="live-classes-filters">
            <div className="filter-group">
              <select 
                value={selectedCourse} 
                onChange={(e) => setSelectedCourse(e.target.value)}
              >
                <option value="all">All Courses</option>
                {courses.map(course => (
                  <option key={course.id} value={course.id}>
                    {course.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <select 
                value={selectedBatch} 
                onChange={(e) => setSelectedBatch(e.target.value)}
              >
                <option value="all">All Batches</option>
                {batches.map(batch => (
                  <option key={batch.id} value={batch.id}>
                    {batch.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}
      </div>

      <div className="live-classes-grid">
        {filteredClasses.length > 0 ? (
          filteredClasses.map(liveClass => {
            const status = getDailyStatus(liveClass.startTime, liveClass.duration);
            const canJoin = shouldShowJoinButton(liveClass.startTime, liveClass.duration);
            
            return (
              <div key={liveClass._id} className="live-class-card">
                <div className="live-class-header">
                  <h3>{liveClass.title}</h3>
                  <span className={`status ${status}`}>
                    {status === 'live' ? '🔴 LIVE' : status === 'upcoming' ? '⏰ UPCOMING' : '✅ COMPLETED'}
                  </span>
                </div>
                
                <div className="live-class-body">
                  <div className="info-row">
                    <span className="label">Course:</span>
                    <span className="value">{liveClass.course?.name || 'N/A'}</span>
                  </div>
                  
                  {liveClass.batch?.batchName && (
                    <div className="info-row">
                      <span className="label">Batch:</span>
                      <span className="value">{liveClass.batch.batchName}</span>
                    </div>
                  )}
                  
                  <div className="info-row">
                    <span className="label">Time:</span>
                    <span className="value">Daily at {formatTime(liveClass.startTime)}</span>
                  </div>
                  
                  <div className="info-row">
                    <span className="label">Duration:</span>
                    <span className="value">{liveClass.duration} minutes</span>
                  </div>
                  
                  {liveClass.instructor?.name && (
                    <div className="info-row">
                      <span className="label">Instructor:</span>
                      <span className="value">{liveClass.instructor.name}</span>
                    </div>
                  )}
                </div>
                
                <div className="live-class-footer">
                  {canJoin ? (
                    <button 
                      className="btn-join"
                      onClick={() => handleJoinClick(liveClass._id)}
                    >
                      Join Live Class
                    </button>
                  ) : status === 'upcoming' ? (
                    <button className="btn-upcoming" disabled>
                      Starts at {formatTime(liveClass.startTime)}
                    </button>
                  ) : (
                    <button className="btn-completed" disabled>
                      Completed for Today
                    </button>
                  )}
                </div>
              </div>
            );
          })
        ) : liveClassesData?.liveClasses?.length === 0 ? (
          <div className="live-classes-empty">
            <div className="live-classes-empty-icon">📅</div>
            <h3>No Live Classes Scheduled</h3>
            <p>Check back later for upcoming sessions</p>
          </div>
        ) : (
          <div className="live-classes-empty">
            <div className="live-classes-empty-icon">🔍</div>
            <h3>No Classes Found</h3>
            <p>Try adjusting your filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LiveClasses;