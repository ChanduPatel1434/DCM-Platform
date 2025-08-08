import { Card, Button, ListGroup, Badge } from 'react-bootstrap';
import { FaTimes } from 'react-icons/fa'; // Add this import for the cross icon

const ProfileSidebar = ({ user, onClose }) => {
    console.log(user);

    return (
        <Card className="mb-4 position-relative">
            {/* Cross icon in top-right corner */}
            <button
                type="button"
                className="btn btn-link position-absolute top-0 end-0 m-2 p-0"
                style={{ fontSize: '1.5rem', lineHeight: '1' }}
                onClick={onClose}
                aria-label="Close"
            >
                <FaTimes />
            </button>
            <Card.Body className="text-center">
                <div className="mb-3">
                    <div className="rounded-circle bg-primary text-white d-inline-block" style={{ width: 60, height: 60, lineHeight: '60px', fontSize: 24 }}>
                        {user?.name?.charAt(0)}
                    </div>
                    <h5 className="mt-2 mb-0">{user?.name}</h5>
                    <small>{user?.email}</small>
                </div>

                <ListGroup variant="flush" className="mb-3 text-start">
                    {user?.role === 'admin' ? (
                        <ListGroup.Item>
                            Role: <strong>Admin</strong> 
                        </ListGroup.Item>
                    ) : (
                        <>
                            <ListGroup.Item>
                                Enrolled Courses: <strong>2</strong>
                            </ListGroup.Item>
                            {user?.role && (
                                <ListGroup.Item>
                                    Next Class: <Badge bg="info">hero</Badge>
                                </ListGroup.Item>
                            )}
                        </>
                    )}
                </ListGroup>

                <div className="d-grid gap-2">
                    <Button to="edit-profile" variant="outline-primary" size="sm">Edit Profile</Button>
                    <Button variant="outline-secondary" size="sm">Settings</Button>
                    <Button variant="outline-danger" size="sm">Logout</Button>
                </div>
            </Card.Body>
        </Card>
    );
};

export default ProfileSidebar;