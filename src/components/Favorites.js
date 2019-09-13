import React, { Component } from 'react';
import ShowCard from './ShowCard';
import RestaurantCard from './RestaurantCard';
import firebase from '../firebase';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Mix from "./Mix";

class Favourites extends Component {

    getFavouriteShows = () => {
        
    }

    getFavouriteRestaurants = () => {

    }

    render() {
        return (
            <Router>
                <div>
                    <h1>Get your Favorite TV Shows!</h1>
                    <button onClick={this.getFavouriteShows}>Show Favorite Shows</button>
                </div>
                <div>
                    <h1>Get your Favorite Restaurant!</h1>
                    <button onClick={this.getFavouriteRestaurants}>Show Favorite Restaurant</button>
                </div>
                <div>
                    <h1>Get your Favorite Combos!</h1>
                    <button>Show Favorite Combos</button>
                </div>
                <div>
                    <h2>Click below to get your generated combo</h2>
                    <button><Link to="/mix">Get Your Combo!</Link></button>
                    <Route exact path="/mix" component={Mix}/>
                </div>  
            </Router>
        );
    };
}

export default Favourites;


