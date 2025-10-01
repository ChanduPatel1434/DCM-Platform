import React, { useState } from 'react';
import './comment.css';

const CommentsSection = () => {
  // Sample comments data
  const [comments, setComments] = useState([

    {
      id: 1,
      user: {
        name: "Kowsik Reddy",
        avatar: "",
        title: "Python Developer"
      },
      comment: "My journey with DCM began with the intention of upgrading my skills and preparing myself for a successful career in the IT field. The training was highly organized and systematic, guiding us step by step from fundamental concepts .",
   path:'https://maps.app.goo.gl/vsKDkj2MePcWwP2aA'
    },
    
    {
      id: 1,
      user: {
        name: "Nagendra Uggirala",
        avatar: "",
        title: "Web Developer"
      },
      comment: "DCM’s Full Stack Development program completely changed my perspective.Thanks to this training, I was able to successfully transition into IT and start my career as a Full Stack Developer. If you are looking to switch careers or start fresh in IT, DCM is definitely the right place.",
   path:'https://maps.app.goo.gl/vsKDkj2MePcWwP2aA'
    },
    {
      id: 2,
      user: {
        name: `Kranti Reddy`,
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80",
        title: "Data Science"
      },
      comment: `I am very happy to share that I got a job after joining DCM. The training and support provided by the institute played a big role in helping me improve my skills and prepare for interviews. The faculty is knowledgeable, the classes are well-organized,`,
   path:`https://maps.app.goo.gl/HobfGymjDRyPzhLv6`
    },
    {
      id: 3,
      user: {
        name: "Keerthi Ranjani Maddala",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
        title: "Web Developer"
      },
      comment: `I started my training journey with DCM to build a strong foundation in IT. The sessions were designed in a very structured way, starting from the basics and gradually covering advanced topics. The trainers explained every concept clearly with real-world examples, which made the learning process smooth a`,
  path:"https://maps.app.goo.gl/QvDBLxn9TVKUupD28"
    },
    {
      id: 4,
      user: {
        name: "Syed Afran ali",
        avatar: "/img/user-profile-person-svgrepo-com.svg",
        title: "Java Developer"
      },
      comment: `Design Career Metrics is a great platform for freshers. Live Zoom classes, recordings, and regular tasks make learning easy. Trainers are friendly, weekly tests and mock interviews build confidence, and both technical and soft skills are covered. A very useful course to kickstart a career`,
      path:"https://maps.app.goo.gl/bVZnPLameoMXeeTYA"
    },
    {
      id: 5,
      user: {
        name: "Sri Ram Chodisetti",
        avatar: "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80",
        title: "Python Developer"
      },
      comment: `I had a great experience with Design career. The online classes were very interactive, well-organized, and easy to follow.
Overall, It is an excellent choice `,
     path:"https://maps.app.goo.gl/kD5Q1NySVZA6PkXc8"
    },
    {
      id: 5,
      user: {
        name: "Manikanta Nedunuri",
        avatar: "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80",
        title: "Data Analyst"
      },
      comment: `I joined DCM with the goal of upgrading my skills and building a career in the IT domain. The training experience was very structured .The faculty explained every concept from`,
      path:`https://maps.app.goo.gl/WFgmrJRJTEaaBLfn9`
     
    },
    {
      id: 5,
      user: {
        name: `Kiran K`,
        avatar: "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80",
        title: "AI & ML"
      },
      comment: `I joined DCM with the goal of upgrading my skills and building a career in the IT domain. The training experience was very structured .The faculty explained every concept from fundamentals to advanced level in a way that was easy to understand, even for beginners.`,
      path:`https://maps.app.goo.gl/VSkM8vnf39ohkYjSA`
     
    }
  ]);

  return (
    <section className="comments-section">
     <div className='section-header'>
      <h2 className='p-0 m-0'>Comments</h2>
     </div>
      
        <div className="comments-container">
          <div className="comments-scroll">
            {comments.map(comment => (
              <div key={comment.id} className="comment-card">
                <div className="comment-header">
                  <div className="user-avatar">
                    <img src='/img/user-profile-person-svgrepo-com.svg' alt={comment.user.name} />
                  </div>
                  <div className="user-info">
                    <h4 className="user-name">{comment.user.name}</h4>
                    <p className="user-title">{comment.user.title}</p>
                  </div>
                </div>
                <div className="comment-content">
                  <p className="comment-text">"{comment.comment}"</p>
                </div>
                <div className="comment-footer">
                  <a href={comment.path} target='_blank' className="comment-time">Click</a>
                  <div className="comment-likes">
                    <span className="like-icon">❤️</span>
                  
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
         <div className="view-all-container">
                <a href='https://www.google.com/maps/place/Design+Career+Metrics+Pvt+Ltd/@17.4469738,78.3836392,17z/data=!4m18!1m9!3m8!1s0x3bcb910838be5b35:0xfa8c53166a450046!2sDesign+Career+Metrics+Pvt+Ltd!8m2!3d17.4469687!4d78.3862141!9m1!1b1!16s%2Fg%2F11xtk22k_8!3m7!1s0x3bcb910838be5b35:0xfa8c53166a450046!8m2!3d17.4469687!4d78.3862141!9m1!1b1!16s%2Fg%2F11xtk22k_8?entry=ttu&g_ep=EgoyMDI1MDkxNS4wIKXMDSoASAFQAw%3D%3D' target="_blank">
                
                  <button className="view-all-btn">View All Comments</button>
                </a>
                </div>
        
       

    </section>
  );
};

export default CommentsSection;