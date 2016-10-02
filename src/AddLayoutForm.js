import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { addLayout } from './actions';

class AddLayoutForm extends Component {
  static propTypes = {
    onSubmit: PropTypes.func
  }

  render() {
    let input;
    const onSubmit = this.props.onSubmit;
    return (
      <div className='add-layout-form'>
          <form onSubmit={e => {
            e.preventDefault()
            if (!input.value.trim()) {
              return
            }
            onSubmit(input.value)
            input.value = ''
          }}>
            <input ref={node => {
              input = node
            }} />
            <button type='submit'>
              Add Garden Layout
            </button>
          </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSubmit: (text) => {
      dispatch(addLayout(text));
    }
  }
};

const mapStateToProps = (state) => {
   return {
     state
   }
};

let AddLayout = connect(mapStateToProps, mapDispatchToProps)(AddLayoutForm);

export default AddLayout;
