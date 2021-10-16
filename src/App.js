import Table from './components/table';
import PersistentDrawerLeft from './components/navigation';
import React, {useState} from "react";
import './App.css';
import {RESIDENTIAL_SALE, RESIDENTIAL_RENT, LAND_SALE} from "./util/constants";

function App() {
  const [browsingPropertyType, setPropertyType] = useState(RESIDENTIAL_SALE);
  return (
    <div className="App">
      <PersistentDrawerLeft setPropertyType={setPropertyType}>
        <header className="App-header">
          <h1>Searching: {browsingPropertyType.display}</h1>
        </header>
        <div style={{padding:`${30}px`}}>
          <Table browsingPropertyType={browsingPropertyType}></Table>
        </div>
      </PersistentDrawerLeft>
    </div>
  );
}

export default App;
