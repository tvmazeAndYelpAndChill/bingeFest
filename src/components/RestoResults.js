import React, { Component } from 'react';
// import Results from '../components/Results'

class RestoResults extends Component {

    render () {
        return (

            <div>
                {
                    this.props.restaurantList.map((resto, index) => {
                        return (
                            <div key={index} >
                                <p>{resto.name}</p>
                                <p>{resto.address}</p>
                                <p>{resto.cost}</p>
                                <p>{resto.phone}</p>
                                <p>{resto.rating}</p>
                                <p>{resto.votes}</p>
                                <img src={`${resto.thumb}`} alt=""/>
                                <button onClick={this.faveClick} >Fav4Resto</button>
                            </div>
                        )
                    })
                }
            </div>

        )
    }
}

export default RestoResults;