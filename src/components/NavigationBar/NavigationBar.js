import React from 'react'; 
import { makeStyles } from '@material-ui/core/styles'; 
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button'; 
import { withRouter, useLocation } from 'react-router-dom'; 
import * as ROUTES from '../../constants/routes';
import DeckRoundedIcon from '@material-ui/icons/DeckRounded';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles(theme => ({ 
    root: {
        flexGrow: 1,
    },
    toolbar: {
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1)
    },
    bar: {
        background: '#ffffff'
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    spacer: {
        flexGrow: 1,
    },
    logo: {
        textTransform: "none",
        color: "#00a3ff"
    }
}))

function NavigationBar(props) {
    const classes = useStyles(); 
    const location = useLocation(); 

    const handleLogoClick = () => props.history.push(ROUTES.LANDING)
    const handleAddPlaceClick = () => props.history.push(ROUTES.ADD_PLACE)

    return (
        <div className={classes.root}>
            <AppBar className={classes.bar} position="fixed" elevation={0}>
                <Container maxWidth="lg">
                    <Toolbar disableGutters className={classes.toolbar}>
                        <Button className={classes.logo} color="inherit" onClick={handleLogoClick}> 
                            <DeckRoundedIcon />
                            <Typography variant="h5">
                                <b>dinesafely.org</b>
                            </Typography>
                        </Button>
                        <div className={classes.spacer}/>
                        {location.pathname === ROUTES.ADD_PLACE ? 
                            null
                            :
                            <Button disableElevation variant="contained" onClick={handleAddPlaceClick}>
                                Add a grade
                            </Button>
                        }
                    </Toolbar>
                </Container>
            </AppBar>
        </div>
    )
}

export default withRouter(NavigationBar); 