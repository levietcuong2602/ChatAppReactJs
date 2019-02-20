import React, { Component } from 'react';
import { Progress } from 'semantic-ui-react';

class ProgressBar extends Component {
    render() {
        const { percentUploaded, uploadState } = this.props;
        return (
            uploadState==='uploading' && <Progress 
                className='progress__bar'
                progress
                inverted
                indicating
                percent={percentUploaded}
                size='medium'
            />
        );
    }
}

export default ProgressBar;