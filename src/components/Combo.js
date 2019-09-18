import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'

class Combo extends Component {
    render() {
        return (
            <div className='comboSection'>
                <label className="visuallyHidden" htmlFor="comboButton">Click button to get a restaurant and tv show combination.</label>
                <button aria-label="Combination Button" name="comboButton" className='comboButton'><Link className= 'comboLink' to="/mix">Get Your Combo</Link></button>
            </div>
        );
    }
}

export default Combo;