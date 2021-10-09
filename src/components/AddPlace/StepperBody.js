import { useContext } from 'react';
import { AddPlaceContext } from './context'; 
import { getStepContent } from './steps'; 

export default function StepperBody() {
    const context = useContext(AddPlaceContext); 
    return getStepContent(context.step)
}