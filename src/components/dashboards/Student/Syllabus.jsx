import syllabusData from '../../../data/syllabus.json';
import { useState, useEffect } from 'react';

const Syllabus = () => {
  const [javaFullStack, setJavaFullStack] = useState(null);

  useEffect(() => {
    const javaFS = syllabusData.find(item => item.title === "Java Full Stack");
    setJavaFullStack(javaFS);
  }, []);

  if (!javaFullStack) return <p>Loading syllabus...</p>;

  return (
    <div className="content-page bg-light">
      <div className="m-3">
        <div className="mb-4">
          <h1>{javaFullStack.title}</h1>
          <p>{javaFullStack.description}</p>
        </div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-xl-12 mt-2 col-lg-12 col-md-12">
              <div className="card">
                <div className="card-header">
                  <h5 className="card-title mb-0">Course Syllabus</h5>
                </div>
                <div className="card-body">
                  <div className="accordion accordion-flush" id="accordionFlushExample">
                    {javaFullStack.syllabus.map((topic, idx) => (
                      <div className="accordion-item" key={idx}>
                        <h2 className="accordion-header" id={`flush-heading${idx}`}>
                          <button1
                            className="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target={`#flush-collapse${idx}`}
                            aria-expanded="false"
                            aria-controls={`flush-collapse${idx}`}
                          >
                            <span style={{
                              background: '#4356e2',
                              color: 'white',
                              borderRadius: '50%',
                              padding: '0.5em 1em',
                              marginRight: '1em'
                            }}>
                              {idx + 1}
                            </span>
                            {topic.title}
                          </button1>
                        </h2>
                        <div
                          id={`flush-collapse${idx}`}
                          className="accordion-collapse collapse"
                          data-bs-parent="#accordionFlushExample"
                        >
                          <div className="accordion-body">{topic.description}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Syllabus;
