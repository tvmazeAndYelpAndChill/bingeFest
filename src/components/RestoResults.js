import React, { Component } from 'react';
// import Results from '../components/Results'

class RestoResults extends Component {

    render () {
        return (

            <div>
                {
                    this.props.searchedRestaurants.map((resto, index) => {
                        return (
                            <div className="restaurantGalleryContainer" key={index} >
                                <p>{resto.name}</p>
                                <p>{resto.address}</p>
                                <p>{resto.cost}</p>
                                <p>{resto.phone}</p>
                                <p>{resto.rating}</p>
                                <p>{resto.votes}</p>
                                <img src={`${resto.thumb}`} alt=""/>
                                <button onClick={(event) => this.props.favouriteButton(event, 'food', resto)}>Fav4Resto</button>
                            </div>
                        )
                    })
                }
            </div>

        )
    }
}

export default RestoResults;