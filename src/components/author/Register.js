import React, { Component } from 'react';
import { Grid, Form, Segment, Button, Header, Message, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import firebase from '../../firebase';

class Register extends Component {
    state = {
      username:'',
      email:'',
      password: '',
      passwordConfirmation: '',
      errors: [],
      loading: false,
    }

    handleChange = event => {
      this.setState({[event.target.name]: event.target.value});
    }

    handleSubmit = (e)=>{
      e.preventDefault();
      if(this.isFormValid()){
        this.setState({errors: [], loading: true});
        firebase
          .auth()
          .createUserWithEmailAndPassword(this.state.email, this.state.password)
          .then(createUser => {
            console.log(createUser);
            createUser.user.updateProfile({
              displayName: this.state.username,
              photoURL: `http://gravatar.com/avatar/${this.state.email}?d=identicon`
            });
          })
          .then(()=>{
            this.saveUser(createUser).then(()=>{
              console.log('User saved');
            });
          })
          .catch(err=>{
            this.setState({errors: this.state.errors.concat(err), loading: false});
            console.log(err);
          });
      }
    }

    saveUser = createUser=>{ }

    isFormValid = ()=>{
      let errors = [];
      let error;

      if(this.isFormEmpty(this.state)){
        error = {message: 'Fill in all fields'};
        this.setState({errors: errors.concat(error)});
        return false;
      }else if(!this.isPasswordValid(this.state)){
        error = {message: 'Password is invalid'};
        this.setState({errors: errors.concat(error)});
        return false;
      }else{
        return true;
      }
    }

    isFormEmpty = ({username, password, passwordConfirmation})=>{
      return !username.length || !password.length || !passwordConfirmation.length;
    }

    isPasswordValid = ({password, passwordConfirmation})=>{
      if(password.length < 6 || passwordConfirmation.length < 6){
        return false;
      }else if(password !== passwordConfirmation){
        return false;
      }else{
        return true;
      }
    }

    displayErrors = errors => errors.map((error, key)=><p key={key}>{error.message}</p>);

    handleInputError = (errors, inputName)=>{
      return errors.some(error=>error.message.toLowerCase().includes(inputName))?'error':'';
    }

    render() {
      const {username, email, password, passwordConfirmation, errors, loading} = this.state;

      return <Grid textAlign="center" verticalAlign="middle" className="app">
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" icon color="orange" textAlign="center">
            <Icon name="puzzle piece" color="orange" />
            Register for DevChat
          </Header>
          {errors.length > 0 && (
            <Message error>
              <Message.Header>We're sorry we can't apply that discount</Message.Header>
              {this.displayErrors(errors)}
            </Message>
          )}
          <Form onSubmit={this.handleSubmit} size="large">
            <Segment stacked>
              <Form.Input fluid name="username" icon="user" iconPosition="left"  placeholder="Enter Your Username" 
                onChange={this.handleChange} type="text" value={username} />

              <Form.Input fluid name="email" icon="mail" iconPosition="left" placeholder="Enter Your Email Address" 
                onChange={this.handleChange} type="email" value={email} className={this.handleInputError(errors, 'email')} />

              <Form.Input fluid name="password" icon="lock" iconPosition="left" placeholder="Enter Your Password" 
                onChange={this.handleChange} type="password" value={password} className={this.handleInputError(errors, 'password')} />

              <Form.Input fluid name="passwordConfirmation" icon="repeat" iconPosition="left" placeholder="Enter Your Password Confirmation" 
                onChange={this.handleChange} type="password" value={passwordConfirmation} />
              <Button disabled={loading} className={loading?'loading':''}fluid color="orange">Submit</Button>
            </Segment>
          </Form>
            <Message>Already user <Link to="/login">Login</Link></Message>
        </Grid.Column>
      </Grid>;
    }
}

export default Register;