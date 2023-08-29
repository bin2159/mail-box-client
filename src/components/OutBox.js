import {  useDispatch, useSelector } from "react-redux";
import Card from "react-bootstrap/Card";
import { Button, Col, Row } from "react-bootstrap";
import ListGroup from "react-bootstrap/ListGroup";
import { emailActions } from "../store/emails";

const OutBox = () => {
 
  const outbox = useSelector((state) => state.email.outbox);
  console.log(outbox)
  const dispatch=useDispatch()
  const emailDeleteHandler=async(id)=>{
    const email = localStorage.getItem("email").replace(/[@.]/g, "");
    try{
        const response=await fetch(`https://mail-box-client-56393-default-rtdb.firebaseio.com/${email}/send/${id}.json`,{
            method:'DELETE',
            body:JSON.stringify(id),
            headers:{'Content-Type':'application/json'}
        })
        dispatch(emailActions.deleteOutboxEmail(id))
    }
    catch(error){
        console.log(error)
    }
}
  return (
    <Card className="w-75 mb-auto mt-5" style={{backgroundColor:'rgb(33,37,41)',color:'white'}}>
      <Card.Body>
        <ListGroup variant="dark"  >
          <ListGroup.Item style={{backgroundColor:'rgb(33,37,41)',color:'white'}}>
            <Row >
              <Col>User</Col>
              <Col className="col-8">Email</Col>
              <Col>Remove</Col>
            </Row>
          </ListGroup.Item>
        </ListGroup>

        {outbox.length>0&&outbox.map((data) => {return (
          <ListGroup.Item className="m-3">
            <Row key={data[0]}>
              <Col>{data[1].receiverEmail}</Col>
              <Col className="col-8">{data[1].text}</Col>
              <Col className="me-auto"><Button onClick={()=>emailDeleteHandler(data[0])}>x</Button></Col>
            </Row>
          </ListGroup.Item>
        )})}
      </Card.Body>
    </Card>
  );
};

export default OutBox;
