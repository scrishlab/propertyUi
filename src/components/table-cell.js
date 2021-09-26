import React from 'react';

export default function TableCell(props){
    const {colHeader, row} = props;
    return (
        <td>
            {colHeader.accessor=="address" ? 
                (<a href={row.url}>{row[colHeader.accessor]}</a>) :
                (<p>{row[colHeader.accessor]}</p>)
            }
            
        </td>
    )
}