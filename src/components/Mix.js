import React, { Component } from 'react';
import ShowCard from './ShowCard';
import RestaurantCard from './RestaurantCard';
import firebase from '../firebase';

class Mix extends Component {
    constructor() {
        super();

        // store the random results
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
                // save keys into array
                const restNames = Object.keys(data.food || {});
                const showNames = Object.keys(data.tv || {});
                
                if (restNames.length > 0 && showNames.length > 0) {
                    // Get the amount of items from the food array and pick one randomically
                    const faveRestaurantTotal = restNames.length;
                    const randomRestaurantIndex = Math.floor(Math.random() * faveRestaurantTotal);

                    // Get the amount of items from the tv show array and pick one randomically
                    const faveShowsTotal = showNames.length;
                    const randomShowIndex = Math.floor(Math.random() * faveShowsTotal);

                    // using the random index, pick the item name from the array
                    const randomRestaurantName = restNames[randomRestaurantIndex]
                    const randomShowName = showNames[randomShowIndex]

                    // Update state with a random item from each category
                    this.setState({
                        randomRestaurant: data.food[randomRestaurantName],
                        randomShow: data.tv[randomShowName]
                    }); 
                    // Error handling for empty item on either TV show or restaurant
                } else {
                    alert('Please make sure you add items to your favorite list!');
                }
            }
        }) 
    }

    render() {
        return (
            <div class="mixSection">
                <div className="wrapper">
                    <h2>This is your combo for tonight!</h2>
                    <div className="comboBox">
                        <ShowCard
                            className="comboResult"
                            poster={this.state.randomShow.poster} /> 
                        <RestaurantCard
                            className="comboResult"
                            name={this.state.randomRestaurant.name} 
                            thumb={this.state.randomRestaurant.thumb}
                            /> 
                    </div>
                </div>
            </div>
        );
    }
}

export default Mix;