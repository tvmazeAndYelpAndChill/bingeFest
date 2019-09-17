import React, { Component } from 'react';
import './partials/App.scss';
import firebase from './firebase';
import Axios from 'axios';
import Results from './components/Results';
import MainHeader from './components/MainHeader';
import Favorites from './components/Favorites';
import Mix from './components/Mix';
import Key from './components/Key'
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
      // If resultVisibility is true, the result section is rendered
      resultVisibity: false,
      // If showSearch or restaurantSearch is true, it will render the correct results cards to the results section
      showQuery: false,
      restaurantQuery: false,
      // If hideLiVisibleResto or hideLiVisibleTvShow is true, the dropdown menu appears under search bar
      hideLiVisibleResto: false,
      hideLiVisibleTvShows: false,
      //Google Map API States
      filteredRestaurant: [],
      userAddress: ''
    }

    this.inputRef = React.createRef();
    this.resultsRef = React.createRef();
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // function to get data from firebase and store in state
  componentDidMount() {
    const dbRef = firebase.database().ref();
    dbRef.on('value', (response) => {
      const data = response.val();

      let allFaveRestaurants = []
      let allFaveShows = []

      if (data != null) {
        for (let item in data.food) {
          allFaveRestaurants.push(data.food[item]);
        }
        for (let item in data.tv) {
          allFaveShows.push(data.tv[item]);
        }
      }
      
      this.setState({
        faveRestaurants: allFaveRestaurants,
        faveShows: allFaveShows
      })
    })
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

      ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      //Google Maps API starts Here 

      const origin = `${this.state.userAddress}`
      let filteredDistanceSearch = [];
      //Let filteredDistanceSearch be all the restaurants filtered by userInput of radius
      let j = 0;
      //Let j be a counter for filteredDistanceSearch
      for (let i = 0; i < restaurantResults.length; i++) {

        Axios({
          method: `GET`,
          url: `http://proxy.hackeryou.com`,
          dataResponse: `json`,
          params: {
            reqUrl: `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin}&destinations=${restaurantResults[i].address}&key=${Key}&mode=driving`,
            proxyHeaders: {
              'header_params': 'value'
            },
            xmlToJSON: false
          }

        }).then((res) => {
          restaurantResults[i].distance = res.data.rows[0].elements[0].duration.value;
          // time in seconds

          if (restaurantResults[i].distance < 1800) {
            filteredDistanceSearch[j] = restaurantResults[i];
            j += 1;
          }

        })

      }

      ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

      this.setState({
        searchedRestaurants: restaurantResults,
        filteredRestaurant: filteredDistanceSearch,
        searchStart: searchStart + 20,
        hideLiVisibleResto: true,
        hideLiVisibleTvShows: false,
        restaurantQuery: true,
        showQuery: false,
      })

      setTimeout(this.smoothScroll(), 2000);
  })}

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // function to make axios call to TV Maze to get TV Shows information
getTvShows = () => {
  Axios({
    method: 'Get',
    url: `http://api.tvmaze.com/search/shows?q=${this.state.userInput}`,
    dataResponse: 'json'
  }).then((res)=> {
    const tvShowsResults = res.data.map((item) => {

      // error handling for when tv show does not have a poster
      let poster = ''
      let returnedPoster = item.show.image;
      if (returnedPoster !=null) {
        poster = item.show.image.original
      }

      // error handling for format of tv summary
      let summary = item.show.summary
      if (summary == null) {
        summary = 'No summary available'
      } else {
        summary = summary.replace(/<.*?>/g, '')
      }
      
      // returning an object that holds information about each tv show
      return {
        name: item.show.name,
        rating: item.show.rating.average,
        id: item.show.id,
        genres: item.show.genres,
        runtime: item.show.runtime,
        cast: 'Nick Chug, Natalia Andreola, Danii Shen, Aushvin Vasanth',
        summary,
        poster
      }
    })
    const sortedRatingTvResults = tvShowsResults.sort((a,b) => {
      return a.rating - b.rating
    })
    this.setState({
      searchedShows: sortedRatingTvResults.reverse(),
      hideLiVisibleTvShows: true,
      hideLiVisibleResto: false,
      restaurantQuery: false,
      showQuery: true,
    })

    setTimeout(this.smoothScroll(), 2000);
  })
}

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////function to save userInput onKeyPress
  handleChange = (event) => {
    this.setState({
      userInput: event.target.value
    })
  }
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////function to save to state when user submits input on enter key or button

  handleSubmit = (event) => {
    event.preventDefault();

    this.inputRef.current.value = '';

    this.setState({
      hideLiVisibleTvShows: false,
      hideLiVisibleResto: false,
      resultVisibity: true,
    })
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////function to save to state when specific item is pressed from dropbox list
  handlePressTv = (event) => {
    let index = event.target.value;

    this.inputRef.current.value = '';

    this.setState ({
      searchedShows: [this.state.searchedShows[index]],
      hideLiVisibleTvShows: false,
      resultVisibity: true,
    })

  }
    
    //   Axios({
    //     method: 'Get',
    //     url: `http://api.tvmaze.com/shows/${this.state.searchedShows[index].id}/cast`,
    //     dataResponse: 'json'
    //   }).then((response) => {
    //     for (let i=0;i<5;i++) {
    //       tvShow.cast = response.data
    //     }
    //   })
    //   this.setState({
    //     tvShowsGallery: tvShow,
    //   })
    // })
    // this.setState({
    //   hideLiVisibleTvShows: false,
    //   resultVisibity: true,
    // })
  

  handlePressResto = (event) => {
    let index = event.target.value;

    this.inputRef.current.value = '';

    this.setState({
      searchedRestaurants: [this.state.searchedRestaurants[index]],
      resultVisibity: true,
      hideLiVisibleResto: false,
    })
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////Function that adds item upon click from firebase to favourite List
  faveClick = (event, type, faveItem) => {
    event.preventDefault();
    const dbRef = firebase.database().ref(`${type}/${faveItem.name}`);
    dbRef.update({ ...faveItem })
  }
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////Function that delet items upon click from firebase to favourite list
  removeItem = (e, type, faveItem) => {
    e.preventDefault();
    const dbRef = firebase.database().ref(`${type}/${faveItem.name}`);
    dbRef.remove();
  }
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////Function to smooth scroll

  smoothScroll = () => {
    let element = this.resultsRef.current;
    if (element != null) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////Function to Grab User Address

  userAddress = (event) => {
    this.setState({
      userAddress: event.target.value
    })
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////React Render & Return 
  render() {
    
    return (
      <Router>
        
        <nav>
          <Link to="/"><i class="fas fa-home"></i> Home</Link>
          <Link to="/favorite"><i class="fas fa-star"></i> Favorites</Link>
          <input type="text" placeholder="type your addy here" onChange = {this.userAddress} />
        </nav>

        <Route exact path="/" render={() => {
          return (
            <div>
              <MainHeader
                handleChange={this.handleChange}
                getTvShows={this.getTvShows}
                // handleKeyEnterTV={this.handleKeyEnterTV}
                getRestaurants={this.getRestaurants}
                // handleKeyEnterResto={this.handleKeyEnterResto}
                handleSubmit={this.handleSubmit}
                handlePressTv={this.handlePressTv}
                handlePressResto={this.handlePressResto}
                searchedShows={this.state.searchedShows}
                searchedRestaurants={this.state.searchedRestaurants}
                hideLiVisibleTvShows={this.state.hideLiVisibleTvShows}
                hideLiVisibleResto={this.state.hideLiVisibleResto}
                inputRef={this.inputRef}
                filteredRestaurant = {this.state.filteredRestaurant}
              />
              {/* Click on a specific Li from dropdown of RESTOS and map it to the page */}
              {(this.state.resultVisibity) && <Results
                searchedShows={this.state.searchedShows}
                searchedRestaurants={this.state.searchedRestaurants}
                resultVisibity={this.state.resultVisibity}
                faveClick={this.faveClick}
                resetVisible={this.resetVisible}
                userInput={this.state.userInput}
                showQuery={this.state.showQuery}
                restaurantQuery={this.state.restaurantQuery}
                resultsRef={this.resultsRef}
              />}

            </div>
          )
        }} />

        <Route exact path="/favorite" render={() => { return (<Favorites faveShows={this.state.faveShows} faveRestaurants={this.state.faveRestaurants} removeItem={this.removeItem} />) }} />
        <Route path="/mix" component={Mix} />
        
      </Router>
    );
  }
}
export default App;
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////