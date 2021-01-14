import React from 'react';
import {Table} from 'react-bootstrap';

const Records = ({records, keysArr, loading}) => {
    if(loading) {
        return <h2>Loading...</h2>;
    }

    return (
        <Table striped bordered hover responsive>
        <thead>
            <tr>
            {/* <th>#</th> */}
            {keysArr.map((keyName, index) => (
                <th key={index}>{keyName}</th>
            ))}
            </tr>
        </thead>
        <tbody>
            {records.map((each, index) => (
            <tr key={index}>
                {/* <td>{index + 1}</td> */}
                {Object.entries(each).map(([keyName, val], index) => ( 
                <td key={index}>{val}</td>
                ))}
            </tr>
            ))}
        </tbody>
        </Table>
    );
};

export default Records; 