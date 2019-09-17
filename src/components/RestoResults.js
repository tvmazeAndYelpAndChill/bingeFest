import React, { Component } from 'react';
// import Results from '../components/Results'

class RestoResults extends Component {

    render () {
        return (

            <div className="resultsGrid wrapper">
                {
                    this.props.searchedRestaurants.map((resto, index) => {
                        return (
                            <div className="eachRestoCard" key={index} >
                                <img src={`${resto.thumb}`} alt="" />
                                <p>{resto.name}</p>
                                <p>{resto.address}</p>
                                <p>{resto.cost}</p>
                                <p>Phone: {resto.phone}</p>
                                <p>{resto.rating} ({resto.votes} votes)</p>
                                
                                
                                <button className="favButton" onClick={(event) => this.props.favouriteButton(event, 'food', resto)}><i class="fas fa-star"></i></button>
                            </div>
                        )
                    })
                }
            </div>

        )
    }
}

export default RestoResults;