import "./App.css";
import React, { Component } from 'react'
import Navbar from "./components/Navbar";
import News from "./components/News";
import {
  HashRouter, Routes, Route
} from "react-router-dom";

export default class App extends Component {

  render() {
    return (
      <HashRouter>
        <Navbar /> 
        <Routes>
          <Route exact path="/" element={<News key="general" pageSize={6} country={"in"} category="general" />} />
          <Route exact path="/Business" element={<News key="Business" pageSize={6} country={"in"} category="Business" />} />
          <Route exact path="/Entertainment" element={<News key="Entertainment" pageSize={6} country={"in"} category="Entertainment" />} />
          <Route exact path="/Health" element={<News key="Health" pageSize={6} country={"in"} category="Health" />} />
          <Route exact path="/Science " element={<News key="Science" pageSize={6} country={"in"} category="Science" />} />
          <Route exact path="/Sports" element={<News key="Sports" pageSize={6} country={"in"} category="Sports" />} />
          <Route exact path="/Technology" element={<News key="Technology" pageSize={6} country={"in"} category="Technology" />} />
        </Routes>
      </HashRouter>
    )
  }
}