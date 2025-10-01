import React, { useState } from 'react';

const MyCertificates = () => {
  const [activeTab, setActiveTab] = useState('available');

  // Sample certificates data
  const availableCertificates = [
    {
      id: '1',
      courseName: 'Advanced JavaScript Live Course',
      completionDate: '2023-09-15',
      certificateId: 'JS-2023-00125',
      downloadUrl: '#',
      viewUrl: '#'
    },
    {
      id: '2',
      courseName: 'Machine Learning Fundamentals',
      completionDate: '2023-08-20',
      certificateId: 'ML-2023-00089',
      downloadUrl: '#',
      viewUrl: '#'
    }
  ];

  const inProgressCourses = [
    // {
    //   id: '3',
    //   courseName: 'UI/UX Design Masterclass',
    //   progress: 75,
    //   estimatedCompletion: '2023-10-30'
    // },
    // {
    //   id: '4',
    //   courseName: 'React Native Mobile Development',
    //   progress: 40,
    //   estimatedCompletion: '2023-11-15'
    // }
  ];

  return (
    <div className="component-container">
      <div className="component-header">
        <h1>My Certificates</h1>
        <p>View and download your course completion certificates</p>
      </div>

      <div className="certificates-content">
        <div className="tabs">
          <button 
            className={`tab ${activeTab === 'available' ? 'active' : ''}`}
            onClick={() => setActiveTab('available')}
          >
            Available Certificates ({availableCertificates.length})
          </button>
          <button 
            className={`tab ${activeTab === 'inprogress' ? 'active' : ''}`}
            onClick={() => setActiveTab('inprogress')}
          >
            In Progress ({inProgressCourses.length})
          </button>
        </div>

        <div className="tab-content">
          {activeTab === 'available' ? (
            availableCertificates.length > 0 ? (
              <div className="certificates-grid">
                {availableCertificates.map(certificate => (
                  <div key={certificate.id} className="certificate-card">
                    <div className="certificate-header">
                      <div className="certificate-icon">🏆</div>
                      <div className="certificate-info">
                        <h3>{certificate.courseName}</h3>
                        <p>Completed: {new Date(certificate.completionDate).toLocaleDateString()}</p>
                        <span className="certificate-id">ID: {certificate.certificateId}</span>
                      </div>
                    </div>
                    <div className="certificate-actions">
                      <a href={certificate.viewUrl} className="btn-outline" target="_blank" rel="noopener noreferrer">
                        View Certificate
                      </a>
                      <a href={certificate.downloadUrl} className="btn-primary" download>
                        Download PDF
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <div className="empty-icon">📜</div>
                <h3>No Certificates Yet</h3>
                <p>Complete your courses to earn certificates</p>
                <p>Certificates will appear here automatically after course completion</p>
              </div>
            )
          ) : (
            <div className="in-progress-courses">
              {inProgressCourses.map(course => (
                <div key={course.id} className="progress-course">
                  <div className="course-info">
                    <h4>{course.courseName}</h4>
                    <p>Estimated completion: {new Date(course.estimatedCompletion).toLocaleDateString()}</p>
                  </div>
                  <div className="progress-container">
                    <div className="progress-bar">
                      <div 
                        className="progress-fill" 
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                    <span className="progress-text">{course.progress}% Complete</span>
                  </div>
                  <button className="continue-btn">
                    Continue Learning
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="certificate-info">
          <h3>About Your Certificates</h3>
          <ul>
            <li>✅ Digital certificates are issued automatically upon course completion</li>
            <li>✅ Certificates include unique verification ID</li>
            <li>✅ Share your achievements on LinkedIn and other platforms</li>
            <li>✅ Download high-quality PDF versions</li>
            <li>✅ Employers can verify certificates using the unique ID</li>
          </ul>
        </div>
      </div>

      <style jsx>{`
        .component-container {
          padding: 2rem;
          max-width: 800px;
          margin: 0 auto;
        }
        
        .component-header {
          text-align: center;
          margin-bottom: 2rem;
        }
        
        .component-header h1 {
          font-size: 2rem;
          font-weight: 700;
          margin: 0 0 0.5rem;
          color: #1a1a1a;
        }
        
        .component-header p {
          color: #666;
          margin: 0;
          font-size: 1.1rem;
        }
        
        .certificates-content {
          background: white;
          border-radius: 12px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          overflow: hidden;
        }
        
        .tabs {
          display: flex;
          border-bottom: 1px solid #eee;
        }
        
        .tab {
          flex: 1;
          padding: 1rem;
          background: none;
          border: none;
          cursor: pointer;
          font-weight: 500;
          color: #666;
          transition: all 0.2s ease;
        }
        
        .tab.active {
          color: #6E8AFA;
          border-bottom: 2px solid #6E8AFA;
        }
        
        .tab-content {
          padding: 2rem;
        }
        
        .certificates-grid {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        
        .certificate-card {
          border: 1px solid #eee;
          border-radius: 8px;
          padding: 1.5rem;
          transition: all 0.2s ease;
        }
        
        .certificate-card:hover {
          border-color: #6E8AFA;
          box-shadow: 0 2px 12px rgba(110, 138, 250, 0.1);
        }
        
        .certificate-header {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }
        
        .certificate-icon {
          font-size: 2rem;
          flex-shrink: 0;
        }
        
        .certificate-info h3 {
          margin: 0 0 0.5rem;
          color: #1a1a1a;
        }
        
        .certificate-info p {
          margin: 0 0 0.5rem;
          color: #666;
        }
        
        .certificate-id {
          font-size: 0.9rem;
          color: #888;
          font-family: monospace;
        }
        
        .certificate-actions {
          display: flex;
          gap: 1rem;
        }
        
        .btn-primary, .btn-outline {
          padding: 0.5rem 1rem;
          border-radius: 6px;
          text-decoration: none;
          font-weight: 500;
          transition: all 0.2s ease;
          font-size: 0.9rem;
        }
        
        .btn-primary {
          background: #6E8AFA;
          color: white;
          border: none;
        }
        
        .btn-primary:hover {
          background: #5a7ae0;
        }
        
        .btn-outline {
          background: transparent;
          color: #6E8AFA;
          border: 1px solid #6E8AFA;
        }
        
        .btn-outline:hover {
          background: rgba(110, 138, 250, 0.1);
        }
        
        .empty-state {
          text-align: center;
          padding: 3rem 1rem;
          color: #666;
        }
        
        .empty-icon {
          font-size: 3rem;
          margin-bottom: 1rem;
        }
        
        .empty-state h3 {
          margin: 0 0 0.5rem;
          color: #333;
        }
        
        .empty-state p {
          margin: 0.25rem 0;
        }
        
        .in-progress-courses {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        
        .progress-course {
          border: 1px solid #eee;
          border-radius: 8px;
          padding: 1.5rem;
        }
        
        .course-info h4 {
          margin: 0 0 0.5rem;
          color: #1a1a1a;
        }
        
        .course-info p {
          margin: 0 0 1rem;
          color: #666;
        }
        
        .progress-container {
          margin-bottom: 1rem;
        }
        
        .progress-bar {
          height: 8px;
          background: #f0f0f0;
          border-radius: 4px;
          overflow: hidden;
          margin-bottom: 0.5rem;
        }
        
        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #6E8AFA 0%, #8A6EFA 100%);
          border-radius: 4px;
          transition: width 0.3s ease;
        }
        
        .progress-text {
          font-size: 0.9rem;
          color: #666;
        }
        
        .continue-btn {
          background: transparent;
          color: #6E8AFA;
          border: 1px solid #6E8AFA;
          padding: 0.5rem 1rem;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 500;
          transition: all 0.2s ease;
        }
        
        .continue-btn:hover {
          background: rgba(110, 138, 250, 0.1);
        }
        
        .certificate-info {
          background: #f9f9f9;
          padding: 1.5rem;
          border-top: 1px solid #eee;
        }
        
        .certificate-info h3 {
          margin: 0 0 1rem;
          color: #1a1a1a;
        }
        
        .certificate-info ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        
        .certificate-info li {
          padding: 0.5rem 0;
          color: #666;
        }
        
        @media (max-width: 768px) {
          .certificate-header {
            flex-direction: column;
            text-align: center;
          }
          
          .certificate-actions {
            flex-direction: column;
          }
          
          .tabs {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
};

export default MyCertificates;