import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { db } from "../../firebase";
import DateTimePicker from "react-datetime-picker";

const AddTimeSlotOfLiveQuiz = (props) => {
  const [caption, setCaption] = useState("");
  const [quizTopic, setQuizTopic] = useState("");
  const [progress, setProgress] = useState(0);
  const [value, onChange] = useState(new Date());

  const handleUpload = () => {
    db.collection("LiveQuiz").doc(props.id).collection("TimeSlots").add({
      seats: caption,
      invigilatorEmailId: quizTopic,
      createdAt: new Date(),
      date: value.getDate(),
      month: value.getMonth(),
      year: value.getFullYear(),
      hours: value.getHours(),
      minutes: value.getMinutes(),
      time: value.toString(),
    });
    setProgress(0);
    setCaption("");
    setQuizTopic("");
  };
  return (
    <>
      <div className="imageupload">
        <h2 className="text-center">Add Time Slot Details</h2>
        <progress
          className="imageupload__progress mb-3"
          value={progress}
          max="100"
        />
        <input
          className="mb-3"
          type="text"
          placeholder="Enter Invigilator Email Id ..."
          value={quizTopic}
          onChange={(event) => setQuizTopic(event.target.value)}
        />
        <input
          className="mb-3"
          type="text"
          placeholder="Enter Number of Seats ..."
          value={caption}
          onChange={(event) => setCaption(event.target.value)}
        />
        <div className="mb-3">
          <DateTimePicker onChange={onChange} value={value} />
        </div>
        <Button variant="warning" onClick={handleUpload}>
          Add{" "}
        </Button>
      </div>
    </>
  );
};

export default AddTimeSlotOfLiveQuiz;
