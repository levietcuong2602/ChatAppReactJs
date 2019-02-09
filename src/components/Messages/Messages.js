import React, { Component } from 'react';
import { Segment, Comment } from 'semantic-ui-react';
import firebase from '../../firebase';
import { connect } from 'react-redux';

import MessageHeader from './MessageHeader';
import MessageForm from './MessageForm';

class Messages extends Component {
    state = {
        messageRef: firebase.database().ref('messages'),
        chanel: this.props.currentChanel,
        user: this.props.currentUser,
    }

    render() {
        const { messageRef, chanel, user } = this.state;
        return (
            <React.Fragment>
                {/* message header */}
                <MessageHeader />
                {/* message group */}
                <Segment>
                    <Comment.Group className='messages'>
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
                <MessageForm 
                    messageRef={messageRef}
                    currentChanel={chanel}
                    currentUser={user}
                />
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        currentChanel: state.chanel.currentChanel,
        currentUser: state.user.currentUser,
    }
}

export default connect(mapStateToProps)(Messages);