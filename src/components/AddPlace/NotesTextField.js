import React, { useContext } from 'react';
import { AddPlaceContext } from './context';
import TextField from '@material-ui/core/TextField';

export default function NotesTextField() {
    const context = useContext(AddPlaceContext); 
    const handleChange = e => context.updateNotes(e.target.value); 

    return (
        <TextField
            label="Additional notes"
            variant="outlined"
            multiline
            rows={4}
            value={context.notes}
            onChange={handleChange}
            fullWidth
            disabled={context.loading}
            placeholder="This restaurant has outdoor seating but limited indoor seating."
            helperText="Please provide additional information that could help others."
        />
    )
}