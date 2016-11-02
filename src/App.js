import React, { Component } from 'react';
import './App.css';
import AddLayoutForm from './AddLayoutForm.js';
import GardenLayoutList from './GardenLayoutList.js';
import { connect } from 'react-redux';
import { fetchLayouts } from './actions';

class App extends Component {

  componentDidMount() {
    // console.log(this.props.state);
    const { gardenLayouts } = this.props.state;
    if (gardenLayouts.length === 0) {
      this.props.dispatch(fetchLayouts());
    }
  }

  render() {
    return (
      <div className='App container'>
          <div className='App-header'>
            <h1 className='title is-1'>Garden Planning 101</h1>
            <h2 className='title is-2'><em>Planning Where You Plant</em></h2>
          </div>
          <div className='App-content hero-body'>
            <div className='App-content__wrap columns'>
            <AddLayoutForm />
            <GardenLayoutList
              gardenLayouts={this.props.state.gardenLayouts}
            />
            </div>
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
