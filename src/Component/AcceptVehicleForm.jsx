import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import { Lot } from "./Lot";
import dayjs from "dayjs";
import React from "react";
import plateValidation from "../helper/plateValidation";

function AcceptVehicleForm(props) {
	const { show, lotNumber, closeForm, submitRegistration } = props;

	const [plateNumber, setPlateNumber] = useState("");
	const [plateIsValid, setPlateIsValid] = useState(true);
	const [disableSubmit, setDisableSubmit] = useState(true);

	const handleKeyPress = (e) => {
		if (e.key === "Enter") {
			e.preventDefault();
		}
	};
	const closeFormAndClear = () => {
		closeForm();
		setPlateIsValid(true);
		setDisableSubmit(true);
	};

	const handlePlateNumberChange = (e) => {
		const isValid = plateValidation(e.target.value);
		setPlateIsValid(isValid);
		setDisableSubmit(!isValid);
		setPlateNumber(e.target.value);
	};

	const createNewRegistration = () => {
		closeForm();
		setDisableSubmit(true);
		return new Lot(lotNumber, true, plateNumber, dayjs());
	};

	return (
		<Modal show={show} onHide={closeForm} backdrop={"static"} keyboard={false}>
			<Modal.Header>
				<Modal.Title> Accept A Vehicle in Lot {lotNumber}</Modal.Title>
			</Modal.Header>

			<Modal.Body>
				<Form>
					<Form.Group>
						<Form.Label>License Plate</Form.Label>
						<Form.Control
							type="text"
							onChange={handlePlateNumberChange}
							onKeyPress={handleKeyPress}
							placeholder={"Enter license plate"}
						/>
						{!plateIsValid && "2-8 alphanumeric characters, '$' allowed"}
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

export default AcceptVehicleForm;
