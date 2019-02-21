import React, { Component } from 'react';
import firebase from '../../firebase';
import uuid4 from 'uuid/v4';
import { Segment, Input, Button } from 'semantic-ui-react';

import FileModal from './FileModal';
import ProgressBar from './ProgressBar';

class MessageForm extends Component {
    state = {
        message: '',
        loading: false,
        chanel: this.props.currentChanel,
        user: this.props.currentUser,
        errors: [],
        modal: false,
        uploadState: '',
        uploadTask: null,
        storageRef: firebase.storage().ref(),
        percentUploaded: 0
    }

    handleChange = event => this.setState({ [event.target.name]: event.target.value });

    createMessage = (fileUrl = null) => {
        const message = {
            timestamp: firebase.database.ServerValue.TIMESTAMP,
            user: {
                id: this.state.user.uid,
                name: this.state.user.displayName,
                avatar: this.state.user.photoURL 
            }
        }
        if (fileUrl !== null) {
            message['image'] = fileUrl;
        } else {
            message['content'] = this.state.message;
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
        const pathToUpload = this.state.chanel.id;
        const ref = this.props.messageRef;
        const filePath = `chat/public/${uuid4()}.jpg`;

        this.setState({
            uploadState: 'uploading',
            uploadTask: this.state.storageRef.child(filePath).put(file, metadata)
        },
            () => {
                this.state.uploadTask.on('state_changed', snapshot => {
                    // uploading
                    const percentUploaded = Math.round((snapshot.bytesTransferred / snapshot.totalBytes)*100);
                    this.props.isProgressBarVisiable(percentUploaded);
                    this.setState({percentUploaded});
                },
                err => {
                    // upload unsuccessful
                    console.log('upload error: ', err);
                    this.setState({
                        errors: this.state.errors.concat(err),
                        uploadState: 'error',
                        uploadTask: null
                    });
                },
                () => {
                    // upload successful
                    this.state.uploadTask.snapshot.ref.getDownloadURL().then( downloadURL => {
                        this.sendFileMessage(downloadURL, ref, pathToUpload);
                    })
                    .catch( err => {
                        console.log('upload error: ', err);
                        this.setState({
                            errors: this.state.errors.concat(err),
                            uploadState: 'error',
                            uploadTask: null
                        });
                    })
                });
            }
        );
    }

    sendFileMessage = (fileURL, ref, pathToUpload) => {
        ref.child(pathToUpload)
            .push()
            .set(this.createMessage(fileURL))
            .then(()=>{
                this.setState({uploadState: 'done'});
            })
            .catch( err => {
                console.log('send file error: ', err);
                this.setState({
                    errors: this.state.errors.concat(err)
                });
            })
    }

    render() {
        const { errors, message, loading, modal, uploadState, percentUploaded } = this.state;

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
                        disabled={uploadState==='uploading'}
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
                <ProgressBar 
                    uploadState={uploadState}
                    percentUploaded={percentUploaded}
                />
            </Segment>
        );
    }
}

export default MessageForm;