import React, { Component } from 'react';
import { Segment, Comment } from 'semantic-ui-react';
import firebase from '../../firebase';

import MessageHeader from './MessageHeader';
import MessageForm from './MessageForm';
import Message from './Message';

class Messages extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messageRef: firebase.database().ref('messages'),
            messages: [],
            messageLoading: false,
            chanel: this.props.currentChanel,
            user: this.props.currentUser,
        }
    }

    componentDidMount() {
        const { chanel, user } = this.state;

        if(chanel && user) {
            this.addListeners(chanel.id);
        }
    }

    componentWillUnmount() {
        this.removeListener();
    }

    removeListener = () => this.state.messageRef.off();

    addListeners = chanelId => {
        this.addMessagesListeners(chanelId);
    }

    addMessagesListeners = chanelId => {
        const loadedMessages = [];
        this.state.messageRef.child(chanelId).on('child_added', snaps =>{
            loadedMessages.push(snaps.val());
            this.setState({
                messages: loadedMessages,
                messageLoading: false
            });
        })
    }

    displayMessages = messages => (
        messages.length > 0 && messages.map(message => (
            <Message 
                key={message.timestamp}
                message={message}
                user={this.state.user}
            />
        ))
    );

    render() {
        const { messageRef, user, chanel, messages } = this.state;
        
        return (
            <React.Fragment>
                {/* message header */}
                <MessageHeader />
                {/* message group */}
                <Segment>
                    <Comment.Group className='messages'>
                        {this.displayMessages(messages)}
                    </Comment.Group>
                </Segment>
                {/* message form */}
                <MessageForm 
                    messageRef={messageRef}
                    currentChanel={chanel}
                    currentUser={user}
                />
            </React.Fragment>
        );
    }
}

export default Messages;