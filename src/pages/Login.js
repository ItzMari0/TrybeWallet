import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { userLoginAction } from '../redux/actions';

const PASSWORDMINLENGTH = 5;

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      btnDisabled: true,
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
    const { email, password } = this.state;
    if (
      ((email.includes('@'))
      && (email.includes('.com'))
      && (password.length >= PASSWORDMINLENGTH))) {
      this.setState({ btnDisabled: false });
    } else {
      this.setState({ btnDisabled: true });
    }
  }

  handleClick = (event) => {
    event.preventDefault();
    const { dispatch, history } = this.props;

    dispatch(userLoginAction(this.state));
    history.push('/carteira');
  };

  render() {
    const { email, password, btnDisabled } = this.state;
    return (
      <form>
        <input
          type="email"
          data-testid="email-input"
          name="email"
          value={ email }
          onChange={ this.handleChange }
        />
        <input
          type="password"
          data-testid="password-input"
          name="password"
          value={ password }
          onChange={ this.handleChange }
        />
        <button
          type="submit"
          disabled={ btnDisabled }
          onClick={ this.handleClick }
        >
          Entrar
        </button>
      </form>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Login);
