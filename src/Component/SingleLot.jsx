
function SingleLot (props) {
    const {name, lot} = props

    let status = lot.occupied ? "Not Empty" : "Empty";

    return (
        <div>
            <h2>{name}</h2>
            <p>{lot.plateNumber}</p>
            {lot.timeParked && <p>{lot.timeParked.toLocaleString()}</p>}
            <p>{status}</p>

            <br/>

        </div>
    )
}

export default SingleLot;