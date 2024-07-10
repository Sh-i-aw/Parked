import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import '../App.css';

function ReleaseVehicleForm (props) {
    const {lot, show, handleClose, releaseVehicle} = props;

    console.log(`Lot number is ${lot.lotNumber}`);

    const acceptAndRelease= () => {
        releaseVehicle(lot.lotNumber);
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
                <Modal.Title>{lot.plateNumber}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <label>Total Charge</label>
                <label>Parked Duration: </label>
            </Modal.Body>
            <Modal.Footer>
                <Button variant={"light"} onClick={handleClose}>
                    Cancel
                </Button>
                <Button variant={"info"} onClick={acceptAndRelease}>
                    Accept Payment
                </Button>
            </Modal.Footer>

        </Modal>
    )
}

export default ReleaseVehicleForm;