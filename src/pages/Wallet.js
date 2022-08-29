import React, { Component } from 'react';
import Header from '../components/Header';
import WalletForm from '../components/WalletForm';

class Wallet extends Component {
  render() {
    return (
      <>
        <header>
          <Header />
        </header>
        <main>
          <WalletForm />
        </main>
      </>
    );
  }
}

export default Wallet;
