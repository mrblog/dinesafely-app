import React, { useContext } from 'react';
import { AddPlaceContext } from './context';
import IsAffiliatedCheckbox from './IsAffiliatedCheckbox';
import NotesTextField from './NotesTextField'; 
import Grid from '@material-ui/core/Grid'; 
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button'; 
import {GradeCheckboxGroup} from "../GradeOptions";
import GradeSelect from "../GradeSelect/GradeSelect";

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

export default function PlaceForm() {
    const classes = useStyles(); 
    const addPlace = useContext(AddPlaceContext); 

    const handleRatingChange = rating => addPlace.updateRating(rating);

    const handleOptionCheckedChange = state => addPlace.updateOptionCheckedState(state);

    return (
        <React.Fragment>
            <Grid container spacing={4}>
                <Grid item xs={12}>
                    <GradeSelect
                        status={addPlace.rating}
                        onChange={handleRatingChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <GradeCheckboxGroup
                        state={addPlace.optionCheckedState}
                        onChange={handleOptionCheckedChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <IsAffiliatedCheckbox/>
                </Grid>
                <Grid item xs={12}>
                    <NotesTextField/>
                </Grid>
            </Grid>
            <div className={classes.buttons}>
                <Button
                    onClick={() => addPlace.updateStep(addPlace.step - 1)}
                >
                    Back
                </Button>
                <div className={classes.spacer} />
                <Button
                    variant="contained"
                    color="secondary"
                    disabled={addPlace.rating <= 0}
                    onClick={() => addPlace.updateStep(addPlace.step + 1)}
                >
                    Next
                </Button>
            </div>
        </React.Fragment>
    )
}