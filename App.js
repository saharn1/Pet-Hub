import React from 'react';
import List from './components/List';
import {SafeAreaView} from 'react-native';
import GlobalStyles from './utils/GlobalStyles';

const App = () => {
  return (
    <SafeAreaView style={GlobalStyles.droidSafeArea}>
      <List />
    </SafeAreaView>
  );
};

export default App;
