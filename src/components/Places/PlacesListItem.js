import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const PlacesListItem = (props) => {
    const { place } = props; 

    return (
        <ListItem>
            <ListItemText primary={place.name}/>
        </ListItem>
    )
}

export default PlacesListItem; 