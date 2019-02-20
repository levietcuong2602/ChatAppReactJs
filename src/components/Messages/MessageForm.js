import React, { Component } from 'react';
import firebase from '../../firebase';
import { Segment, Input, Button } from 'semantic-ui-react';

import FileModal from './FileModal';

class MessageForm extends Component {
    state = {
        message: '',
        loading: false,
        chanel: this.props.currentChanel,
        user: this.props.currentUser,
        errors: [],
        modal: false,
    }

    handleChange = event => this.setState({ [event.target.name]: event.target.value });

    createMessage = () => {
        const message = {
            timestamp: firebase.database.ServerValue.TIMESTAMP,
            user: {
                id: this.state.user.uid,
                name: this.state.user.displayName,
                avatar: this.state.user.photoURL 
            },
            content: this.state.message
        }
        return message;
    }

    sendMessage = () => {
        const { message, chanel } = this.state;
        const { messageRef } = this.props;

        if(message) {
            this.setState({loading: true});
            messageRef
                .child(chanel.id)
                .push()
                .set(this.createMessage())
                .then(() => {
                    console.log('Sended message');
                    this.setState({ loading: false, message: '', errors: []});
                })
                .catch(err => {
                    console.log('Error: ', err);
                    this.setState({ loading: false, errors: this.state.errors.concat(err)});
                })
        } else {
            this.setState({loading: false, errors: this.state.errors.concat({message: 'Add message'})});
        }

    }

    openModal = () => this.setState({modal: true});

    closeModal = () => this.setState({modal: false});

    uploadFile = (file, metadata) => {
        console.log(file, metadata);
    }

    render() {
        const { errors, message, loading, modal } = this.state;

        return (
            <Segment className='message__form'>
                <Input
                    fluid
                    placeholder='Write your messages'
                    label={ <Button icon='add'/>}
                    labelPosition='left'
                    name='message'
                    value={message}
                    style={{ marginBottom: '0.7rem'}}
                    onChange={this.handleChange}
                />
                <Button.Group icon widths='2'>
                    <Button
                        icon='edit'
                        labelPosition='left'
                        content='Add Reply'
                        color='orange'
                        disabled={loading}
                        onClick={this.sendMessage}
                        className={
                            errors.some(error => error.message.includes('message')) ? 'error' : ''
                        }
                    />
                    <Button
                        icon='upload'
                        onClick={this.openModal}
                        labelPosition='right'
                        content='Upload Media'
                        color='teal'
                    />
                </Button.Group>

                <FileModal
                    modal={modal}
                    closeModal={this.closeModal}
                    uploadFile={this.uploadFile}
                />
            </Segment>
        );
    }
}

export default MessageForm;