/* eslint-disable react/jsx-no-target-blank */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getItems } from './lib/actions';
import './css/App.css';
import _ from 'lodash';
import classnames from 'classnames';

class App extends Component {
  constructor(props) {
    super(props);
    const { onGetItems } = props;
    this.state = {
      query: '',
    };
    onGetItems();
  }

  renderItems () {
    const { query } = this.state;
    const { items } = this.props;
    const filteredItems = items.filter(item => {
      const { Name, Code } = item;
      if (!query) return true;
      if (Name && Name.toLowerCase().indexOf(query.toLowerCase()) > -1) return true;
      if (Code && Code.toLowerCase().indexOf(query.toLowerCase()) > -1) return true;
      return false;
    });
    if (!filteredItems.length) {
      return (
        <div>
          <h3>No results for for "{query}"</h3>
          <button className="btn btn-default" onClick={() => this.setState({ query: '' })}>Clear search</button>
        </div>
        )
    }
    return (
      <table className="table table-striped table-hover table-bordered">
        <thead>
          <tr>
            <th>Item code</th>
            <th>Name</th>
            <th>Price ex. GST</th>
            <th>RRP</th>
            <th>Quantity</th>
          </tr> 
          
        </thead>
        <tbody>
        { filteredItems.map(item => {
          const price = _.get(item, 'SalesDetails.UnitPrice', 0);
          const dealerPrice = (price * .7705);
          const RRP = price * 1.15;
          return (
            <tr key={item.ItemID}>
              <td>{item.Code}</td>
              <td>{item.Name}</td>
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

  renderSearch() {
    const clearClassName = classnames('form-control-clear', 'glyphicon', 'glyphicon-remove', 'form-control-feedback', { 'hidden': !this.state.query } )
    return (
      <div className="form-group" style={{ position: 'relative' }}>
        <input
          value={this.state.query}
          className="form-control input-lg"
          id="exampleInputEmail1"
          placeholder="Search inventory"
          onChange={(e) => this.setState({ query: e.target.value })}
        />
          <span className={clearClassName} onClick={() => this.setState({ query: '' })} />

      </div>
    );
  }

  render() {
    console.log(this.props.requests)
    console.log(this.props.isLoading)
    return (
      <div className="App">
        <div className="page-header">
          <h1><img className="header__image" src="http://electricbikehub.co.nz/ebh/wp-content/themes/roots/assets/img/logo-text2.svg" alt="" /> <small>Inventory</small></h1>
        </div>
        <div className="page-container">
          { this.renderSearch() }
          { this.props.isLoading
            ? <div className="loader">Loading...</div>
            : this.renderItems()
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ items, requests }) => ({
  items,
  isLoading: requests.GET_ITEMS.hasPendingRequests,
});

const mapDispatchToProps = dispatch => ({
  onGetItems: id => dispatch(getItems()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
