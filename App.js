import MyApp from './src/containers/MainScreen';
import { registerRootComponent } from 'expo';

import React from 'react';

export default class App extends React.Component {
  render() {
    return <MyApp/>;
  }
}
registerRootComponent(App);