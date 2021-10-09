import React, { useState, useContext } from 'react';
import { AddPlaceContext } from './context';
import SubmitResponseSnackbar from './SubmitResponseSnackbar'; 
import { makeStyles } from '@material-ui/core/styles';
import StepperProgress from './StepperProgress';
import StepperBody from './StepperBody'; 
import Container from '@material-ui/core/Container'; 
import Backdrop from '@material-ui/core/Backdrop'; 
import CircularProgress from '@material-ui/core/CircularProgress';
import Paper from '@material-ui/core/Paper';
import ThankYou from './ThankYou'; 
import Typography from '@material-ui/core/Typography';
import * as SCORE_CONSTANTS from '../../constants/score';
import { INITIAL_STATE } from '../GradeOptions';
import {ScoreApiContext} from "../ScoreApi";

const useStyles = makeStyles(theme => ({
    form: {
        width: '100%',
        marginTop: theme.spacing(3)
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff'
    },
    paper: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
            marginTop: theme.spacing(6),
            marginBottom: theme.spacing(6),
            padding: theme.spacing(3),
        },
    },
    submit: {
        margin: theme.spacing(3, 0, 2)
    }
})) 

export default function AddPlace() {
    const classes = useStyles();
    const api = useContext(ScoreApiContext);

    const [loading, setLoading] = useState(false); 
    const [googlePlacePrediction, setGooglePlacePrediction] = useState(null); 
    const [rating, setRating] = useState(-1);
    const [step, setStep] = useState(0); 
    const [isAffiliated, setIsAffiliated] = useState(false);
    const [contactName, setContactName] = useState(''); 
    const [contactEmail, setContactEmail] = useState(''); 
    const [notes, setNotes] = useState(''); 
    const [snackbarMessage, setSnackbarMessage] = useState(''); 
    const [snackbarOpen, setSnackbarOpen] = useState(false); 
    const [optionCheckedState, setOptionCheckedState] = useState(INITIAL_STATE);
    const [done, setDone] = useState(false); 

    const handleSubmit = () => {
        setLoading(true);

        console.log("handleSubmit optionCheckedState: "+JSON.stringify(optionCheckedState, null, ' '));
        api.postScore(
            contactEmail.toLowerCase(), // email
            contactName, // handle
            googlePlacePrediction.place_id, // place_id
            googlePlacePrediction.structured_formatting.main_text, // name
            optionCheckedState[SCORE_CONSTANTS.STAFF_MASKS.ID], // staff_masks
            optionCheckedState[SCORE_CONSTANTS.CUSTOMER_MASKS.ID], // customer_masks
            optionCheckedState[SCORE_CONSTANTS.OUTDOOR_SEATING.ID], // outdoor_seating
            optionCheckedState[SCORE_CONSTANTS.VACCINE.ID], // vaccine
            rating,
            notes,
            isAffiliated // is_affiliated
        ).then(() => {
            setLoading(false);
            setDone(true);
            setSnackbarMessage("Grade successfully queued");
            setSnackbarOpen(true);

        }).catch(error => {
            console.log("Error posting score: ", error)
            setLoading(false)
            setSnackbarMessage("Something went wrong");
            setSnackbarOpen(true);

        })

        /*firebase.places().add({
            [CONSTANTS.MAIN_TEXT]: googlePlacePrediction.structured_formatting.main_text,
            [CONSTANTS.SECONDARY_TEXT]: googlePlacePrediction.structured_formatting.secondary_text,
            [CONSTANTS.GOOGLE_PLACE_ID]: googlePlacePrediction.place_id,
            [CONSTANTS.STATUS]: status,
            [CONSTANTS.REOPENING_DATE]: openingDate,
            [CONSTANTS.IS_AFFILIATED]: isAffiliated,
            [CONSTANTS.CONTACT]: {
                [CONSTANTS.NAME]: contactName,
                [CONSTANTS.EMAIL]: contactEmail
            },
            [CONSTANTS.TYPES]: typeCheckedState,
            [CONSTANTS.NOTES]: notes
        })
        .then(function(docRef) {
            setLoading(false);  
            setDone(true); 
            setSnackbarMessage("Place successfully added");
            setSnackbarOpen(true); 
        })
        .catch(function(error) {
            console.log("Error adding place: ", error); 
            setLoading(false); 
            setSnackbarMessage("Error adding place");
            setSnackbarOpen(true); 
        })*/
    }

    const handleSnackbarClose = () => setSnackbarOpen(false); 

    return (
        <AddPlaceContext.Provider 
            value={{
                loading,
                step, 
                googlePlacePrediction,
                rating,
                isAffiliated,
                contactName, 
                contactEmail, 
                optionCheckedState,
                notes,
                done,
                updateStep: (step) => setStep(step),
                updateGooglePlacePrediction: (prediction) => setGooglePlacePrediction(prediction),
                updateRating: (rating) => setRating(rating),
                updateIsAffiliated: (isAffiliated) => setIsAffiliated(isAffiliated),
                updateContactName: (name) => setContactName(name),
                updateContactEmail: (email) => setContactEmail(email),
                updateNotes: (notes) => setNotes(notes),
                updateOptionCheckedState: (state) => setOptionCheckedState(state),
                submit: handleSubmit
            }}
        >
            <Container maxWidth="sm">
                <Paper className={classes.paper}>
                    <Typography component="h1" variant="h4" align="center">
                        Add a grade
                    </Typography>
                    <React.Fragment>
                        {done ? <ThankYou/>
                            : 
                            <React.Fragment>
                                <StepperProgress/>
                                <StepperBody/>
                            </React.Fragment>
                        }
                    </React.Fragment>
                </Paper>
            </Container>
            <Backdrop className={classes.backdrop} open={loading}>
                <CircularProgress color="inherit"/>
            </Backdrop>
            <SubmitResponseSnackbar
                message={snackbarMessage}
                open={snackbarOpen}
                onClose={handleSnackbarClose}  
            />
        </AddPlaceContext.Provider>
    )
}