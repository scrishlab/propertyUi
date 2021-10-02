import Table from './components/table';
import React from "react";
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Property Search</h1>
      </header>
      <div style={{padding:`${30}px`}}>
        <Table></Table>
      </div>
    </div>
  );
}

export default App;
