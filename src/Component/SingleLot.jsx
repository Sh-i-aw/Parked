import Button from "react-bootstrap/Button";
import ReleaseVehicleForm from "./ReleaseVehicleForm";
import dayjs from "dayjs";
import {useEffect, useState} from "react";

const relativeTime = require("dayjs/plugin/relativeTime");
const duration = require('dayjs/plugin/duration');
const utc = require("dayjs/plugin/utc");
const timezone = require("dayjs/plugin/timezone");

dayjs.extend(duration);
dayjs.extend(relativeTime);
dayjs.extend(utc);
dayjs.extend(timezone);

function SingleLot (props) {
    const {showReleaseForm, lot, openForm, handleClose} = props

    const [timeElapsed, setTimeElapsed] = useState(dayjs().diff(lot.entryTime, 'second'));

    useEffect(() => {
        if (showReleaseForm){
            return;
        }
        const interval = setInterval(() => {
            setTimeElapsed(dayjs().diff(lot.entryTime, 'second'));
        }, 1000)

        return () => clearInterval(interval);
    }, [lot.entryTime, showReleaseForm]);

    let status = lot.occupied ? "Not Empty" : "Empty";

    // const timeElapsed = dayjs().diff(lot.entryTime, 'second');
    lot.duration =  dayjs.duration(timeElapsed, 'seconds').format('m[min] s[seconds]');

    const segment = Math.floor(timeElapsed / 30);
    lot.totalCharge = segment > 4 ? 2 : segment;

    return (
        <div>
            <h2>{lot.lotNumber}</h2>
            <p>{status}</p>
            <p>{lot.plateNumber}</p>
            {lot.entryTime && <p>{dayjs(lot.entryTime).tz("America/Toronto").format('YYYY-MM-DD HH:mm:ss')}</p>}
            {lot.occupied && <p>{lot.duration}</p>}

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