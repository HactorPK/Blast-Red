import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import {ARTIST } from "constants/RouteConstants";
import ArtistHeader from "./ArtistHeader";
import ArtistTopTracks from "./ArtistTopTracks";
import "styles/Artist.scss";

export default class Artist extends Component {
  componentDidUpdate(prevProps) {
    if (!this.props.history.location.state) {
      window.scrollTo(0, 0);
    }
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    const {id} = this.props.match.params;
    return (
      <Switch location={this.props.location}>
        <Route exact path={`${ARTIST}/${id}`}>
          <section className="section-separators">
            <ArtistHeader id={id} />
            <ArtistTopTracks id={id} />
          </section>
        </Route>
      </Switch>
    );
  }
}