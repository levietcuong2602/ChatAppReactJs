import React, { Component } from 'react';
import firebase from '../../firebase';
import { Grid, Header, Icon, Dropdown } from 'semantic-ui-react';

class UserPanel extends Component {
    dropdownOptions = () =>[
        {
            key: 'user',
            text: <span>Signed in as <strong>User</strong></span>,
            // value: 'signed_in',
        },
        {
            key: 'avatar',
            text: <span>Change Avatar</span>,
            // value: 'change/-avatar'
        },
        {
            key: 'signout',
            text: <span onClick={this.handleSignout}>Sign Out</span>,
            // value: 'sign_out'
        }
    ];

    handleSignout = ()=>{
        firebase
            .auth()
            .signOut()
            .then(()=> console.log('Signouted'));
    }

    render() {
        return (
            <Grid style={{background: '#4c3c4c'}}>
                <Grid.Column>
                    <Grid.Row style={{ padding: '1.2em', margin: 0 }}>
                        {/* App Header */}
                        <Header as='h2' inverted floated='left'>
                            <Icon name='code'/>
                            <Header.Content>DevChat</Header.Content>
                        </Header>
                        {/* User dropdown */}
                        <Header as='h4' inverted style={{ background: '0.25em' }}>
                            <Dropdown 
                                trigger={<span>User</span>}
                                placeholder='Select Options'
                                fluid
                                options={this.dropdownOptions()} 
                            />
                        </Header>

                    </Grid.Row>
                </Grid.Column>
            </Grid>
        );
    }
}

export default UserPanel;