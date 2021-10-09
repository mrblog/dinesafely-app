import React from 'react';
import List from '@material-ui/core/List';
import PlacesListItem from './PlacesListItem'; 

const PlacesList = (props) => {
    const { places } = props; 
    return (
        <List>
            {places.map(place => (
                <PlacesListItem
                    place={place}
                />
            ))}
        </List>
    )
}

export default PlacesList; 