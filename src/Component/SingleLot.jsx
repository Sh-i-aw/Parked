import Button from "react-bootstrap/Button";
import ReleaseVehicleForm from "./ReleaseVehicleForm";

function SingleLot (props) {
    const {showReleaseForm, lot, handleOpen, handleClose} = props
    console.log(`show is ${showReleaseForm} for lot ${lot.lotNumber}`);
    let status = lot.occupied ? "Not Empty" : "Empty";

    const openForm = () => {
        handleOpen(lot.lotNumber);
    }

    return (
        <div>
            <h2>{lot.lotNumber}</h2>
            <p>{lot.plateNumber}</p>
            {lot.timeParked && <p>{lot.timeParked.toLocaleString()}</p>}
            <p>{status}</p>

            <br/>
            <Button variant={"outline-info"} onClick={openForm}> $ </Button>

            <ReleaseVehicleForm show={showReleaseForm} handleClose={handleClose} lot={lot}></ReleaseVehicleForm>
        </div>
    )
}

export default SingleLot;