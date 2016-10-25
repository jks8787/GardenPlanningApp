import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { addLayout } from './actions';
import './AddLayoutForm.css';

const messages = {
  widthLabel: 'Width of Planting Area',
  withPlaceHolder: '100',
  heightLabel: 'Length of Planting Area',
  heightPlaceHolder: '100',
  submitText: 'Add Garden Layout',
  introHeader: '',
  intoParagraph1: '',
  intoParagraph2: ',',
  intoParagraph3: ''
}

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
      <div className='add-layout-form column is-one-third'>
        <div className='layout-intro'>
          <h3 className='title is-3'>
            Garden Layout
          </h3>
          <p>
            Various fruits and veggies need differing amounts of space to spread in a garden.
          </p>
          <p>
            Please enter you measuerments in Inches below and generate a sample garden layout.
          </p>
          <p>
            <em>
              choose plants needing the same amount to space between them for this layout
            </em>
          </p>
        </div>
        <div className='form'>
            <form
              onSubmit={this.handleSubmit.bind(this)}
            >
              <div
                className="control"
              >
                <label className="label">
                  {messages.heightLabel}
                </label>
                <input
                  className='input'
                  name='height'
                  type='text'
                  placeholder={messages.heightPlaceHolder}
                />
              </div>
              <div
                className="control"
              >
                <label className="label">
                  {messages.widthLabel}
                </label>
                <input
                  className='input'
                  name='width'
                  type='text'
                  placeholder={messages.withPlaceHolder}
                />
              </div>
              <div
                className="control"
              >
                <button
                  className='button is-outlined'
                  type='submit'
                >
                  {messages.submitText}
                </button>
              </div>
            </form>
        </div>
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
