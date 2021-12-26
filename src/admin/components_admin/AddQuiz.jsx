import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { db, storage } from "../../firebase";

const AddQuiz = (props) => {
  const history = useHistory();
  const [caption, setCaption] = useState("");
  const [quizTopic, setQuizTopic] = useState("");
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    const uploadTask = storage.ref(`QuizImages/${image.name}`).put(image);
    props.setOpen(true);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // progress function...
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
        progress === 100 && history.push("/liveQuiz");
      },
      (error) => {
        // Error Function
        alert(error.message);
      },
      () => {
        // db functinality
        storage
          .ref("QuizImages")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            // post inside the db
            db.collection("LiveQuiz").add({
              caption: caption,
              quizTopic: quizTopic,
              imageUrl: url,
              createdAt: new Date(),
            });
            setProgress(0);
            setCaption("");
            setQuizTopic("");
            setImage(null);
          });
      }
    );
  };
  return (
    <>
      <div className="imageupload">
        <h2 className="text-center">Add Quiz</h2>
        <progress
          className="imageupload__progress mb-3"
          value={progress}
          max="100"
        />
        <input
          className="mb-3"
          type="text"
          placeholder="Enter Quiz topic ..."
          value={quizTopic}
          onChange={(event) => setQuizTopic(event.target.value)}
        />
        <input
          className="mb-3"
          type="text"
          placeholder="Enter a Caption ..."
          value={caption}
          onChange={(event) => setCaption(event.target.value)}
        />
        <input className="mb-3" type="file" onChange={handleChange} />
        <Button variant="danger" onClick={handleUpload}>Add </Button>
      </div>
    </>
  );
};

export default AddQuiz;