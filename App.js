import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Navigation from './App/Utils/Navigation'
import { Provider } from 'react-redux';
import reduxStore from './App/Redux/reduxConfig'
const store = reduxStore()
import { RootSiblingParent } from 'react-native-root-siblings';




const App = () => {

  return (
    <RootSiblingParent>
      <Provider store={store}>
        <NavigationContainer>
          <Navigation />
        </NavigationContainer>
      </Provider>
    </RootSiblingParent>
  );
};

export default App;