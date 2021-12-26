import React,{useState,useEffect} from "react";
import { Card ,Button} from "react-bootstrap";
import "./LiveQuiz.css";
import { useAuth } from "../contexts/AuthContext";
import { isCurrentUserAdmin } from "../widgets/IsCurrentUserAdmin";
import { db, storage } from "../firebase";
import { useHistory } from "react-router-dom";


function LiveQuizDecoration(props) {
    const [isAdmin,setIsAdmin] = useState(false);
    const history = useHistory();
    const { currentUser } = useAuth();
  useEffect(() => {
    isCurrentUserAdmin({setIsAdmin,currentUser});
  }, [currentUser])

  const handleDelete = () => {
    let imageRef = storage.refFromURL(props.imageUrl);
    imageRef
      .delete()
      .then(() => {
        console.log("Deleted");
      })
      .catch((err) => console.log(err));
    db.collection("LiveQuiz")
      .doc(props.id)
      .delete();
    // const refe = db
    //   .collection("Events")
    //   .doc("tags")
    //   .collection(tag)
    //   .doc(eventId)
    //   .collection("Emails");
    //   refe
    //   .get()
    //   .then((res) => {
    //     res.forEach((element) => {
    //       element.ref.delete();
    //     });
    //   });
    //   // deleting the user personal registered events
    //   db.collection("Dashboard").doc(currentUser.email).collection("RegisteredEvents").doc(eventId).delete();
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
          <Card.Title>{props.quizTopic}</Card.Title>
          <img className="live-quiz-imagedecor" src={props.imageUrl} alt="Quiz imagess" />
          <Card.Text>{props.caption}</Card.Text>
          <Button variant="success" onClick={handleBook}>Choose your slot!</Button>
          {currentUser && isAdmin && (
          <Button className="ms-3" variant="danger" onClick={handleDelete}>Delete</Button>
        )}
        </Card.Body>
      </Card>
    </div>
  );
}

export default LiveQuizDecoration;
