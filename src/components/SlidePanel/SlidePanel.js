import React, { Component } from 'react';
import UserPanel from './UserPanel';
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
            </Menu>
        );
    }
}

export default SlidePanel;