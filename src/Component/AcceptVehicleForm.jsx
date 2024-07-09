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
              Enter vehicle info here.
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