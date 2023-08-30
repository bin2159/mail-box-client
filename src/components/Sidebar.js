import React from 'react'
import { Badge, Stack } from 'react-bootstrap'
import ToggleButton from 'react-bootstrap/ToggleButton';
import { useSelector } from 'react-redux';



const Sidebar = ({checked,setChecked}) => {
   const unRead=useSelector(state=>state.email.unRead)
  return (
    <Stack  className='mt-5'>
    <ToggleButton
        className="mb-2"
        id="toggle-check"
        type="checkbox"
        variant="outline-primary"
        checked={checked.compose}
        value="1"
        onClick={(e) => setChecked({compose:true})}
      >
        Componse
      </ToggleButton>
      <ToggleButton
        className="mb-2"
        id="toggle-check"
        type="checkbox"
        variant="outline-primary"
        checked={checked.inbox}
        value="1"
        onClick={(e) => setChecked({inbox:true})}
      >
        Inbox{' '}  
        {unRead>0&&<Badge bg="secondary"> {unRead}</Badge>}
      </ToggleButton>
      <ToggleButton
        className="mb-2"
        id="toggle-check"
        type="checkbox"
        variant="outline-primary"
        checked={checked.outbox}
        value="1"
        onClick={(e) =>  setChecked({outbox:true})}
      >
        Send 
      </ToggleButton>
    </Stack>
   
  )
}

export default Sidebar