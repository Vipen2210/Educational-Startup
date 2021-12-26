import DateTimePicker from "react-datetime-picker";
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { db, storage } from "../../firebase";

const AddEvent = (props) => {
  const history = useHistory();
  const [caption, setCaption] = useState("");
  const [eventName, setEventName] = useState("");
  const [guestName, setGuestName] = useState("");
  const [tag, setTag] = useState("");
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);
  const [value, onChange] = useState(new Date());

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    const uploadTask = storage.ref(`EventImages/${image.name}`).put(image);
    props.setOpen(true);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // progress function...
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
        progress === 100 && history.push("/events");
      },
      (error) => {
        // Error Function
        alert(error.message);
      },
      () => {
        // db functinality
        storage
          .ref("EventImages")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            // post inside the db
            db.collection("Events").doc("tags").collection(tag).add({
              createdAt: new Date().getTime(),
              caption: caption,
              eventName: eventName,
              imageUrl: url,
              guestName: guestName,
              tag: tag,
              date: value.getDate(),
              month: value.getMonth(),
              year: value.getFullYear(),
              hours: value.getHours(),
              minutes: value.getMinutes(),
              time: value.toString(),
              youtubeLink: "",
            });
            db.collection("Events")
              .doc("tags")
              .collection("tagNames")
              .doc(tag)
              .set({});
            setProgress(0);
            setCaption("");
            setEventName("");
            setImage(null);
          });
      }
    );
  };
  return (
    <>
      <div className="imageupload">
        <h2 className="text-center">Add Event</h2>
        <progress
          className="imageupload__progress mb-3"
          value={progress}
          max="100"
        />
        <input
          className="mb-3"
          type="text"
          placeholder="Enter Event Name..."
          value={eventName}
          onChange={(event) => setEventName(event.target.value)}
        />
        <input
          className="mb-3"
          type="text"
          placeholder="Enter Guest name"
          value={guestName}
          onChange={(event) => setGuestName(event.target.value)}
        />
        <input
          className="mb-3"
          type="text"
          placeholder="Enter a Caption..."
          value={caption}
          onChange={(event) => setCaption(event.target.value)}
        />
        <input
          className="mb-3"
          type="text"
          placeholder="Give a Tag..."
          value={tag}
          onChange={(event) => setTag(event.target.value)}
        />
        <div className="mb-3">
          <DateTimePicker onChange={onChange} value={value} />
        </div>
        <input className="mb-3" type="file" onChange={handleChange} />
        <Button variant="success" onClick={handleUpload}>Add </Button>
      </div>
    </>
  );
};

export default AddEvent;
