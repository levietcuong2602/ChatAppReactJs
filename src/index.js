import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import Login from './components/author/Login';
import Register from './components/author/Register';
import Spinner from './Spinner';
import * as serviceWorker from './serviceWorker';
import 'semantic-ui-css/semantic.min.css';

import { composeWithDevTools } from 'redux-devtools-extension';
import { BrowserRouter as Router, Route, Switch, withRouter } from "react-router-dom";
import firebase from './firebase';
import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';
import rootReducer from './reducers';
import { setUser} from './actions'

const store = createStore(rootReducer, composeWithDevTools());

const mapStateFromProps = state =>({
    isLoading: state.user.isLoading
});

class Root extends React.Component{
    componentDidMount(){
        firebase.auth().onAuthStateChanged(user=>{
            if(user){
                console.log(user);
                this.props.setUser(user);
                this.props.history.push('/');
            }
        });
    }
    render(){
        console.log('props: ', this.props);
        return this.props.isLoading ? <Spinner /> : (
            <Switch>
                <Route exact path='/' component={App}/>
                <Route path='/login' component={Login} />
                <Route path='/register' component={Register} />
            </Switch>
        );
    }
}

//connect: argument1: data in store, argument2: dispath action
const RootWithAuthor = withRouter(connect(mapStateFromProps, { setUser })(Root));

ReactDOM.render(
    <Provider store={ store }>
        <Router>
            <RootWithAuthor />
        </Router>
    </Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
