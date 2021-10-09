import React, { useContext } from 'react';
import { AddPlaceContext } from './context'; 
import { makeStyles } from '@material-ui/core/styles';
import { getSteps } from './steps'; 
import Button from '@material-ui/core/Button'; 

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'flex-end',
        marginTop: theme.spacing(3)
    },
    rightButton: {
        marginLeft: theme.spacing(1)
    },
    spacer: {
        flexGrow: 1
    }
}));

export default function StepperButtons() {
    const context = useContext(AddPlaceContext); 
    const classes = useStyles(); 
    const steps = getSteps(); 

    const handleNext = (e) => {
        //  Last step
        if (context.step === steps.length - 1) {
            context.submit()
        } else {
            let currentStep = context.step;
            context.updateStep(currentStep + 1); 
        }
    };

    const handleSkip = (e) => {
        var nextStep = context.step + 1; 
        if (nextStep >= getSteps().length) {
            nextStep = getSteps().length;
        }
        context.updateStep(nextStep); 
    }
    
    const handleBack = (e) => {
        let currentStep = context.step;
        context.updateStep(currentStep - 1); 
    };

    return (
        <div className={classes.root}>
            {context.step !== 0 && (
                <Button
                    onClick={handleBack}
                >
                    Back
                </Button>
            )}
            <div className={classes.spacer}/>
            {/* {context.step !== steps.length - 1 && (
                <Button
                    variant="contained"
                    className={classes.rightButton}
                    onClick={handleSkip}
                >
                    Skip
                </Button>
            )} */}
            <Button
                variant="contained"
                color="secondary"
                className={classes.rightButton}
                onClick={handleNext}
                disabled={context.loading}
            >
                {context.step === steps.length - 1 ? 'Submit' : 'Next'}
            </Button>
        </div>
    )
}