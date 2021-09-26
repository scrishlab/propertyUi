
import React, {useEffect} from "react";
import { useTable } from "react-table";
import usePropertyProfiles from "../hooks/use-property-profiles";
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
      debugger;
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
                    {columns.map((colHeader, k)=><td key={k}>{row[colHeader.accessor]}</td>)}
                </tr>
            );
        })}
      </tbody>
    </table>
  );
}