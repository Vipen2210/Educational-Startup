import React from "react";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { isCurrentUserAdmin } from "../widgets/IsCurrentUserAdmin";
import AddTimeSlotOfLiveQuiz from "../admin/components_admin/AddTimeSlotOfLiveQuiz.jsx";
import { db } from "../firebase";
import LiveQuizBookDecoration from "./LiveQuizBookDecoration";

const LiveQuizBook = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const history = useHistory();
  const [buttonPressed, setButtonPressed] = useState(false);
  const { currentUser } = useAuth();
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    isCurrentUserAdmin({ setIsAdmin, currentUser });
  }, [currentUser]);
  const { id } = useParams();

  const handleAddSlot = () => {
    setButtonPressed(!buttonPressed);
  };

  useEffect(() => {
    const getEvents = () => {
      db.collection("LiveQuiz")
        .doc(id)
        .collection("TimeSlots")
        .onSnapshot((snapshot) => {
          setPosts(
            snapshot.docs.map((doc) => ({
              hello:doc.id,
              post: doc.data(),
            }))
          );
        });
    };
    getEvents();
    return () => {
      setPosts({}); // This worked for me
    };
  }, []);

  return (
    <>
      <div>
        {currentUser && isAdmin && (
          <Button
            className="mb-3 mt-3 ms-3 me-3"
            variant="warning"
            onClick={handleAddSlot}
          >
            Add time slot
          </Button>
        )}
      </div>
    
      {buttonPressed ? (
        <AddTimeSlotOfLiveQuiz id={id} />
      ) : (
        <>
        <div className="cardDeck">
          {posts.map(({hello, post }) => (
           <LiveQuizBookDecoration  
            id={hello}
           />
          ))}
        </div>
        </>
      )}
    </>
  );
};

export default LiveQuizBook;
