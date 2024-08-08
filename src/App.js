
import './App.css';

import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import LoadingBar from 'react-top-loading-bar'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

export default class App extends Component {
  apiKey = process.env.REACT_APP_NEWS_API
  state = {
    progress:0
  }
  setProgress=(progress_parm)=>{
    this.setState(
      {
        progress: progress_parm
      }
    )
  }
  render() {
    return (
      <div>
        <Router>
          <Navbar />
          <LoadingBar
        color='#f11946'
        progress={this.state.progress}
        // onLoaderFinished={() => this.setProgress(0)}
      />
          <Routes>
            <Route exact path="/" element = {<News setProgress={this.setProgress} apiKey = {this.apiKey} itemsPerPage='8' country="in" category="general" />}/>
            <Route exact path="/business" element = {<News setProgress={this.setProgress} apiKey = {this.apiKey} itemsPerPage="8" country="in" category="business" />}/>
            <Route path="/entertainment" element = {<News setProgress={this.setProgress} apiKey = {this.apiKey} itemsPerPage="8" country="in" category="entertainment" />}/>
            <Route path="/health" element = {<News setProgress={this.setProgress} apiKey = {this.apiKey} itemsPerPage="8" country="in" category="health" />}/>
            <Route path="/science" element = {<News setProgress={this.setProgress} apiKey = {this.apiKey} itemsPerPage="8" country="in" category="science" />}/>
            <Route path="/sports" element = {<News setProgress={this.setProgress} apiKey = {this.apiKey} itemsPerPage="8" country="in" category="sports" />}/>
            <Route path="/technology" element = {<News setProgress={this.setProgress} apiKey = {this.apiKey} itemsPerPage="8" country="in" category="technology" />}/>
          </Routes>
        </Router>
      </div>
    )
  }
}

