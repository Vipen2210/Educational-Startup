import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Link } from "react-router-dom";
import "./NavbarApp.css";
import { Dropdown } from "react-bootstrap";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import { useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { isCurrentUserAdmin } from "../widgets/IsCurrentUserAdmin";
import MenuIcon from '@material-ui/icons/Menu';

import { Button } from "react-bootstrap";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

function NavbarApp() {
  const { currentUser, logout } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
    position: "absolute",
    top: "50%",
    height: "100%",
    width: "100%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    backgroundImage:
      "url('https://c4.wallpaperflare.com/wallpaper/555/339/785/stains-light-background-texture-wallpaper-preview.jpg')",
  };
  const history = useHistory();
  async function handleLogout() {
    try {
      await logout();
      handleClose();
      history.push("/login");
    } catch {}
  }

  useEffect(() => {
    isCurrentUserAdmin({ setIsAdmin, currentUser });
  }, [currentUser]);

  return (
    <div className="navbar-container">
      <div className="navbar-logo">
        <Link style={{ textDecoration: "none" }} exact to="/">
          start<font>2day</font>
        </Link>
      </div>
      <div className="navbar-items">
        <div className="navbar-item">
          <Link className="modal-link-navbar" exact to="/">
            Home
          </Link>
        </div>
        <div className="navbar-item">
          <Link className="modal-link-navbar" exact to="/events">
            Events
          </Link>
        </div>
        <div className="navbar-item">
          <Link className="modal-link-navbar" exact to="/liveQuiz">
            Live Quiz
          </Link>
        </div>

        {isAdmin && (
          <div className="navbar-item">
            <Link
              className="modal-link-navbar"
              to="/admin"
              onClick={handleClose}
            >
              Admin💯
            </Link>
          </div>
        )}
        {currentUser && (
          <div className="accountButton">
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                <AccountBoxIcon fontSize="medium" />
                Dashboard
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <div className="dropDownItems">
                  <Link className="linksNavbar" to="/update-profile">
                    Update Profile 🖊
                  </Link>
                </div>
                <div className="dropDownItems">
                  <Link className="linksNavbar" to="/registered-events">
                    Registered Events 📘📚
                  </Link>
                </div>
                <div className="dropDownItems">
                  <Link className="linksNavbar" to="/registered-live-quiz">
                    Upcoming Quizes🎓🧠
                  </Link>
                </div>
                {isAdmin && (
                  <div className="dropDownItems">
                    <Link className="linksNavbar" to="/add-new-admin">
                      Add New Admin 🖊
                    </Link>
                  </div>
                )}

                <div className="dropDownItems">
                  <button className="registerNavbar" onClick={handleLogout}>
                    Log Out
                  </button>
                </div>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        )}
        {!currentUser && (
          <div className="rightSide">
            <button className="navbarButton">
              <Link className="blinks" to="/login">
                Login
              </Link>
            </button>
            <button className="register">
              <Link className="blinks" to="/signup">
                Register
              </Link>
            </button>
          </div>
        )}
      </div>
      <div className="navbar-items-small-screen">
        <div className="navbar-item" onClick={handleOpen}>
          <MenuIcon />
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
              style={{
                fontWeight: "bold",
                fontSize: "28px",
                marginBottom: "20px",
                color: "tomato",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <Link
                style={{ color: "tomato", textDecoration: "none" }}
                onClick={handleClose}
                exact
                to="/"
              >
                start2day
              </Link>
            </Typography>
            <Typography className="modal-body-navbar">
              <Link
                className="modal-link-navbar"
                exact
                to="/"
                onClick={handleClose}
              >
                Home 🏡
              </Link>
              <Link
                className="modal-link-navbar"
                exact
                to="/events"
                onClick={handleClose}
              >
                Events 👨‍🎓
              </Link>
              <Link
                className="modal-link-navbar"
                exact
                to="/liveQuiz"
                onClick={handleClose}
              >
                Live Quiz 📝🖊
              </Link>
              {isAdmin && (
                <Link
                  className="modal-link-navbar"
                  to="/admin"
                  onClick={handleClose}
                >
                  Admin💯
                </Link>
              )}
            </Typography>
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              style={{
                fontWeight: "bold",
                fontSize: "26px",
                marginTop: "20px",
                marginBottom: "20px",
                color: "tomato",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              Dashboard
            </Typography>
            <Typography className="modal-body-navbar">
              <Link
                className="modal-link-navbar"
                exact
                to="/registered-events"
                onClick={handleClose}
              >
                Registered Events ✔
              </Link>
              <Link
                className="modal-link-navbar"
                exact
                to="/registered-live-quiz"
                onClick={handleClose}
              >
                Registered LiveQuizes ✔
              </Link>
              {isAdmin && (
                <Link
                  className="modal-link-navbar"
                  to="/add-new-admin"
                  onClick={handleClose}
                >
                  Add New Admin 🖊
                </Link>
              )}
            </Typography>
            <Typography
              style={{
                color: "tomato",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
              }}
              id="modal-modal-description"
              sx={{ mt: 2 }}
            >
              {!currentUser ? (
                <>
                  <Button
                    style={{
                      margin: "10px",
                      marginTop: "50px",
                    }}
                    variant="dark"
                    onClick={handleClose}
                  >
                    <Link
                      style={{
                        color: "tomato",
                        textDecoration: "none",
                      }}
                      exact
                      to="/login"
                    >
                      Login
                    </Link>
                  </Button>
                  <Button
                    style={{
                      margin: "10px",
                      marginTop: "50px",
                    }}
                    variant="dark"
                    onClick={handleClose}
                  >
                    <Link
                      style={{
                        color: "tomato",
                        textDecoration: "none",
                      }}
                      exact
                      to="/signup"
                    >
                      SignUp
                    </Link>
                  </Button>
                </>
              ) : (
                <Button
                  style={{
                    color: "tomato",
                    margin: "10px",
                    marginTop: "50px",
                  }}
                  variant="dark"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              )}
            </Typography>
          </Box>
        </Modal>
      </div>
    </div>
  );
}

export default NavbarApp;

// import React, { useState ,useEffect } from "react";
// import "bootstrap/dist/css/bootstrap.css";
// import { Link } from "react-router-dom";
// import "./Navbar.css";
// import { Dropdown } from "react-bootstrap";
// import AccountBoxIcon from "@material-ui/icons/AccountBox";
// import { Navbar, Nav, Container } from "react-bootstrap";
// import { useHistory } from "react-router-dom";
// import { useAuth } from "../contexts/AuthContext";
// import { isCurrentUserAdmin } from "../widgets/IsCurrentUserAdmin";

// function NavbarApp() {
//   const { currentUser, logout } = useAuth();
//   const [isAdmin,setIsAdmin] = useState(false);

// const history = useHistory();
// async function handleLogout() {
//   try {
//     await logout();
//     history.push("/login");
//   } catch {

//   }
// }

//   useEffect(() => {
//     isCurrentUserAdmin({setIsAdmin,currentUser});
//   }, [currentUser])

//   return (
//     <Navbar className="navbar navbar-dark bg-dark navstyle" expand="lg">
//       <Container>
//         <Navbar.Brand>
//           <Link className="TitleLinks" to="/">
//             Startup
//           </Link>
//         </Navbar.Brand>
//         <Navbar.Toggle aria-controls="basic-navbar-nav" />
//         <Navbar.Collapse id="basic-navbar-nav">
//           <Nav className="me-auto">
//             <Nav.Link>
//               <Link className="links" to="/events">
//                 Events
//               </Link>
//             </Nav.Link>
//             <Nav.Link>
//               <Link className="links" to="/course">
//                 Courses
//               </Link>
//             </Nav.Link>
//             <Nav.Link>
//               <Link className="links" to="/liveQuiz">
//                 Live Quiz 💻
//               </Link>
//             </Nav.Link>
//             <Nav.Link>
//               <Link className="links" to="/signup">
//                 Guided Path
//               </Link>
//             </Nav.Link>
//             {currentUser && isAdmin && (
//               <Nav.Link>
//                 <Link className="links" to="/admin">
//                   Admin
//                 </Link>
//               </Nav.Link>
//             )}
//           </Nav>
// {currentUser && (
//   <div className="accountButton">
//     <Dropdown>
//       <Dropdown.Toggle variant="success" id="dropdown-basic">
//         <AccountBoxIcon fontSize="large" />
//       </Dropdown.Toggle>
//       <Dropdown.Menu>
//         <div className="dropDownItems">
//           <Link className="linksNavbar" to="/update-profile">
//             Update Profile 🖊
//           </Link>
//         </div>
//         <div className="dropDownItems">
//           <Link className="linksNavbar" to="/registered-events">
//             Registered Events 📘📚
//           </Link>
//         </div>
//         <div className="dropDownItems">
//           <Link className="linksNavbar" to="/registered-events">
//             Upcoming Quizes🎓🧠
//           </Link>
//         </div>
// {isAdmin && <div className="dropDownItems">
//   <Link className="linksNavbar" to="/add-new-admin">
//     Add New Admin 🖊
//   </Link>
// </div> }

//         <div className="dropDownItems">
//           <button className="registerNavbar" onClick={handleLogout}>
//             Log Out
//           </button>
//         </div>
//       </Dropdown.Menu>
//     </Dropdown>
//   </div>
// )}
// {!currentUser && (

//   <div className="rightSide">
//     <button className="navbarButton">
//       <Link className="blinks" to="/login">
//         Login
//       </Link>
//     </button>
//     <button className="register">
//       <Link className="blinks" to="/signup">
//         Register
//       </Link>
//     </button>
//   </div>
// )}
//         </Navbar.Collapse>
//       </Container>
//     </Navbar>
//   );
// }

// export default NavbarApp;

// import React, { useState, useEffect } from "react";
// import { NavLink } from "react-router-dom";
// import { useAuth } from "../contexts/AuthContext";
// import { isCurrentUserAdmin } from "../widgets/IsCurrentUserAdmin";
// import { MenuList } from "./MenuItems";
// import "./NavbarApp.css";

// import "bootstrap/dist/css/bootstrap.css";
// import { Link } from "react-router-dom";
// import { Dropdown } from "react-bootstrap";
// import AccountBoxIcon from "@material-ui/icons/AccountBox";
// import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

// const NavbarApp = () => {
//   const { currentUser,logout } = useAuth();
//   const [isAdmin, setIsAdmin] = useState(false);
//   const [clicked, setClicked] = useState(false);
//   useEffect(() => {
//     isCurrentUserAdmin({ setIsAdmin, currentUser });
//   }, [currentUser]);

//   const history = useHistory();
//   async function handleLogout() {
//     try {
//       await logout();
//       history.push("/login");
//     } catch {

//     }
//   }

//   const menuList = MenuList.map(({ url, title }, index) => {
//     if (url === "/admin" && !isAdmin) {
//     } else {
//       return (
//         <li key={index}>
//           <NavLink exact to={url} activeClassName="active">
//             {title}
//           </NavLink>
//         </li>
//       );
//     }
//   });

//   const handleClick = () => {
//     setClicked(!clicked);
//   };

//   return (
//     <nav>
//       <div className="logo">
//         <NavLink exact to="/">
//           <font>start</font>2day
//         </NavLink>
//       </div>
//       <div className="menu-icon" onClick={handleClick}>
//         <i className={clicked ? "fas fa-times" : "fas fa-bars"}></i>
//       </div>
//       <ul className={clicked ? "menu-list" : "menu-list close"} >{menuList}

//       {currentUser && (
//             <div className="accountButton">
//               <Dropdown>
//                 <Dropdown.Toggle variant="success" id="dropdown-basic">
//                   <AccountBoxIcon fontSize="large" />
//                 </Dropdown.Toggle>
//                 <Dropdown.Menu>
//                   <div className="dropDownItems">
//                     <Link className="linksNavbar" to="/update-profile">
//                       Update Profile 🖊
//                     </Link>
//                   </div>
//                   <div className="dropDownItems">
//                     <Link className="linksNavbar" to="/registered-events">
//                       Registered Events 📘📚
//                     </Link>
//                   </div>
//                   <div className="dropDownItems">
//                     <Link className="linksNavbar" to="/registered-live-quiz">
//                       Upcoming Quizes🎓🧠
//                     </Link>
//                   </div>
//                   {isAdmin && <div className="dropDownItems">
//                     <Link className="linksNavbar" to="/add-new-admin">
//                       Add New Admin 🖊
//                     </Link>
//                   </div> }

//                   <div className="dropDownItems">
//                     <button className="registerNavbar" onClick={handleLogout}>
//                       Log Out
//                     </button>
//                   </div>
//                 </Dropdown.Menu>
//               </Dropdown>
//             </div>
//           )}
//           {!currentUser && (

//             <div className="rightSide">
//               <button className="navbarButton">
//                 <Link className="blinks" to="/login">
//                   Login
//                 </Link>
//               </button>
//               <button className="register">
//                 <Link className="blinks" to="/signup">
//                   Register
//                 </Link>
//               </button>
//             </div>
//           )}
//           </ul>

//     </nav>
//   );
// };

// export default NavbarApp;

// import React, { useState } from "react";

// import { Alert } from "react-bootstrap";
// import { useHistory } from "react-router-dom";
// import { Link } from "react-router-dom";
// import "./Navbar.css";
// import { Dropdown } from "react-bootstrap";

// import AccountBoxIcon from "@material-ui/icons/AccountBox";

// function NavbarApp() {
// const [error, setError] = useState("");
// const { currentUser, logout } = useAuth();
// const history = useHistory();

// async function handleLogout() {
//   setError("");

//   try {
//     await logout();
//     history.push("/login");
//   } catch {
//     setError("Failed to log out");
//   }
// }

//   if (!currentUser) {
//     return (
//       <div className="Navbar">
//         <div className="leftSide">
//           <Link className="TitleLinks" to="/">
//             A.H. Academy
//           </Link>
//           <Link className="links" to="/events">
//             Events
//           </Link>
//           <Link className="links" to="/signup">
//             Buy a course
//           </Link>
//           <Link className="links" to="/signup">
//             Contests
//           </Link>
//           <Link className="links" to="/signup">
//             Practice portal
//           </Link>
//         </div>
//         <div className="rightSide">
//           <button className="navbarButton">
//             <Link className="blinks" to="/login">
//               Login
//             </Link>
//           </button>
//           <button className="register">
//             <Link className="blinks" to="/signup">
//               Register
//             </Link>
//           </button>
//         </div>
//       </div>
//     );
//   } else {
//     if (currentUser.email === "kvipen164@gmail.com") {
//       return (
//         <div className="Navbar">
//           <div className="leftSide">
//             <Link className="TitleLinks" to="/">
//               A.H. Academy
//             </Link>
//             <Link className="links" to="/events">
//               Events
//             </Link>
//             <Link className="links" to="/signup">
//               Buy a course
//             </Link>
//             <Link className="links" to="/signup">
//               Contests
//             </Link>
//             <Link className="links" to="/signup">
//               Practice portal
//             </Link>
//             <Link className="links" to="/admin">
//               Admin
//             </Link>
//           </div>
//           <div className="accountButton">
//             <Dropdown>
//               <Dropdown.Toggle variant="success" id="dropdown-basic">
//                 <AccountBoxIcon fontSize="large" />
//               </Dropdown.Toggle>

//               <Dropdown.Menu>
//                 <div className="dropDownItems">
//                   <Link className="linksNavbar" to="/update-profile">Update Profile</Link>
//                 </div>
//                 <div className="dropDownItems">
//                   <Link className="linksNavbar" to="/update-profile">Update Profile</Link>
//                 </div>
//                 <div className="dropDownItems">
//                   <Link className="linksNavbar" to="/update-profile">Update Profile</Link>
//                 </div>

//                 <div className="dropDownItems">
//                   <button className="registerNavbar" onClick={handleLogout}>
//                     Log Out
//                   </button>
//                 </div>
//               </Dropdown.Menu>
//             </Dropdown>
//           </div>
//           {error && <Alert variant="danger">{error}</Alert>}
//         </div>
//       );
//     } else {
//       return (
//         <div className="Navbar">
//           <div className="leftSide">
//             <Link className="TitleLinks" to="/">
//               A.H. Academy
//             </Link>
//             <Link className="links" to="/events">
//               Events
//             </Link>
// <Link className="links" to="/signup">
//   Buy a course
// </Link>
// <Link className="links" to="/signup">
//   Contests
// </Link>
// <Link className="links" to="/signup">
//   Practice portal
// </Link>
//           </div>

//           <div className="accountButton">
//             <Dropdown>
//               <Dropdown.Toggle variant="success" id="dropdown-basic">
//                 <AccountBoxIcon fontSize="large" />
//               </Dropdown.Toggle>

//               <Dropdown.Menu>
//                 <div className="dropDownItems">
//                   <Link className="linksNavbar" to="/update-profile">Update Profile</Link>
//                 </div>
//                 <div className="dropDownItems">
//                   <Link className="linksNavbar" to="/update-profile">Update Profile</Link>
//                 </div>
//                 <div className="dropDownItems">
//                   <Link className="linksNavbar" to="/update-profile">Update Profile</Link>
//                 </div>

//                 <div className="dropDownItems">
//                   <button className="registerNavbar" onClick={handleLogout}>
//                     Log Out
//                   </button>
//                 </div>
//               </Dropdown.Menu>
//             </Dropdown>
//           </div>
//           {error && <Alert variant="danger">{error}</Alert>}
//         </div>
//       );
//     }
//   }
// }

// export default NavbarApp;
