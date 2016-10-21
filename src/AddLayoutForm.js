import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { addLayout } from './actions';

class AddLayoutForm extends Component {
  static propTypes = {
    onSubmit: PropTypes.func,
    height: PropTypes.number,
    width: PropTypes.number
  }

  handleSubmit(e) {
    e.preventDefault();
    const onSubmit = this.props.onSubmit;
    const data = new FormData(e.target);
    onSubmit(data);
  }

  render() {
    let input;
    return (
      <div className='add-layout-form'>
          <form onSubmit={this.handleSubmit.bind(this)}>
            <input name='height' />
            <input name='width' />
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
    onSubmit: (data) => {
      dispatch(addLayout(data));
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
