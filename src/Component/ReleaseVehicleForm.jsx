import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import '../App.css';
import React from 'react';

function ReleaseVehicleForm (props) {
    const {lot, show, closeForm, acceptAndRelease} = props;

    const release = () => {
        acceptAndRelease();
        closeForm();
    }

    return (
        <Modal
          show={show}
          onHide={closeForm}
          backdrop={"static"}
          keyboard={false}
        >
            <Modal.Header closeButton>
                <Modal.Title>{lot.lotNumber}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <label>Total Charge {`$${lot.totalCharge}`}</label>
                <br/>
                <label>Parked Duration {lot.duration}</label>
            </Modal.Body>
            <Modal.Footer>
                <Button variant={"light"} onClick={closeForm}>
                    Cancel
                </Button>
                <Button variant={"info"} onClick={release}>
                    Accept Payment
                </Button>
            </Modal.Footer>

        </Modal>
    )
}

export default ReleaseVehicleForm;