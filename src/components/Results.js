import React, { Component } from 'react';
import RestoResults from './RestoResults';
import TvShowsResults from './TvShowsResults';

class Results extends Component {

    render () {
        return (
            <div>
(                {console.log(this.props.tvShowGallery)}
                {this.props.resultVisibity && <RestoResults 
                    restaurantList = {this.props.restaurantGallery}
                    visibilityResto={this.props.resultVisibity}
                />}  ||

                {this.props.resultVisibity && <TvShowsResults 
                tvShowList={this.props.tvShowsGallery}
                visibilityTvShows={this.props.resultVisibity}
                />}})

                {this.props.resetVisible}

            </div>

        )
    }
}

export default Results;



