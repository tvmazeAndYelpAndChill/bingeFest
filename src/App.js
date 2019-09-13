import React, { Component } from 'react';
import './App.css';
import firebase from './firebase';
import Axios from 'axios';

class App extends Component {
  constructor() {
    super();
    this.state = {
      userInput: '',
      searchStart: 0,
      faveRestaurants: [],
      faveShows: [],
      searchedRestaurants: [],
      searchedShows: [],
      fbShowID: [],
      fbFoodID: [],

    }
  }
  // function to make axios call
  getRestaurants = (userSearch) => {
    let searchStart = 0;
    if (userSearch === this.state.userInput) {
      searchStart = this.state.searchStart
    }
    Axios({
      method: 'Get',
      url: `https://developers.zomato.com/api/v2.1/search?`,
      dataResponse: 'json',
      headers: {
        'user-key': '2b0993e0c699ef3fdaa848e535d9df9f',
        'Accept': 'application / json'
      },
      params: {
        entity_id: 89,
        entity_type: 'city',
        start: searchStart,
        sort: 'rating',
        order: 'desc',
        q: "pizza"
        //API Call directed @ User Input
      }
    }).then((res) => {
      // filtering out any results with no votes
      const originalResults = res.data.restaurants.filter((item) => {
        return item.restaurant.user_rating.votes > 0
      })
      // returning an object that holds information about each restaurant
      const restaurantResults = originalResults.map((item) => {
        return {
          name: item.restaurant.name,
          thumb: item.restaurant.featured_image,
          address: item.restaurant.location.address,
          rating: item.restaurant.user_rating.aggregate_rating,
          votes: item.restaurant.user_rating.votes,
          cost: item.restaurant.price_range,
        }
      });
      this.setState({
        searchedRestaurants: restaurantResults,
        searchState: searchStart + 20,
      })

      // const dbRef = firebase.database().ref('food');
      // let restaurantItem = this.state.searchedRestaurants[3]
      // let restaurantName = restaurantItem.name
      // console.log(restaurantName)
      // dbRef.update({[restaurantName]: restaurantItem })


      
      // this.setState({
      //   searchedRestaurants: res.data.restaurants
      // })

      // console.log(this.state.searchedRestaurants);
    })
  }

  // XXX NEW

  componentDidMount() {

    // function to get data from firebase and store in state
    const dbRef = firebase.database().ref();
    dbRef.on('value', (response) => {

      const data = response.val();
      let fbFoodID = [];
      let fbShowID = [];

      if (data != null) {
        // console.log(Object.keys(data))

        fbShowID = Object.keys(data.tv);
        fbFoodID = Object.keys(data.food)
      }

    })
    // let restaurantItem = this.state.searchedRestaurants[0]
    // let restaurantName = restaurantItem.name
    // console.log(restaurantItem)
    // console.log(this.state.searchedRestaurants[0])
    // console.log(restaurantName)
    // dbRef.update({ ...restaurantItem })

  }


  getTvShows = () => {
    Axios({
      method: 'Get',
      url: `http://api.tvmaze.com/search/shows?q=friends`,
      dataResponse: 'json',
    }).then((res) => {

      const searchedShows = res.data.map((item) => {
        
        let poster = 'https://www.dogster.com/wp-content/uploads/2015/05/dachshund-puppies-10.jpg'
        let returnedPoster = item.show.image
        if ( returnedPoster != null) {
          poster = item.show.image.original
        }

        return {
          name: item.show.name,
          poster: poster,
          rating: item.show.rating.average,
          genres: item.show.genres,
          runtime: item.show.runtime,
          summary: item.show.summary
        }
      })

      this.setState({
        searchedShows
      })


      const dbRef = firebase.database().ref('tv');
      let showItem = this.state.searchedShows[0]
      let showName = showItem.name
      dbRef.update({ [showName]: showItem })
    })
  }

  // function to add restaurant to favourite list in firebase on click of button

  // faveClick = (event, restaurantItem, restaurantName) => {
  //   event.preventDefault();
  //   const dbRef = firebase.database().ref(restaurantName);
  //   dbRef.update({ ...restaurantItem })
  // }


  render() {
    return (
      <div className="App">
        <h1>Hello Friends! - Binge Fest</h1>
        <button onClick={this.getTvShows} >Click me for TV Show button</button>
        <button onClick={this.getRestaurants}>Click for Restaurants</button>
      </div>
    );
  }
}
export default App;
//AV Here Thanks