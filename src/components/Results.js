import React, { Component } from 'react';
import RestoResults from './RestoResults';
import TvShowsResults from './TvShowsResults';
import Footer from './Footer';

class Results extends Component {

    render () {
        return (
            <main
            ref={this.props.resultsRef}
            className="resultSection">
                <div className="wrapper">
                    <h2>Your search results for "{this.props.userInput}"</h2>

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
                </div>

                <Footer />
            </main>

        )
    }
}

export default Results;



