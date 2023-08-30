import { useDispatch, useSelector } from "react-redux";
import Card from "react-bootstrap/Card";
import { Button, Col, Container, Row, Stack } from "react-bootstrap";
import ListGroup from "react-bootstrap/ListGroup";
import { emailActions } from "../store/emails";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Badge from "react-bootstrap/Badge";

const Inbox = ({ setChecked, setEmailData ,setInboxRead}) => {
  const dispatch = useDispatch();
  const inbox = useSelector((state) => state.email.inbox);

  const emailDeleteHandler = async (id) => {
    const email = localStorage.getItem("email").replace(/[@.]/g, "");
    try {
      const response = await fetch(
        `https://mail-box-client-56393-default-rtdb.firebaseio.com/${email}/received/${id}.json`,
        {
          method: "DELETE",
          body: JSON.stringify(id),
          headers: { "Content-Type": "application/json" },
        }
      );
      dispatch(emailActions.deleteInboxEmail(id));
    } catch (error) {}
  };
  const emailHandler = (data) => {
    setChecked({ email: true });
    setEmailData(data);
    setInboxRead(true);
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

        {inbox.length > 0 &&
          inbox.map((element, index, data) => {
            return (
              <ListGroup.Item className="mx-2 my-2">
                <ButtonGroup vertical className="w-100">
                  <Button
                    variant="outline-light"
                    onClick={() => {
                      emailHandler(data[data.length - index - 1]);
                    }}
                  >
                    <Container>
                      <Row key={data[data.length - index - 1][0]}>
                        <Col>
                          <Stack direction="horizontal" gap={5}>
                            {!data[data.length - index - 1][1].read && (
                              <Badge bg="primary"> </Badge>
                            )}
                            {data[data.length - index - 1][1].senderEmail}
                          </Stack>
                        </Col>
                        <Col>{data[data.length - index - 1][1].subject}</Col>
                        <Col>
                          <Button
                            variant="outline-secondary"
                            className="text-left"
                            onClick={(e) => {
                              e.stopPropagation();
                              emailDeleteHandler(data[data.length - index - 1][0]);
                            }}
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

export default Inbox;
