import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';

const WelcomeScreen = () => {
    const{user}=useSelector(state=>state.auth)
  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
      
    >
      <h1 className="text-dark">
        Welcome back, <span className="gradient-text">{user?.name || "Learner"}</span>!
      </h1>
     {user.role==='student'&&(
         <p className="text-dark">
        Continue your learning journey and track your progress
      </p>
     )}
    </motion.div>
  );
};

export default WelcomeScreen;