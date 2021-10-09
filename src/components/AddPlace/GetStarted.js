import React, { useContext } from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';  
import { AddPlaceContext } from './context';
import { makeStyles } from '@material-ui/core/styles';
import { GoogleMapsPlacesAutocomplete } from '../GoogleMapsPlacesAutocomplete';

const useStyles = makeStyles((theme) => ({
    buttons: {
        display: 'flex',
        justifyContent: 'flex-end',
        marginTop: theme.spacing(3)
    },
    spacer: {
        flexGrow: 1
    }
}));

export default function GetStarted() {
    const addPlace = useContext(AddPlaceContext); 
    const classes = useStyles(); 

    return (
        <React.Fragment>
            <Typography variant="h5" gutterBottom>
                Let's get started!
            </Typography>
            <Typography variant="subtitle1">
                We're on a mission to get you the most updated information on your favorite places during COVID-19.
            </Typography>
            <GoogleMapsPlacesAutocomplete
                onChange={(prediction) => addPlace.updateGooglePlacePrediction(prediction)}
            />
            <div className={classes.buttons}>
                <div className={classes.spacer}/>
                <Button
                    variant="contained"
                    color="secondary"
                    disabled={addPlace.googlePlacePrediction ? false : true}
                    onClick={() => addPlace.updateStep(addPlace.step + 1)}
                >
                    Next
                </Button>
            </div>
        </React.Fragment>
    )
}