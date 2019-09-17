import React, { Component } from 'react';
import ImagePlaceholder from '../assets/tv.jpg';

class TvShowsResults extends Component {

    render () {
        return (
            <div className="resultsGrid wrapper">

            {this.props.searchedShows.map((show) => {
                return (
                    <div className="eachTvCard">
                        <img src={show.poster ? show.poster : ImagePlaceholder}  alt="" />
                        <p>{show.name}</p>
                        <p>Rating: {show.rating}</p>
                        <p>{show.genres.map((genre) => { return `${genre}, `})}</p>
                        <p>{show.runtime} min</p>
    
                        <p>Summary: {show.summary}</p>
                        <button className="favButton" onClick={(event) => this.props.favouriteButton(event, 'tv', show)}><i class="fas fa-star"></i></button>
                    </div>
                )
            })}


                
            </div>
        )
    }
}

export default TvShowsResults;
