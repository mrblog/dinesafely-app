import React from 'react'; 
import ContactForm from './ContactForm'; 
import PlaceForm from './PlaceForm'; 
import GetStarted from './GetStarted'; 

export function getSteps() {
    return [
        "Get started",
        "Details",
        "Contact"
    ]
}

export function getStepContent(index) {
    switch(index) {
        case 0: 
            return <GetStarted/>
        case 1:
            return <PlaceForm/>
        case 2: 
            return <ContactForm/>
        default:
            throw new Error('Unknown step');
    }
}