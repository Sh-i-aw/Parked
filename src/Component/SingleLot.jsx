
function SingleLot (props) {
    const {name, lot} = props
    function isEmptyLot (lot) {
        return Object.keys(lot).length === 0;
    }

    let status = isEmptyLot(lot) ? "Empty" : "Not Empty";
    return (
        <div>
            <h2>{name}</h2>
            <p>{status}</p>

            <br/>
        </div>
    )
}

export default SingleLot;