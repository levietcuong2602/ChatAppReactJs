import React, { Component } from 'react';
import { Segment, Header, Icon, Input } from 'semantic-ui-react';

class MessageHeader extends Component {
    render() {
        return (
            <Segment clearing style={{ paddingBottom: 0 }}>
                {/* chanel title */}
                <Header as='h2' fluid floated='left'>
                    <span>
                        Chanel Title
                        <Icon name='star outline' color='black'/>
                    </span>
                    <Header.Subheader>2 Users</Header.Subheader>
                </Header>
                {/* chanel search form */}
                <Header floated='right'>
                    <Input 
                        size='mini'
                        icon='search'
                        placeholder='Searh Messages'
                    />
                </Header>
            </Segment>
        );
    }
}

export default MessageHeader;