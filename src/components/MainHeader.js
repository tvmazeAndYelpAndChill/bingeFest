import React, { Component } from 'react';

class MainHeader extends Component {
    render() {
        return (
            <div>
                <header className="mainHeader">
                    <div className="wrapper">
                        <form className="tvForm">
                            <input className="tvInput" onChange={this.props.handleChange} onKeyUp={this.props.getTvShows} placeholder="tvshows" type="text" onKeyPress={this.props.handleKeyEnterTV} />
                            <ul>
                                {
                                    this.props.searchedShows.map(((match, index) => {
                                        return (
                                            <li key={index} value={index} onClick={this.props.handlePressTv}>{match.name}</li>
                                        )
                                    }))}
                            </ul>
                        </form>
                        <form className="restoForm">
                            <input className="restoInput" onChange={this.props.handleChange} onKeyUp={this.props.getRestaurants} placeholder="restos" type="text" onKeyPress={this.props.handleKeyEnterResto} />
                            <ul>
                                {
                                    this.props.searchedRestaurants.map(((match, index) => {
                                        return (
                                            <li key={index} value={index} onClick={this.props.handlePressResto} >{match.name}</li>
                                        )
                                    }))}
                            </ul>
                        </form>
                    </div>
                </header>
            </div>

        )
    }
}

export default MainHeader;