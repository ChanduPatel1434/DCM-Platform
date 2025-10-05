import React, { useState } from 'react';
import { Download, Eye, Share2, Filter, Search, Calendar, Clock, Award } from 'lucide-react';

const MyCertificates = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedCertificate, setSelectedCertificate] = useState(null);

  // Mock certificate data
  const certificates = [
   
   
  ];

  const filteredCertificates = certificates.filter(cert => {
    const matchesSearch = cert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cert.course.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || cert.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const handleDownload = (certificate) => {
    // Simulate download
    console.log('Downloading:', certificate.title);
    alert(`Downloading ${certificate.title} certificate...`);
  };

  const handleShare = (certificate) => {
    if (navigator.share) {
      navigator.share({
        title: certificate.title,
        text: `Check out my certificate for ${certificate.course}`,
        url: certificate.shareableLink,
      });
    } else {
      navigator.clipboard.writeText(certificate.shareableLink);
      alert('Certificate link copied to clipboard!');
    }
  };

  const handleView = (certificate) => {
    setSelectedCertificate(certificate);
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      completed: { label: 'Completed', class: 'status-completed' },
      'in-progress': { label: 'In Progress', class: 'status-progress' },
      expired: { label: 'Expired', class: 'status-expired' }
    };
    
    const config = statusConfig[status] || { label: status, class: 'status-default' };
    return <span className={`status-badge ${config.class}`}>{config.label}</span>;
  };

  const getGradeBadge = (grade) => {
    if (!grade) return null;
    
    const gradeClass = grade === 'A+' ? 'grade-excellent' : 
                      grade === 'A' ? 'grade-good' : 
                      'grade-average';
    
    return <span className={`grade-badge ${gradeClass}`}>{grade}</span>;
  };

  return (
    <div className="dashboard-app-container">
      <div className="component-container">
        <div className="component-header">
          <div className="header-content">
            <div className="header-text">
              <h1>My Certificates</h1>
              <p>View and manage your course completion certificates</p>
            </div>
            <div className="header-stats">
              <div className="stat-card">
                <Award className="stat-icon" />
                <div className="stat-info">
                  <span className="stat-number">{certificates.filter(c => c.status === 'completed').length}</span>
                  <span className="stat-label">Completed</span>
                </div>
              </div>
              <div className="stat-card">
                <Clock className="stat-icon" />
                <div className="stat-info">
                  <span className="stat-number">{certificates.filter(c => c.status === 'in-progress').length}</span>
                  <span className="stat-label">In Progress</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="certificates-controls">
          <div className="search-box">
            <Search className="search-icon" />
            <input
              type="text"
              placeholder="Search certificates..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          
          <div className="filter-controls">
            <Filter className="filter-icon" />
            <select 
              value={filterStatus} 
              onChange={(e) => setFilterStatus(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Certificates</option>
              <option value="completed">Completed</option>
              <option value="in-progress">In Progress</option>
            </select>
          </div>
        </div>

        {/* Certificates Grid */}
        <div className="certificates-grid">
          {filteredCertificates.length === 0 ? (
            <div className="empty-state">
              <Award className="empty-icon" />
              <h3>No certificates found</h3>
              <p>Try adjusting your search or filter criteria</p>
            </div>
          ) : (
            filteredCertificates.map(certificate => (
              <div key={certificate.id} className="certificate-card">
                <div className="certificate-header">
                  <div className="certificate-title">
                    <h3>{certificate.title}</h3>
                    {getStatusBadge(certificate.status)}
                  </div>
                  {getGradeBadge(certificate.grade)}
                </div>

                <div className="certificate-info">
                  <p className="course-name">{certificate.course}</p>
                  
                  <div className="certificate-meta">
                    <div className="meta-item">
                      <Calendar className="meta-icon" />
                      <span>
                        {certificate.issueDate 
                          ? new Date(certificate.issueDate).toLocaleDateString() 
                          : 'In Progress'
                        }
                      </span>
                    </div>
                    <div className="meta-item">
                      <Clock className="meta-icon" />
                      <span>{certificate.duration}</span>
                    </div>
                  </div>

                  {certificate.instructor && (
                    <div className="instructor">
                      <span className="instructor-label">Instructor:</span>
                      <span className="instructor-name">{certificate.instructor}</span>
                    </div>
                  )}

                  {certificate.verificationCode && (
                    <div className="verification">
                      <span className="verification-label">Verification Code:</span>
                      <code className="verification-code">{certificate.verificationCode}</code>
                    </div>
                  )}

                  {certificate.status === 'in-progress' && (
                    <div className="progress-section">
                      <div className="progress-bar">
                        <div 
                          className="progress-fill" 
                          style={{ width: `${certificate.progress}%` }}
                        ></div>
                      </div>
                      <span className="progress-text">{certificate.progress}% Complete</span>
                    </div>
                  )}
                </div>

                <div className="certificate-actions">
                  {certificate.status === 'completed' && (
                    <>
                      <button 
                        className="btn btn-primary"
                        onClick={() => handleView(certificate)}
                      >
                        <Eye size={16} />
                        View
                      </button>
                      <button 
                        className="btn btn-secondary"
                        onClick={() => handleDownload(certificate)}
                      >
                        <Download size={16} />
                        Download
                      </button>
                      <button 
                        className="btn btn-outline"
                        onClick={() => handleShare(certificate)}
                      >
                        <Share2 size={16} />
                        Share
                      </button>
                    </>
                  )}
                  
                  {certificate.status === 'in-progress' && (
                    <button className="btn btn-progress" disabled>
                      Continue Learning
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Certificate Modal */}
        {selectedCertificate && (
          <div className="modal-overlay" onClick={() => setSelectedCertificate(null)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2>{selectedCertificate.title}</h2>
                <button 
                  className="modal-close"
                  onClick={() => setSelectedCertificate(null)}
                >
                  ×
                </button>
              </div>
              <div className="modal-body">
                <div className="certificate-preview">
                  <div className="preview-placeholder">
                    <Award className="preview-icon" />
                    <p>Certificate Preview</p>
                    <span>This would show the actual certificate PDF</span>
                  </div>
                </div>
                <div className="certificate-details">
                  <h4>Certificate Details</h4>
                  <div className="detail-item">
                    <strong>Course:</strong> {selectedCertificate.course}
                  </div>
                  <div className="detail-item">
                    <strong>Issued:</strong> {new Date(selectedCertificate.issueDate).toLocaleDateString()}
                  </div>
                  <div className="detail-item">
                    <strong>Instructor:</strong> {selectedCertificate.instructor}
                  </div>
                  <div className="detail-item">
                    <strong>Verification Code:</strong> 
                    <code>{selectedCertificate.verificationCode}</code>
                  </div>
                </div>
              </div>
              <div className="modal-actions">
                <button 
                  className="btn btn-primary"
                  onClick={() => handleDownload(selectedCertificate)}
                >
                  <Download size={16} />
                  Download PDF
                </button>
                <button 
                  className="btn btn-secondary"
                  onClick={() => handleShare(selectedCertificate)}
                >
                  <Share2 size={16} />
                  Share Certificate
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyCertificates;