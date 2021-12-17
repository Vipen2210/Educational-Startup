import React from "react";
import Signup from "./Signup";
import { AuthProvider } from "../contexts/AuthContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./Login";
import PrivateRoute from "./PrivateRoute";
import ForgotPassword from "./ForgotPassword";
import UpdateProfile from "./UpdateProfile";
import NavbarApp from "../navbar/NavbarApp";
import "../css_styling/App.css";
import AdminHome from "../admin/AdminHome";
import EventsHome from "../Events/EventsHome";
import AdminRoute from "../admin/AdminRoute";
import EventBook from "../Events/EventBook";
import HomePage from "../home/HomePage";
import CourseHome from "../course/CourseHome";
import RegisterdEvents from "../Dashboard/RegisterdEvents";

function App() {
  return (
    <>
      <Router>
        <AuthProvider>
          
          <NavbarApp />

          <Switch>
            <Route exact path="/" component={HomePage} />
            <AdminRoute path="/admin" component={AdminHome} />
            <PrivateRoute path="/update-profile" component={UpdateProfile} />
            <PrivateRoute path="/registered-events" component={RegisterdEvents} />
            <Route path="/signup" component={Signup} />
            <Route exact path="/events" component={EventsHome} />
            <Route path="/events/:tag/:id" component={EventBook} />
            <Route path="/course" component={CourseHome} />
            <Route path="/login" component={Login} />
            <Route path="/forgot-password" component={ForgotPassword} />
          </Switch>
          
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;
