import React from 'react';

const GoogleMapsPlacesAutocompleteContext = React.createContext({
    prediction: null,
    // eslint-disable-next-line no-unused-vars
    updatePrediction: (prediction) => {}
}); 

export default GoogleMapsPlacesAutocompleteContext; 