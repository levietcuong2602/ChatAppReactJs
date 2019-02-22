import React, { Component } from 'react';
import { Segment, Header, Icon, Input } from 'semantic-ui-react';

class MessageHeader extends Component {
    render() {
        const { chanelName, numUniqueUsers, handleSearchChange, searchLoading } = this.props;
        return (
            <Segment clearing style={{ paddingBottom: 0 }}>
                {/* chanel title */}
                <Header as='h2' fluid='true' floated='left'>
                    <span>
                        {chanelName}
                        <Icon name='star outline' color='black'/>
                    </span>
                    <Header.Subheader>{numUniqueUsers}</Header.Subheader>
                </Header>
                {/* chanel search form */}
                <Header floated='right'>
                    <Input
                        onChange={handleSearchChange}
                        loading={searchLoading}
                        size='mini'
                        icon='search'
                        name='seachTerm'
                        placeholder='Searh Messages'
                    />
                </Header>
            </Segment>
        );
    }
}

export default MessageHeader;