import { motion } from "framer-motion";
import { BookOpen, Calendar, Clock, Play, TrendingUp, Video } from "lucide-react";
import { Button, Badge, ProgressBar } from 'react-bootstrap';
import { useNavigate } from "react-router";
import DashboardCards from "../Extras/MoreStatCard";
import { useSelector } from "react-redux";

export default function MaybeDashboard() {
  const {user,enrolledcourses}=useSelector(state=>state.auth)
  console.log(enrolledcourses)
  const navigate = useNavigate();
  const enrollments = [];
  const upcomingMeetings = [];

  return (
    <div className="min-h-screen " >



      {/* Main Content */}
      <div className="pt-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Welcome Section */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Welcome back, <span className="gradient-text">{user.name || "Learner"}</span>!
            </h1>
            <p className="text-xl text-muted-foreground fs-5 text-dark mb-3 ">
              Continue your learning journey and track your progress
            </p>
          </motion.div>

          {/* Stats Cards */}
       <DashboardCards/>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* My Courses */}
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              <div className="card gradient-mesh-card rounded-5 p-4">
                <div className="pb-2">
                  <h4 className="card-title flex items-center space-x-2">
                    <BookOpen className="h-5 w-5" />
                    <span>My Courses</span>
                  </h4>
                  <p className="card-text text-sm text-muted-foreground">
                    Continue learning from where you left off
                  </p>
                </div>
                <div className="space-y-4">
                  {enrollments?.slice(0, 3).map((enrollment) => (
                    <div key={enrollment._id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium line-clamp-1">
                          {enrollment.course?.title}
                        </h4>
                        <Badge variant="outline" className="text-xs">
                          {enrollment.progress}%
                        </Badge>
                      </div>
                      <ProgressBar now={enrollment.progress} className="h-2" />
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>{enrollment.completedLessons.length} lessons completed</span>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => navigate(`mycourse/${enrollment.courseId}`)}
                        >
                          Continue
                          <Play className="ml-1 h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))}

                  {!enrollments?.length && (
                    <div className="text-center py-8">
                      <BookOpen className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                      <p className="text-muted-foreground mb-4">No courses enrolled yet</p>
                      <Button
                        onClick={() => navigate("allcourses")}
                        className="gradient-mesh text-white border-0"
                      >
                        Browse Courses
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Upcoming Meetings */}
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <div className="card gradient-mesh-card rounded-5 border-0 p-4">
                <div className="pb-2">
                  <h4 className="card-title flex items-center space-x-2">
                    <Calendar className="h-5 w-5" />
                    <span>Upcoming Meetings</span>
                  </h4>
                  <p className="card-text text-sm text-muted-foreground">
                    Join your scheduled live sessions
                  </p>
                </div>
                <div className="space-y-4">
                  {upcomingMeetings?.slice(0, 3).map((meeting) => (
                    <div
                      key={meeting._id}
                      className="flex items-center justify-between p-3 rounded-lg bg-background/50"
                    >
                      <div className="space-y-1">
                        <h4 className="font-medium line-clamp-1">{meeting.title}</h4>
                        <p className="text-sm text-muted-foreground">
                          {meeting.course?.title}
                        </p>
                        <div className="flex items-center space-x-2 text-xs text-muted-foreground">

                          <Clock className="h-3 w-3" />
                          <span>{new Date(meeting.scheduledAt).toLocaleString()}</span>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        onClick={() => navigate(`/meeting/${meeting._id}`)}
                        className="gradient-mesh text-white border-0"
                      >
                        Join
                      </Button>
                    </div>
                  ))}

                  {!upcomingMeetings?.length && (
                    <div className="text-center py-8">
                      <Video className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                      <p className="text-muted-foreground">No upcoming meetings</p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

