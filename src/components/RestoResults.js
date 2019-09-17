import React, { Component } from 'react';
// import Results from '../components/Results'
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
                                <button 
                                    className="favButton" 
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