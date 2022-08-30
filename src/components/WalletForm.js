import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { currencyAction, expensesList } from '../redux/actions';
import fetchCurrencies from '../api/Api';

class WalletForm extends Component {
  constructor() {
    super();
    this.state = {
      id: 0,
      expenseValue: '',
      description: '',
      currencyType: 'USD',
      paymentMethod: 'Dinheiro',
      category: 'Alimentação',
      exchangeRates: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(currencyAction());
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  handleClick = async () => {
    const price = await fetchCurrencies();
    this.setState({
      exchangeRates: price,
    });
    this.setState((idValue) => ({
      id: idValue.id + 1,
    }));

    const { dispatch } = this.props;
    dispatch(expensesList(this.state));
    this.setState({
      expenseValue: '',
      description: '',
      currencyType: 'USD',
      paymentMethod: 'Dinheiro',
      category: 'Alimentação',
      exchangeRates: '' });
  };

  render() {
    const { wallet } = this.props;
    const { currencies } = wallet;
    const { expenseValue,
      description,
      currencyType,
      paymentMethod,
      category } = this.state;

    return (
      <form>
        <label htmlFor="expenses-value">
          Despesas
          <input
            data-testid="value-input"
            type="text"
            id="expenses-value"
            name="expenseValue"
            value={ expenseValue }
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="expenses-description">
          Descrição
          <input
            data-testid="description-input"
            type="text"
            id="expenses-description"
            name="description"
            value={ description }
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="currency">
          Moeda
          <select
            data-testid="currency-input"
            id="currency"
            name="currencyType"
            value={ currencyType }
            onChange={ this.handleChange }
          >
            { currencies.map((currency, index) => (
              <option key={ index }>{ currency }</option>
            )) }
          </select>
        </label>
        <label htmlFor="checkout">
          Forma de Pagamento
          <select
            data-testid="method-input"
            id="checkout"
            name="paymentMethod"
            value={ paymentMethod }
            onChange={ this.handleChange }
          >
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="category">
          Categoria
          <select
            data-testid="tag-input"
            id="category"
            name="category"
            value={ category }
            onChange={ this.handleChange }
          >
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
        </label>
        <button
          type="button"
          onClick={ this.handleClick }
        >
          Adicionar Despesas
        </button>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  wallet: state.wallet,
});

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  wallet: PropTypes.shape().isRequired,
};

export default connect(mapStateToProps)(WalletForm);
