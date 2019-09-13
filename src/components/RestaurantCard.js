import React from 'react';

const RestaurantCard = ({ name, thumb }) => {
    return (
        <div>
            <h3>{name}</h3>
            <img src={thumb} />
        </div>
    );
}

export default RestaurantCard;