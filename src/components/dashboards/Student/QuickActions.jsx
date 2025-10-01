import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { 
  Video, 
  Calendar, 
  PlayCircle, 
  UserCheck, 
  FileText, 
  MessageSquare, 
  Award, 
  ArrowRight 
} from "lucide-react";

const QuickActionCards = () => {
  const navigate = useNavigate();

  const quickActions = [
    {
      id: 1,
      title: "Join Live Class",
      description: "Attend your scheduled live sessions",
      icon: "video",
      buttonText: "Join Now",
      onClick: () => navigate("live-session")
    },
    {
      id: 2,
      title: "Upcoming Classes",
      description: "View your class schedule",
      icon: "calendar",
      buttonText: "View Schedule",
      onClick: () => navigate("live-session")
    },
    {
      id: 4,
      title: "Book 1-on-1 Session",
      description: "Get personalized attention",
      icon: "user-check",
      buttonText: "Book Now",
      onClick: () => navigate("book-session")
    },
    {
      id: 5,
      title: "Class Resources",
      description: "Download materials & assignments",
      icon: "file-text",
      buttonText: "Access Resources",
      onClick: () => navigate("/resources")
    },
    {
      id: 6,
      title: "Ask Questions",
      description: "Get help from instructors",
      icon: "message-square",
      buttonText: "Ask Now",
      onClick: () => navigate("/questions")
    },
    {
      id: 7,
      title: "My Certificates",
      description: "View your completed course certificates",
      icon: "award", 
      buttonText: "View Certificates",
      onClick: () => navigate("/certificates")
    }
  ];

  return (
    <div className="quick-actions-section">
      <h3 className="section-title ">Quick Actions</h3>
      <p className="section-subtitle">Manage your live class experience</p>
      
      <div className="quick-actions-grid">
        {quickActions.map((action, index) => (
          <QuickActionCard 
            key={action.id} 
            action={action} 
            index={index} 
          />
        ))}
      </div>
    </div>
  );
};

// Quick Action Card Component
const QuickActionCard = ({ action, index }) => {
  const renderIcon = () => {
    const iconProps = { size: 24 };
    
    switch(action.icon) {
      case "video":
        return <Video {...iconProps} />;
      case "calendar":
        return <Calendar {...iconProps} />;
      case "play-circle":
        return <PlayCircle {...iconProps} />;
      case "user-check":
        return <UserCheck {...iconProps} />;
      case "file-text":
        return <FileText {...iconProps} />;
      case "message-square":
        return <MessageSquare {...iconProps} />;
      case "award":
        return <Award {...iconProps} />;
      default:
        return <Video {...iconProps} />;
    }
  };

  const getIconClass = () => {
    switch(action.icon) {
      case "video":
        return "live-class";
      case "calendar":
        return "schedule";
      case "play-circle":
        return "recordings";
      case "user-check":
        return "one-on-one";
      case "file-text":
        return "resources";
      case "message-square":
        return "questions";
      case "award":
        return "certificates";
      default:
        return "live-class";
    }
  };

  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
    >
      <div className="action-card">
        <div className={`card-icon ${getIconClass()}`}>
          {renderIcon()}
        </div>
        <div className="card-content">
          <h4>{action.title}</h4>
          <p>{action.description}</p>
        </div>
        <button 
          className="action-btn"
          onClick={action.onClick}
        >
          {action.buttonText}
          <ArrowRight size={16} />
        </button>
      </div>
    </motion.div>
  );
};

export default QuickActionCards;