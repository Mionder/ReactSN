import logo from './logo.svg';
import React, {useEffect, useState} from "react";
import './App.css';
import Registration from "./Components/Registration";
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
import Shop from "./Components/Shop";
import CreateProduct from "./Components/CreateProduct";
import ServiceLoadData from "./Components/ServiceLoadData";
import Preloader from "./Components/Preloader";
// import {useFormik} from "formik";
function App() {
    const [isReady, setReady] = useState(false);
    // useEffect( async ()=>{
    //
    // },[])
    function dataIsReady(data){
        setReady(data);
    }

  return (
      <Router>
          <div className="App">
              <Header />
              <ServiceLoadData dataIsReady={dataIsReady} />
              {
                  isReady ?
                  <div className="content">
                      <Route path="/admin" component={Admin} exact />
                      <Route path="/register" component={Registration} exact />
                      <Route path="/" component={Home} exact />
                      <Route path="/post/:id" component={PostPage} exact />
                      <Route path="/login" component={Login} exact/>
                      <Route path="/profile/:username" component={Profile} exact />
                      <Route path="/create-post" component={CreatePost} exact/>
                      <Route path="/shop" component={Shop} exact/>
                      <Route path="/shop/create-product" component={CreateProduct} exact/>
                  </div>
                      :
                      <div className="content">
                        <Preloader />
                      </div>
              }

              <Footer />
          </div>
      </Router>

  );
}

export default App;
