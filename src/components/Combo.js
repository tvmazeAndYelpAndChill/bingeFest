import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

class Combo extends Component {
    render() {
        return (
            <div className='comboSection'>
                <button className='comboButton'><Link className= 'comboLink' to="/mix">Get Your Combo</Link></button>
            </div>
        );
    }
}

export default Combo;