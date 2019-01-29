import React, { Component } from 'react';
import { Menu, Icon, Modal, Form, Input, Button } from 'semantic-ui-react';
import firebase from '../../firebase';
import { connect } from 'react-redux';

class Chanels extends Component {
    state = {
        chanels: [],
        modal: false,
        chanelName: '',
        chanelDetail: '',
        chanelRefs: firebase.database().ref('chanels'),
    }

    handleChange = evt => this.setState({ [evt.target.name]: evt.target.value });

    openModal = () => this.setState({modal: true});

    closeModal = () => this.setState({modal: false});

    handleSubmit = evt => { 
        evt.preventDefault();
        if(this.isFormEmpty(this.state)){
            this.addChanel();
        }
    };

    addChanel = () => {
        const { chanelDetail, chanelName, chanelRefs } = this.state;
        const { user } = this.props;
        const key = chanelRefs.push().key;

        const newChanel = {
            id: key,
            name: chanelName,
            detail: chanelDetail,
            createBy: {
                name: user.displayName,
                avatar: user.photoURL
            }
        }
        
        chanelRefs
            .child(key)
            .update(newChanel)
            .then(()=> {
                console.log("added chanel ");
                this.setState({ chanelName: '', chanelDetail: ''});
                this.closeModal();
            })
            .catch(err => console.log(err));
    }

    isFormEmpty = ({chanelName, chanelDetail}) => chanelName && chanelDetail;

    render() {
        const { chanels, modal } = this.state;
        return (
            <React.Fragment>
                {/* Menu chanels */}
                <Menu.Menu style={{ paddingBottom: '2em' }}>
                    <Menu.Item>
                        <span>
                            <Icon name='exchange'/>
                            CHANELS
                        </span>
                        ({chanels.length})
                        <Icon name='add' onClick={ this.openModal }/>
                    </Menu.Item>
                </Menu.Menu>
                {/* Add modal chanel */}
                <Modal basic open={modal} onClose={ this.closeModal }>
                    <Modal.Header>Add a Chanels</Modal.Header>
                    <Modal.Content>
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Field>
                                <Input fluid label='Name of Chanel' name='chanelName' onChange={this.handleChange}/>
                            </Form.Field>
                            <Form.Field>
                                <Input fluid label='Chanel detail' name='chanelDetail' onChange={this.handleChange}/>
                            </Form.Field>
                        </Form>   
                    </Modal.Content>
                    <Modal.Actions>
                        <Button color='green' inverted onClick={ this.handleSubmit }>
                            <Icon name='checkmark' />ADD
                        </Button>
                        <Button color='red' inverted onClick={ this.closeModal }>
                            <Icon name='remove' />CANCEL
                        </Button>
                    </Modal.Actions>
                </Modal>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.user.currentUser
    }
}

export default connect(mapStateToProps)(Chanels);