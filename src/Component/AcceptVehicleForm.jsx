import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from 'react-bootstrap/Form'
import {useState} from "react";
import {Lot} from "./Lot";

function SingleLot (props) {
    const {lots, show, handleClose, registerVehicle} = props;
    const [plateNumber, setPlateNumber] = useState('');
    const [selectedLot, setSelectedLot] = useState('');

    const handlePlateNumberChange = (e) => setPlateNumber(e.target.value);
    const handleLotChange = (e) => setSelectedLot(e.target.value);

    const submitRegistration = () => {
        let parkedVehicle = {
            lot: selectedLot,
            plate : plateNumber,
            parkedTime: new Date(),
        }
        console.log(parkedVehicle);
        debugger;
        registerVehicle(parkedVehicle);

        setPlateNumber("");
        setSelectedLot("");
        handleClose();
    }

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
                      <Form.Control type="text" onChange={handlePlateNumberChange} placeholder={"Enter license plate"}/>
                  </Form.Group>
                  <Form.Group className={"mt-4"}>
                      <Form.Select onChange={handleLotChange}>
                          <option>Allocate lot to vehicle</option>
                          {
                            lots.map ((lot, index) => <option disabled={lot.occupied} value={index + 1}>{index + 1}</option>)
                          }
                      </Form.Select>
                  </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant={"light"} onClick={handleClose}>
                    Cancel
                </Button>
                <Button variant={"info"} onClick={submitRegistration}>
                    Register
                </Button>
            </Modal.Footer>

        </Modal>
    )
}

export default SingleLot;