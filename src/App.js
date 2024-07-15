import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";

import { Garage } from "./Component/Garage";
import SingleLot from "./Component/SingleLot";
import AcceptInGarageForm from "./Component/AcceptInGarageForm";

import { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { ReactComponent as Logo } from "./svg/parkedLogo.svg";

function App() {
	const [garage, setGarage] = useState(new Garage());
	const [showAcceptInGarageForm, setShowAcceptInGarageForm] = useState(false);
	const [showReleaseForm, setShowReleaseForm] = useState(0);
	const [showAcceptForm, setShowAcceptForm] = useState(0);
	const [lotToFree, setLotToFree] = useState(0);

	const handleShowAcceptForm = (e) => {
		e.target.blur();
		setShowAcceptInGarageForm(true);
	};
	const handleCloseAcceptInGarageForm = () => setShowAcceptInGarageForm(false);
	const handleCloseAcceptForm = () => setShowAcceptForm(0);
	const handleCloseReleaseForm = () => setShowReleaseForm(0);

	useEffect(() => {
		if (lotToFree === 0) return;

		releaseVehicleFromGarage();
	}, [lotToFree]);

	const releaseVehicleFromGarage = () => {
		const newLots = [...garage.lots];

		newLots[lotToFree - 1] = {
			...newLots[lotToFree - 1],
			occupied: false,
			plateNumber: "",
			entryTime: null,
			duration: 0,
			totalCharge: 0,
		};

		const newGarage = {
			...garage,
			lots: newLots,
			occupancy: garage.occupancy - 1,
			isFull: false,
		};

		setGarage(newGarage);
		setLotToFree(0);
	};

	const registerVehicleInGarage = (newVehicle) => {
		if (!newVehicle) {
			return;
		}
		const newLots = [...garage.lots];

		newLots[newVehicle.lotNumber - 1] = newVehicle;

		const newGarage = {
			...garage,
			lots: newLots,
			occupancy: garage.occupancy + 1,
			isFull: garage.occupancy + 1 === garage.capacity,
		};
		setGarage(newGarage);
	};

	const statusDisplayClass = garage.isFull ? "occupancyStatus full" : "occupancyStatus";

	return (
		<div className={"fullView"}>
			<div className={"navColumn"}>
				<Logo className={"parkedLogo"}></Logo>
				<h3 className={"garageTitle"}>Garage Status</h3>
				<div className={statusDisplayClass}>
					<p>Occupancy: {garage.occupancy} / 3</p>
					<p>{garage.isFull ? "Full" : "Available"}</p>
				</div>
				<button className={"navAcceptBtn"} onClick={handleShowAcceptForm} disabled={garage.isFull}>
					Accept Vehicle
				</button>
			</div>

			<div className={"lotArea"}>
				{garage.lots.map((lot) => {
					return (
						<SingleLot
							key={lot.lotNumber}
							shouldShowReleaseForm={showReleaseForm === lot.lotNumber}
							openReleaseForm={(lotToRelease) => setShowReleaseForm(lotToRelease)}
							closeReleaseForm={handleCloseReleaseForm}
							releaseVehicle={(lotToRelease) => setLotToFree(lotToRelease)}
							shouldShowAcceptForm={showAcceptForm === lot.lotNumber}
							openAcceptForm={(lotToAccept) => setShowAcceptForm(lotToAccept)}
							closeAcceptForm={handleCloseAcceptForm}
							registerVehicle={(vehicle) => registerVehicleInGarage(vehicle)}
							lot={lot}
						/>
					);
				})}
			</div>

			<AcceptInGarageForm
				show={showAcceptInGarageForm}
				handleClose={handleCloseAcceptInGarageForm}
				lots={garage.lots}
				submitRegistration={(vehicle) => registerVehicleInGarage(vehicle)}
			/>
		</div>
	);
}

export default App;
