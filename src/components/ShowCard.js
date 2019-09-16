import React from 'react';

const ShowCard = ({ poster, name, runtime, rating }) => {
    return (
        <div className='cardContainer cardContainerShow'>
            <div className='cardFront'>
                <img src={poster} />      
            </div>
            <div className='cardBack'>
                <h3>{name}</h3>
                <p>Length: {runtime} mins</p>
                <p>Rating: {rating}</p>
            </div>
        </div>
    );
}

export default ShowCard;