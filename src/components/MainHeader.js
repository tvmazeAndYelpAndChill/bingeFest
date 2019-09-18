import React, { Component } from 'react';

class MainHeader extends Component {

    render() {
        return (
            <div>
                <header
                    className={this.props.resultVisibity ? "mainHeader headerGone" : "mainHeader" }>
                    <div className="wrapperHeader">
                        <div className="headerTitle">
                            <h1 >bingeFest</h1>
                            <h2>Save your favorite TV Shows and restaurants and let us find you the best combo to binge tonight!</h2>
                        </div>
                        <div className="tvForm">
                            <form>
                                <div className="inputBar">
                                    <input 
                                    ref={this.props.inputRef}
                                    className="tvInput" onChange={this.props.handleChange} onKeyUp={this.props.getTvShows} placeholder="Search for a TV Show" type="text"/>
                                    <button
                                    onClick={this.props.handleSubmit} className="searchButton"><i class="fas fa-arrow-right"></i></button>
                                </div>
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
                                

                            </form>
                        </div>
                    </div>
                </header>
            </div>

        )
    }
}

export default MainHeader;
