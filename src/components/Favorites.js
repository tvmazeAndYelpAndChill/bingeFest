import React, { Component } from 'react';
import ShowCard from './ShowCard';
import RestaurantCard from './RestaurantCard';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
class Favourites extends Component {
    
    render() {
        return (
            <div className="favouritesSection">
                <div class="wrapper">
                    <div className='favouritedHeaderSection'>
                        <h2 className="favouritedHeader">Your Favourited TV Shows</h2>
                    </div>
                    <div className='showContainer'>
                        {this.props.faveShows.map((show) => {
                            return (
                                <div>
                                    <div className='individualCard'>
                                        <ShowCard poster={show.poster} name={show.name} rating={show.rating} runtime={show.runtime}/>
                                        <button className='removeFavButton' onClick={((e) => this.props.removeItem(e, 'tv', show))}><i class="far fa-trash-alt"></i></button>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
    
                    <div className='favouritedHeaderSection'>
                        <h2 className="favouritedHeader">Your Favourited Restaurants</h2>
                    </div>
                    <div className="restaurantContainer">
                        {this.props.faveRestaurants.map((rest) => {
                            return (
                                <div className='individualCard'>
                                    <RestaurantCard name={rest.name} address={rest.address} thumb={rest.thumb} phone={rest.phone} rating={rest.rating}/>
                                    <button className='removeFavButton' onClick={((e) => this.props.removeItem(e, 'food', rest))}><i class="far fa-trash-alt"></i></button>
                                </div>
                            )
                        })}
                    </div>
                    
                    <div className='comboHeaderSection'>
                        <h3 className='comboHeader'>Click below to get your generated combo!</h3>
                        <button className='comboButton'><Link className= 'comboLink' to="/mix">Get Your Combo</Link></button>  
                    </div>
                </div>

            </div>
        );
    };
}
export default Favourites;