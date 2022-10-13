import React, { Component } from "react";

import TopTracks from "./TopTracks";
import UserPlaylists from "./UserPlaylists";

export default class Home extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <section className="section-separators">
        <section className="row">
          <TopTracks />
        </section>
        {/* <UserPlaylists /> */}
      </section>
    );
  }
}