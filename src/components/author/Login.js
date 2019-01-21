import React, { Component } from 'react';
import { Grid, Button, Message, Header, Icon, Form, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import firebase from '../../firebase';

class Login extends Component {
    state = {
        email: '',
        password: '',
        loading: false,
        errors: []
    }

    handleChange = evt => {
        this.setState({
            [evt.target.name]: evt.target.value
        });
    }

    handleSubmit = evt => {
        evt.preventDefault();
        if (this.isFormValid()) {
            this.setState({
                errors: [],
                loading: true
            });
            firebase
                .auth()
                .signInWithEmailAndPassword(this.state.email, this.state.password)
                .then(signedInUser => {
                    console.log(signedInUser);
                    this.setState({
                        loading: false
                    });
                    console.log('Login successfull');
                })
                .catch(err => {
                    this.setState({
                        errors: this.state.errors.concat(err),
                        loading: false
                    });
                })
        }
    }

    isFormValid = () => {
        let error;
        let errors = [];
        if (this.isFormEmpty(this.state)) {
            error = { message: "Email & Password can't empty" };
            this.setState({
                errors: errors.concat(error)
            });
            return false;
        } else {
           return true;
        }
    }

    isFormEmpty = ({ email, password }) => {
        return !email || !password;
    }

    displayErrors = errors => {
        return errors.map((err, i) => <p key={i}>{err.message}</p>);
    }

    handleInputErorr = (errors, inputName) => errors.some(err => err.message.toLowerCase().includes(inputName)) ? 'error' : '';

    render() {
        const { loading, errors } = this.state;
        return <Grid textAlign="center" verticalAlign="middle" className="app">
            <Grid.Column style={{ maxWidth: 450 }}>
              <Header as="h2" icon color="violet">
                <Icon name="code branch" color="violet" />
                <Header.Content>Login For DevChat</Header.Content>
              </Header>
              {errors.length > 0 && <Message error>
                  <Message.Header>You cann't login</Message.Header>
                  {this.displayErrors(errors)}
                </Message>}
              <Form onSubmit={this.handleSubmit} size="large">
                <Segment raised>
                  <Form.Input fluid type='email' name="email" icon="mail" iconPosition="left" placeholder="Enter your email" onChange={this.handleChange} className={this.handleInputErorr(errors, 'email')} />
                  <Form.Input fluid type='password' name="password" icon="lock" iconPosition="left" placeholder="Enter your password" onChange={this.handleChange} className={this.handleInputErorr(errors, 'password')} />
                  <Button fluid disabled={loading} className={loading ? "loading" : ""} color="violet" type="submit">
                    Login
                  </Button>
                </Segment>
              </Form>

              <Message>
                Don't have account? <Link to="/register">Register</Link>
              </Message>
            </Grid.Column>
          </Grid>;
    }
}

export default Login;