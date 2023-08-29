import React, { useEffect, useState } from 'react'

import DraftEditor  from '../components/DraftEditor'
import Sidebar from '../components/Sidebar'
import { Stack } from 'react-bootstrap'
import Inbox from '../components/Inbox'
import OutBox from '../components/OutBox'
import { useDispatch, useSelector } from 'react-redux'
import { emailActions } from '../store/emails'
const HomePage = () => {
  
  const [checked, setChecked] = useState({compose:true});
  const dispatch = useDispatch();

  useEffect(() => {
    const getReceivedData = async () => {
      const email = localStorage.getItem("email").replace(/[@.]/g, "");
      try {
        const response = await fetch(
          `https://mail-box-client-56393-default-rtdb.firebaseio.com/${email}/received.json`
        );
        const data = await response.json();
        const list = Object.entries(data);

        dispatch(emailActions.inboxEmail(list));
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
        dispatch(emailActions.outboxEmail(list));
      } catch (error) {
        console.log(error);
      }
    };
    getSendData();
    getReceivedData();
  }, []);
  return (
    <>
    <Stack direction="horizontal" style={{height:'100vh',backgroundColor:'rgb(33,37,41)'}}>
      <Sidebar checked={checked} setChecked={setChecked}/>
   {checked.compose&& <DraftEditor/>}
   {checked.inbox&&<Inbox/>}
   {checked.outbox&&<OutBox/>}
    </Stack>
     
    </>
   
  )
}

export default HomePage