import React from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { options } from './options';

export default function OptionSelect(props) {
    const { option, onChange } = props;

    const handleChange = e => onChange(e.target.value);

    return (
        <React.Fragment>
            <FormControl variant="outlined" fullWidth>
                <InputLabel>Current options</InputLabel>
                <Select
                    value={option}
                    onChange={handleChange}
                >
                    {options.map(option => <MenuItem value={option.ID}>{option.TITLE}</MenuItem>)}
                </Select>
            </FormControl>
        </React.Fragment>
    )
}