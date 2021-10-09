import React, { useContext } from 'react';
import { AddPlaceContext } from './context'; 
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import { makeStyles } from '@material-ui/core/styles';
import { getSteps } from './steps'; 

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        marginBottom: theme.spacing(3),
        marginTop: theme.spacing(3),
    }
}));

export default function StepperProgress() {
    const classes = useStyles(); 
    const context = useContext(AddPlaceContext); 
    const steps = getSteps(); 

    return (
        <div className={classes.root}>
            <Stepper activeStep={context.step}>
                {steps.map(step => (
                    <Step key={step}>
                        <StepLabel>{step}</StepLabel>
                    </Step>
                ))}
            </Stepper>
        </div>
    )
}