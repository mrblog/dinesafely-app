import React from 'react';
import { INITIAL_STATE } from '../GradeOptions';

const AddPlaceContext = React.createContext({
    loading: false, 
    step: 0,
    googlePlacePrediction: null,
    staffMasks: false,
    customerMasks: false,
    outdoorSeating: false,
    vaccine: false,
    rating: 0,
    isAffiliated: false,
    contactName: '',
    contactEmail: '',
    optionCheckedState: INITIAL_STATE,
    notes: '',
    done: false,
    updateStep: (step) => {},
    updateStaffMasks: (flag) => {},
    updateCustomerMasks: (flag) => {},
    updateOutdoorSeating: (flag) => {},
    updateVaccine: (flag) => {},
    updateRating: (rating) => {},
    updateGooglePlacePrediction: (prediction) => {},
    updateIsAffiliated: (isAffiliated) => {},
    updateContactName: (name) => {},
    updateContactEmail: (email) => {},
    updateNotes: (notes) => {},
    updateOptionCheckedState: (state) => {},
    submit: () => {}
});

export const withAddPlace = Component => props => (
    <AddPlaceContext.Consumer>
        {(value) => <Component {...props} addPlaceContextValue={value} />}
    </AddPlaceContext.Consumer>
)

export default withAddPlace
export { AddPlaceContext }