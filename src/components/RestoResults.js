import React, { Component } from 'react';
import RestaurantCard from './RestaurantCard'

class RestoResults extends Component {

    render () {
        return (
            <div className="restaurantContainer wrapper">
                {
                    this.props.searchedRestaurants.map((rest, index) => {
                        return (
                            <div className="eachRestoCard" key={index} >
                                <RestaurantCard
                                    name={rest.name}
                                    address={rest.address}
                                    thumb={rest.thumb}
                                    phone={rest.phone}
                                    rating={rest.rating} 
                                />
                                <label className="visuallyHidden" htmlFor="favButton">Add restaurant to your favourits list.</label>
                                <button
                                    class="favButton" 
                                    className="favButton"
                                    aria-label="Favourite button"
                                    onClick={(event) => this.props.favouriteButton(event, 'food', rest)}>
                                    <i class="fas fa-star"></i>
                                </button>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}

export default RestoResults;