
import React, {useEffect, useState} from "react";
import usePropertyProfiles from "../hooks/use-property-profiles";
import TableCell from "./table-cell";
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import TextField from '@mui/material/TextField';


import MaterialTable from '@mui/material/Table';
import MaterialTableBody from '@mui/material/TableBody';
import MaterialTableCell from '@mui/material/TableCell';
import MaterialTableContainer from '@mui/material/TableContainer';
import MaterialTableHead from '@mui/material/TableHead';
import MaterialTableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const columns = [
    {
      Header: "Address",
      accessor: "address",
    },
    {
      Header: "Acres",
      accessor: "acres",
    },
    {
      Header: "Price",
      accessor: "price",
    },
    {
      Header: "Price Per Acre",
      accessor: "pricePerAcre",
    },
    // {
    //     Header: "Image",
    //     accessor: "pictures"
    // }
  ];

  
const PAGE_SIZE=10;
export default function table(){
    const [profiles, isLoading, error, getProfiles] = usePropertyProfiles([]);
    const [sortProperty, setSortProperty] = useState("pricePerAcre");
    const [sortDirection, setSortDirection] = useState(-1);//-1 is descending
    const [pageNumber, setPageNumber] = useState(1);
    const [filteredProfiles, setFilteredProfiles] = useState([]);
    const [filterByPoa, setFilterByPoa] = useState(false);
    const [filterOutPoa, setFilterOutPoa] = useState(false);
    const [filterByAddress, setFilterByAddress] = useState("");
    const [filterByMaxPrice, setFilterByMaxPrice] = useState(0);
    const [filterByMinAcres, setFilterByMinAcres] = useState(0);
    useEffect(()=>{
        //sort profiles, then setFilteredProfiles
        const sortFn = (first, second)=>{
            if(first[sortProperty]===second[sortProperty])return 0;
            if(!first[sortProperty])return 1;
            if(!second[sortProperty])return -1;
            return first[sortProperty] > second[sortProperty] ? 1*sortDirection : -1*sortDirection;
        };
        // const paged = sorted.slice(0, pageNumber*PAGE_SIZE);
        let filtered = profiles.filter((p,i)=>profiles.indexOf(profiles.find(pr=>pr.url===p.url))===i); //dedupe
        if(filterByPoa)filtered=filtered.filter(p=>!p.price);// filters out anything with a price, remaining is POA
        if(filterOutPoa)filtered=filtered.filter(p=>!!p.price);
        if(filterByAddress)filtered=filtered.filter(p=>!!p.address && p.address.toLowerCase().indexOf(filterByAddress.toLowerCase())>-1);
        if(filterByMaxPrice)filtered=filtered.filter(p=>!p.price || p.price<=filterByMaxPrice);
        if(filterByMinAcres)filtered=filtered.filter(p=>p.acres && p.acres >= filterByMinAcres);
        const sorted = filtered.sort(sortFn);
        setFilteredProfiles(sorted);
    }, [profiles, sortProperty, sortDirection, pageNumber, filterByPoa,filterByAddress,filterByMaxPrice,filterOutPoa,filterByMinAcres]);
    useEffect(() => {
        getProfiles();
    }, []);
    function sortClick(){
        if(sortProperty!==this)return setSortProperty(this) && setSortDirection(-1);
        setSortDirection(sortDirection*-1);
    }
    function filterByPoaClick(){
        setFilterByPoa(!filterByPoa);
    }
    function filterOutPoaClick(){
        setFilterOutPoa(!filterOutPoa);
    }
    function addressSearchChange(e){
        const value = e.target.value.replace('bt', '')
        setFilterByAddress("bt"+value);
    }
    function maxPriceChange(e){
        setFilterByMaxPrice(parseInt(e.target.value));
    }
    function minAcresChange(e){
        setFilterByMinAcres(parseInt(e.target.value));
    }
    return (
        <>
        <ButtonGroup variant="contained" aria-label="outlined primary button group">
          <Button variant="contained" onClick={filterByPoaClick}>{filterByPoa ? "filtering by poa" : "filter by poa"}</Button>
          <Button variant="contained" onClick={filterOutPoaClick}>{filterOutPoa ? "filtering Out poa" : "filter Out poa"}</Button>
        </ButtonGroup>
        <TextField label="BT search, just type number" variant="filled" onChange={addressSearchChange} />
        <TextField label="max price" variant="filled" type="number" onChange={maxPriceChange} />
        <TextField label="min acres" variant="filled" type="number" onChange={minAcresChange} />
        <p>Total Results: {filteredProfiles.length}</p>
        <MaterialTableContainer component={Paper}>
          <MaterialTable sx={{ minWidth: 650 }} aria-label="simple table">
            <MaterialTableHead>
              <MaterialTableRow>
                {columns.map((column, j) => (
                  <MaterialTableCell key={j} onClick={sortClick.bind(column.accessor)}>{column["Header"]}</MaterialTableCell>
                ))}
              </MaterialTableRow>
            </MaterialTableHead>
            <MaterialTableBody>
            {filteredProfiles.map((row, i) => {
                return (
                  <MaterialTableRow
                    key={row.name}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    {columns.map((colHeader, k)=><MaterialTableCell><TableCell key={k} colHeader={colHeader} row={row}></TableCell></MaterialTableCell>)}
                  </MaterialTableRow>
                );
            })}
            </MaterialTableBody>
          </MaterialTable>
        </MaterialTableContainer>
        
    </>
  );
}

// <table>
//         {isLoading ? (<h1>Loading..</h1>) : ""}
//       <thead>
//           <tr>
//             {columns.map((column, j) => (
//               <th key={j} onClick={sortClick.bind(column.accessor)}>{column["Header"]}</th>
//             ))}
//           </tr>
//       </thead>
//       <tbody>
//         {filteredProfiles.map((row, i) => {
//             return (
//                 <tr key={i}>
//                     {columns.map((colHeader, k)=><TableCell key={k} colHeader={colHeader} row={row}></TableCell>)}
//                 </tr>
//             );
//         })}
//       </tbody>
//     </table>