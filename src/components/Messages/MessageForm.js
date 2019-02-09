import React, { Component } from 'react';
import { Segment, Input, Button } from 'semantic-ui-react';

class MessageForm extends Component {
    render() {
        return (
            <Segment>
                <Input
                    fluid
                    placeholder='Write your messages'
                    label={ <Button icon='add'/>}
                    labelPosition='left'
                    name='messages'
                    className='messages'
                    style={{ marginBottom: '0.7rem'}}
                />
                <Button.Group icon widths='2'>
                    <Button
                        icon='edit'
                        labelPosition='left'
                        content='Add Reply'
                        color='orange'
                    />
                    <Button 
                        icon='upload'
                        labelPosition='right'
                        content='Upload Media'
                        color='teal'
                    />
                </Button.Group>
            </Segment>
        );
    }
}

export default MessageForm;