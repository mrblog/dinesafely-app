import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const PlacesTable = (props) => {
    const { places } = props
    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell align="right">Google Place ID</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {places.map(place => (
                        <TableRow key={place.id}>
                            <TableCell>{place.name}</TableCell>
                            <TableCell align="right">{place.googlePlaceId}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default PlacesTable;