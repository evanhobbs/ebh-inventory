/* eslint-disable react/jsx-no-target-blank */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getItems } from './lib/actions';
import './css/App.css';
import _ from 'lodash';

class App extends Component {
  constructor(props) {
    super(props);
    const { onGetItems } = props;
    onGetItems();
  }

  renderItems () {
    const { items } = this.props;
    if (!items || !items.length) return
    return (
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Quantity</th>
            <th>Item code</th>
            <th>Name</th>
            <th>Dealer price ex. GST</th>
            <th>Price ex. GST</th>
            <th>RRP</th>
            <th>Quantity</th>
          </tr> 
          
        </thead>
        <tbody>
        { items.map(item => {
          const price = _.get(item, 'SalesDetails.UnitPrice', 0);
          const dealerPrice = (price * .7705);
          const RRP = price * 1.15;
          return (
            <tr key={item.ItemID}>
              <td><input type='text' placeholder='Quantity' value={0}/></td>
              <td>{item.Code}</td>
              <td>{item.Name}</td>
              <td>${ dealerPrice.toFixed(2) }</td>
              <td>${ price.toFixed(2) }</td>
              <td>${ RRP.toFixed(2) }</td>
              <td>{ Math.floor(item.QuantityOnHand) }</td>
            </tr>
          )
        }) }
          
        </tbody>
      </table>
      )
  } 

  render() {
    return (
      <div className="App">
        <div className="btn-group btn-group-lg" role="group" aria-label="...">
          <button type="button" className="btn btn-default">Iventory</button>
          <button type="button" className="btn btn-default">Price List</button>
          <button type="button" className="btn btn-default">Something</button>
        </div>
        { this.renderItems() }
      </div>
    );
  }
}

const mapStateToProps = ({ items, requests }) => ({
  items,
});

const mapDispatchToProps = dispatch => ({
  onGetItems: id => dispatch(getItems()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
