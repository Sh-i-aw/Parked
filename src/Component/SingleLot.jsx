import Button from "react-bootstrap/Button";
import ReleaseVehicleForm from "./ReleaseVehicleForm";
import AcceptVehicleForm from "./AcceptVehicleForm";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import React from "react";

const relativeTime = require("dayjs/plugin/relativeTime");
const duration = require("dayjs/plugin/duration");
const utc = require("dayjs/plugin/utc");
const timezone = require("dayjs/plugin/timezone");

dayjs.extend(duration);
dayjs.extend(relativeTime);
dayjs.extend(utc);
dayjs.extend(timezone);

function SingleLot(props) {
	const {
		shouldShowReleaseForm,
		openReleaseForm,
		closeReleaseForm,
		releaseVehicle,
		shouldShowAcceptForm,
		openAcceptForm,
		closeAcceptForm,
		registerVehicle,
		lot,
	} = props;

	const [timeElapsed, setTimeElapsed] = useState(0);

	useEffect(() => {
		if (shouldShowReleaseForm) {
			return;
		}
		const interval = setInterval(() => {
			setTimeElapsed(dayjs().diff(lot.entryTime, "second"));
		}, 1000);

		return () => clearInterval(interval);
	}, [lot.entryTime, shouldShowReleaseForm]);

	let status = lot.occupied ? "Not Empty" : "Empty";

	// const timeElapsed = dayjs().diff(lot.entryTime, 'second');
	lot.duration = dayjs.duration(timeElapsed, "seconds").format("m[min] s[seconds]");

	const segment = Math.floor(timeElapsed / 30);
	lot.totalCharge = segment > 4 ? 2 : segment;

	return (
		<div className={"lotTile"}>
			<h2>{lot.lotNumber}</h2>
			<p>{status}</p>
			<p>{lot.plateNumber}</p>
			{lot.occupied && (
				<p>{dayjs(lot.entryTime).tz("America/Toronto").format("YYYY-MM-DD HH:mm:ss")}</p>
			)}
			{timeElapsed > 0 && <p>{lot.duration}</p>}

			<br />
			{lot.occupied ? (
				<Button variant={"info"} onClick={() => openReleaseForm(lot.lotNumber)}>
					$
				</Button>
			) : (
				<Button variant={"info"} onClick={() => openAcceptForm(lot.lotNumber)}>
					+
				</Button>
			)}

			<ReleaseVehicleForm
				show={shouldShowReleaseForm}
				closeForm={closeReleaseForm}
				acceptAndRelease={() => releaseVehicle(lot.lotNumber)}
				lot={lot}
			></ReleaseVehicleForm>

			<AcceptVehicleForm
				show={shouldShowAcceptForm}
				closeForm={closeAcceptForm}
				lotNumber={lot.lotNumber}
				submitRegistration={(newVehicle) => registerVehicle(newVehicle)}
			></AcceptVehicleForm>
		</div>
	);
}

export default SingleLot;
