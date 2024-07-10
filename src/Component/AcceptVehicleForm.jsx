import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from 'react-bootstrap/Form'
import {useState} from "react";
import '../App.css';
import dayjs from "dayjs";

function AcceptVehicleForm(props) {
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
            entryTime: dayjs(),
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
                  <Form.Group className={"mt-4"}>
                      <Form.Select onChange={handleLotChange} required>
                          <option defaultChecked={true} value={null}>Allocate lot to vehicle</option>
                          {
                            lots.map ((lot) => <option key={lot.lotNumber} disabled={lot.occupied} value={lot.lotNumber}>{lot.lotNumber}</option>)
                          }
                      </Form.Select>
                      {
                          invalid && <Form.Text> Must select a valid lot ! </Form.Text>
                      }
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

export default AcceptVehicleForm;