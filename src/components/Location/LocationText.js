import React from 'react';
import Typography from '@material-ui/core/Typography';
import * as CONSTANTS from '../../constants/places';

export default function LocationText(props) {
    if (props.place[CONSTANTS.VICINITY]) {
        return <Typography variant="body1">{props.place[CONSTANTS.VICINITY]}</Typography>
    }
    if (props.place[CONSTANTS.FORMATTED_ADDRESS]) {
        return <Typography variant="body1">{props.place[CONSTANTS.FORMATTED_ADDRESS]}</Typography>
    }
    return <Typography variant="body1">location unknown</Typography>
}