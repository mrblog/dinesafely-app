import React, { useState } from 'react'; 
import { Switch, Route } from 'react-router-dom'; 
import * as ROUTES from '../../constants/routes'; 
import { NavigationBar } from '../NavigationBar'; 
import { Landing } from '../Landing'; 
import { AddPlace } from '../AddPlace';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import { Footer } from '../Footer'; 
import  { GoogleMapsPlacesAutocompleteContext } from '../GoogleMapsPlacesAutocomplete';
import Confirm from "../Confirm/Confirm";
import useGoogleAnalytics from "./googleanalytics";

const useStyles = makeStyles(theme => ({
    body: {
        marginTop: theme.spacing(16)
    }
}))

const Main = () => {
    const classes = useStyles(); 
    const [prediction, setPrediction] = useState(null);

    useGoogleAnalytics()

    return (
        <div>
            <NavigationBar/>
            <Container maxWidth="lg" className={classes.body}>
                <GoogleMapsPlacesAutocompleteContext.Provider
                    value={{
                        prediction,
                        updatePrediction: (prediction) => setPrediction(prediction)
                    }}
                >
                    <Switch>
                        <Route exact path={ROUTES.LANDING} component={Landing}/>
                        <Route path={ROUTES.ADD_PLACE} component={AddPlace}/>
                        <Route path={ROUTES.CONFIRM} component={Confirm}/>
                    </Switch>
                </GoogleMapsPlacesAutocompleteContext.Provider>
            </Container>
            <Footer/>
        </div>
    )
}

export default Main; 