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
            progressBar: false,
            numUniqueUsers: '',
            searchTerm: '',
            searchLoading: false,
            searchResults: [],
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
            this.countUniqueUsers(loadedMessages);
        });        
    }

    countUniqueUsers = (messages) => {
        const uniqueUsers = messages.reduce((acc, message)=>{
            if (!acc.includes(message.user.name)) {
                acc.push(message.user.name);
            }
            return acc;
        }, []);
        const plural = uniqueUsers.length > 1 ? 's' : '';
        const numUniqueUsers = `${uniqueUsers.length} user${plural}`;
        this.setState({numUniqueUsers});
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

    isProgressBarVisiable = percent => {
        if (percent) {
            this.setState({progressBar: true});
        }
    }

    displayChannelName = (channel) => channel ? channel.name : '';

    handleMessageSearch = () => {
        const chanelMessages = [...this.state.messages];
        const regex = new RegExp(this.state.searchTerm, 'gi');
        const searchResults = chanelMessages.reduce((acc, message) => {
            if (message.content && message.content.match(regex) || message.user.name.match(regex)) {
                acc.push(message);
           }
           return acc;
        }, []);
        this.setState({searchResults});
        setTimeout(this.setState({ searchLoading: false }), 1000);
    }

    handleSearchChange = event => {
        this.setState({
            searchTerm: event.target.value,
            searchLoading: true
        }, () => this.handleMessageSearch());
    }

    render() {
        const { messageRef, user, chanel, messages, progressBar, numUniqueUsers, 
        searchTerm, searchResults, searchLoading } = this.state;
        
        return (
            <React.Fragment>
                {/* message header */}
                <MessageHeader 
                    chanelName={this.displayChannelName(chanel)}
                    numUniqueUsers={numUniqueUsers}
                    handleSearchChange={this.handleSearchChange}
                    searchLoading={searchLoading}
                />
                {/* message group */}
                <Segment>
                    <Comment.Group className={progressBar ? 'messages__progress' : 'messages'}>
                        {searchTerm ? this.displayMessages(searchResults) : this.displayMessages(messages)}
                    </Comment.Group>
                </Segment>
                {/* message form */}
                <MessageForm 
                    messageRef={messageRef}
                    currentChanel={chanel}
                    currentUser={user}
                    isProgressBarVisiable={this.isProgressBarVisiable}
                />
            </React.Fragment>
        );
    }
}

export default Messages;