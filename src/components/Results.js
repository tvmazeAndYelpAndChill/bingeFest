import React, { Component } from 'react';
import RestoResults from './RestoResults';
import TvShowsResults from './TvShowsResults';

class Results extends Component {

    render () {
        return (
            <main
            ref={this.props.resultsRef}
            className="resultSection">
                <h2>Your search results for {this.props.userInput}</h2>

                {this.props.resultVisibity && this.props.restaurantQuery && <RestoResults 
                    searchedRestaurants = {this.props.searchedRestaurants}
                    visibilityResto = {this.props.resultVisibity}
                    favouriteButton = {this.props.faveClick}
                />}

                {this.props.resultVisibity && this.props.showQuery && <TvShowsResults 
                searchedShows = {this.props.searchedShows}
                visibilityTvShows = {this.props.resultVisibity}
                favouriteButton = {this.props.faveClick}
                />}

            </main>

        )
    }
}

export default Results;



