import React, { useRef, useState, useEffect } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import { Container } from "react-bootstrap";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const [status, setStatus] = useState(false);

  useEffect(() => {
    if (status) {
      setTimeout(() => {
        history.push("/");
        setStatus(false);
      }, 2000);
    }
  }, [status]);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      setStatus(true);
    } catch {
      setError("Failed to log in");
    }

    setLoading(false);
  }

  return (
    <Container className="login-container" style={{ minHeight: "80vh" }}>
      <div className="login-heading">
        <h1>Let's start2day! 🚀🚀</h1>
      </div>
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <Card>
          <Card.Body>
            <h2 className="text-center mb-4">Log In</h2>
            {status && <Alert variant="success">Logged in!</Alert>}
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group id="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" ref={emailRef} required />
              </Form.Group>
              <Form.Group id="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" ref={passwordRef} required />
              </Form.Group>
              {status ? (
                <Button disabled={loading} variant="dark" className="w-100 mt-3">
                  Log In
                </Button>
              ) : (
                <Button disabled={loading} className="w-100 mt-3" type="submit">
                  Log In
                </Button>
              )}
            </Form>
            <div className="w-100 text-center mt-3">
              <Link to="/forgot-password">Forgot Password?</Link>
            </div>
          </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
          Need an account? <Link to="/signup">Sign Up</Link>
        </div>
      </div>
    </Container>
  );
}
