import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';

import './App.css';
import ColorPanel from './ColorPanel/ColorPanel';
import SlidePanel from './SlidePanel/SlidePanel';
import Messages from './Messages/Messages';
import MetalPanel from './MetalPanel/MetalPanel';


class App extends Component {
  render() {
    const{ currentUser, currentChanel } = this.props;

    return (
      <Grid columns='equal' style={{background: "#eeee"}} className='app'>
          <ColorPanel />
          <SlidePanel
            key={currentUser && currentUser.uid}
            currentUser={currentUser}
          />

        <Grid.Column style={{background: "#fff", marginLeft: 320}}>
          <Messages
            key={currentChanel && currentChanel.id}
            currentChanel={currentChanel}
            currentUser={currentUser}
          />
        </Grid.Column>

        <Grid.Column style={{background: 'blue'}} width={4}>
          <MetalPanel />
        </Grid.Column>
      </Grid>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentChanel: state.chanel.currentChanel,
    currentUser: state.user.currentUser,
  }
}

export default connect(mapStateToProps)(App);
