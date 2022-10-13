import React, { Component } from "react";
import PropTypes from "prop-types";
import { X } from "react-feather";
import { ReactComponent as Loader } from "images/loader.svg";

export default class SearchInput extends Component {
  //just for performance gain. 
  //only render on change of props
  shouldComponentUpdate(nextProps) {
    return (
      nextProps.pending !== this.props.pending ||
      nextProps.value !== this.props.value
    );
  }

  //renders the search tab and takes in search input
  render() {
    const { pending, value, updateSearchValue, close } = this.props;
    return (
      <div className="search__input-container flex-center">
        <div className="search__input-wrapper">
          <p>What are we listening to?</p>
          <div className="search__input">
            <input
              onChange={updateSearchValue}
              type="text"
              placeholder="Search here..."
              className="search__input-field"
              value={value}
            />
            {pending && (
              <span className="search__loader">
                <Loader />
              </span>
            )}
            <span className="search__close" onClick={close}>
              <X />
            </span>
          </div>
        </div>
      </div>
    );
  }
}

SearchInput.propTypes = {
  close: PropTypes.func.isRequired,
  updateSearchValue: PropTypes.func.isRequired,
  pending: PropTypes.bool,
  value: PropTypes.string,
};
