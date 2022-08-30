import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  // componentDidMount() {
  //   this.totalExpenses();
  // }

  // componentDidUpdate() {
  //   this.totalExpenses();
  // }

  // totalExpenses = () => {
  //   const { expenses } = this.props;
  //   let valueTotal = 0;
  //   if (expenses.length !== 0) {
  //     valueTotal = expenses.reduce((acc, { expense, coin, exchangeRates }) => {
  //       const Value = acc + (Number(expense) * Number(exchangeRates[coin].ask));
  //       return Value;
  //     }, 0);
  //     return valueTotal;
  //   }
  //   return valueTotal;
  // };

  render() {
    const { email } = this.props;
    return (
      <div>
        <h1>TrybeWallet</h1>
        <p data-testid="email-field">{ email }</p>
        <p data-testid="total-field">0</p>
        <p data-testid="header-currency-field">BRL</p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Header);
