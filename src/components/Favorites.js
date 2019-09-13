import React, { Component } from 'react';
import ShowCard from './ShowCard';
import RestaurantCard from './RestaurantCard';
import firebase from '../firebase';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Mix from "./Mix";
class Favourites extends Component {
    
    render() {
        return (
            <Router>
                <div>
                    <h1>Your Favourited TV Shows</h1>
                </div>
                <div>
                    {this.props.faveShows.map((show) => {
                        return (
                            <div>
                                <ShowCard poster={show.poster} />
                            </div>
                        )
                    })}
                </div>
                <div>
                    <h1>Your Favourited Restaurants</h1>
                </div>
                <div>
                    {this.props.faveRestaurants.map((rest) => {
                        return (
                            <div>
                                <RestaurantCard name={rest.name} thumb={rest.thumb} />
                            </div>
                        )
                    })}
                </div>
                <div>
                    <h2>Click below to get your generated combo</h2>
                    <button><Link to="/mix">Get Your Combo!</Link></button>
                    <Route exact path="/mix" component={Mix} />
                </div>

            </Router>
        );
    };
}
export default Favourites;