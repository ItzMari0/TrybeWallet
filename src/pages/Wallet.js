import React, { Component } from 'react';
import Header from '../components/Header';
import WalletForm from '../components/WalletForm';
import Table from '../components/Table';

class Wallet extends Component {
  render() {
    return (
      <>
        <header>
          <Header />
        </header>
        <main>
          <WalletForm />
          <Table />
        </main>
      </>
    );
  }
}

export default Wallet;
