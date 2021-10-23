import React, {useContext, useEffect} from 'react';
import Typography from '@material-ui/core/Typography'; 
import Button from '@material-ui/core/Button'; 
import { useHistory } from 'react-router-dom'; 
import { makeStyles } from '@material-ui/core/styles';
import { AddPlaceContext } from './context';

const useStyles = makeStyles((theme) => ({
    button: {
        marginTop: theme.spacing(3)
    }
}));

export default function ThankYou() {
    const classes = useStyles(); 
    const history = useHistory();
    const addPlace = useContext(AddPlaceContext);

    const handleClick = () => history.go(0); // Reload page

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <React.Fragment>
            <Typography variant="h5" gutterBottom>
                Thanks!
            </Typography>
            <Typography variant="h6">
                Important - Further action is required to complete your submission!
                <br/>
                You should receive an email shortly, with a link to publish your submission.
                Be sure to check your spam for the email.
            </Typography>
            <Typography variant="subtitle1">
                Email sent to: <b>{addPlace.contactEmail}</b>
            </Typography>
            <Button
                variant="contained"
                color="secondary"
                onClick={handleClick}
                className={classes.button}
            >
                Add another grade
            </Button>
        </React.Fragment>
    )
}