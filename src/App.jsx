import React from "react";
import {BrowserRouter as Router , Routes,Route} from "react-router-dom";
import Navbar from "../src/components/Navbar";

const App = () => (
    <Router>
        <Routes>
            <Route path ='/' element = {<Navbar/>}/>
        </Routes>
    </Router>
);

export default App;