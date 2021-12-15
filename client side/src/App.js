import React from 'react'
import './App.css';
import { Switch , Route } from 'react-router-dom'
import Navbar from './components/navbar/Navbar';
import Home from './components/home/Home'
import Profile from './components/profile/Profile'
import SignIn from './components/signin/SignIn'
import SignUp from './components/signUp/SignUp'
import CreatePost from './components/createPost/CreatePost'
import UserProfile from './components/AnyUserProfile/Profile'

function App() {
  return (
    <>
        <Navbar/>
        <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/profile" component={Profile} />
            <Route path="/newProfile/:id" component={UserProfile} />
            <Route path="/signin" component={SignIn} />
            <Route path="/signup" component={SignUp} />
            <Route path="/createPost" component={CreatePost} />
        </Switch>
    </>
  );
}

export default App;
