import React, { Component } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import * as RouteConstant from "constants/RouteConstants";
import Album from "pages/Album";
import Artist from "pages/Artist/Artist";
import UserPlaylists from "pages/UserPlaylists";
import Playlist from "pages/Playlist";
import TracklistModal from "pages/Tracklist/TracklistModal";
import Home from "pages/HomePage/Home";
import Page404 from "pages/Page404";

//main rendering component on start up
class Main extends Component {
  constructor(props) {
    super(props);
    this.previousLocation = this.props.location;
  }

  componentWillUpdate() {
    const {location} = this.props;
    if (!(location.state && location.state.modal)) {
      this.previousLocation = this.props.location;
    }
  }

  render() {
    const {location} = this.props;
    const isModal = (
      location.state &&
      location.state.modal &&
      this.previousLocation !== location
    );
    //renders homepage and routing to other pages.
    return (
      <React.Fragment>
        <Switch location={isModal ? this.previousLocation : location}>
          <Route
            exact
            path={RouteConstant.HOME}
            component={Home}
          />
          <Route
            path={RouteConstant.PLAYLISTS}
            component={UserPlaylists}
          />

          <Route
            path={`${RouteConstant.ALBUM}/:id`}
            render={props => {
              return <Album id={props.match.params.id} {...props} />;
            }}
          />
          <Route
            path={`${RouteConstant.ARTIST}/:id`}
            render={props => {
              return (
                <Artist
                  location={isModal ? this.previousLocation : location}
                  {...props}
                />
              );
            }}
          />
          <Route path="*">
            <Page404 />
          </Route>
        </Switch>
        {isModal
          ?
          <Route
            path={`${location.state.type === "album"
              ? RouteConstant.ALBUM
              : RouteConstant.PLAYLIST
            }/:id`}
            render={props => {
              return (
                <TransitionGroup>
                  <CSSTransition
                    key={props.location.key}
                    appear={true}
                    timeout={600}
                    classNames="tracklist__overlay"
                    unmountOnExit={true}
                  >
                    <TracklistModal>
                      {props.location.state.type === "album"
                        ? <Album id={props.match.params.id} {...props} />
                        : <Playlist id={props.match.params.id} {...props} />
                      }
                    </TracklistModal>
                  </CSSTransition>
                </TransitionGroup>
              );
            }}
          />
          :
          null
        }
      </React.Fragment>
    );
  }
}

export default withRouter(Main);