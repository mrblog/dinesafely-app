import React, { useContext } from 'react';
import Pagination from '@material-ui/lab/Pagination';
import { PlacesContext } from './context'; 

export default function PlacesListPagination() {
    const places = useContext(PlacesContext); 

    const handleChange = (e, page) => places.updatePage(page);  

    return (
        <Pagination 
            count={10}
            onChange={handleChange}
            page={places.page}
        />
    )
}