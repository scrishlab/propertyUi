import React from 'react';

export default function TableCell(props){
    const {colHeader, row} = props;
    const AddressRow = ()=>(<a href={row.url}>{row[colHeader.accessor]}</a>);
    const DefaultRow = ()=>(<p>{row[colHeader.accessor]}</p>);
    // const ImageRow = ()=>row[colHeader.accessor].length>0 ? (<img style={{height:"80px"}} src={row[colHeader.accessor][0]}/>) : "";
    let component = DefaultRow;
    if(colHeader.accessor=="address") component=AddressRow;
    // if(colHeader.accessor=="pictures") component=ImageRow;
    return (
        <td>
            {component()}
            
        </td>
    )
}