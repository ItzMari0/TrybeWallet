import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { currencyAction } from '../redux/actions';

class WalletForm extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(currencyAction());
  }

  render() {
    const { wallet } = this.props;
    const { currencies } = wallet;
    return (
      <form>
        <label htmlFor="expenses-value">
          Despesas
          <input
            data-testid="value-input"
            type="text"
            id="expenses-value"
          />
        </label>
        <label htmlFor="expenses-description">
          Descrição
          <input
            data-testid="description-input"
            type="text"
            id="expenses-description"
          />
        </label>
        <label htmlFor="currency">
          Moeda
          <select
            data-testid="currency-input"
            id="currency"
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
          // onClick={}
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
  wallet: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(WalletForm);
