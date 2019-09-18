import React, { Component } from 'react';
import ImagePlaceholder from '../assets/tvPlaceholder.jpg';
import ShowCard from './ShowCard';

class TvShowsResults extends Component {

    render () {
        return (
            <div className="showContainer wrapper">

            {this.props.searchedShows.map((show) => {
                return (
                    <div className="eachTvCard">
                        <ShowCard
                            poster={show.poster ? show.poster : ImagePlaceholder}
                            name={show.name}
                            rating={show.rating}
                            runtime={show.runtime}
                            genres={show.genres.map((genre) => { return `${genre}, ` })}
                            summary={show.summary}
                        />
                        <label className="visuallyHidden" htmlFor="favButton">Add TV show to your favourites.</label>
                        <button 
                            className="favButton"
                            aria-label="Favourite button"
                            onClick={(event) => this.props.favouriteButton(event, 'tv', show)}>
                            <i class="fas fa-star"></i>
                        </button>
                    </div>
                )
            })}


                
            </div>
        )
    }
}

export default TvShowsResults;
