import React from "react"
import { useLocation } from "react-router-dom"
import ReactGA from 'react-ga';


export default function useGoogleAnalytics() {
    const location = useLocation()

    React.useEffect(() => {
        ReactGA.initialize(process.env.REACT_APP_GA_PROPERTY);
    }, [])

    React.useEffect(() => {
        const currentPath = location.pathname + location.search
        ReactGA.pageview(currentPath);
    }, [location])
}
