
import React, {useEffect, useState} from "react";
import usePropertyProfiles from "../hooks/use-property-profiles";
import TableCell from "./table-cell";
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
    // {
    //     Header: "Image",
    //     accessor: "pictures"
    // }
  ];

  
const PAGE_SIZE=10;
export default function table(){
    const [profiles, isLoading, error, getProfiles] = usePropertyProfiles([]);
    const [sortProperty, setSortProperty] = useState("acres");
    const [sortDirection, setSortDirection] = useState(-1);//-1 is descending
    const [pageNumber, setPageNumber] = useState(1);
    const [filteredProfiles, setFilteredProfiles] = useState([]);
    useEffect(()=>{
        //sort profiles, then setFilteredProfiles
        const sortFn = (first, second)=>{
            if(first[sortProperty]==second[sortProperty])return 0;
            if(!first[sortProperty])return 1;
            if(!second[sortProperty])return -1;
            return first[sortProperty] > second[sortProperty] ? 1*sortDirection : -1*sortDirection;
        };
        // const paged = sorted.slice(0, pageNumber*PAGE_SIZE);
        const filtered = profiles.filter((p,i)=>profiles.indexOf(profiles.find(pr=>pr.url===p.url))===i); //dedupe
        const sorted = filtered.sort(sortFn);
        setFilteredProfiles(sorted);
    }, [profiles, sortProperty, sortDirection, pageNumber]);
    useEffect(() => {
        getProfiles();
    }, []);
    function sortClick(){
        if(sortProperty!=this)return setSortProperty(this) && setSortDirection(-1);
        setSortDirection(sortDirection*-1);
    }
    return (
        <table>
        {isLoading ? (<h1>Loading..</h1>) : ""}
      <thead>
          <tr>
            {columns.map((column, j) => (
              <th key={j} onClick={sortClick.bind(column.accessor)}>{column["Header"]}</th>
            ))}
          </tr>
      </thead>
      <tbody>
        {filteredProfiles.map((row, i) => {
            return (
                <tr key={i}>
                    {columns.map((colHeader, k)=><TableCell key={k} colHeader={colHeader} row={row}></TableCell>)}
                </tr>
            );
        })}
      </tbody>
    </table>
  );
}