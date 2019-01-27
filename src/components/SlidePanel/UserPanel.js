import React, { Component } from 'react';
import firebase from '../../firebase';
import { connect } from 'react-redux';
import { Grid, Header, Icon, Dropdown, Image } from 'semantic-ui-react';

class UserPanel extends Component {
    state = {
        user: this.props.currentUser
    }

    dropdownOptions = () =>[
        {
            key: 'user',
            text: <span>Signed in as <strong>{this.state.user.displayName}</strong></span>,
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
        const { user } = this.state;
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
                                trigger={
                                    <span>
                                        <Image src={user.photoURL} spaced='right' avatar/>
                                        {user.displayName}
                                    </span>
                                }
                                options={this.dropdownOptions()} 
                            />
                        </Header>

                    </Grid.Row>
                </Grid.Column>
            </Grid>
        );
    }
}

const mapStateToProps = state => {
    return {
        currentUser: state.user.currentUser
    }
}

export default connect(mapStateToProps)(UserPanel);