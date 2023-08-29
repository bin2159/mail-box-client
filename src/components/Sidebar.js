import React from 'react'
import { Stack } from 'react-bootstrap'
import ToggleButton from 'react-bootstrap/ToggleButton';



const Sidebar = ({checked,setChecked}) => {
   
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
        Inbox
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
      <ToggleButton
        className="mb-2"
        id="toggle-check"
        type="checkbox"
        variant="outline-primary"
        checked={checked.received}
        value="1"
        onClick={(e) =>  setChecked({received:true})}
      >
        Received
      </ToggleButton>
    </Stack>
   
  )
}

export default Sidebar