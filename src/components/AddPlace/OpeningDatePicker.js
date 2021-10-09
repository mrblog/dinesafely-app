import React, { useContext } from 'react';
import { AddPlaceContext } from './context';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';

export default function OpeningDatePicker() {
    const context = useContext(AddPlaceContext); 
    const handleChange = (date) => context.updateOpeningDate(date);

    return (
        <FormControl fullWidth>
            
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                    disabled={context.loading}
                    fullWidth
                    disableToolbar
                    format="MM/dd/yyyy"
                    margin="normal"
                    label="Reopening day"
                    value={context.openingDate}
                    onChange={handleChange}
                    KeyboardButtonProps={{
                        'aria-label': 'change date',
                    }}
                />
            </MuiPickersUtilsProvider>
            <FormHelperText>We understand it's hard to determine an exact date during these times. If there's no date set yet, make an estimate and we'll contact you a week before that date to confirm.</FormHelperText>
        </FormControl>
    )
}