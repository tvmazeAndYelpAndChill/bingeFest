import React, { Component } from 'react';
import ShowCard from './ShowCard';
import RestaurantCard from './RestaurantCard';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Mix from "./Mix";
class Favourites extends Component {
    
    render() {
        return (
            <div className="favouritesSection">
                <div class="wrapper">
                    <div>
                        <h2 className="favouritedHeader">Your Favourited TV Shows</h2>
                    </div>
                    <div className='showContainer'>
                        {this.props.faveShows.map((show) => {
                            return (
                                <div>
                                    <div>
                                        <ShowCard poster={show.poster} name={show.name} rating={show.rating} runtime={show.runtime}/>
                                        <button onClick={((e) => this.props.removeItem(e, 'tv', show))}>Remove from Favourites</button>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
    
                    <div>
                        <h2 className="favouritedHeader">Your Favourited Restaurants</h2>
                    </div>
                    <div className="restaurantContainer">
                        {this.props.faveRestaurants.map((rest) => {
                            return (
                                <div>
                                    <RestaurantCard name={rest.name} address={rest.address} thumb={rest.thumb} phone={rest.phone} rating={rest.rating}/>
                                    <button onClick={((e) => this.props.removeItem(e, 'food', rest))}>Remove from Favourites</button>
                                </div>
                            )
                        })}
                    </div>
                    <div>
                        <h3>Click below to get your generated combo</h3>
                        <button><Link to="/mix">Get Your Combo!</Link></button>  
                    </div>
                </div>

            </div>
        );
    };
}
export default Favourites;