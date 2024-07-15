export default function plateValidation(plateNumber) {
	const plateRegex = /^[A-Z0-9$]{2,8}$/i;
	return plateRegex.test(plateNumber);
}
