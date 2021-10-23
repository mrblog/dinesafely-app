import React, {useContext, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AddPlaceContext} from './context'; 
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography'; 
import Button from '@material-ui/core/Button'; 

const useStyles = makeStyles((theme) => ({
    field: {
        marginTop: theme.spacing(3)
    },
    buttons: {
        display: 'flex',
        justifyContent: 'flex-end',
        marginTop: theme.spacing(3)
    },
    spacer: {
        flexGrow: 1
    }
}));

export default function ContactForm() {
    const context = useContext(AddPlaceContext); 
    const classes = useStyles(); 

    const handleNameChange = e => context.updateContactName(e.target.value); 
    const handleEmailChange = e => context.updateContactEmail(e.target.value); 

    const emailIsValid = email => {
        return email = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)
    }

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <React.Fragment>
            <Typography variant="h5" gutterBottom>
                Contact information
            </Typography>
            <Typography variant="h6">
                A valid email address is required to complete your submission. You will receive a confirmation
                email to complete your submission. Your email will not be displayed on the site.
                In the future, the name you provide below may be displayed with your comments.
            </Typography>
            <Typography variant="subtitle1">
                We may also reach out to you on rare occasions, such as to check in and get your feedback.
            </Typography>
            <FormControl fullWidth disabled={context.loading} className={classes.field}>
                <TextField label="Name" variant="outlined" onChange={handleNameChange} />
            </FormControl>
            <FormControl fullWidth disabled={context.loading} className={classes.field}>
                <TextField label="Email" variant="outlined"
                           type="email"
                           onChange={handleEmailChange} />
            </FormControl>
            <div className={classes.buttons}>
                <Button
                    onClick={() => context.updateStep(context.step - 1)}
                >
                    Back
                </Button>
                <div className={classes.spacer} />
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => context.submit()}
                    disabled={context.loading || !context.contactName || !emailIsValid(context.contactEmail)}
                >
                    Done
                </Button>
            </div>
        </React.Fragment>
    )
}