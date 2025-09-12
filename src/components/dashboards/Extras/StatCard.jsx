
import { motion } from "framer-motion";

const SmallStatCard = ({ icon, label, count, color, delay = 0 }) => (
  <motion.div
    className="card  shadow-sm border-2 text-center p-2"
    style={{
      borderRadius: "12px",
      minHeight: "130px",
      background: "linear-gradient(to bottom, #ffffff, #f8f9fa)",
    }}
    initial={{ opacity: 0, y: 15, scale: 0.95 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    transition={{
      duration: 0.4,
      delay,
      ease: "easeOut",
    }}
    whileHover={{
      scale: 1.05,
      boxShadow: "0 6px 15px rgba(0,0,0,0.15)",
    }}
  >
    <div className="fs-3 mb-1">{icon}</div>
    <div className="small text-muted">{label}</div>
    <div className={`fw-bold text-${color}`}>{count}</div>
  </motion.div>
);

export default SmallStatCard;