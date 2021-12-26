import React from "react";
import Backdrop from "@mui/material/Backdrop";
import loadingGear from "../images/loading-gear.gif";

import "./AdminHome.css";
import AddEvent from "./components_admin/AddEvent";
import AddQuiz from "./components_admin/AddQuiz";

export default function AdminHome() {
  
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Backdrop
        sx={{
          color: "#fff",
          zIndex: (theme) => theme.zIndex.drawer + 1,
          //   backgroundColor: "unset",
        }}
        open={open}
        onClick={handleClose}
      >
        <img
          src={loadingGear}
          style={{ height: "200px", width: "200px" }}
          alt="Error"
        />
      </Backdrop>
      <AddEvent setOpen={setOpen}></AddEvent>
      <AddQuiz setOpen={setOpen}></AddQuiz>
    </>
  );
}
