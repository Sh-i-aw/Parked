import logo from './logo.svg';
import Car from './Component/Lot'
import './App.css';
import {useState} from "react";
import SingleLot from "./Component/SingleLot";

function App() {
  const [garageFull, setGarageFull] = useState(false);
  const [first, setFirst] = useState({});
  const [second, setSecond] = useState({});
  const [third, setThird] = useState({});

    function isEmptyLot (lot) {
        return Object.keys(lot).length === 0;
    }

  return (
      <>
          <SingleLot name={"First lot"} lot={first}></SingleLot>
          <SingleLot name={"Second Lot"} lot={second}></SingleLot>
          <SingleLot name={"Third Lot"} lot={third}></SingleLot>
      </>
      // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
  );
}

export default App;
