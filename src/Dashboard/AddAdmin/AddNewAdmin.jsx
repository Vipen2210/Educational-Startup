import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { db } from "../../firebase";
import { Card } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";

function AddNewAdmin() {
  const [emailId, setEmailID] = useState("");
  const [posts, setPosts] = useState([]);
  const { currentUser} = useAuth()

  useEffect(() => {
    const getEmails = () => {
      db.collection("AdminEmails").onSnapshot((snapshot) => {
        setPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            post: doc.id,
          }))
        );
      });
    };
    getEmails();
    return () => {
      setPosts({}); // This worked for me
    };
  }, []);

  const handleUpload = () => {
    if (emailId !== "") {
      db.collection("AdminEmails").doc(emailId).set({
        id: emailId,
      });
      setEmailID("");
    }
  };
  const handleRemove = (email) => {
      db.collection("AdminEmails").doc(email).delete();
  };
  return (
    <>
      <TextField
        className="mt-3 ms-3 mb-3"
        value={emailId}
        onChange={(event) => setEmailID(event.target.value)}
        id="outlined-error"
        label="Add New Admin"
        placeholder="Enter new admin EmailId"
      />
      <Button
        className="mt-4 ms-2"
        variant="contained"
        size="large"
        color="success"
        onClick={handleUpload}
      >
        Add ➕
      </Button>
      <div>
        {posts.map(({ id, post }) => (
          <Card key={id}>
            <Card.Header as="h5">Admin</Card.Header>
            <Card.Body>
              <Card.Text>{id}</Card.Text>
              {currentUser && currentUser.email!==id && <Button
                className="mt-4 ms-2"
                size="large"
                variant="contained" color="error"
                onClick={()=>handleRemove(id)}
              >
                Remove from Admin 🚫
              </Button>}
              
            </Card.Body>
          </Card>
        ))}
      </div>
    </>
  );
}

export default AddNewAdmin;
