import React, { Component } from 'react';
import { Segment, Comment } from 'semantic-ui-react';

import MessageHeader from './MessageHeader';
import MessageForm from './MessageForm';

class Messages extends Component {
    render() {
        return (
            <React.Fragment>
                {/* message header */}
                <MessageHeader />
                {/* message group */}
                <Segment>
                    <Comment.Group>
                        <Comment>
                            <Comment.Avatar icon='code'/>
                            <Comment.Content>
                                <Comment.Author as='a'>Matt</Comment.Author>
                                <Comment.Metadata>
                                    <div>Today at 5:42PM</div>
                                </Comment.Metadata>
                                <Comment.Text>How artistic!</Comment.Text>
                                <Comment.Actions>
                                    <Comment.Action>Reply</Comment.Action>
                                </Comment.Actions>
                            </Comment.Content>
                        </Comment>
                    </Comment.Group>
                </Segment>
                {/* message form */}
                <MessageForm />
            </React.Fragment>
        );
    }
}

export default Messages;