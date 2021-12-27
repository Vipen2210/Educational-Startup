import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import "../Events/Events.css";
// import { Button } from "react-bootstrap";
import LiveQuizDecoration from "./LiveQuizDecoration";
import LoadingData from "../widgets/LoadingData";

export default function LiveQuiz() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const getEvents = () => {
      db.collection("LiveQuiz")
        .orderBy("createdAt", "desc")
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
  }, []);


  return (
    <>
    {posts.length <= 0 ? <LoadingData/> : <>
    
    {posts.length !== 0 ? (
      <>
        <div className="cardDeck">
          {posts.map(({ id, post }) => (
            <LiveQuizDecoration 
            id={id}
            caption={post.caption}
            imageUrl={post.imageUrl}
            quizTopic={post.quizTopic}
            ></LiveQuizDecoration>
          ))}
        </div>
      </>
    ) : (
      <div>
        <img
          className="EmptyImage"
          src="https://www.eazydiner.com/images/no-upcoming-events-banner.svg"
          alt="Nothing added yet!"
        />
      </div>
    )}
    </>
    }
      
    </>
  );
}
