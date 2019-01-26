import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import './App.css';

import ColorPanel from './ColorPanel/ColorPanel';
import SlidePanel from './SlidePanel/SlidePanel';
import Messages from './Messages/Messages';
import MetalPanel from './MetalPanel/MetalPanel';


class App extends Component {
  render() {
    return (
      <Grid columns='equal' style={{background: "#eeee"}} className='app'>
          <ColorPanel />
          <SlidePanel />

        <Grid.Column style={{background: "#fff", marginLeft: 320}}>
          <Messages />
        </Grid.Column>

        <Grid.Column style={{background: 'blue'}}>
          <MetalPanel />
        </Grid.Column>
      </Grid>
    );
  }
}

export default App;
