import React, { useEffect, useState } from "react";

import DraftEditor from "../components/DraftEditor";
import Sidebar from "../components/Sidebar";
import { Stack } from "react-bootstrap";
import Inbox from "../components/Inbox";
import OutBox from "../components/OutBox";
import { useDispatch, useSelector } from "react-redux";
import { emailActions } from "../store/emails";
import Email from "../components/Email";
import useFetch from "../hooks/useFetch";
const HomePage = () => {
  const [checked, setChecked] = useState({ compose: true });
  const [emailData, setEmailData] = useState();
  const [inboxRead, setInboxRead] = useState(false);
  const dispatch = useDispatch();
  const inbox = useSelector((state) => state.email.inbox);
  const email = useSelector((state) => state.auth.email);
  const { sendRequest } = useFetch();
  useEffect(() => {
    const reqData = { url: "" };
    console.log(email)
    const getData = () => {
     
      reqData.url = `https://mail-box-client-56393-default-rtdb.firebaseio.com/${email}/received.json`;
      sendRequest(reqData).then((data) => {
        const list = data && Object.entries(data);
        dispatch(emailActions.inboxEmail(list));
      });

      reqData.url = `https://mail-box-client-56393-default-rtdb.firebaseio.com/${email}/send.json`;
      sendRequest(reqData).then((data) => {
        const list = data && Object.entries(data);
        dispatch(emailActions.outboxEmail(list));
      });
    };

    const id = setInterval(() => {
      getData();
    }, 2000);
    return () => {
      clearInterval(id);
    };
    //   const getReceivedData = async () => {
    //     try {
    //       const response = await fetch(
    //         `https://mail-box-client-56393-default-rtdb.firebaseio.com/${email}/received.json`
    //       );
    //       const data = await response.json();
    //       console.log(data,email  )
    //       const list = Object.entries(data);
    //       console.log(list)
    //     dispatch(emailActions.inboxEmail(list))
    //     // return list
    //     } catch (error) {
    //       console.log(error);
    //     }
    //   };
    //   const getSendData = async () => {
    //     try {
    //       const response = await fetch(
    //         `https://mail-box-client-56393-default-rtdb.firebaseio.com/${email}/send.json`
    //       );
    //       const data = await response.json();
    //       const list = Object.entries(data);
    //     dispatch(emailActions.outboxEmail(list))
    //     // return list
    //     } catch (error) {
    //       console.log(error);
    //     }
    //   };
    //     // getSendData();
    //     // getReceivedData();
    //   const id = setInterval(() => {
    //     getSendData().then(list=> dispatch(emailActions.inboxEmail(list)))
    //     getReceivedData().then(list=> {dispatch(emailActions.outboxEmail(list))
    //    })
    //   }, 2000);
    //   return () => {
    //     clearInterval(id)
    //   };
    // }, [dispatch,email]);
  }, [email]);
  
  useEffect(() => {
    dispatch(emailActions.unReadInboxEmail());
  }, [dispatch, inbox]);
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
