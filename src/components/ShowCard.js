import React from 'react';

const ShowCard = ({ poster, name, runtime, rating, summary, genres }) => {
    return (
        <div className='cardContainer cardContainerShow'>
            <div className='cardFront'>
                <img src={poster} />      
            </div>
            <div className='cardBack'>
                <h3>{name}</h3>
                <p><i class="fas fa-clock"></i> {runtime} mins</p>
                <p><i class="fas fa-star"></i> {rating} / 10</p>
                <p><i class="fas fa-theater-masks"></i> {genres}</p>
                <p className="summaryOverflow"><i class="fas fa-arrow-circle-right"></i> {summary}</p>
            </div>
        </div>
    );
}

export default ShowCard;