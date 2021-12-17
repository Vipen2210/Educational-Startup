import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase";
import { Button, Card } from "react-bootstrap";
import { Backdrop, CircularProgress } from "@mui/material";
import { useAuth } from "../contexts/AuthContext";


export default function EventBook() {
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = React.useState(true);
  const { id, tag } = useParams();
  const [eventDate, setEventDate] = useState(true);
  const [registered, setRegistered] = useState(false);
  const { currentUser} = useAuth()
  // const {eventDate,setEventDate} = useEvent();

  useEffect(() => {
    
    if(currentUser){
      db.collection("Dashboard").doc(currentUser.email).collection("RegisteredEvents").get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            if(doc.id===id){
              setRegistered(true);
            }
        });   
      });
    }

    const checkEvent = () => {
      // console.log(posts.date);
      // console.log(posts.month);
      // console.log(posts.year);
      // console.log("Current");
      var x = new Date();
      if (x.getFullYear() !== posts.year) {
        setEventDate(true);
      } else {
        if (x.getMonth() > posts.month) {
          setEventDate(false);
        } else if (x.getMonth() < posts.month) {
          setEventDate(true);
        } else {
          if (x.getDate() > posts.date) {
            setEventDate(false);
          }else if(x.getDate() === posts.date){
            if(x.getHours()>posts.hours){
              setEventDate(false);
            }else if(x.getHours()===posts.hours){
              if(x.getMinutes()>posts.minutes){
                setEventDate(false);
              }
            }
          }
        }
      }
    };
    const getEventData = () => {
      db.collection("Events")
        .doc("tags")
        .collection(tag)
        .doc(id)
        .get()
        .then((doc) => {
          setPosts(doc.data());
        });
    };

    getEventData();
    checkEvent();
  }, [id, tag, eventDate,posts.createdAt,registered,posts.hours,posts.minutes,currentUser,posts.date,posts.year,posts.month]);

  //   const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  // Register for event 
  const handleRegisterForEvent = () =>{
    if(!currentUser){
      return;
    }
    setRegistered(true);
    db.collection("Dashboard").doc(currentUser.email).collection("RegisteredEvents").doc(id).set({
      eventName:posts.eventName,
      guestName:posts.guestName,
      imageUrl:posts.imageUrl,
      date:posts.date,
      month:posts.month,
      year:posts.year,
      hours:posts.hours,
      minutes:posts.minutes,
      tag:tag,
      createdAt: new Date().getTime(),
    });
    // Stored for sending the Emails to all the users we have
    db.collection("Events")
    .doc("tags")
    .collection(tag)
    .doc(id).collection("Emails").doc(currentUser.email).set({});
  }
  const handleUnRegisterForEvent = ()=>{
    setRegistered(false);
    db.collection("Dashboard").doc(currentUser.email).collection("RegisteredEvents").doc(id).delete();
    db.collection("Events")
    .doc("tags")
    .collection(tag)
    .doc(id).collection("Emails").doc(currentUser.email).delete();

  }
  return (
    <>
      {posts.imageUrl ? (
        <>
          <div>
            <div>
              <h2 className="text-center mt-3">{posts.eventName}</h2>
            </div>
            <div className="eventBookContainer">
              <div className="eventImage">
                <img className="img" src={posts.imageUrl} alt="Event" />
                {!eventDate ? (
                  <>
                    <div>
                      <p style={{textAlign:"center"}}>Watch session now!</p>
                      {posts.youtubeLink===""?
                      <div className="beforeYoutubeShower">
                          <p>Video will be uploaded one the session will end.</p>
                      </div>
                      :<iframe
                        src={posts.youtubeLink}
                        title="YouTube video player"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="youtubeShower"
                      ></iframe>}
                      
                    </div>
                  </>
                ) : (
                  <>
                    {" "}
                    <div className="text">
                      {posts.caption}
                      <br />
                      <br />
                      <Card>
                        <Card.Header>Event by {posts.guestName}</Card.Header>
                        <Card.Body>
                          <Card.Title>
                            Date: {posts.date}-{posts.month + 1}-{posts.year} at ⌚ 
                            {posts.hours}:{posts.minutes} 
                          </Card.Title>
                          <Card.Text>
                            Take your skills to next Level with us 🚀🚀 
                          </Card.Text>
                          {registered? <Button onClick={handleUnRegisterForEvent} variant="secondary">UnRegister ❌</Button>:<Button onClick={handleRegisterForEvent} variant="dark">Register for event ✅</Button>}
                          
                        </Card.Body>
                      </Card>
                    </div>
                  </>
                )}
              </div>
            </div>
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
    </>
  );
}
