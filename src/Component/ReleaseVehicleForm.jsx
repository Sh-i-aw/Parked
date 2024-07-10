import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from 'react-bootstrap/Form'
import {useState} from "react";
import '../App.css';

function ReleaseVehicleForm (props) {
    const {lots, show, handleClose, registerVehicle} = props;
    const [plateNumber, setPlateNumber] = useState('');
    const [selectedLot, setSelectedLot] = useState(null);
    const [invalid, setInvalid] = useState(false);

    const handlePlateNumberChange = (e) => setPlateNumber(e.target.value);
    const handleLotChange = (e) => {
        if (e.target.value !== null) {
            setInvalid(false);
        }
        setSelectedLot(e.target.value)
    };

    const submitRegistration = () => {
        if (!selectedLot) {
            setInvalid(true);
            return;
        }

        let parkedVehicle = {
            lot: selectedLot,
            plate : plateNumber,
            parkedTime: new Date(),
        }
        console.log(parkedVehicle);
        registerVehicle(parkedVehicle);

        setPlateNumber("");
        setSelectedLot("");
        setInvalid(false);
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
                  <Form.FloatingLabel label={}/>
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

export default ReleaseVehicleForm;