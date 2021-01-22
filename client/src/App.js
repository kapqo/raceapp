import React, {Fragment, useEffect} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Alert from './components/layout/Alert';
import Dashboard from './components/dashboard/Dashboard';
import CreateProfile from './components/profile-forms/CreateProfile';
import EditProfile from './components/profile-forms/EditProfile';
import EditVehicle from './components/profile-forms/EditVehicle';
import AddVehicle from './components/profile-forms/AddVehicle';
import Profiles from './components/profiles/Profiles';
import Profile from './components/profile/Profile';
import Groups from './components/groups/Group';
import AddGroup from './components/groups/AddGroup';
import Posts from './components/posts/Posts';
import Post from './components/post/Post';
import PrivateRoute from './components/routing/PrivateRoute';
import './App.css';
import 'semantic-ui-css/semantic.min.css'
//Redux
import {Provider} from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';

if(localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
  <Provider store={store}>
    <Router>
      <Fragment>
        <Navbar />
        <Route exact path='/' component={Landing} />
        <section className="container">
          <Alert />
          <Switch>
            <Route exact path='/register' component={Register}></Route>
            <Route exact path='/login' component={Login}></Route>
            <Route exact path='/profiles' component={Profiles}></Route>
            <Route exact path='/profile/:id' component={Profile}></Route>
            <PrivateRoute exact path='/dashboard' component={Dashboard}></PrivateRoute>
            <PrivateRoute exact path='/create-profile' component={CreateProfile}></PrivateRoute>
            <PrivateRoute exact path='/edit-profile' component={EditProfile}></PrivateRoute>
            <PrivateRoute exact path='/add-vehicle' component={AddVehicle}></PrivateRoute>
            <PrivateRoute exact path='/edit-vehicle/:id' component={EditVehicle}></PrivateRoute>
            <PrivateRoute exact path='/posts' component={Posts}></PrivateRoute>
            <PrivateRoute exact path='/posts/:id' component={Post}></PrivateRoute>
            <PrivateRoute exact path='/groups' component={Groups}></PrivateRoute>
            <PrivateRoute exact path='/add-group' component={AddGroup}></PrivateRoute>
          </Switch>
        </section>
      </Fragment>
    </Router>  
  </Provider>
)};
export default App;
