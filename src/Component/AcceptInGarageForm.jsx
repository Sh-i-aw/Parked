import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import "../App.css";
import dayjs from "dayjs";
import { Lot } from "./Lot";
import React from "react";
import plateValidation from "../helper/plateValidation";

function AcceptInGarageForm(props) {
	const { lots, show, handleClose, submitRegistration } = props;

	const [plateNumber, setPlateNumber] = useState("");
	const [plateIsValid, setPlateIsValid] = useState(true);
	const [disableSubmit, setDisableSubmit] = useState(true);

	const [selectedLot, setSelectedLot] = useState("");
	const [isLotValid, setIsLotValid] = useState(true);

	const handleKeyPress = (e) => {
		if (e.key === "Enter") {
			e.preventDefault();
		}
	};

	const closeFormAndClear = () => {
		handleClose();
		setPlateIsValid(true);
		setIsLotValid(true);
		setDisableSubmit(true);
	};

	const handlePlateNumberChange = (e) => {
		const isValid = plateValidation(e.target.value);
		setPlateIsValid(isValid);
		setDisableSubmit(!isValid);
		setPlateNumber(e.target.value);
	};

	const handleLotChange = (e) => {
		const lotValid = e.target.value !== "";
		setIsLotValid(lotValid);
		setDisableSubmit(!lotValid);
		setSelectedLot(e.target.value);
	};

	const createNewRegistration = () => {
		if (selectedLot === "") {
			setIsLotValid(false);
			setDisableSubmit(true);
			return null;
		}

		if (plateNumber === "") {
			setPlateIsValid(false);
			setDisableSubmit(true);
			return null;
		}

		setPlateNumber("");
		setSelectedLot("");
		setIsLotValid(true);
		setPlateIsValid(true);
		setDisableSubmit(true);
		handleClose();

		return new Lot(selectedLot, true, plateNumber, dayjs());
	};

	return (
		<Modal show={show} onHide={handleClose} backdrop={"static"} keyboard={false}>
			<Modal.Header>
				<Modal.Title>Register a vehicle</Modal.Title>
			</Modal.Header>

			<Modal.Body>
				<Form>
					<Form.Group>
						<Form.Label>License Plate</Form.Label>
						<Form.Control
							type="text"
							onKeyPress={handleKeyPress}
							onChange={handlePlateNumberChange}
							placeholder={"Enter license plate"}
						/>
						{!plateIsValid && "2-8 alphanumeric characters, '$' allowed"}
					</Form.Group>
					<Form.Group className={"mt-4"}>
						<Form.Select onChange={handleLotChange} required>
							<option defaultChecked={true} value={""}>
								Allocate lot to vehicle
							</option>
							{lots.map((lot) => (
								<option key={lot.lotNumber} disabled={lot.occupied} value={lot.lotNumber}>
									{lot.lotNumber}
								</option>
							))}
						</Form.Select>
						{!isLotValid && <p> Must select a valid lot ! </p>}
					</Form.Group>
				</Form>
			</Modal.Body>
			<Modal.Footer>
				<Button variant={"light"} onClick={closeFormAndClear}>
					Cancel
				</Button>
				<Button
					disabled={disableSubmit}
					variant={"info"}
					onClick={() => submitRegistration(createNewRegistration())}
				>
					Register
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default AcceptInGarageForm;
