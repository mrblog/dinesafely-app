import React from 'react';

const GoogleMapsPlacesAutocompleteContext = React.createContext({
    prediction: null,
    updatePrediction: (prediction) => {}
}); 

export default GoogleMapsPlacesAutocompleteContext; 