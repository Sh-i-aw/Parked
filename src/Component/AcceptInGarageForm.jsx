import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from 'react-bootstrap/Form'
import {useState} from "react";
import '../App.css';
import dayjs from "dayjs";
import {Lot} from "./Lot";

function AcceptInGarageForm(props) {
    const {lots, show, handleClose, submitRegistration} = props;
    const [plateNumber, setPlateNumber] = useState("");
    const [selectedLot, setSelectedLot] = useState("");
    const [invalid, setInvalid] = useState(false);


    const handlePlateNumberChange = (e) => setPlateNumber(e.target.value);
    const handleLotChange = (e) => {
        if (e.target.value !== null) {
            setInvalid(false);
        }
        setSelectedLot(e.target.value)
    };

    const cancelRegistration = () => {
        setInvalid(false);
        handleClose();
    }

    const createNewRegistration = () => {
        if (selectedLot === "") {
            setInvalid(true);
            return null;
        }

        setPlateNumber("");
        setSelectedLot("");
        setInvalid(false);
        handleClose();

        return new Lot (
            selectedLot,
            true,
            plateNumber,
            dayjs()
        );
    }

    return (
        <Modal
          show={show}
          onHide={handleClose}
          backdrop={"static"}
          keyboard={false}
        >
            <Modal.Header>
              <Modal.Title>Register a vehicle</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form>
                  <Form.Group>
                      <Form.Label>License Plate</Form.Label>
                      <Form.Control type="text"
                                    onChange={handlePlateNumberChange}
                                    placeholder={"Enter license plate"}
                      />
                  </Form.Group>
                  <Form.Group className={"mt-4"}>
                      <Form.Select onChange={handleLotChange} required>
                          <option defaultChecked={true}>Allocate lot to vehicle</option>
                          {
                            lots.map ((lot) => <option key={lot.lotNumber} disabled={lot.occupied} value={lot.lotNumber}>{lot.lotNumber}</option>)
                          }
                      </Form.Select>
                      { invalid && <p> Must select a valid lot ! </p> }
                  </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant={"light"} onClick={cancelRegistration}>
                    Cancel
                </Button>
                <Button variant={"info"} onClick={() => submitRegistration(createNewRegistration())}>
                    Register
                </Button>
            </Modal.Footer>

        </Modal>
    )
}

export default AcceptInGarageForm;