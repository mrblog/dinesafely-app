import React from 'react'; 
import {
    BrowserRouter as Router
} from "react-router-dom";
import { Main } from '../Main'; 
import ScoreApi, { ScoreApiContext } from '../ScoreApi';

const App = () => (
    <ScoreApiContext.Provider value={new ScoreApi()}>
        <Router>
            <Main/>
        </Router>
    </ScoreApiContext.Provider>
)

export default App; 