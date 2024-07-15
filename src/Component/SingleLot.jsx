import ReleaseVehicleForm from "./ReleaseVehicleForm";
import AcceptVehicleForm from "./AcceptVehicleForm";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import React from "react";
import { ReactComponent as Vroom } from "../svg/vroom.svg";
import { ReactComponent as Clock } from "../svg/tik-tok.svg";

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

	// const timeElapsed = dayjs().diff(lot.entryTime, 'second');
	lot.duration = dayjs.duration(timeElapsed, "seconds").format("m[min] s[seconds]");

	const segment = Math.floor(timeElapsed / 30);
	lot.totalCharge = segment > 4 ? 4 : segment;

	const entryTime = dayjs(lot.entryTime).tz("America/Toronto");

	return (
		<div className={"lotTile"}>
			<div className={"lotHeader"}>A0{lot.lotNumber}</div>

			{lot.occupied && (
				<div className={"lotDetails"}>
					<Vroom class={"carIcon"}></Vroom>
					<p className={"plateNumber"}>{lot.plateNumber}</p>
					<div className={"timeStamp"}>
						<Clock className={"clockIcon"}></Clock>
						<p className={"days"}>{entryTime.format("YYYY-MM-DD")}</p>
						<p className={"hours"}>{entryTime.format("HH:mm:ss")}</p>
					</div>
					<p>{timeElapsed > 0 ? lot.duration : "loading..."}</p>
					<p>$ {lot.totalCharge ? lot.totalCharge : 0}</p>
				</div>
			)}

			<div className={"lotBtn"}>
				{lot.occupied ? (
					<button
						onClick={(e) => {
							e.target.blur();
							return openReleaseForm(lot.lotNumber);
						}}
					>
						$
					</button>
				) : (
					<button
						className={"acceptButton"}
						onClick={(e) => {
							e.target.blur();
							return openAcceptForm(lot.lotNumber);
						}}
					>
						+
					</button>
				)}
			</div>

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
