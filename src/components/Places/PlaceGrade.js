import React from 'react';
import * as CONSTANTS from '../../constants/places';
import * as SCORE_CONSTANTS from '../../constants/score';
import * as GRADE_CONSTANTS from '../../constants/grades';
import { makeStyles } from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(3, 2),
        height: 80,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
    },
}));

export default function PlaceGrade(props) {
    const classes = useStyles();

    let selected = GRADE_CONSTANTS.GRADE_PENDING;
    let variant = "body1"
    if (props.place[CONSTANTS.SCORES]) {
        const r = Math.round(props.place[CONSTANTS.SCORES][SCORE_CONSTANTS.RATING.ID]);
        selected = GRADE_CONSTANTS.GRADE_C;
        variant = "h1"
        if (r > 0) {
            GRADE_CONSTANTS.GRADES.forEach((grade) => {
                if (r >= grade.VALUE && r > selected.VALUE) {
                    selected = grade
                }
            })
        }
    }
    return <Box className={classes.root} border={4} borderColor={selected.COLOR} color={selected.COLOR} width={100} align={"center"}>
        <Typography variant={variant}>
            {selected.TITLE}
        </Typography>
    </Box>
}