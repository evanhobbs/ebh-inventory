/* globals fetch */
import { createAsyncAction } from '@nerdwallet/redux-easy-async';

export const getItems = createAsyncAction(
  // the base name that will be used to construct the different types:
  // START_FETCH_POST, SUCCESS_FETCH_POST, FAIL_FETCH_POST
  'GET_ITEMS',
  // action creator function that returns the options for the action. At a minimum it must
  // have a makeRequest method that returns a promise (in this case `fetch()` returns a promise)
  id => ({
    makeRequest: () => {
      const path = window.location.hostname === 'localhost'
        ? `http://localhost:3002/items`
        : `http://electricbikehub.co.nz:3002/items`
      //   console.log(path)
      // return fetch(`http://localhost:3002/items`)
      return fetch(path).then(response => response.json()).then(resp => resp[0])
      },
  }),
);