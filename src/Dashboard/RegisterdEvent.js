import React,{useEffect,useState} from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useAuth } from "../contexts/AuthContext";
import { useHistory } from "react-router-dom";

export default function RegisterdEvent({
  guestName,
  eventName,
  imageUrl,
  eventId,
  tag,
  date,
  month,
  year,
  hours,
  minutes,
}) {
  const [eventDate, setEventDate] = useState(true);
  const { currentUser } = useAuth();
  const history = useHistory();

  const handleBook = () => {
    if (currentUser) {
      history.push(`/events/${tag}/${eventId}`);
    } else {
      history.push(`/signup`);
    }
  };

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
  }, [eventDate,year,month,date,hours,minutes])

  return (
    <Card className="event" sx={{ minWidth:310, maxWidth: 345 }}>
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
          by {guestName}
        </Typography>
      </CardContent>
      <CardActions>
        {eventDate ? <Button variant="dark">Date: {date}-{month + 1}-{year}{"  "}📆 at {"  "}
                            { hours}:{minutes}⌚ </Button>:
                            <Button variant="dark" onClick={handleBook}>Event passed</Button>}
        
      </CardActions>
      
    </Card>
  );
}
