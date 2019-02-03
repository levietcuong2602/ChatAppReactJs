import React, { Component } from 'react';
import { Menu, Icon, Modal, Form, Input, Button } from 'semantic-ui-react';
import firebase from '../../firebase';
import { connect } from 'react-redux';
import { setCurrentChanel } from '../../actions';

class Chanels extends Component {
    state = {
        chanels: [],
        modal: false,
        chanelName: '',
        chanelDetail: '',
        chanelRefs: firebase.database().ref('chanels'),
        firstChanel: true,
        activeChanel: '',
    }

    componentDidMount() {
        this.addListener();
    }

    componentWillUnmount(){
        this.removeListener();
    }

    addListener = () => {
        let loadedChanels = [];
        this.state.chanelRefs.on('child_added', snap =>{
            loadedChanels.push(snap.val());
            this.setState({ chanels: loadedChanels}, () => this.setFirstChanel());
        });
    }

    removeListener = () => {
        this.state.chanelRefs.off();
    }

    setFirstChanel = () => {
        const firstChanel = this.state.chanels[0];
        if(this.state.firstChanel && this.state.chanels.length > 0) {
            this.props.setCurrentChanel(firstChanel);
            this.setActiveChanel(firstChanel);
            this.setState({firstChanel: false});
        }
    }

    handleChange = evt => this.setState({ [evt.target.name]: evt.target.value });

    openModal = () => this.setState({modal: true});

    closeModal = () => this.setState({modal: false});

    handleSubmit = evt => { 
        evt.preventDefault();
        if(this.isFormValid(this.state)){
            this.addChanel();
        }
    };

    addChanel = () => {
        const { chanelDetail, chanelName, chanelRefs } = this.state;
        const { user } = this.props;
        const key = chanelRefs.push().key;

        const newChanel = {
            id: key,
            name: chanelName,
            detail: chanelDetail,
            createBy: {
                name: user.displayName,
                avatar: user.photoURL
            }
        }
        
        chanelRefs
            .child(key)
            .update(newChanel)
            .then(()=> {
                console.log("added chanel ");
                this.setState({ chanelName: '', chanelDetail: ''});
                this.closeModal();
            })
            .catch(err => console.log(err));
    }

    changeChanel = (chanel) => {
        this.props.setCurrentChanel(chanel);
        this.setActiveChanel(chanel);
    }

    setActiveChanel = chanel => {
        this.setState({activeChanel: chanel.id});
    }

    isFormValid = ({chanelName, chanelDetail}) => chanelName && chanelDetail;

    displayChanel = chanels => (
        chanels.length > 0 && chanels.map((chanel, key) => (
            <Menu.Item 
                key={ key }
                name={ chanel.name }
                style={{ opacity: 0.7 }}
                onClick={() => this.changeChanel(chanel) }
                active={chanel.id === this.state.activeChanel}
            >#{ chanel.name }
            </Menu.Item>
        ))
    )
    
    render() {
        const { chanels, modal } = this.state;
        
        return (
            <React.Fragment>
                {/* Menu chanels */}
                <Menu.Menu style={{ paddingBottom: '2em' }}>
                    <Menu.Item>
                        <span>
                            <Icon name='exchange'/>
                            CHANELS
                        </span>
                        ({chanels.length})
                        <Icon name='add' onClick={ this.openModal }/>
                    </Menu.Item>
                    { this.displayChanel(chanels)}
                </Menu.Menu>
                {/* Add modal chanel */}
                <Modal basic open={modal} onClose={ this.closeModal }>
                    <Modal.Header>Add a Chanels</Modal.Header>
                    <Modal.Content>
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Field>
                                <Input fluid label='Name of Chanel' name='chanelName' onChange={this.handleChange}/>
                            </Form.Field>
                            <Form.Field>
                                <Input fluid label='Chanel detail' name='chanelDetail' onChange={this.handleChange}/>
                            </Form.Field>
                        </Form>   
                    </Modal.Content>
                    <Modal.Actions>
                        <Button color='green' inverted onClick={ this.handleSubmit }>
                            <Icon name='checkmark' />ADD
                        </Button>
                        <Button color='red' inverted onClick={ this.closeModal }>
                            <Icon name='remove' />CANCEL
                        </Button>
                    </Modal.Actions>
                </Modal>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.user.currentUser,
        chanel: state.chanel.currentChanel
    }
}

export default connect(mapStateToProps, { setCurrentChanel })(Chanels);