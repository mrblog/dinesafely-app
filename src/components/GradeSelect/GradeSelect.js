import React from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import * as GRADE_CONSTANTS from '../../constants/grades';

export default function GradeSelect(props) {
    const { grade, onChange } = props;

    const handleChange = e => onChange(e.target.value);

    return (
        <React.Fragment>
            <FormControl variant="outlined" fullWidth>
                <InputLabel>Current grade</InputLabel>
                <Select
                    value={grade}
                    onChange={handleChange}
                >
                    {GRADE_CONSTANTS.GRADES.map(menuGrade => (
                        <MenuItem value={menuGrade.VALUE} key={"grade-"+menuGrade.TITLE}>{menuGrade.TITLE} - {menuGrade.DESCRIPTION}</MenuItem>
                    ))}
                </Select>
            </FormControl>
        </React.Fragment>
    )
}