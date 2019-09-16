import React, { Component } from 'react';
import Results from '../components/Results'

class TvShowsResults extends Component {

    render () {

        return (
               <div className="tvShowsGalleryContainer">
                    <p>{this.props.tvShowList.name}</p>
                    <p>{this.props.tvShowList.rating}</p>
                    <p>{this.props.tvShowList.genres}</p>
                    <p>{this.props.tvShowList.runtime}</p>
                    <img src={`${this.props.tvShowList.poster}`} alt=""/>
                    <p>{this.props.tvShowList.summary}</p>
                    <p>
                        {/* {
                            for (let i=0;i<5;i++) {
                                this.props.tvShowList.cast
                            }
                        } */}
                    </p>
                    <button onClick={(event) => this.props.favouriteButton(event, 'tv', this.props.tvShowList)}>Fav4TvShows</button>
                </div>
        )
    }
}

export default TvShowsResults;

