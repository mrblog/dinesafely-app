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
    // eslint-disable-next-line no-unused-vars
    updateStep: (step) => {},
    // eslint-disable-next-line no-unused-vars
    updateStaffMasks: (flag) => {},
    // eslint-disable-next-line no-unused-vars
    updateCustomerMasks: (flag) => {},
    // eslint-disable-next-line no-unused-vars
    updateOutdoorSeating: (flag) => {},
    // eslint-disable-next-line no-unused-vars
    updateVaccine: (flag) => {},
    // eslint-disable-next-line no-unused-vars
    updateRating: (rating) => {},
    // eslint-disable-next-line no-unused-vars
    updateGooglePlacePrediction: (prediction) => {},
    // eslint-disable-next-line no-unused-vars
    updateIsAffiliated: (isAffiliated) => {},
    // eslint-disable-next-line no-unused-vars
    updateContactName: (name) => {},
    // eslint-disable-next-line no-unused-vars
    updateContactEmail: (email) => {},
    // eslint-disable-next-line no-unused-vars
    updateNotes: (notes) => {},
    // eslint-disable-next-line no-unused-vars
    updateOptionCheckedState: (state) => {},
    submit: () => {}
});

// eslint-disable-next-line react/display-name
export const withAddPlace = Component => props => (
    <AddPlaceContext.Consumer>
        {(value) => <Component {...props} addPlaceContextValue={value} />}
    </AddPlaceContext.Consumer>
)

export default withAddPlace
export { AddPlaceContext }