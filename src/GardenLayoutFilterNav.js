import React, { Component } from 'react';
import FilterLink from './FilterLink';
import './GardenLayoutFilterNav.css';

export default class GardenLayoutFilterNav extends Component {
  render() {
    return (
      <div className='garden-layout-filter-nav columns'>
        <div className='column'>
          <FilterLink filter='SHOW_ALL'>
            All
          </FilterLink>
        </div>
        <div className='column'>
          <FilterLink filter='SHOW_ACTIVE'>
            Active
          </FilterLink>
        </div>
        <div className='column'>
          <FilterLink filter='SHOW_COMPLETED'>
            Completed
          </FilterLink>
        </div>
      </div>
    );
  }
}
