import React, { Component } from 'react';

class MainHeader extends Component {

    render() {
        return (
            <div>
                <header className="mainHeader">
                    <div className="wrapperHeader">
                        <div className="tvForm">
                            <form>
                                <div className="inputBar">
                                    <input className="tvInput" onChange={this.props.handleChange} onKeyUp={this.props.getTvShows} placeholder="Search for a TV Show" type="text"/>
                                    <button
                                    onClick={this.props.handleSubmit} className="searchButton"><i class="fas fa-arrow-right"></i></button>
                                </div>
                                <ul style = {{ display: this.props.hideLiVisibleTvShows === false ? 'none' : 'block' }}>
                                    {
                                        this.props.searchedShows.map(((match, index) => {
                                            return (
                                                <li key={index} value={index} onClick={this.props.handlePressTv}>{match.name}</li>
                                            )
                                        }))}
                                </ul>
                            </form>
                        </div>
                        <div className="restoForm">

                            <form>
                                <div className="inputBar">
                                    <input className="restoInput" onChange={this.props.handleChange} onKeyUp={this.props.getRestaurants} placeholder="Search for a restaurant" type="text"/>
                                    <button 
                                    onClick={this.props.handleSubmit}
                                    className="searchButton"><i class="fas fa-arrow-right"></i></button>
                                </div>
                                
                                <ul style={{ display: this.props.hideLiVisibleResto === false ? 'none' : 'block' }}>
                                    {
                                        this.props.searchedRestaurants.map(((match, index) => {
                                            return (
                                                <li key={index} value={index} onClick={this.props.handlePressResto} >{match.name}</li>
                                            )
                                        }))}
                                </ul>
                            </form>
                        </div>
                    </div>
                </header>
            </div>

        )
    }
}

export default MainHeader;

{/* <input className="tvInput" onChange={this.props.handleChange} onKeyUp={this.props.getTvShows} placeholder="Search for a TV Show" type="text" onKeyPress={this.props.handleKeyEnterTV} /> */}