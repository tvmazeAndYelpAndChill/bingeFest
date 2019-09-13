import React, { Component } from 'react';
import ShowCard from './ShowCard';
import RestaurantCard from './RestaurantCard';
import firebase from './firebase';


class Mix extends Component {
    constructor() {
        super();

        // save the random results
        this.state = {
            randomRestaurant: {},
            randomShow: {} 
        };
    }

    componentDidMount() {
        // function to get data from firebase and store in state
        const dbRef = firebase.database().ref();
        dbRef.on('value', (response) => {

            const data = response.val();

            if (data != null) {
                const restNames = Object.keys(data.food)
                const showNames = Object.keys(data.tv);

                const faveRestaurantTotal = restNames.length;
                const randomRestaurantIndex = Math.floor(Math.random() * faveRestaurantTotal);

                const faveShowsTotal = showNames.length;
                const randomShowIndex = Math.floor(Math.random() * faveShowsTotal);

                const randomRestaurant = restNames[randomRestaurantIndex]
                const randomShow = showNames[randomShowIndex]

                // Update state with a random item from each category
                this.setState({
                    randomRestaurant: data.food[randomRestaurant],
                    randomShow: data.tv[randomShow]
                });
            }
        }) 
    }

    render() {
        return (
            <div>
                <h2>This is your combo for tonight!</h2>
                <div>
                    <ShowCard
                        poster={this.state.randomShow.poster} /> 
                    <RestaurantCard
                        name={this.state.randomRestaurant.name} 
                        thumb={this.state.randomRestaurant.thumb}
                        /> 
                </div>
            </div>
        );
    }
}

export default Mix;