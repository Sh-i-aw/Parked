import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from 'react-bootstrap/Form'

function SingleLot (props) {
  const {show, handleClose} = props;

  return (
      <Modal
          show={show}
          onHide={handleClose}
          backdrop={"static"}
          keyboard={false}
      >
          <Modal.Header closeButton>
              <Modal.Title>Register a vehicle</Modal.Title>
          </Modal.Header>

          <Modal.Body>
              <Form>
                  <Form.Group>
                      <Form.Label>License Plate</Form.Label>
                      <Form.Control type="text" placeholder={"Enter license plate"}/>
                  </Form.Group>
                  <Form.Group>
                      <Form.Label>Select Lot</Form.Label>
                      <Form.Select>
                          <option>Allocate lot to vehicle</option>
                          <option value="1">One</option>
                          <option value="2">Two</option>
                          <option value="3">Three</option>
                      </Form.Select>
                  </Form.Group>
              </Form>
          </Modal.Body>
          <Modal.Footer>
              <Button variant={"info"} onClick={handleClose}>
                  Complete
              </Button>
          </Modal.Footer>

      </Modal>
  )
}

export default SingleLot;