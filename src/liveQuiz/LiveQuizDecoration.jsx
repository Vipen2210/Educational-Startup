import React, { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import "./LiveQuiz.css";
import { useAuth } from "../contexts/AuthContext";
import { isCurrentUserAdmin } from "../widgets/IsCurrentUserAdmin";
import { db, storage } from "../firebase";
import { useHistory } from "react-router-dom";

function LiveQuizDecoration(props) {
  const [isAdmin, setIsAdmin] = useState(false);
  const history = useHistory();
  const { currentUser } = useAuth();
  const [registered, setRegistered] = useState(false);

  useEffect(() => {
    if (currentUser) {
      db.collection("Dashboard")
        .doc(currentUser.email)
        .collection("RegisteredLiveQuiz")
        .get()
        .then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            // doc.data() is never undefined for query doc snapshots
            if (doc.id === props.id) {
              setRegistered(true);
            }
          });
        });
    }
    return () => {
      setRegistered(false);
    };
  }, [currentUser]);
  useEffect(() => {
    isCurrentUserAdmin({ setIsAdmin, currentUser });
  }, [currentUser]);
  const handleDelete = () => {
    let imageRef = storage.refFromURL(props.imageUrl);
    imageRef
      .delete()
      .then(() => {
        console.log("Deleted");
      })
      .catch((err) => console.log(err));
    db.collection("LiveQuiz").doc(props.id).delete();
    const refe = db
      .collection("LiveQuiz")
      .doc(props.id)
      .collection("TimeSlots");
    refe.get().then((res) => {
      res.forEach((element) => {
        element.ref.delete();
      });
    });
    refe.get().then((res) => {
      res.forEach((element) => {
        const emailRefer = db.collection("LiveQuiz").doc(props.id).collection("TimeSlots").doc(element.id).collection("Emails");
        emailRefer.get().then((res) => {
          res.forEach((element) => {
            element.ref.delete();
          });
        });
      });
    });
    // deleting the user personal registered events
    db.collection("Dashboard")
      .doc(currentUser.email)
      .collection("RegisteredLiveQuiz")
      .doc(props.id)
      .delete();
  };
  const handleBook = () => {
    if (currentUser) {
      history.push(`/liveQuiz/${props.id}`);
    } else {
      history.push(`/signup`);
    }
  };
  return (
    <div className="live-quiz-container">
      <Card style={{ width: "18rem" }}>
        <Card.Body>
          <Card.Title style={{ textAlign: "center" }}>
            {props.quizTopic}
          </Card.Title>
          <img
            className="live-quiz-imagedecor"
            src={props.imageUrl}
            alt="Quiz imagess"
          />
          <Card.Text>{props.caption}</Card.Text>

          {registered ? (
            <Button variant="dark">Quiz details</Button>
          ) : (
            <Button variant="success" onClick={handleBook}>
              Choose your slot!
            </Button>
          )}

          {currentUser && isAdmin && (
            <Button className="ms-3" variant="danger" onClick={handleDelete}>
              Delete
            </Button>
          )}
        </Card.Body>
      </Card>
    </div>
  );
}

export default LiveQuizDecoration;
