import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { Dropdown } from "react-bootstrap";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import { Navbar, Nav, Container } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function NavbarApp() {
  // const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const history = useHistory();
  async function handleLogout() {
    try {
      await logout();
      history.push("/login");
    } catch {
      
    }
  }
  return (
    <Navbar className="navbar navbar-dark bg-dark navstyle" expand="lg">
      <Container>
        <Navbar.Brand>
          <Link className="TitleLinks" to="/">
            Startup
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link>
              <Link className="links" to="/events">
                Events
              </Link>
            </Nav.Link>
            <Nav.Link>
              <Link className="links" to="/course">
                Courses
              </Link>
            </Nav.Link>
            <Nav.Link>
              <Link className="links" to="/signup">
                Contests
              </Link>
            </Nav.Link>
            <Nav.Link>
              <Link className="links" to="/signup">
                Guided Path
              </Link>
            </Nav.Link>
            {currentUser && currentUser.email === "kvipen164@gmail.com" && (
              <Nav.Link>
                <Link className="links" to="/admin">
                  Admin
                </Link>
              </Nav.Link>
            )}
          </Nav>
          {currentUser && (
            <div className="accountButton">
              <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  <AccountBoxIcon fontSize="large" />
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
                    <Link className="linksNavbar" to="/update-profile">
                      Update Profile
                    </Link>
                  </div>

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
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarApp;






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