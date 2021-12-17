import React, { useState,useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { db, storage } from "../firebase";
import { useHistory } from "react-router-dom";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import WhatsAppIcon from "@material-ui/icons/WhatsApp";
import TextField from "@mui/material/TextField";

export default function Event({
  guestName,
  eventName,
  imageUrl,
  eventId,
  time,
  caption,
  tag,
  createdAt,
  date,
  month,
  year,
  hours,
  minutes,
}) {
  const { currentUser } = useAuth();
  const history = useHistory();
  const [youtubeLink, setYoutubeLink] = useState("");
  const [eventDate, setEventDate] = useState(true);

  useEffect(() => {
    const checkEvent = () => {
      var x = new Date();
      if (x.getFullYear() !== year) {
        setEventDate(true);
      } else {
        if (x.getMonth() > month) {
          setEventDate(false);
        } else if (x.getMonth() < month) {
          setEventDate(true);
        } else {
          if (x.getDate() > date) {
            setEventDate(false);
          }else if(x.getDate() === date){
            if(x.getHours()>hours){
              setEventDate(false);
            }else if(x.getHours()===hours){
              if(x.getMinutes()>minutes){
                setEventDate(false);
              }
            }
          }
        }
      }
    };
    checkEvent();
  }, [year,month,date,hours,minutes])

  const handleBook = () => {
    if (currentUser) {
      history.push(`/events/${tag}/${eventId}`);
    } else {
      history.push(`/signup`);
    }
  };
  
  const handleDelete = () => {
    let imageRef = storage.refFromURL(imageUrl);
    imageRef
      .delete()
      .then(() => {
        console.log("Deleted");
      })
      .catch((err) => console.log(err));
    db.collection("Events").doc("tags").collection(tag).doc(eventId).delete();
    db.collection("Events")
      .doc("tags")
      .collection("BestSeller")
      .doc(eventId)
      .delete();
    const refe = db
      .collection("Events")
      .doc("tags")
      .collection(tag)
      .doc(eventId)
      .collection("Emails");
      refe
      .get()
      .then((res) => {
        res.forEach((element) => {
          element.ref.delete();
        });
      });
      // deleting the user personal registered events
      db.collection("Dashboard").doc(currentUser.email).collection("RegisteredEvents").doc(eventId).delete();
  };
 
  const handleBestSeller = () => {
    db.collection("Events")
      .doc("tags")
      .collection("BestSeller")
      .doc(eventId)
      .set({
        createdAt: createdAt,
        caption: caption,
        eventName: eventName,
        imageUrl: imageUrl,
        guestName: guestName,
        tag: tag,
        date: date,
        month: month,
        year: year,
        hours: hours,
        minutes: minutes,
        time: time,
      });
    db.collection("Events")
      .doc("tags")
      .collection("tagNames")
      .doc("BestSeller")
      .set({});
    
  };
  const handleBestSellerDelete = () => {
    db.collection("Events")
      .doc("tags")
      .collection("BestSeller")
      .doc(eventId)
      .delete();
  };
  const handleUpdateYoutubeLink = () => {
    db.collection("Events").doc("tags").collection(tag).doc(eventId).update({
      youtubeLink: youtubeLink,
    });
    setYoutubeLink("");
  };
  return (
    <Card className="event" sx={{ minWidth: 310, maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt="Event Photo"
        height="140"
        image={imageUrl}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {eventName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {guestName}
        </Typography>
      </CardContent>
      <CardActions>
        <a
          href={`whatsapp://send?text=An Event of ${eventName} is going live by ${guestName} on ${time}. Plz join on time.`}
          data-action="share/whatsapp/share"
          target="_blank"
          rel="noreferrer"
        >
          <WhatsAppIcon />
        </a>
        {eventDate ? <Button onClick={handleBook}>Book your slot now!</Button>:
        <Button onClick={handleBook}>Watch now!</Button>}

        {currentUser && currentUser.email === "kvipen164@gmail.com" && (
          <Button onClick={handleDelete}>Delete</Button>
        )}
      </CardActions>
      {currentUser && currentUser.email === "kvipen164@gmail.com" && (
        <Button onClick={handleBestSeller}>Add to Best Seller</Button>
      )}
      {currentUser && currentUser.email === "kvipen164@gmail.com" && (
        <Button onClick={handleBestSellerDelete}>
          Remove from Best Seller
        </Button>
      )}
      {currentUser && currentUser.email === "kvipen164@gmail.com" && (
        <div className="updateButtonForEvents">
          <TextField
            label="Youtube Link"
            value={youtubeLink}
            onChange={(e) => {
              setYoutubeLink(e.target.value);
            }}
          />
          <Button
            color="success"
            variant="contained"
            onClick={handleUpdateYoutubeLink}
          >
            Update 🖊
          </Button>
        </div>
      )}
    </Card>
  );
}
