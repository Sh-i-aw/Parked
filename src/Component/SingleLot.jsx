import Button from "react-bootstrap/Button";
import ReleaseVehicleForm from "./ReleaseVehicleForm";
import dayjs from "dayjs";
const relativeTime = require("dayjs/plugin/relativeTime");
const duration = require('dayjs/plugin/duration');

dayjs.extend(duration);
dayjs.extend(relativeTime);

function SingleLot (props) {
    const {showReleaseForm, lot, openForm, handleClose} = props
    console.log(`show is ${showReleaseForm} for lot ${lot.lotNumber}`);
    let status = lot.occupied ? "Not Empty" : "Empty";

    const timeElapsed = dayjs().diff(lot.entryTime, 'second');
    lot.duration =  dayjs.duration(timeElapsed, 'seconds').format('m[min] s[seconds]');


    return (
        <div>
            <h2>{lot.lotNumber}</h2>
            <p>{lot.plateNumber}</p>
            {lot.entryTime && <p>{lot.entryTime.toLocaleString()}</p>}
            <p>{status}</p>

            <br/>
            {
                lot.occupied ?
                    (<Button variant={"outline-info"} onClick={() => openForm(lot.lotNumber)}>$</Button>)
                    :
                    (<Button variant={"outline-info"} onClick={() => openForm(lot.lotNumber)}>+</Button>)
            }

            <ReleaseVehicleForm show={showReleaseForm} handleClose={handleClose} lot={lot}></ReleaseVehicleForm>
        </div>
    )
}

export default SingleLot;