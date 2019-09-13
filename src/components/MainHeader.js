import React, { Component } from 'react';

class MainHeader extends Component {
    render() {
        return (
            <div>
                <input onChange={this.props.handleChange} onKeyUp={this.props.getTvShows} placeholder="tvshows" type="text" onKeyPress={this.props.handleKeyPressTV} />

                <input onChange={this.props.handleChange} onKeyUp={this.props.getRestaurants} placeholder="restos" type="text" onKeyPress={this.props.handleKeyPressResto} />

                <ul>
                    {
                        this.props.searchedShows.map(((match, index) => {
                            return (
                                <li key={index} value={index} onClick={this.props.handlePressTV}>{match.name}</li>
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

        )
    }
}

export default MainHeader;