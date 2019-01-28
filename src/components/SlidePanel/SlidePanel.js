import React, { Component } from 'react';
import UserPanel from './UserPanel';
import Chanels from './Chanels'
import { Menu } from 'semantic-ui-react';

class SlidePanel extends Component {
    render() {
        return (
            <Menu
                size='large'
                vertical
                inverted
                fixed='left'
                style={{ background: '#4c3c4c', fontSize:'1.2rem' }}
            >
                <UserPanel />
                <Chanels />
            </Menu>
        );
    }
}

export default SlidePanel;