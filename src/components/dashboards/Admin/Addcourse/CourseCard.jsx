const CourseCard = ({ course, onEdit, onDelete, onView }) => {
  const { name, description, instructor, duration, price,_id } = course;

  return (
    <div className="card mb-3 shadow-sm">
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <h6 className="card-subtitle mb-2 text-muted">Instructor: {instructor}</h6>
        <p className="card-text">
          {description}
          <br />
          <strong>Duration:</strong> {duration}
          <br />
          <strong>Price:</strong> ₹{price}
        </p>
        <div className="d-flex justify-content-end gap-2">
          <button className=" primary-solid-btn" onClick={() => onView(course)}>View Details</button>
          <button className="secondary-solid-btn" onClick={() => onEdit(course)}>Edit</button>
          <button className="accent-solid-btn" onClick={() => onDelete(course._id)}>Delete</button>
        </div>
      </div>
    </div>
  );
};
export default CourseCard