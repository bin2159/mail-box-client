import React, { useEffect, useState } from "react";

import DraftEditor from "../components/DraftEditor";
import Sidebar from "../components/Sidebar";
import { Stack } from "react-bootstrap";
import Inbox from "../components/Inbox";
import OutBox from "../components/OutBox";
import { useDispatch, useSelector } from "react-redux";
import { emailActions } from "../store/emails";
import Email from "../components/Email";
const HomePage = () => {
  const [checked, setChecked] = useState({ compose: true });
  const [emailData, setEmailData] = useState();
  const [inboxRead, setInboxRead] = useState(false);
  const dispatch = useDispatch();
  const inbox=useSelector(state=>state.email.inbox)
  useEffect(() => {
    const getReceivedData = async () => {
      const email = localStorage.getItem("email").replace(/[@.]/g, "");
      try {
        const response = await fetch(
          `https://mail-box-client-56393-default-rtdb.firebaseio.com/${email}/received.json`
        );
        const data = await response.json();
        const list = Object.entries(data);
       return list
      } catch (error) {
        console.log(error);
      }
    };
    const getSendData = async () => {
      const email = localStorage.getItem("email").replace(/[@.]/g, "");

      try {
        const response = await fetch(
          `https://mail-box-client-56393-default-rtdb.firebaseio.com/${email}/send.json`
        );
        const data = await response.json();
        const list = Object.entries(data);
       
      } catch (error) {
        console.log(error);
      }
    };
      // getSendData();
      // getReceivedData();
    const id = setInterval(() => {
      getSendData().then(list=> dispatch(emailActions.inboxEmail(list)))
      getReceivedData().then(list=> dispatch(emailActions.outboxEmail(list)))
    }, 2000);
    return () => {
      clearInterval(id) 
    };
  }, [dispatch]);
  useEffect(()=>{
    dispatch(emailActions.unReadInboxEmail())
  },[dispatch,inbox])
  return (
    <>
      <Stack
        direction="horizontal"
        style={{ height: "100vh", backgroundColor: "rgb(33,37,41)" }}
      >
        <Sidebar checked={checked} setChecked={setChecked} />
        {checked.compose && <DraftEditor />}
        {checked.inbox && (
          <Inbox
            setChecked={setChecked}
            setEmailData={setEmailData}
            setInboxRead={setInboxRead}
          />
        )}
        {checked.outbox && (
          <OutBox
            setEmailData={setEmailData}
            setChecked={setChecked}
            setInboxRead={setInboxRead}
          />
        )}
        {checked.email && <Email emailData={emailData} inboxRead={inboxRead} />}
      </Stack>
    </>
  );
};

export default HomePage;
