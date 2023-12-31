import React, { useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import ListGroup from "react-bootstrap/ListGroup";
import { useDispatch } from "react-redux";
import { emailActions } from "../store/emails";
import useFetch from "../hooks/useFetch";

const Email = ({ emailData, inboxRead }) => {
  const dispatch = useDispatch();
  const email = localStorage.getItem("email").replace(/[@.]/g, "");
  const { sendRequest } = useFetch();
  
  useEffect(() => {
    const readData = { ...emailData[1], read: true };
    console.log(emailData[0]);
    const reqData = {
      url: `https://mail-box-client-56393-default-rtdb.firebaseio.com/${email}/received/${emailData[0]}.json`,
      method: "PUT",
      body: readData,
      headers: { "Content-Type": "application/json" },
    };
    //const readEmailBackend = async () => {

      // try {
      //   const response = await fetch(
      //     `https://mail-box-client-56393-default-rtdb.firebaseio.com/${email}/received/${emailData[0]}.json`,
      //     {
      //       method: "PUT",
      //       body: JSON.stringify(readData),
      //     }
      //   );
      //   const data = await response.json();
      //   console.log(data);
      // } catch (error) {
      //   console.log(error);
      // }
    //};
    if (inboxRead) {
      //readEmailBackend();
      sendRequest(reqData)
      dispatch(emailActions.readInboxEmail(emailData[0]));
    }
  }, []);
  return (
    <Card
      className="w-75 mb-auto mt-5 mx-5"
      style={{ backgroundColor: "rgb(33,37,41)", color: "white" }}
    >
      <ListGroup variant="dark">
        <ListGroup.Item
          style={{ backgroundColor: "rgb(33,37,41)", color: "white" }}
        >
          From : {emailData[1].senderEmail}
        </ListGroup.Item>
        <ListGroup.Item
          style={{ backgroundColor: "rgb(33,37,41)", color: "white" }}
        >
          Subject : {emailData[1].subject}
        </ListGroup.Item>
        <ListGroup.Item
          style={{ backgroundColor: "rgb(33,37,41)", color: "white" }}
        >
          Email : {emailData[1].text}
        </ListGroup.Item>
      </ListGroup>
    </Card>
  );
};

export default Email;
