import React, { Component } from 'react';
import RestoResults from './RestoResults';
import TvShowsResults from './TvShowsResults';

class Results extends Component {

    render () {
        return (
            <div>

                {this.props.resultVisibity && <RestoResults 
                    restaurantList = {this.props.restaurantGallery}
                    visibilityResto = {this.props.resultVisibity}
                    favouriteButton = {this.props.faveClick}
                    
                />}

                {this.props.resultVisibity && <TvShowsResults 
                tvShowList={this.props.tvShowsGallery}
                visibilityTvShows={this.props.resultVisibity}
                favouriteButton={this.props.faveClick}
                />}
                
                {this.props.resetVisible}

            </div>

        )
    }
}

export default Results;



