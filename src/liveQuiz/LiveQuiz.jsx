import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import "../Events/Events.css";
import { Button } from "react-bootstrap";
import LiveQuizDecoration from "./LiveQuizDecoration";
import LoadingData from "../widgets/LoadingData";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { useAuth } from "../contexts/AuthContext";

export default function LiveQuiz() {
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [review, setReview] = useState("");
  const [liveQuizReviews, setLiveQuizReviews] = useState([]);
  const { currentUser } = useAuth();

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
    const getLiveQuizReviews = () => {
      db.collection("LiveQuizReviews")
        .orderBy("createdAt", "desc")
        .onSnapshot((snapshot) => {
          setLiveQuizReviews(
            snapshot.docs.map((doc) => ({
              reviewId: doc.id,
              post: doc.data(),
            }))
          );
        });
    };
    getEvents();
    getLiveQuizReviews();
    return () => {
      setPosts({}); // This worked for me
      setLiveQuizReviews({});
    };
  }, []);

  // functions
  const handlePostReview = () => {
    db.collection("LiveQuizReviews").add({
      createdAt: new Date(),
      comment: review,
      date: new Date().getDate(),
      month: new Date().getMonth(),
      year: new Date().getFullYear(),
      userName: currentUser.email.match(/^([^@]*)@/)[1]
    });
    setReview("");
  };
  const style = {
    position: "absolute",
    top: "50%",
    width: "90%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    backgroundImage: "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRM89SUee2W9F6d1OsBl446WXpGpQvjZaUtF-dfPNPbpxXuCP9yPMwQW4CJgJInlmgKxkE&usqp=CAU')",
  };

  return (
    <>
      {posts.length <= 0 ? (
        <LoadingData />
      ) : (
        <>
          {posts.length !== 0 ? (
            <>
              <div className="cardDeck">
                {posts.map(({ id, post }) => (
                  <LiveQuizDecoration
                    key={id}
                    id={id}
                    caption={post.caption}
                    imageUrl={post.imageUrl}
                    quizTopic={post.quizTopic}
                  ></LiveQuizDecoration>
                ))}
              </div>

              <div className="live-quiz-reviews" onClick={handleOpen}>
                <p>Reviews</p>
                <p>🖊</p>
              </div>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <Typography
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                    style={{fontWeight:"bold", fontSize:"24px",marginBottom:"20px"}}
                  >
                    Live Quiz Reviews
                  </Typography>
                  <Typography className="modal-body-reviews">
                    {liveQuizReviews.map(({ reviewId, post }, index) => (
                      <>
                        <div className= {index%2===0?"all-reviews":"all-reviews-2"}>
                          <div style={{fontWeight:"bold", fontStyle: "italic"}}>{post.userName}</div>
                          <div className="reviewComment">{post.comment}</div>
                          
                        </div>
                        <div className="reviewDay">
                            Posted on {post.date}-{post.month+1}-{post.year}
                          </div>
                      </>
                    ))}
                  </Typography>
                  <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    <textarea
                      className="reviews-textfield"
                      type="text"
                      placeholder="Write your valuable reviews here..."
                      value={review}
                      onChange={(e) => {
                        setReview(e.target.value);
                      }}
                    ></textarea>
                    <Button className="ms-3 mx-3" variant="success" onClick={handlePostReview} >Post</Button>
                    <Button variant="dark" onClick={handleClose}>Close</Button>
                  </Typography>
                </Box>
              </Modal>
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
      )}
    </>
  );
}
