import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import { useAuth } from "../../contexts/AuthContext";
import UpcomingLiveQuiz from "./UpcomingLiveQuiz";

const UpcomingLiveQuizes = () => {
  const [posts, setPosts] = useState([]);
  const { currentUser} = useAuth()

  useEffect(() => {
    const getEvents = () => {
      db.collection("Dashboard").doc(currentUser.email).collection("RegisteredLiveQuiz")
        .onSnapshot((snapshot) => {
          setPosts(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              post: doc.data(),
            }))
          );
        });
    };
    getEvents();
    return () => {
      setPosts({}); // This worked for me
    };
  }, [currentUser.email]);

  return (
    <>
     <div className="EventQuestion">
        <p className="EventparaQuestion">
          <span className="EventQspan">Upcoming</span> Quizes
        </p>
      </div>
      {posts.length>0 ? (
        <>
          <div className="cardDeck">
            {posts.map(({ id, post }) => (
              <UpcomingLiveQuiz 
                key={id}
                liveQuizId={post.liveQuizId}
                quizId={post.quizId}
              />
            ))}
          </div>
        </>
      ) : (
        <div>
          <img className="EmptyImage" src="https://www.eazydiner.com/images/no-upcoming-events-banner.svg" alt="Nothing added yet!" />
        </div>
      )}
    </>
  );
}

export default UpcomingLiveQuizes
