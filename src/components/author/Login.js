import React, { Component } from 'react';
import {Input} from 'semantic-ui-react';

class Login extends Component {
    render() {
        return (
            <div>
                <Input
                icon='tags'
                iconPosition='left'
                label={{ tag: true, content: 'Add Tag' }}
                labelPosition='right'
                placeholder='Enter tags'
                />
            </div>
        );
    }
}

export default Login;