import React, { Component } from 'react';

class Results extends Component {

    render () {
        return (

                <div>
                    <h3>{`${this.props.specificRestaurants.name}`}</h3>
                    <img src={`${this.props.specificRestaurants.thumb}`} alt=""/>
                </div>          
        )
    }
}

export default Results;



