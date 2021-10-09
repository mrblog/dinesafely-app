import React, { useState, useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ScoreApiContext } from '../ScoreApi';
import PlacesGrid from './PlacesGrid';
import SearchFilters from "../SearchFilters/SearchFilters";

export default function Places() {
    const [loading, setLoading] = useState(false);
    const [places, setPlaces] = useState([]); 
    const api = useContext(ScoreApiContext);
    const location = useLocation();

    useEffect(
        () => {
            fetch();
        },
        []
    )

    useEffect(
        () => {
            fetch(); 
        }, 
        [location]
    )

    const fetch = () => {
        if (loading) return;

        //console.log("location: "+JSON.stringify(location, null, ' '))
        const searchParams = new URLSearchParams(location.search);
        if (searchParams.has('lat') && searchParams.has('lng')) {
            if (searchParams.has('q')) {
                setLoading(true);

                api.findPlaces(searchParams.get('lat'), searchParams.get('lng'), searchParams.get('q')).then(places => {
                    console.log(places)
                    setPlaces(places)
                    setLoading(false)
                })
                    .catch(error => {
                        console.log("Error finding places: ", error)
                        setPlaces([])
                        setLoading(false)
                    })
            } else {
                setLoading(true);

                api.placesNearby(searchParams.get('lat'), searchParams.get('lng')).then(places => {
                    console.log(places)
                    setPlaces(places)
                    setLoading(false)
                })
                    .catch(error => {
                        console.log("Error loading nearby places: ", error)
                        setPlaces([])
                        setLoading(false)
                    })
            }

        }
        /*var query = firebase.places()

        const searchParams = new URLSearchParams(location.search); 

        //  Filter by status
        var status = searchParams.getAll("status[]"); 
        if (status && status.length > 0) {
            query = query.where('status', 'in', status); 
        }

        //  Sort by reopening date
        query = query.orderBy(CONSTANTS.REOPENING_DATE)

        //  Limit search results
        query = query.limit(12)

        //  Perform query
        query.get()
        .then(function(querySnapshot) {
            var places = []
            querySnapshot.forEach(function(doc) {
                let data = doc.data()
                let newPlace = new Place(doc.id, data)
                places.push(newPlace)
            })
            console.log(places)
            setPlaces(places);
            setLoading(false); 
        })
        .catch(error => {
            console.log("Error loading places: ", error)
            setLoading(false);
        })*/
    }

    return (
        <React.Fragment>
            <SearchFilters/>
            <PlacesGrid 
                places={places}
            />
        </React.Fragment>
    )
}