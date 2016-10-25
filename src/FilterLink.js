import { connect } from 'react-redux'
import { setVisibilityFilter } from './actions'
import React, { Component, PropTypes } from 'react';

class Link extends Component {
  static propTypes = {
    active: PropTypes.bool,
    children: PropTypes.node,
    onClick: PropTypes.func
  }

  renderLinksIfNeeded() {
    const active = this.props.active;
    const onClick = this.props.onClick;
    const children = this.props.children;
    if (active) {
      return <span>{children}</span>
    }
    return (
      <a href="#"
         onClick={e => {
           e.preventDefault()
           onClick()
         }}
      >
        {children}
      </a>
    )
  }

  render() {
    return (
      <div className='button is-link'>
        {this.renderLinksIfNeeded()}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    active: ownProps.filter === state.visibilityFilter
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClick: () => {
      dispatch(setVisibilityFilter(ownProps.filter))
    }
  }
}

const FilterLink = connect(
  mapStateToProps,
  mapDispatchToProps
)(Link)

export default FilterLink;
