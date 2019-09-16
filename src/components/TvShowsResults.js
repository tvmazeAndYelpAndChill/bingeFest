import React, { Component } from 'react';
import Results from '../components/Results'

class TvShowsResults extends Component {

    render () {
        return (
            <div className="tvShowsGalleryContainer">

            {this.props.searchedShows.map((show) => {
                return (
                    <div className="eachTvResult">
                        <img src={`${show.poster}`} alt="" />
                        <p>{show.name}</p>
                        <p>{show.rating}</p>
                        <p>{show.genres}</p>
                        <p>{show.runtime}</p>
    
                        <p>{show.summary}</p>
                        <button onClick={(event) => this.props.favouriteButton(event, 'tv', show)}>Fav4TvShows</button>
                    </div>
                )
            })}


                
            </div>
        )
    }
}

export default TvShowsResults;
