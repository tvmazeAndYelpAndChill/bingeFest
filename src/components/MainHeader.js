import React, { Component } from 'react';

class MainHeader extends Component {
    render() {
        return (
            <div>
                <header className="mainHeader">
                    <div className="wrapper">
                        <div className="tvForm">
                            <input onChange={this.props.handleChange} onKeyUp={this.props.getTvShows} placeholder="tvshows" type="text" onKeyPress={this.props.handleKeyEnterTV} />
                        </div>
                        <div className="restoForm">
                            <input onChange={this.props.handleChange} onKeyUp={this.props.getRestaurants} placeholder="restos" type="text" onKeyPress={this.props.handleKeyEnterResto} />
                        </div>


                        <ul>
                            {
                                this.props.searchedShows.map(((match, index) => {
                                    return (
                                        <li key={index} value={index} onClick={this.props.handlePressTv}>{match.name}</li>
                                    )
                                }))}
                        </ul>

                        <ul>
                            {
                                this.props.searchedRestaurants.map(((match, index) => {
                                    return (
                                        <li key={index} value={index} onClick={this.props.handlePressResto} >{match.name}</li>
                                    )
                                }))}
                        </ul>
                    </div>
                </header>
            </div>

        )
    }
}

export default MainHeader;