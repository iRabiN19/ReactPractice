import React from "react";

import "./SearchBar.css";

class SearchBar extends React.Component {
    constructor(props) {
        super(props);


        this.state = {
            term: ""
        };
        this.handleTermChange = this.handleTermChange.bind(this);
        this.search = this.search.bind(this);
        this.handleEnter = this.handleEnter.bind(this);
    }

    handleTermChange(event) {
        this.setState({ term: event.target.value });
    }

    search() {
        this.props.onSearch(this.state.term);
    }

    handleEnter(event) {
        if (event.keyCode === 13) {
            this.serach();
        }
    }
    render() {
        return (
            <div className="SearchBar">
                <input placeholder="Enter song, album or artist" onchange={this.handleTermChange} onkeyUp={this.handleEnter} />
                <button className="SearchButton" onclick={this.search}> </button>
                SEARCH
            </div>
        );
    }

}
export default SearchBar;