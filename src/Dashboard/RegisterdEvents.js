import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import "../Events/Events.css";
import RegisterdEvent from "./RegisterdEvent";
import { useAuth } from "../contexts/AuthContext";

const RegisterdEvents = () => {
  const [posts, setPosts] = useState([]);
  const { currentUser} = useAuth()

  useEffect(() => {
    const getEvents = () => {
      db.collection("Dashboard").doc(currentUser.email).collection("RegisteredEvents")
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
          <span className="EventQspan">Registered</span> Events
        </p>
      </div>
      {posts.length>0 ? (
        <>
          <div className="cardDeck">
            {posts.map(({ id, post }) => (
              <RegisterdEvent
              key={id}
              eventId={id}
              eventName={post.eventName}
              guestName={post.guestName}
              imageUrl={post.imageUrl}
              time={post.time}
              tag={post.tag}
              date={post.date}
              month={post.month}
              year={post.year}
              hours={post.hours}
              minutes={post.minutes}
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

export default RegisterdEvents
