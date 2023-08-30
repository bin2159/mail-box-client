import React, { useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import { Button, Toast, ToastContainer } from "react-bootstrap";
import InputGroup from "react-bootstrap/InputGroup";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useDispatch } from "react-redux";
import { emailActions } from "../store/emails";
const DraftEditor = () => {
  const dispatch=useDispatch()
  const [showToast,setToast]=useState(false)
  const [data, setData] = useState({ email: "", subject: "" });
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const inputHandler = (e) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const sendMailHandler = async () => {
    const email = localStorage.getItem("email").replace(/[@.]/g, "");
    const receiverEmail=data.email.replace(/[@.]/g,"")
    const postData = {
      senderEmail: localStorage.getItem('email'),
      receiverEmail:data.email,
      read:false,
      subject: data.subject,
      text: convertToRaw(editorState.getCurrentContent()).blocks[0].text,
    };
    try {
      const response = await fetch(
        `https://mail-box-client-56393-default-rtdb.firebaseio.com/${email}/send.json`,
        {
          method: "POST",
          body: JSON.stringify(postData),
          headers: { "Content-Type": "application/json" },
        }
      )
      const response1 = await fetch(
        `https://mail-box-client-56393-default-rtdb.firebaseio.com/${receiverEmail}/received.json`,
        {
          method: "POST",
          body: JSON.stringify(postData),
          headers: { "Content-Type": "application/json" },
        }
      )
      setToast(true)
      setData({email:'',subject:''})
      setEditorState('')
      const data =await response.json()
      dispatch(emailActions.addOutboxEmail([data.name,postData]))
    } catch (error) {
      alert(error.message)
    }
  };
  return (
    <> <Card className="w-75 mb-auto mt-5 mx-5">
      <Card.Body>
        <Card.Title>
          <InputGroup className="mb-3">
            <InputGroup.Text>To</InputGroup.Text>
            <Form.Control
              placeholder="Username"
              aria-label="Username"
              name="email"
              value={data.email}
              onChange={inputHandler}
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Text>Subject</InputGroup.Text>
            <Form.Control
              placeholder="Email Subject"
              aria-label="Subject"
              name="subject"
              value={data.subject}
              onChange={inputHandler}
            />
          </InputGroup>
        </Card.Title>
        <Card.Text>
          <Editor
            editorState={editorState}
            toolbarClassName="toolbarClassName"
            wrapperClassName="wrapperClassName"
            editorClassName="editorClassName"
            onEditorStateChange={setEditorState}
          />
        </Card.Text>
        <Button onClick={sendMailHandler}>Send</Button>
      </Card.Body>
    </Card>
    {showToast&&<ToastContainer
          className="p-3"
          position={"bottom-end"}
          style={{ zIndex: 1 }}
        >
          <Toast delay={2000} autohide onClose={()=>setToast(false)}>
            <Toast.Header closeButton={true} >
              <img
                src="holder.js/20x20?text=%20"
                className="rounded me-2"
                alt=""
              />
              <strong className="me-auto">Mail Box Client</strong>
              <small>just now</small>
            </Toast.Header>
            <Toast.Body>Email Sent Successfully</Toast.Body>
          </Toast>
        </ToastContainer>}
    </>
   
  );
};

export default DraftEditor;
