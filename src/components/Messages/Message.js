import React, { Component } from 'react';
import moment from 'moment';
import { Comment, Image } from 'semantic-ui-react';

class Message extends Component {
    timeFromNow = timestamp => moment(timestamp).fromNow();

    isOwnMessage = (message, user) => (
        message.user.id === user.uid ? 'message__self' : ''
    )
    
    isImage = (message) => {
        return message.hasOwnProperty('image') && !message.hasOwnProperty('content');
    }

    render() {
        const { message, user } = this.props;

        return (
            <Comment>
                <Comment.Avatar src={message.user.avatar} />
                <Comment.Content className={this.isOwnMessage(message, user)}>
                    <Comment.Author as='a'>{message.user.name}</Comment.Author>
                    <Comment.Metadata>
                        <div>{this.timeFromNow(message.timestamp)}</div>
                    </Comment.Metadata>
                    { this.isImage(message) ? 
                        <Image src={message.image} className='message__image'/> : 
                        <Comment.Text>{message.content}</Comment.Text>
                    }
                </Comment.Content>
            </Comment>
        );
    }
}

export default Message;