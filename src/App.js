import logo from './logo.svg';
import React, {useEffect, useState} from "react";
import './App.css';
import {DisplayingErrorMessagesExample} from "./Components/Registration";
import "./assets/registration.css";
import {BrowserRouter as Router, Route} from "react-router-dom";
import Profile from "./Components/Profile";
import Login from "./Components/Login";
import Home from "./Components/Home";
import Header from "./Components/Header";
import CreatePost from "./Components/CreatePost";
import Admin from "./Components/Admin";
import PostPage from "./Components/PostPage";
import Footer from "./Components/Footer";
// import {useFormik} from "formik";
function App() {
    // const [users, setUsers] = useState([]);
    // useEffect( async ()=>{
    //
    // },[])
  return (
      <Router>
          <div className="App">
              <Header />
              <div className="content">
                  <Route path="/admin" component={Admin} exact />
                  <Route path="/register" component={DisplayingErrorMessagesExample} exact />
                  <Route path="/" component={Home} exact />
                  <Route path="/post/:id" component={PostPage} exact />
                  <Route path="/login" component={Login} exact/>
                  <Route path="/profile/:username" component={Profile} exact />
                  <Route path="/create-post" component={CreatePost} exact/>
              </div>
              <Footer />
          </div>
      </Router>

  );
}

export default App;
