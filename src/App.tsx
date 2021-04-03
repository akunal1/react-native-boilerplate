/**
 *
 * @format
 * @flow
 */
import {Provider} from 'react-redux';
import React, {PureComponent} from 'react';
import RootContainer from './Containers/RootContainer';
import {createStore} from './Store';

// create our Redux store
export const {store} = createStore();

class App extends PureComponent {
  render() {
    return (
      <Provider store={store}>
        <RootContainer />
      </Provider>
    );
  }
}

export default App;
