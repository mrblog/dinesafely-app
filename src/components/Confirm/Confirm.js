import React, {useContext, useEffect, useState} from 'react';
import {useHistory, useParams} from "react-router-dom";
import { ScoreApiContext } from '../ScoreApi';
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";
import * as ROUTES from "../../constants/routes";

const useStyles = makeStyles((theme) => ({
    button: {
        marginTop: theme.spacing(3)
    }
}));

export default function Confirm() {
    const classes = useStyles();
    const history = useHistory();
    const api = useContext(ScoreApiContext);
    const [result, setResult] = useState(null);
    const { token } = useParams();

    useEffect(
        () => {
            console.log("confirming token: " + token)
            api.confirmScore(token).then(() => {
                setResult({
                    status: "Success!",
                    message: "Your submission has been successfully posted.",
                    success: true
                })
            })
                .catch(error => {
                    console.log("Error confirming token: ", error)
                    setResult({
                        status: "Sorry, that didn't work",
                        message: error.message,
                        success: false
                    })

                })
        },
        []
    )

    const handleClick = () => history.push(ROUTES.LANDING)

    return <div>
        {result ?
            <div>
            <h1>{result.status}</h1>
                <Typography variant="body1">
                    {result.message}
                </Typography>
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleClick}
                    className={classes.button}
                >
                    Continue
                </Button>
            </div>
            :
            <h1>Verifying...</h1>
        }
    </div>
}
