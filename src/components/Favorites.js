import React, { Component } from 'react';
import ShowCard from './ShowCard';
import RestaurantCard from './RestaurantCard';
import Combo from './Combo';
import Footer from './Footer';
class Favourites extends Component {
    
    render() {
        return (
            <div className="favouritesSection">
                <div className="mobileHeader">
                    <div className="headerTitle">
                        <h1 >bingeFest</h1>
                    </div>
                </div>
                <div className='favouritedHeaderSection tvHeader'>
                    <h2 className="favouritedHeader">Your Favorited TV Shows</h2>
                </div>

                    <div className='showContainer wrapper'>
                        {this.props.faveShows.map((show) => {
                            return (
                                <div>
                                    {this.props.faveShows.length > 0 ? <div className='individualCard'>
                                        <ShowCard 
                                            poster={show.poster} 
                                            name={show.name} 
                                            rating={show.rating} 
                                            runtime={show.runtime}
                                            genres={show.genres.map((genre) => { return `${genre}, ` })}
                                            summary={show.summary}
                                        />
                                        <label className="visuallyHidden" htmlFor="removeFavButton">Click button to remove item from your favourites.</label>
                                        <button 
                                            class="removeFavButton"
                                            aria-label="Remove favourite button"
                                            className='removeFavButton'
                                            onClick={((e) => this.props.removeItem(e, 'tv', show))}>
                                            <i class="far fa-trash-alt"></i>
                                        </button>
                                    </div> : "Please select a show from the homepage" }
                                </div>
                            )
                        })}
                    </div>
                
                    <div className='favouritedHeaderSection foodHeader'>
                        <h2 className="favouritedHeader">Your Favorited Restaurants</h2>
                    </div>
                    <div className="restaurantContainer wrapper">
                        {this.props.faveRestaurants.map((rest) => {
                            return (
                                <div>
                                    {this.props.faveRestaurants.length > 0 ? <div className='individualCard'>
                                        <RestaurantCard 
                                            name={rest.name} 
                                            address={rest.address} 
                                            thumb={rest.thumb} 
                                            phone={rest.phone} 
                                            rating={rest.rating}/>
                                        <label className="visuallyHidden" htmlFor="removeFavButton">Click button to remove item from your favourites.</label>
                                        <button 
                                            className='removeFavButton'
                                            name="removeFavButton"
                                            aria-label="Remove Favourite Button"
                                            onClick={((e) => this.props.removeItem(e, 'food', rest))}>
                                            <i class="far fa-trash-alt"></i>
                                        </button>
                                    </div> : "Please select a restaurant from the homepage" }
                                </div>
                            )
                        })}
                    </div>
                    {this.props.faveRestaurants.length > 0 && this.props.faveShows.length > 0 && <Combo />}
                
                <Footer />
            </div>
        );
    };
}
export default Favourites;