import {  useDispatch, useSelector } from "react-redux";
import Card from "react-bootstrap/Card";
import { Button, ButtonGroup, Col, Container, Row, Stack } from "react-bootstrap";
import ListGroup from "react-bootstrap/ListGroup";
import { emailActions } from "../store/emails";

const OutBox = ({setChecked,setEmailData,setInboxRead}) => {
 
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
const emailHandler = (data) => {
  setChecked({ email: true })
  setEmailData(data)
  setInboxRead(false)
}
  return (
    <Card
      className="w-75 mb-auto mt-4 mx-5"
      style={{ backgroundColor: "rgb(33,37,41)", color: "white" }}
    >
      <Card.Body>
        <ListGroup.Item className="mx-2 my-2">
          <ButtonGroup vertical className="w-100">
            <Button variant="outline-light" disabled={true}>
              <Container>
                <Row>
                  <Col>User</Col>
                  <Col>Subject</Col>
                  <Col>Remove</Col>
                </Row>
              </Container>
            </Button>
          </ButtonGroup>
        </ListGroup.Item>

        {outbox.length > 0 &&
          outbox.map((element, index, data) => {
            return (
              <ListGroup.Item className="mx-2 my-2" key={data[data.length - index - 1][0]}>
                <ButtonGroup vertical className="w-100">
                  <Button
                    variant="outline-light"
                    onClick={() => {
                      emailHandler(data[data.length - index - 1]);
                    }}
                  >
                    <Container>
                      <Row>
                        <Col>
                          <Stack   direction="horizontal" gap={5}>
                            {data[data.length - index - 1][1].receiverEmail}
                          </Stack>
                        </Col>
                        <Col>{data[data.length - index - 1][1].subject}</Col>
                        <Col>
                          <Button
                            variant="outline-secondary"
                            className="text-left"
                            onClick={(e) => { e.stopPropagation()
                              emailDeleteHandler(data[data.length - index - 1][0])}}
                          >
                            x
                          </Button>
                        </Col>
                      </Row>
                    </Container>
                  </Button>
                </ButtonGroup>
              </ListGroup.Item>
            );
          })}
      </Card.Body>
    </Card>
  );
};

export default OutBox;
