import React from 'react';

const RestaurantCard = ({ name, thumb, phone, rating, address }) => {
    return (
        <div className='cardContainer cardContainerRestaurant'>
            <div className='cardFront'>
                <img src={thumb} />
                <p>{name}</p>
            </div>
            <div className='cardBack'>
                <h3>{name}</h3>
                <p><i class="fas fa-home"></i> {address}</p>
                <p><i class="fas fa-phone-alt"></i> {phone}</p>
                <p><i class="fas fa-star"></i> {rating}</p>
            </div>
        </div>
    );
}

export default RestaurantCard;