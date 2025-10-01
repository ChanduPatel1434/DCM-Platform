import { motion } from "framer-motion";
import { BookOpen, Video, TrendingUp } from "lucide-react";

const cardData = [
  {
    title: "Enrolled Courses",
    icon: BookOpen,
    value: (enrollments) => enrollments?.length || 0,
    subtitle: "Active learning paths",
  },
  {
    title: "Upcoming Meetings",
    icon: Video,
    value: (_, upcomingMeetings) => upcomingMeetings?.length || 0,
    subtitle: "Live sessions scheduled",
  },
  {
    title: "Average Progress",
    icon: TrendingUp,
    value: (enrollments) =>
      enrollments?.length
        ? Math.round(
            enrollments.reduce((acc, e) => acc + e.progress, 0) /
              enrollments.length
          )
        : 0,
    suffix: "%",
    subtitle: "Across all courses",
  },
];

export default function DashboardCards({ enrollments, upcomingMeetings }) {
  return (
<motion.div
  initial={{ y: 50, opacity: 0 }}
  animate={{ y: 0, opacity: 1 }}
  transition={{ delay: 0.2, duration: 0.8 }}
 
>
  {cardData.map((card, index) => {
    const Icon = card.icon;
    const value = card.value(enrollments, upcomingMeetings);
    return (
     <div className="col-md-4">
       <div
        key={index}
        className="gradient-mesh-card border-0 p-4 rounded-5 shadow-sm w-full md:w-[32%] card col-md-12"
      >
        <div className="flex flex-row items-center justify-between pb-2">
          <h4 className="text-sm font-medium">{card.title}</h4>
          <Icon className="h-4 w-4 text-muted-foreground" />
        </div>
        <div>
          <div className="text-2xl font-bold gradient-text">
            {value}
            {card.suffix || ""}
          </div>
          <p className="text-xs text-muted-foreground">{card.subtitle}</p>
        </div>
      </div>
     </div>
    );
  })}
</motion.div>
  );
}