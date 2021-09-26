
import React, {useEffect} from "react";
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
  ];

  

export default function table(){
    const [profiles, isLoading, error, getProfiles] = usePropertyProfiles([]);
      useEffect(() => {
        getProfiles();
      }, []);
    return (
        <table>
      <thead>
          <tr>
            {columns.map((column, j) => (
              <th key={j}>{column["Header"]}</th>
            ))}
          </tr>
      </thead>
      <tbody>
        {profiles.map((row, i) => {
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