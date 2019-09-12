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
      // fbShowID: [],
      // fbFoodID: [],
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
        q: this.state.userInput
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
          phone: item.restaurant.phone_numbers,
        }
      });
      this.setState({
        searchedRestaurants: restaurantResults,
        searchState: searchStart + 20
      })
    })
  }

  componentDidMount() {

    // function to get data from firebase and store in state
    const dbRef = firebase.database().ref();
    dbRef.on('value', (response) => {

      const data = response.val();
      let fbFoodID = [];
      let fbShowID = [];

      if (data != null) {
        fbShowID = Object.keys(data.tv);
        fbFoodID = Object.keys(data.food)
      }

    })

  }

getTvShows = () => {
  Axios({
    method: 'Get',
    url: `http://api.tvmaze.com/search/shows?q=${this.state.userInput}`,
    dataResponse: 'json'
  }).then((res)=> {
    // const searchedShows = res.data.map((item) => {
    //   let poster = 'https://www.dogster.com/wp-content/uploads/2015/05/dachshund-puppies-10.jpg'
    //   let returnedPoster = item.show.image
    //   if (returnedPoster != null) {
    //     poster = item.show.image.original
    //   }
    // })
    const tvShowsResults = res.data.map((item) => {
      return {
        name: item.show.name,
        // poster: poster,
        rating: item.show.rating.average,
        genres: item.show.genres,
        runtime: item.show.runtime,
        summary: item.show.summary
      }
    })

    const sortedRatingTvResults = tvShowsResults.sort((a,b) => {
      return a.rating - b.rating
    })

    this.setState({
      searchedShows: sortedRatingTvResults.reverse()
    })
  })
}


  // employees.sort(function(a, b) {
  //   return a.age - b.age
  // })

  handleChange = (event) => {
    this.setState({
      userInput: event.target.value
    })
  }

  sortbyRating = (a,b) => {
    if (a.rating < b.rating) {
      return -1;
    }
    else if (a.rating > b.rating) {
      return 1;
    }
  }

  render() {
    return (
      <div className="App">
        <h1>Hello Friends! - Binge Fest</h1>
        <input onChange={this.handleChange} onKeyDown={this.getTvShows} placeholder="tvshows" type="text" />
        <input onChange={this.handleChange} onKeyDown={this.getRestaurants} placeholder="restos" type="text" />

        <ul>
          {
            this.state.searchedShows.map(((match, index) => {
              return (
                <li>{match.name}</li>
              )
            }))}
        </ul>

        <ul>
          {
            this.state.searchedRestaurants.map(((match, index) => {
              return (
                <li key={index}>{match.name}</li>
              )
            }))}
        </ul>

      </div>
    );
  }
}

export default App;


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//FIREBASE FUNCTIONS BY DANII

// FUNCTION TO ADD TV SHOW TO FIREBASE
// const dbRef = firebase.database().ref('tv');
// let showItem = this.state.searchedShows[0]
// let showName = showItem.name
// dbRef.update({ [showName]: showItem })

//FUNCTION TO ADD SELECTED RESTAURANT TO FIREBASE
  // const dbRef = firebase.database().ref('food');
  // let restaurantItem = this.state.searchedRestaurants[3]
  // let restaurantName = restaurantItem.name
  // console.log(restaurantName)
  // dbRef.update({[restaurantName]: restaurantItem })