import React from 'react';

const RestaurantCard = ({ name, thumb, phone, rating, address }) => {
    return (
        <div className='cardRest'>
            <div className='cardFrontRest'>
                <img src={thumb} />
            </div>
            <div className='cardBackRest'>
                <h3>{name}</h3>
                <p>Address: {address}</p>
                <p>Phone Number: {phone}</p>
                <p>Rating: {rating}</p>
            </div>
        </div>
    );
}

export default RestaurantCard;