import React, { Component } from 'react';
import './partials/App.scss';
import firebase from './firebase';
import Axios from 'axios';
import Results from './components/Results';
import MainHeader from './components/MainHeader';
import Favorites from './components/Favorites';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

class App extends Component {
  constructor() {
    super();
    this.state = {
      //UserInput being constantly updated onKeyPress
      userInput: '',
      //Zomato API search start
      searchStart: 0,
      //Restaurants fave from FB
      faveRestaurants: [],
      //Shows fave from FB
      faveShows: [],
      //OnKeyPress Li list being constantly updated 
      searchedRestaurants: [],
      //OnKeyPress Li list being constantly updated
      searchedShows: [],
      //If user clicks specific Li in dropdown
      restaurantGallery: [],
      tvShowsGallery: [],
      // fbShowID: [],
      // fbFoodID: [],
      resultVisible: false
    }
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // function to make axios call to Zomato to get Restaurant information

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

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // function to get data from firebase and store in state

  componentDidMount() {
    const dbRef = firebase.database().ref();
    dbRef.on('value', (response) => {

      const data = response.val();
      // these arrays store the node names of each item so that when we click button, we can make the button greyed out as UI response
      let fbFoodID = [];
      let fbShowID = [];
      if (data != null) {
        fbShowID = Object.keys(data.tv);
        fbFoodID = Object.keys(data.food)
      }
      let allFaveRestaurants = []
      let allFaveShows = []
      for (let item in data.food) {
        allFaveRestaurants.push(data.food[item]);
      }

      for (let item in data.tv) {
        allFaveShows.push(data.tv[item]);
      }
      this.setState({
        faveRestaurants: allFaveRestaurants,
        faveShows: allFaveShows
      })

    })
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // function to make axios call to TV Maze to get TV Shows information

getTvShows = () => {
  Axios({
    method: 'Get',
    url: `http://api.tvmaze.com/search/shows?q=${this.state.userInput}`,
    dataResponse: 'json'
  }).then((res)=> {

    const tvShowsResults = res.data.map((item) => {
      let poster = 'https://www.dogster.com/wp-content/uploads/2015/05/dachshund-puppies-10.jpg';
      let returnedPoster = item.show.image;

      if (returnedPoster !=null) {
        poster = item.show.image.original
      }

      return {
        name: item.show.name,
        poster: poster,
        rating: item.show.rating.average,
        genres: item.show.genres,
        runtime: item.show.runtime,
        summary: item.show.summary,
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

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // function to sort returned array of searched TV shows by rating/popularity for optimized user experience

  sortbyRating = (a,b) => {
    if (a.rating < b.rating) {
      return -1;
    }
    else if (a.rating > b.rating) {
      return 1;
    }
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////function to save userInput onKeyPress

  handleChange = (event) => {

    if (event.key === 'Enter') {
      console.log('enter press here!');
    }

    this.setState({
      userInput: event.target.value
    })
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////function to save to state when ENTER key is pressed

  handleKeyEnterTV = (event) => {
    if (event.key === 'Enter') {
      this.setState ({
        //Will this alter the original state?
        tvShowsGallery: (this.state.searchedShows),
      })
    }
  }

  handleKeyEnterResto = (event) => {
    if (event.key === 'Enter') {
      this.setState({
        restaurantGallery: (this.state.searchedRestaurants)
      })
    }
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////function to save to state when specific item is pressed from dropbox list

  handlePressTv = (event) => {
    let index = event.target.value;
    this.setState({
      tvShowsGallery: [this.state.searchedShows[index]]
    })
  }

  handlePressResto = (event) => {
    let index = event.target.value;
    this.setState({
      restaurantGallery: [this.state.searchedRestaurants[index]],
      resultVisible: true,
    })
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////Function that adds item upon click from firebase to favourite List

  faveClick = (event, faveItem) => {
    event.preventDefault();
    const dbRef = firebase.database().ref(faveItem.name);
    dbRef.update({ ...faveItem })
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////React Render & Return 


  render() {
    
    
    return (
      <Router>
        <div className="App">
          <h1>Hello Friends! - Binge Fest</h1>
          <nav>
            <Link to ="/home">Home</Link>
            <Link to ="/favorite">Favorites</Link>
            
          </nav>

          <MainHeader 
            handleChange = {this.handleChange}
            getTvShows = {this.getTvShows}
            handleKeyEnterTV = {this.handleKeyEnterTV}
            getRestaurants = {this.getRestaurants}
            handleKeyEnterResto={this.handleKeyEnterResto}
            handlePressTv = {this.handlePressTv}
            handlePressResto = {this.handlePressResto}
            searchedShows = {this.state.searchedShows}
            searchedRestaurants = {this.state.searchedRestaurants}
          />

          {/* Click on a specific Li from dropdown of RESTOS and map it to the page */}
          {this.state.resultVisible && <Results specificRestaurants={this.state.specificRestaurants}/>}
        </div>

        <Route exact path="/favorite" render={() => { return (<Favorites faveShows={this.state.faveShows} faveRestaurants={this.state.faveRestaurants} />) }} />
        
      </Router>
    );
  }
}
export default App;


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
