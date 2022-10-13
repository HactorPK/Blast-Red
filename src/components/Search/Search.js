import React, { Component } from "react";
import PropTypes from "prop-types";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import { connectSearchResults } from "containers/SearchResultsContainer";
import SearchResults from "./SearchResults";
import SearchInput from "./SearchInput";
import "styles/Search.scss";

//initial state is clear or empty
export class Search extends Component {
  state = {
    value: "",
    loading: false,
  };
  //invoked immediately after update has occured
  //invoked immediately after something has been typed on the search input tab
  componentDidUpdate(prevProps, prevState) {
    //set search results to pending as we type something
    const { type, pending } = this.props.searchResults;
    //change state
    const { value, loading } = this.state;
    //will run if the state has changed or loading results.
    if (value !== prevState.value || loading) {
      if (pending) {
        !loading && this.setState({ loading: true });
        return;
      }
      //results have been loaded.

      this.props.loadSearchResults(value, type);
      //terminate loading state
      loading && this.setState({ loading: false });
    }
  }
  //option being songs, artist and albums
  switchTab = (option) => {
    //switch to respective option
    this.props.filterByType(option);
    this.props.loadSearchResults(this.state.value, option);
  };
  
  updateSearchValue = (e) => {
    this.setState({
      value: e.target.value,
    });
  };

  render() {
    const { value } = this.state;
    const { toggleSearch } = this.props;
    const { isOpen, pending, type, items } = this.props.searchResults;

    //receiving and returning of filtered search results
    return (
      <React.Fragment>
        <TransitionGroup>
          {isOpen && (
            <CSSTransition timeout={800} classNames="search__input-container">
              <SearchInput
                value={value}
                updateSearchValue={this.updateSearchValue}
                pending={pending}
                close={toggleSearch}
              />
            </CSSTransition>
          )}
          {value !== "" && isOpen && (
            <CSSTransition timeout={800} classNames="search__results">
              <SearchResults
                value={value}
                close={toggleSearch}
                switchTab={this.switchTab}
                type={type}
                items={items}
                pending={pending}
              />
            </CSSTransition>
          )}
        </TransitionGroup>
      </React.Fragment>
    );
  }
}

export default connectSearchResults(Search);

Search.propTypes = {
  toggleSearch: PropTypes.func.isRequired,
  filterByType: PropTypes.func.isRequired,
  loadSearchResults: PropTypes.func.isRequired,
  searchResults: PropTypes.object.isRequired,
};
