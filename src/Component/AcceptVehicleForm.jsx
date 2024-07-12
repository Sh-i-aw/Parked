import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import '../App.css';
import Form from "react-bootstrap/Form";
import {useState} from "react";
import {Lot} from "./Lot";
import dayjs from "dayjs";

function AcceptVehicleForm (props) {
    const {show, lotNumber, closeForm} = props;

    const [plateNumber, setPlateNumber] = useState('');
    const handlePlateNumberChange = (e) => setPlateNumber(e.target.value);

    const submitRegistration = () => {
        return new Lot (
                lotNumber,
                true,
                plateNumber,
                dayjs()
                );
    }

    return (
        <Modal
          show={show}
          onHide={closeForm}
          backdrop={"static"}
          keyboard={false}
        >
            <Modal.Header closeButton>
                <Modal.Title> Accept A Vehicle in Lot {lotNumber}</Modal.Title>
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
                </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button variant={"light"} onClick={closeForm}>
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