import React, { useContext, useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import {ScoreApiContext} from "../ScoreApi";
import Button from "@material-ui/core/Button";
import SearchIcon from "@material-ui/icons/Search";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {Autocomplete} from "@material-ui/lab";
import {TextField} from "@material-ui/core";
import Box from "@material-ui/core/Box";

export default function SearchFilters() {
    const history = useHistory();
    const [city, setCity] = useState("")
    const [pending, setPending] = useState(false)
    const [citySelected, setCitySelected] = useState(null)
    const [query, setQuery] = useState("")
    const [options, setOptions] = useState([])
    const [loading, setLoading] = useState(false);
    const api = useContext(ScoreApiContext);
    const location = useLocation();

    useEffect(
        () => {
            initializeFilters();
        },
        []
    )

    useEffect(() => {
        if (!loading && pending) {
            findMatches({}, city)
        }
        }, [loading]
    )

    const initializeFilters = () => {
        // set filters from location search
        const searchParams = new URLSearchParams(location.search);
        if (searchParams.has('q')) {
            setQuery(searchParams.get('q'))
        }
        if (searchParams.has('city')) {
            const cityParam = searchParams.get('city')
            console.log("city: "+cityParam)
            setLoading(true);

            api.getCities(cityParam).then(cities => {
                console.log(cities)
                setOptions(cities)
                setCity(cityParam)
                setLoading(false)
                if (cities.length > 0 && cities[0].label === cityParam) {
                    setCitySelected(cities[0])
                }
            })
                .catch(error => {
                    console.log("Error loading cities: ", error)
                    setLoading(false)
                })
        }

    }

    const findMatches = (event, value) => {
        setCity(value)
        setCitySelected(null)
        if (!value) {
            return
        }
        if (loading) {
            console.log("pending: "+value)
            setPending(true)
            return;
        }
        setPending(false)
        setLoading(true)

        api.getCities(value).then(cities => {
            console.log(cities)
            setOptions(cities)
            if (cities.length === 0) {
                console.log("match: "+value+ " = "+JSON.stringify(value.match(/[^ ].* [a-z][a-z]$/i)))
            }
            if (cities.length === 0 && value.match(/[^ ].* [a-z][a-z]$/i)) {
                api.getCities(value.replace(/^([^ ].*) ([a-z][a-z])$/i, '$1, $2')).then(oneCity => {
                    console.log(value.replace(/^([^ ].*) ([a-z][a-z])$/i, '$1, $2')+ " matched "+ JSON.stringify(oneCity))
                    if (oneCity.length === 1) {
                        setCity(oneCity[0].label)
                        setCitySelected(oneCity[0])
                    }
                    setLoading(false)
                })
                    .catch(error => {
                        console.log("Error loading cities: ", error)
                        setLoading(false)
                    })
            } else {
                setLoading(false)
            }
        })
            .catch(error => {
                console.log("Error loading cities: ", error)
                setLoading(false)
            })
    }

    const saveCity = () => {
        const searchParams = new URLSearchParams()
        searchParams.set('lat', citySelected.lat)
        searchParams.set('lng', citySelected.lng)
        searchParams.set('city', citySelected.label)
        if (query) {
            searchParams.set('q', query)
        }
        console.log("params: "+searchParams.toString())
        history.push({
            search: "?"+searchParams.toString()
        })
    }

    console.log("before render city: " + city)
    if (options.length > 0) {
        console.log("first option label: "+options[0].label)
    }
    return <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        style={{minHeight: '100px'}}
    >
        <Box my={3} >
        <Grid item>
            <Grid container flexDirection="row" alignItems="center" spacing={1}>
                <Grid item>
                    <Typography style={{ fontWeight: 600 }}>
                        Find
                    </Typography>
                </Grid>
                <Grid item>
                    <div style={{width: 400}}>
                        <TextField label="Place name or type of food" variant="outlined" fullWidth onChange={(event) => {
                            const newValue = event.target.value
                            console.log("Search onChange: "+JSON.stringify(newValue, null, ' '));
                            setQuery(newValue)
                        }}
                        value={query}
                                   onKeyPress={(event) => {
                                       if (event.key === 'Enter' && citySelected)
                                           saveCity()
                                   }}
                        />
                    </div>
                </Grid>
                <Grid item>
                    <Typography style={{ fontWeight: 600 }} mx={10}>
                        Near
                    </Typography>
                </Grid>
                <Grid item>
                    <div style={{width: 300}}>
                        <Autocomplete
                            freeSolo
                            disableClearable
                            options={options}
                            defaultValue={options.length > 0 && options[0].label === city ? options[0] : null}
                            onInputChange={findMatches}
                            onChange={(event, newValue) => {
                                console.log(JSON.stringify(newValue, null, ' '));
                                setCitySelected(newValue)
                            }}
                            getOptionLabel={(option) => option.label}
                            renderInput={params => (
                                <TextField {...params} label="City, state" variant="outlined" fullWidth/>
                            )}
                            inputValue={city}
                        />
                    </div>
                </Grid>
                <Grid item>
                    <div>
                        <Button raised color="accent" disabled={!citySelected} onClick={saveCity}>
                            <SearchIcon/> Search
                        </Button>
                    </div>
                </Grid>
            </Grid>
        </Grid>
        </Box>

    </Grid>


}