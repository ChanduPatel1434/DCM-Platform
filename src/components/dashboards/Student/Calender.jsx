import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Alert } from 'react-bootstrap';
import Countdown from 'react-countdown';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import data from '../../../data/calendardata.json';

const Calendar = () => {
  const [user, setUser] = useState({});
  const [classes, setClasses] = useState([]);
  const [upcomingClasses, setUpcomingClasses] = useState([]);

  useEffect(() => {
    setUser(data.user);
    setClasses(data.classes);

    const now = new Date();
    const filtered = data.classes.filter(c => new Date(c.startTime) > now);
    
    setUpcomingClasses(filtered);
  }, []);

  return (
    <div className="content-page bg-light">
      <Container className="mt-4">
        {/* Welcome Message */}
        <Row className="mb-4">
          <Col>
            <h4>Welcome back, {user?.name} 👋</h4>
            {upcomingClasses.length > 0 && (
              <Alert variant="info">
                🎓 Your next class: <strong>{upcomingClasses[0].title}</strong> at{' '}
                {new Date(upcomingClasses[0].startTime).toLocaleTimeString()}
              </Alert>
            )} 
          </Col>
        </Row>

        {/* Live Class Cards */}
        <Row className="mb-4">
          <Col md={8}>
            {upcomingClasses.map((cls) => (
              <Card key={cls.id} className="mb-4">
                <Card.Body>
                  <Card.Title>{cls.title}</Card.Title>
                  <Card.Text>
                    Instructor: {cls.instructor} <br />
                    Starts at: {new Date(cls.startTime).toLocaleString()}
                  </Card.Text>
                  <div>
                    <strong>Countdown: </strong>
                    <Countdown date={new Date(cls.startTime)} />
                  </div>
                  <Button
                    className="mt-3"
                    href={cls.zoomLink}
                    target="_blank"
                    disabled={new Date() < new Date(cls.startTime)}
                  >
                    Join Live Class
                  </Button>
                </Card.Body>
              </Card>
            ))}
          </Col>

          {/* Notifications */}
          <Col md={4}>
            <Card>
              <Card.Header>🔔 Notifications</Card.Header>
              <Card.Body>
                {upcomingClasses.slice(0, 2).map((cls) => (
                  <Alert key={cls.id} variant="success">
                    Don't forget: <strong>{cls.title}</strong> today at{' '}
                    {new Date(cls.startTime).toLocaleTimeString()}
                  </Alert>
                ))}
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Class Schedule Calendar */}
        <Row>
          <Col>
            <Card>
              <Card.Header>📅 Class Schedule</Card.Header>
              <Card.Body>
                <FullCalendar
                  plugins={[dayGridPlugin]}
                  initialView="dayGridMonth"
                  events={classes.map(cls => ({
                    title: cls.title,
                    date: cls.startTime
                  }))}
                />
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Past Classes */}
        <Row className="mt-4">
          <Col>
            <h5>📚 Past Classes</h5>
            <ul>
              {classes
                .filter(c => new Date(c.startTime) < new Date())
                .map((c) => (
                  <li key={c.id}>
                    {c.title} — {new Date(c.startTime).toLocaleDateString()}{' '}
                    <a href={c.recordingLink}>▶ Watch Replay</a>
                  </li>
                ))}
            </ul>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Calendar;