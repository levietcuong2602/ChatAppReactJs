import React, { Component } from 'react';
import { Menu, Icon } from 'semantic-ui-react';

class Chanels extends Component {
    render() {
        const chanels = [];
        return (
            <Menu.Menu style={{ paddingBottom: '2em' }}>
                <Menu.Item>
                    <span>
                        <Icon name='exchange'/>
                        CHANELS
                    </span>
                    ({chanels.length})
                    <Icon name='add'/>
                </Menu.Item>
            </Menu.Menu>
        );
    }
}

export default Chanels;