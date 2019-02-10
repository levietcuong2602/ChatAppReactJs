import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';

import UserPanel from './UserPanel';
import Chanels from './Chanels'

class SlidePanel extends Component {
    render() {
        const { currentUser } = this.props;
        return (
            <Menu
                size='large'
                vertical
                inverted
                fixed='left'
                style={{ background: '#4c3c4c', fontSize:'1.2rem' }}
            >
                <UserPanel 
                    currentUser={currentUser}
                />
                <Chanels />
            </Menu>
        );
    }
}

export default SlidePanel;