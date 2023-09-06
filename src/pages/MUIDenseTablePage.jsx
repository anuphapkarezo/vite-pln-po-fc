import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useState, useEffect } from 'react';


function MUIDenseTablePage (){
    const [error , setError] = useState(null);
    const [computers , setComputers] = useState([]);
    const [runningNumber , setRunningNumber] = useState(1);

    const fetchData = async (userUpdateBy = "Anupab.K") => {
        try {
          const response = await fetch(`http://localhost:3002/api/computer-list?user_update_by=${userUpdateBy}`);
          if (!response.ok) {
            throw new Error('Network response was not OK');
          }
          const data = await response.json();
          setComputers(data);
          setRunningNumber(1); // Reset the running number to 1
        } catch (error) {
          console.error('Error fetching data:', error);
          setError('An error occurred while fetching data');
        }
    };
    useEffect(() => {
        fetchData();
      }, []);

    function createData(name, calories, fat, carbs, protein) {
        return { name, calories, fat, carbs, protein };
      }
      
    const rows = [
        createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
        createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
        createData('Eclair', 262, 16.0, 24, 6.0),
        createData('Cupcake', 305, 3.7, 67, 4.3),
        createData('Gingerbread', 356, 16.0, 49, 3.9),
    ];

    if (error) {
        return <div>Error: {error}</div>;
    }
    return(
        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>computer_type</TableCell>
            <TableCell align="right">computer_function</TableCell>
            <TableCell align="right">computer_name</TableCell>
            <TableCell align="right">factory</TableCell>
            <TableCell align="right">department</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {computers.map((row , index) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">{row.computer_type}</TableCell>
              <TableCell align="right">{row.computer_function}</TableCell>
              <TableCell align="right">{row.computer_name}</TableCell>
              <TableCell align="right">{row.factory}</TableCell>
              <TableCell align="right">{row.department}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    )
}
export default MUIDenseTablePage