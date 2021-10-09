import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography'; 
import { makeStyles } from '@material-ui/core/styles';
import * as CONSTANTS from '../../constants/places';
import * as SCORE_CONSTANTS from '../../constants/score';
import EventRoundedIcon from '@material-ui/icons/EventRounded';
import RoomRoundedIcon from '@material-ui/icons/RoomRounded';
import CheckRoundedIcon from '@material-ui/icons/CheckRounded';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import {LocationText} from "../Location";
import PlaceGrade from "./PlaceGrade";
import List from "@material-ui/core/List";
import ListItem from '@material-ui/core/ListItem';
import Box from "@material-ui/core/Box";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    img: {
        height: 200
        // flex: 1,
        // maxWidth: '100%',
        // borderRadius: '5px'
    }
}));

function PlacesEmptyState() {
    return <Grid container item>
        <Grid item>
        <Typography align={"center"} color={"textSecondary"} style={{ marginLeft: 16, marginRight: 16, paddingBottom: 16}}>
            <b>Dine Safely</b> allows patrons to rate places specifically on covid comfort sentiments. It does not speak to the quality of food or service.
        </Typography>
        <Typography align="center" color="textSecondary" style={{ marginLeft: 16, marginRight: 16, paddingBottom: 16}}>
            You can search for a specific place, a type of food, or leave the search box blank to list prominent restaurants in the specified city.
        </Typography>
        <Typography align="center" color="textSecondary" style={{ marginLeft: 16, marginRight: 16, paddingBottom: 16}}>
            You can use the ADD A GRADE button to add rates / grades for your favorite places. <b>Dine Safely</b> asks the question "How safe do you feel?"
        </Typography>
            <Box mx={"20%"}>
        <List>
            <ListItem >
                <Typography color="textSecondary">
                    A - I feel safe
                </Typography>
            </ListItem>
            <ListItem>
                <Typography color="textSecondary">
                    B - I feel pretty safe
                </Typography>
            </ListItem>
            <ListItem>
                <Typography color="textSecondary">
                    C - I'm not comfortable
                </Typography>
            </ListItem>
        </List>
            </Box>
        </Grid>
    </Grid>
}

export default function PlacesGrid(props) {
    const { places } = props; 
    const classes = useStyles();


    return (
        <div className={classes.root}>
            <Grid container spacing={3} direction="row" justify="flex-start" alignItems="flex-start">
                {places.map(place => (
                    <Grid container item xs={12} sm={6} md={3} direction="column" key={place.id}>
                        <Grid item xs>
                            <Card>
                                <CardContent>
                                    {place[CONSTANTS.ICON] ?
                                        <Grid item xs>
                                            <img src={place[CONSTANTS.ICON]}
                                                 alt={place[CONSTANTS.TYPES] ? place[CONSTANTS.TYPES][0] : ""}/>
                                        </Grid>
                                        : ""
                                    }
                                    <Grid item xs>
                                        <Typography variant="h6">
                                            <b>{place[CONSTANTS.NAME]}</b>
                                        </Typography>
                                        <Grid container item spacing={1} alignItems="center">
                                            <Grid item>
                                                <RoomRoundedIcon />
                                            </Grid>
                                            <Grid item xs zeroMinWidth>
                                                <LocationText place={place} />
                                            </Grid>
                                        </Grid>
                                            {place[CONSTANTS.SCORES] ?
                                                <React.Fragment>
                                                <Grid container item spacing={1} alignItems="center">
                                                <Grid item>
                                                    {place[CONSTANTS.SCORES][SCORE_CONSTANTS.STAFF_MASKS.ID] ?
                                                        <CheckRoundedIcon style={{fill: "#60a143"}}/>
                                                        :
                                                        <CloseRoundedIcon style={{fill: "darkred"}}/>
                                                    }
                                                </Grid>
                                                <Grid item xs zeroMinWidth>
                                                    <Typography>
                                                        {SCORE_CONSTANTS.STAFF_MASKS.TITLE}
                                                    </Typography>
                                                </Grid>
                                                </Grid>
                                                <Grid container item spacing={1} alignItems="center">
                                                    <Grid item>
                                                        {place[CONSTANTS.SCORES][SCORE_CONSTANTS.CUSTOMER_MASKS.ID] ?
                                                            <CheckRoundedIcon style={{fill: "#60a143"}}/>
                                                            :
                                                            <CloseRoundedIcon style={{fill: "darkred"}}/>
                                                        }
                                                    </Grid>
                                                    <Grid item xs zeroMinWidth>
                                                        <Typography>
                                                            {SCORE_CONSTANTS.CUSTOMER_MASKS.TITLE}
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                                    <Grid container item spacing={1} alignItems="center">
                                                        <Grid item>
                                                            {place[CONSTANTS.SCORES][SCORE_CONSTANTS.OUTDOOR_SEATING.ID] ?
                                                                <CheckRoundedIcon style={{fill: "#60a143"}}/>
                                                                :
                                                                <CloseRoundedIcon style={{fill: "darkred"}}/>
                                                            }
                                                        </Grid>
                                                        <Grid item xs zeroMinWidth>
                                                            <Typography>
                                                                {SCORE_CONSTANTS.OUTDOOR_SEATING.TITLE}
                                                            </Typography>
                                                        </Grid>
                                                    </Grid>
                                                <Grid container item spacing={1} alignItems="center">
                                                    <Grid item>
                                                        {place[CONSTANTS.SCORES][SCORE_CONSTANTS.VACCINE.ID]?
                                                            <CheckRoundedIcon style={{fill: "#60a143"}}/>
                                                            :
                                                            <CloseRoundedIcon style={{fill: "darkred"}}/>
                                                        }
                                                    </Grid>
                                                    <Grid item xs zeroMinWidth>
                                                        <Typography>
                                                            {SCORE_CONSTANTS.VACCINE.TITLE}
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                                    <Grid container item spacing={1} alignItems="center">

                                                        <Grid item>
                                                            <EventRoundedIcon/>
                                                        </Grid>
                                                        <Grid item xs zeroMinWidth>
                                                            <Typography variant="body2" noWrap>
                                                                {place[CONSTANTS.SCORES][SCORE_CONSTANTS.MOST_RECENT.ID]}
                                                            </Typography>
                                                        </Grid>
                                                    </Grid>

                                                </React.Fragment>
                                                :
                                                ""}
                                        <PlaceGrade place={place} />

                                    </Grid>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                ))}
                {places.length === 0 ? <PlacesEmptyState /> : null}
            </Grid>
        </div>
    )
}