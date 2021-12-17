import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import Event from "./Event";
import "./Events.css";
import { useAuth } from "../contexts/AuthContext";
import { Backdrop, CircularProgress } from "@mui/material";
import { Button } from "react-bootstrap";
import AlertConfirmationBox from "../widgets/AlertConfirmationBox";

export default function EventsHome() {
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = React.useState(true);
  const [tag, setTag] = useState("BestSeller");
  const [tags, setTags] = useState([]);
  const { currentUser } = useAuth();

  useEffect(() => {
    const val = localStorage.getItem("tag");
    setTag(val === null ? "BestSeller" : val);

    const getEvents = () => {
      db.collection("Events")
        .doc("tags")
        .collection(tag)
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
    const getTags = () => {
      db.collection("Events")
        .doc("tags")
        .collection("tagNames")
        .onSnapshot((snapshot) => {
          setTags(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              post: doc.data(),
            }))
          );
        });
    };
    getTags();
    getEvents();
    return () => {
      setPosts({}); // This worked for me
      setTags({});
    };
  }, [tag]);
  const handleClose = () => {
    setOpen(false);
  };
  const handleTags = (id) => {
    localStorage.setItem("tag", id);
    setTag(id);
  };

  const handleDeleteTag = (id) => {
    db.collection("Events").doc("tags").collection("tagNames").doc(id).delete();
    // alert('deleted');
  };

  return (
    <>
      {tags.length > 0 ? (
        <>
          <div className="EventQuestion">
            <p className="EventparaQuestion">
              <span className="EventQspan">{tag}</span> Event
            </p>
          </div>
          <h2 className="filterHeading">Filters</h2>
          <div className="allTags">
            {tags.map(({ id, post }) => (
              <>
                {currentUser && currentUser.email === "kvipen164@gmail.com" ? (
                  <>
                  <Button  key={id} onClick={()=>handleTags(id)}>{id}</Button>
                  <AlertConfirmationBox handleDeleteTag={()=>handleDeleteTag(id)} mainText="Are You sure you want to delete this tag? Delete only if no Events are under this tag!" />
                  </>
                ) : (
                  <Button key={id} onClick={() => handleTags(id)}>
                    {id}
                  </Button>
                )}
              </>
            ))}
          </div>
        </>
      ) : (
        <div>
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={open}
            onClick={handleClose}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        </div>
      )}
      {posts.length > 0 ? (
        <>
          <div className="cardDeck">
            {posts.map(({ id, post }) => (
              <Event
                key={id}
                eventId={id}
                eventName={post.eventName}
                guestName={post.guestName}
                imageUrl={post.imageUrl}
                time={post.time}
                tag={tag}
                caption={post.caption}
                createdAt={post.createdAt}
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
          <img
            className="EmptyImage"
            src="https://www.eazydiner.com/images/no-upcoming-events-banner.svg"
            alt="Nothing added yet!"
          />
        </div>
      )}
    </>
  );
}
