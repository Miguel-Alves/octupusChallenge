import React from 'react';
import {
  StatusBar,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  Keyboard,
} from 'react-native';

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor: '#DBF5FA',
    alignItems: 'center',
    justifyContent: 'center',
  },
  appContent: {
    flex: 1,
    width: '90%',
  },
});

const MContainer = ({ children }) => (
  <View style={styles.appContainer}>
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.appContent}>
        <StatusBar barStyle="dark-content" backgroundColor="#DBF5FA" />
        {children}
      </View>
    </TouchableWithoutFeedback>
  </View>
);

export default MContainer;
