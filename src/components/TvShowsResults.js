import React, { Component } from 'react';
import Results from '../components/Results'

class TvShowsResults extends Component {

    render () {

        return (
            <div>
                {
                    this.props.tvShowList.map((show,index) => {
                        return (
                            <div className="tvShowsGalleryContainer" key={index}>
                                <p>{show.name}</p>
                                <p>{show.rating}</p>
                                <p>{show.runtime}</p>
                                <p>{show.summary}</p>
                                <img src={`${show.poster}`} alt=""/>
                                <button onClick={(event) => this.props.favouriteButton(event, 'tv', show)}>Fav4TvShows</button>
                            </div>
                        )
                    })
                }
            </div>
            
        )
    }
}

export default TvShowsResults;