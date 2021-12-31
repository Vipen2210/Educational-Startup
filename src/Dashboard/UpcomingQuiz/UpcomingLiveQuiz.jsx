import React, { useState, useEffect } from "react";
import "./UpcomingQuiz.css";
import { db } from "../../firebase";
import { useAuth } from "../../contexts/AuthContext";
import { Button } from "react-bootstrap";
import LoadingData from "../../widgets/LoadingData";

const UpcomingLiveQuiz = (props) => {
  const { currentUser } = useAuth();
  const [quiz, setQuiz] = useState("");
  const [quizSlot, setQuizSlot] = useState("");
  const [isInvigilator, setIsInvigilator] = useState(false);
  const [joiningLink, setJoiningLink] = useState("");

  useEffect(() => {
    const getQuiz = () => {
      db.collection("LiveQuiz")
        .doc(props.liveQuizId)
        .get()
        .then((snapshot) => setQuiz(snapshot.data()));
    };
    const getQuizDetails = () => {
      db.collection("LiveQuiz")
        .doc(props.liveQuizId)
        .collection("TimeSlots")
        .doc(props.quizId)
        .get()
        .then((snapshot) => setQuizSlot(snapshot.data()));
    };

    getQuiz();
    getQuizDetails();
  }, [currentUser.email, props.liveQuizId, props.quizId]);


  useEffect(() => {
    console.log(quiz);
    console.log(quizSlot);
    if (quizSlot && quizSlot !== "" && currentUser.email === quizSlot.invigilatorEmailId) {
      setIsInvigilator(true);
    }
  }, [quizSlot]);
  return (
    <>
      {quiz !== "" ? (
        <div className="upcoming-quiz-container">
          <div>
            <img
              className="upcoming-quiz-image"
              src={quiz.imageUrl}
              alt="Quiz"
            />
          </div>
          <div className="upcoming-quiz-details">
            <h1 style={{ textAlign: "center" }}> {quiz.quizTopic}</h1>
           {quizSlot &&
            <p style={{ textAlign: "center" }}>
              Date: {quizSlot.date}-{quizSlot.month + 1}-{quizSlot.year} at ⌚
              {quizSlot.hours}:{quizSlot.minutes}
            </p>}
            <br />
            {quizSlot ? (quizSlot.joiningLink === "" ? (
              <Button variant="warning" backgroundColor="#25513b">
                Joining link will be availabe 1hour before the quiz.
              </Button>
            ) : (
              <Button
                variant="primary"
                backgroundColor="#25513b"
                onClick={(e) => {
                  e.preventDefault();
                  window.location.href = quizSlot.joiningLink;
                }}
              >
                Join Now! 👈🏽
              </Button>
            )
            ):<Button
            variant="primary"
            backgroundColor="#25513b"
            onClick={(e) => {
              e.preventDefault();
              window.location.href = quizSlot.joiningLink;
            }}
          >
            Quiz passed
          </Button>}
            <div className="invigilator-container">
              {isInvigilator && (
                <>
                  <input
                    className="mb-3"
                    type="text"
                    placeholder="Add Link ..."
                    value={joiningLink}
                    onChange={(event) => setJoiningLink(event.target.value)}
                  />
                  <Button
                    className="ms-3"
                    variant="danger"
                    backgroundColor="#25513b"
                    onClick={(e) => {
                      e.preventDefault();
                      db.collection("LiveQuiz")
                        .doc(props.liveQuizId)
                        .collection("TimeSlots")
                        .doc(props.quizId)
                        .update({
                          joiningLink: joiningLink,
                        });
                        setJoiningLink('');
                    }}
                  >
                    Add meet link🖊
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      ) : (
        <LoadingData />
      )}
    </>
  );
};

export default UpcomingLiveQuiz;
