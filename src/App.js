import React, { Component } from 'react';
import './App.css';
import GardenLayoutFilterNav from './GardenLayoutFilterNav.js';
import AddLayoutForm from './AddLayoutForm.js';
import GardenLayoutList from './GardenLayoutList.js';
import { connect } from 'react-redux';

class App extends Component {
  render() {
    const stateForLog = this.props.state;
    console.log('stateForLog', stateForLog);
    return (
      <div className='App container'>
        <div className='hero-body'>
          <div className='App-header'>
            <h1 className='title is-1'>Garden Planning 101</h1>
            <h2 className='title is-2'><em>Planning Where You Plant</em></h2>
          </div>
          <h3 className='App-intro title is-3'>
            Plan your Garden!
          </h3>
          <AddLayoutForm />
          <GardenLayoutList
            gardenLayouts={this.props.state.gardenLayouts}
          />
          <GardenLayoutFilterNav />
        </div>
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    state
  };
};

let app = connect(mapStateToProps)(App);

export default app;
