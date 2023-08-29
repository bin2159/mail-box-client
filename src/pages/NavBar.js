import React from "react";
import { Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { authAction } from "../store/auth";

const Root = () => {
  const email = localStorage.getItem("email");
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const login = useSelector((state) => state.auth.login);
  const logoutHandler=()=>{ 
    dispatch(authAction.logout())
    navigate('/')
  }
  return (
    <Navbar bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="#home">Navbar with text</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          {login && <Navbar.Text>Signed in as: {email}</Navbar.Text>}
        </Navbar.Collapse>
        {login && <Button onClick={logoutHandler}>LogOut</Button>}
      </Container>
    </Navbar>
  );
};

export default Root;
