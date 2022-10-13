import React, { Component } from "react";
import PropTypes from "prop-types";
import { Search as Icon } from "react-feather";
import { connectSearchResults } from "containers/SearchResultsContainer";

//returns search buttons and closing of the search taby
export class SearchBtn extends Component {
  render() {
    const {toggleSearch, renderContent, className} = this.props;
    if (renderContent) {
      return renderContent(toggleSearch, <Icon />);
    }
    return (
      //close search tab
      <div onClick={toggleSearch}>
        <Icon className={className} />
      </div>
    );
  }
}

SearchBtn.propTypes = {
  toggleSearch: PropTypes.func.isRequired,
  renderContent: PropTypes.func,
  className: PropTypes.string,
};

export default connectSearchResults(SearchBtn);