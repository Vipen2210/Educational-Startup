import React from "react";
// import "./course.css";

const CourseHome = () => {
  return (
    <div>
      {/* <video src=""> */}
      <iframe
        src="https://www.youtube.com/embed/wPhIfB-p588"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="youtubeShower"
      ></iframe>
      {/* </video> */}
    </div>
  );
};

export default CourseHome;
