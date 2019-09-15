import React from 'react';

const ShowCard = ({ poster, name, runtime, rating }) => {
    return (
        <div className='cardShow'>
            <div className='cardFrontShow'>
                <img src={poster} />      
            </div>
            <div className='cardBackShow'>
                <h3>{name}</h3>
                <p>Length: {runtime} mins</p>
                <p>Rating: {rating}</p>
            </div>
        </div>
    );
}

export default ShowCard;